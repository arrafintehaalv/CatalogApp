import { NativeModules, NativeEventEmitter } from 'react-native';

interface TimestampModuleInterface {
  getCurrentTimestamp(): Promise<{ timestamp: number }>;
  startTimestampInterval(): void;
  stopTimestampInterval(): void;
}

const { TimestampModule } = NativeModules;

export const timestampModule: TimestampModuleInterface = TimestampModule;

export const timestampEmitter = new NativeEventEmitter(TimestampModule);

export default timestampModule;
