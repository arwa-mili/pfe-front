import { tt } from '../../../../../locales/translation.config';

export const translateRegisterErrorMessages = (
  errorMessage: string
): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Invalid Credentials':
      translatedMessage = tt('Invalid Credentials');
      break;
    default:
      translatedMessage = tt('User Already Exists');
      break;
  }
  return translatedMessage;
};
