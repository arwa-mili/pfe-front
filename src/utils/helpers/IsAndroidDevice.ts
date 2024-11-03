import { Platform } from 'react-native';

export const isAndroidDevice = () => {
  return Platform.OS === 'android';
};
