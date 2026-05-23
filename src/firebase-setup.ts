import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from '../firebase-applet-config.json';
import { supabase } from './supabase';
import { state } from './logic';

let messaging: any = null;

try {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
} catch(e) {
    console.warn("Firebase initialize error:", e);
}

export async function requestFirebaseWebPushPermission() {
    if (!messaging) return;
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, { 
                // vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' 
            });
            if (token && state.currentUser) {
                const { data: profile } = await supabase.from('profiles').select('settings').eq('id', state.currentUser.id).single();
                const settings = profile?.settings || {};
                if (settings.fcm_web_token !== token) {
                    settings.fcm_web_token = token;
                    await supabase.from('profiles').update({ settings }).eq('id', state.currentUser.id);
                }
            }
        }
    } catch (e) {
        console.warn("Error getting web push token:", e);
    }
}

export function listenForFirebaseMessages() {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
        if (Notification.permission === 'granted') {
             new Notification(payload.notification?.title || 'Notification', {
                 body: payload.notification?.body,
                 icon: payload.notification?.image || '/icon-192.webp'
             });
        }
    });
}
