import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vibegram.app',
  appName: 'Vibegram',
  webDir: 'dist',
  server: {
    hostname: 'markulsmeh39-source.github.io',
    androidScheme: 'https'
  },
  android: {
    appendUserAgent: ' VibegramApp/1.0'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      smallIcon: "ic_launcher",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
