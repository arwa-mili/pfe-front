import { Dispatch, UnknownAction } from 'redux';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import {
  ModalState,
  showMessageModal
} from '../../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../../locales/translation.config';
import { ThunkDispatch } from 'redux-thunk';
import { IErrorClient } from '../../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { translateAddCustomMealErrorMessages } from './AddCustomMealErrorMessage';
import { MODAL_BUTTONS_TEXTS } from '../../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';

export const handleAddMealError = async (
  error: IErrorClient,

  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
): Promise<void> => {
  dispatch(
    showMessageModal({
      messageType: MessageTypes.DECISION,
      headerText: tt('Meal Add Not Successful'),
      messageText: translateAddCustomMealErrorMessages(error.message),
      buttonText: MODAL_BUTTONS_TEXTS.ACCEPT
    })
  );
};
