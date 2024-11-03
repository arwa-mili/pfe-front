import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { translateHomeErrorMessages } from './HomeErrorMessages.ts';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';

export const handleHomeError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Submission failed'),
      messageText: translateHomeErrorMessages(error.message),
      buttonText: 'OK'
    })
  );
};
