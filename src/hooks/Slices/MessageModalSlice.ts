import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageTypes } from '../../enums/MessageTypes';

export interface ModalState {
  messageModalVisible: boolean;
  messageType: MessageTypes | undefined;
  headerText: string | undefined;
  messageText: string | undefined;
  buttonText: string | undefined;
  altbuttonText?: string | undefined;
  onProceed?: (() => void) | undefined;
  onReject?: (() => void) | undefined;
}
const initialState: ModalState = {
  messageModalVisible: false,
  messageType: undefined,
  headerText: undefined,
  messageText: undefined,
  buttonText: undefined,
  altbuttonText: undefined,
  onProceed: undefined,
  onReject: undefined
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showMessageModal: (
      state,
      action: PayloadAction<{
        messageType?: MessageTypes;
        headerText?: string;
        messageText?: string;
        buttonText?: string;
        altbuttonText?: string;
        onProceed?: () => void;
        onReject?: () => void;
      }>
    ) => {
      return {
        ...state,
        messageModalVisible: true,
        messageType: action.payload.messageType,
        headerText: action.payload.headerText,
        messageText: action.payload.messageText,
        buttonText: action.payload.buttonText,
        altbuttonText: action.payload.altbuttonText,
        onProceed: action.payload.onProceed,
        onReject: action.payload.onReject
      };
    },

    hideMessageModal: (state) => {
      return {
        ...state,
        messageModalVisible: false,
        messageType: MessageTypes.DECISION,
        headerText: undefined,
        messageText: undefined,
        buttonText: undefined,
        altbuttonText: undefined,
        onProceed: undefined,
        onReject: undefined
      };
    }
  }
});

export const { showMessageModal, hideMessageModal } = modalSlice.actions;

export default modalSlice.reducer;
