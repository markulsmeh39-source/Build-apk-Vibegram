importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// You should fetch config dynamically or hardcode it
const firebaseConfig = {
  // Config will be injected here during build if possible, but hardcoding since it's a fixed file 
  // Let's just listen to push events manually
};

firebase.initializeApp({
  projectId: "straight-dream-4sjh2",
  appId: "1:538239096770:web:7122022d85caffe575a85b",
  apiKey: "AIzaSyDbrgGOvNKVAD_4ef4Q4148PTU2rOvKTi8",
  authDomain: "straight-dream-4sjh2.firebaseapp.com",
  messagingSenderId: "538239096770",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192.webp'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
