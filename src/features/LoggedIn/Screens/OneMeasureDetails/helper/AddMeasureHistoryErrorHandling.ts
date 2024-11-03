import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { translateAddMeasureHistoryErrorMessages } from './AddMeasureHistoryErrorMessages';
import { MODAL_BUTTONS_TEXTS } from '../../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';

export const handleAddMeasureHistoryError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Measure Not Added'),
      messageText: translateAddMeasureHistoryErrorMessages(error.message),
      buttonText: MODAL_BUTTONS_TEXTS.ACCEPT
    })
  );
};
