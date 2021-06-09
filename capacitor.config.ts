import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ryc.app',
  appName: 'licoreriaryc-front',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    hostname: 'www.licoreriaryc.com',
    androidScheme: 'https',
  },
};

export default config;
