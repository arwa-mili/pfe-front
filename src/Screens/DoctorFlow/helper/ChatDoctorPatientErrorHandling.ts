import { tt } from '../../../locales/translation.config';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import {
  ModalState,
  showMessageModal
} from '../../../hooks/Slices/MessageModalSlice';
import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../enums/MessageTypes';
import { translateChatDoctorErrorMessages } from './ChatDoctorErrorMessages';

export const handleChatDoctorError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('You Are Unauthorized to access this Session'),
      messageText: translateChatDoctorErrorMessages(error.message),
      buttonText: 'OK'
    })
  );
};
