import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emmycalcaterra.hiitflow',
  appName: 'HIIT Flow',
  webDir: 'dist',
  server: {
    url: 'https://hiit-flow-emmyc.replit.app',
    cleartext: true
  }
};

export default config;
