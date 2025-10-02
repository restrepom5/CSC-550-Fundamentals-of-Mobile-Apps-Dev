import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getItem(key: string): string | null;
  setItem(value: string, key: string): void;
  removeItem(key: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLocalStorage');

