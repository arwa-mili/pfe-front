import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { translateResetErrorMessages } from './ResetPasswordErrorMessages';

export const handleResetPasswordError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Reset Not Successful'),
      messageText: translateResetErrorMessages(error.message),
      buttonText: 'OK'
    })
  );
};
