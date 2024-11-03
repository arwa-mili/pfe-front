import { tt } from '../../../../../locales/translation.config';

export const translateAddMeasureHistoryErrorMessages = (
  errorMessage: string
): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'measure out of limits':
      translatedMessage = tt('measure out of limits');
      break;
    default:
      translatedMessage = tt('Error Occured, try again later');
      break;
  }
  return translatedMessage;
};
