import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config/v3';

// Create a Tamagui config so we can use it in our provider
const tamaguiConfig = createTamagui(config);

// This is needed for the Tamagui V3 types to be registered
export type AppConfig = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
