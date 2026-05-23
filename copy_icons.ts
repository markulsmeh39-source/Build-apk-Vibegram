import fs from 'fs';
import path from 'path';

const sourceImg = 'public/image/Gemini_Generated_Image_fpoqbdfpoqbdfpoq (1).png';
const androidRes = 'android/app/src/main/res';
const mipmaps = [
    'mipmap-hdpi',
    'mipmap-mdpi',
    'mipmap-xhdpi',
    'mipmap-xxhdpi',
    'mipmap-xxxhdpi',
    'mipmap-ldpi'
];
const names = ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'];

for (const mipmap of mipmaps) {
    const dir = path.join(androidRes, mipmap);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    for (const name of names) {
        fs.copyFileSync(sourceImg, path.join(dir, name));
    }
}
console.log('Icons copied!');
