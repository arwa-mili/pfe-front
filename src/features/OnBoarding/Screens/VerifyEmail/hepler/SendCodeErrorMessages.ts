import { tt } from '../../../../../locales/translation.config';

export const translateSendCodeErrorMessages = (
  errorMessage: string
): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Invalid credentials':
      translatedMessage = tt('Invalid Credentials');
      break;
    case 'User Already Exists':
      translatedMessage = tt('User Already Exists');
      break;

    case 'Invalid code passed. Check your inbox.':
      translatedMessage = tt('Invalid code passed. Check your inbox.');
      break;
    case 'Your account is verified login to pass.':
      translatedMessage = tt('Your account is verified login to pass');
      break;
    case 'Code has expired. Please request again.':
      translatedMessage = tt('Code has expired. Please request again.');
    default:
      translatedMessage = tt('Reset Error Occured, try again later');
      break;
  }
  return translatedMessage;
};
