import { tt } from '../../locales/translation.config';
import { ErrorCode } from '../consts/errorCodes/errorCodes';
import {
  hideMessageModal,
  ModalState,
  showMessageModal
} from '../../hooks/Slices/MessageModalSlice';
import { MessageTypes } from '../../enums/MessageTypes';
import { UnknownAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { handleLogout } from '../../features/OnBoarding/Utils/HelperFunctions/helper';
import {
  isFetchBaseQueryError,
  isIErrorClient,
  isNetworkError
} from '../../store/GenericErrorHandling/ErrorsTypeChecking';

export const handleGenericError = async (
  error: unknown,
  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  if (isFetchBaseQueryError(error)) {
    if (isNetworkError(error)) {
      dispatch(
        showMessageModal({
          messageType: MessageTypes.FAIL,
          headerText: tt('Internet Network Error'),
          messageText: translateGenericErrorMessage(
            'A network conexion occured, try again later'
          ),
          buttonText: 'OK',
          onProceed: () => {
            hideMessageModal();
          }
        })
      );
    } else if (isIErrorClient(error)) {
      if (error.status === ErrorCode.UNAUTHORIZED) {
        await handleLogout(true, dispatch);
      }
    } else {
      dispatch(
        showMessageModal({
          messageType: MessageTypes.FAIL,
          headerText: tt('Error Occured'),
          messageText: translateGenericErrorMessage(
            'An Error Occured , try again later'
          ),
          buttonText: 'OK',
          onProceed: () => {
            hideMessageModal();
          }
        })
      );
    }
  } else {
    dispatch(
      showMessageModal({
        messageType: MessageTypes.FAIL,
        headerText: tt('Error Occured'),
        messageText: translateGenericErrorMessage(
          'An Error Occured , try again later'
        ),
        buttonText: 'OK',
        onProceed: () => {
          hideMessageModal();
        }
      })
    );
  }
};

export const translateGenericErrorMessage = (errorMessage: string): string => {
  let translatedMessage = errorMessage;
  switch (errorMessage) {
    case 'Your session has expired, you need to login again to proceed !':
      translatedMessage = tt(
        'Your session has expired, you need to login again to proceed !'
      );
      break;

    case 'Internal server error':
      translatedMessage = tt('Internal server error');
      break;

    case 'OTHER' || 'An Error Occured, try again later':
      translatedMessage = tt('An Error Occured, try again later');
      break;

    case 'Internet Network Error':
      translatedMessage = tt('Network connexion occured , try again later');
      break;

    default:
      translatedMessage = tt('An Error Occured, try again later');
      break;
  }
  return translatedMessage;
};

/*

      break; */
