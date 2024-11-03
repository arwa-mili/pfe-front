import { tt } from '../../../../../locales/translation.config';

export const translateResetErrorMessages = (errorMessage: string): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Error Processing Your request':
      translatedMessage = tt('Error Processing Your request');
      break;
    default:
      translatedMessage = tt('Reset Error Occured, try again later');
      break;
  }
  return translatedMessage;
};
