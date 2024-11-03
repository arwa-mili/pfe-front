import { ThunkDispatch } from 'redux-thunk';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { logoutDiseases } from '../../../../hooks/Slices/DiseasesSlice';
import {
  ModalState,
  showMessageModal
} from '../../../../hooks/Slices/MessageModalSlice';
import { logout } from '../../../../hooks/Slices/UserDiseasesScheduleSlice';
import { defaultState } from '../../../../hooks/Slices/UserSlice';
import { tt } from '../../../../locales/translation.config';
import { Dispatch, UnknownAction } from 'redux';
import {
  removeAccessToken,
  removeRefreshToken
} from '../../../../utils/helpers/SensitiveStorageHF';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import { clearAllNotifications } from '../../../../utils/helpers/notifications/measuresNotifications';

export const validateLoginHF = (text: string): boolean => {
  const phoneNumberRegex = /^(?:[2549]\d{7})$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(text) || phoneNumberRegex.test(text);
};

export const handleLogout = async (
  sessionExpired: boolean,
  dispatch: ThunkDispatch<{ modal: ModalState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>
) => {
  if (sessionExpired) {
    dispatch(
      showMessageModal({
        messageType: MessageTypes.FAIL,
        headerText: tt('SessionExpired'),
        messageText: tt('Your session has expired, login again to proceed !'),
        buttonText: MODAL_BUTTONS_TEXTS.ACCEPT
      })
    );
  }

  await clearAllNotifications();

  await removeAccessToken();
  await removeRefreshToken();
  await AsyncStorage.clear();
  await AsyncStorage.getAllKeys().then((keys) =>
    AsyncStorage.multiRemove(keys)
  );
  dispatch(defaultState());
  dispatch(logout());
  dispatch(logoutDiseases());
};

export const validatePasswordHF = (text: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\\*\\+\\_]{8,}$/;
  return passwordRegex.test(text);
};

export const validatePhoneNumberHF = (number: string): boolean => {
  const phoneNumberRegex = /^(?:[2549]\d{7})$/;

  return phoneNumberRegex.test(number);
};

export const validateEmailHF = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

export function assignSpecification(spe: string): string {
  if (spe === 'before sleeping') {
    return 'systolic';
  } else if (spe === 'fasting & before medication') {
    return 'diastolic';
  } else {
    return spe;
  }
}
