import { supabase } from './src/supabase';

async function fixAvatars() {
    const { data: profiles, error } = await supabase.from('profiles').select('id, avatar_url').not('avatar_url', 'is', null);
    if (error) {
        console.error("Error fetching profiles", error);
        return;
    }
    for (const profile of profiles) {
        if (profile.avatar_url && profile.avatar_url.startsWith('http://')) {
            const httpsUrl = profile.avatar_url.replace('http://', 'https://');
            console.log(`Fixing profile ${profile.id}: ${httpsUrl}`);
            await supabase.from('profiles').update({ avatar_url: httpsUrl }).eq('id', profile.id);
        }
    }
    
    // Also fix group chats
    const { data: chats, error: chatErr } = await supabase.from('chats').select('id, avatar_url').not('avatar_url', 'is', null);
    if (!chatErr && chats) {
        for (const chat of chats) {
            if (chat.avatar_url && chat.avatar_url.startsWith('http://')) {
                const httpsUrl = chat.avatar_url.replace('http://', 'https://');
                console.log(`Fixing chat ${chat.id}: ${httpsUrl}`);
                await supabase.from('chats').update({ avatar_url: httpsUrl }).eq('id', chat.id);
            }
        }
    }
    console.log('Done fixing URLs');
    process.exit(0);
}

fixAvatars();
