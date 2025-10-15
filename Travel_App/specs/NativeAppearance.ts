import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getCurrentStyle(): string;
  setStyle(style: string): void;
  isSimulator(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeAppearance');
