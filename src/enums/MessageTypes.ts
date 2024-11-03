import { ColorValue } from 'react-native';
export enum MessageTypes {
  'FAIL',
  'SUCCESS',
  'WARNING',
  'DECISION',
  'DANGEROUS_DECISION',
  'INFO'
}

export enum MessageIconNameType {
  CLOSE = 'close',
  CHECK = 'check',
  ALERT_CIRCLE_OUTLINE = 'alert-circle-outline',
  INFORMATION_VARIANT = 'information-variant'
}

export type MessageThemeColorType = ColorValue;
