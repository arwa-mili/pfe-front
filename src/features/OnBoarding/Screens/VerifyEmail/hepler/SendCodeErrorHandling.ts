import { Dispatch } from 'react';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { translateSendCodeErrorMessages } from './SendCodeErrorMessages';

export const handleCodeVerifError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Reset Not Successful'),
      messageText: translateSendCodeErrorMessages(error.message),
      buttonText: 'OK'
    })
  );
};
