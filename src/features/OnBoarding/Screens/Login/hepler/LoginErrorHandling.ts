import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { translateLoginErrorMessages } from './LoginErrorMessage';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';

export const handleLoginError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Login Failed'),
      messageText: translateLoginErrorMessages(error.message),
      buttonText: 'OK'
    })
  );
};
