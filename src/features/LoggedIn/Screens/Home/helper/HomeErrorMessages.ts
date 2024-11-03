import { tt } from '../../../../../locales/translation.config';

export const translateHomeErrorMessages = (errorMessage: string): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'History Already Submitted':
      translatedMessage = tt('History Already Submitted');
      break;
    default:
      translatedMessage = tt('An Error Occured, try again later');
      break;
  }
  return translatedMessage;
};
