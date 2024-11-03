import { tt } from '../../../../../locales/translation.config';

export const translateLoginErrorMessages = (errorMessage: string): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Invalid credentials':
      translatedMessage = tt('Invalid Credentials');
      break;
    default:
      translatedMessage = tt('Login Error Occured, try again later');
      break;
  }
  return translatedMessage;
};
