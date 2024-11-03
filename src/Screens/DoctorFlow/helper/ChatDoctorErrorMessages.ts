import { tt } from '../../../locales/translation.config';

export const translateChatDoctorErrorMessages = (
  errorMessage: string
): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Unauthorized':
      translatedMessage = tt(
        'Your access token to this session has expired ! Please contact your patient or try with a valid token.'
      );
      break;
    default:
      translatedMessage = tt('An error has occured, try later');
      break;
  }
  return translatedMessage;
};
