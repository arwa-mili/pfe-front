import React from 'react';
import {
  Modal,
  Pressable,
  View,
  ColorValue,
  ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MessageIconNameType, MessageTypes } from '../../enums/MessageTypes';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { stylesMessageModal } from './messageModalStyles';
import { StyledButton } from '../styledButton/StyledButton';
import { StyledText } from '../StyledText/StyledText';
import { useAppDispatch } from '../../hooks/hooks';
import { hideMessageModal } from '../../hooks/Slices/MessageModalSlice';
export type MessageThemeColorType = ColorValue;
export interface MessageModalProps {
  messageType: MessageTypes | undefined;
  headerText?: string;
  messageText?: string;
  buttonText?: string;
  altButtonText?: string;
  onDismiss?: () => void | undefined;
  onProceed?: (() => void) | undefined;
  isLoading?: boolean;
  isProceeding?: boolean;
  isRejecting?: boolean;
  onReject?: (() => void) | undefined;
  isVisible: boolean;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  messageType,
  headerText,
  messageText,
  buttonText,
  altButtonText,
  isVisible,
  onDismiss,
  onProceed,
  onReject,
  isLoading,
  isRejecting
}) => {
  let messageIconName: MessageIconNameType;
  let messageThemeColor: MessageThemeColorType = '';

  switch (messageType) {
    case MessageTypes.FAIL:
      messageIconName = MessageIconNameType.CLOSE;
      messageThemeColor = Color.fail;
      break;
    case MessageTypes.SUCCESS:
      messageIconName = MessageIconNameType.CHECK;
      messageThemeColor = Color.success;
      break;
    case MessageTypes.DECISION:
      messageIconName = MessageIconNameType.CLOSE;
      messageThemeColor = Color.decision;
      break;
    case MessageTypes.DANGEROUS_DECISION:
      messageIconName = MessageIconNameType.ALERT_CIRCLE_OUTLINE;
      messageThemeColor = Color.fail;
      break;
    case MessageTypes.WARNING:
      messageIconName = MessageIconNameType.ALERT_CIRCLE_OUTLINE;
      messageThemeColor = Color.warning;
      break;
    default:
      messageIconName = MessageIconNameType.INFORMATION_VARIANT;
      messageThemeColor = Color.info;
      break;
  }
  const dispatch = useAppDispatch();
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <Pressable onPress={onDismiss} style={stylesMessageModal.container}>
        {isLoading && <ActivityIndicator size={70} color={Color.colorWhite} />}
        {!isLoading && (
          <View style={stylesMessageModal.modalView}>
            <View
              style={[
                stylesMessageModal.modalIcon,
                { backgroundColor: messageThemeColor }
              ]}>
              <MaterialCommunityIcons
                name={messageIconName}
                size={75}
                color={Color.white}
              />
            </View>

            <View style={stylesMessageModal.modalContent}>
              <StyledText big bold style={stylesMessageModal.headerText}>
                {headerText || 'Header'}
              </StyledText>

              <StyledText big bold style={stylesMessageModal.messageText}>
                {messageText || 'Message'}
              </StyledText>

              {messageType === MessageTypes.DECISION ||
              messageType === MessageTypes.DANGEROUS_DECISION ? (
                <View style={stylesMessageModal.decisionRow}>
                  {altButtonText !== undefined && (
                    <StyledButton
                      style={stylesMessageModal.decisionButton}
                      onPress={() => {
                        onReject && onReject();
                        dispatch(hideMessageModal());
                      }}
                      isLoading={isRejecting}>
                      {altButtonText || (
                        <>
                          NO{' '}
                          <MaterialCommunityIcons
                            name="close"
                            size={16}
                            color={Color.white}
                          />
                        </>
                      )}
                    </StyledButton>
                  )}

                  <StyledButton
                    style={[
                      stylesMessageModal.decisionButton,
                      { backgroundColor: messageThemeColor }
                    ]}
                    onPress={() => {
                      onProceed && onProceed();

                      dispatch(hideMessageModal());
                    }}>
                    {buttonText || (
                      <>
                        YES{' '}
                        <MaterialCommunityIcons
                          name={messageIconName}
                          size={16}
                          color={Color.white}
                        />
                      </>
                    )}
                  </StyledButton>
                </View>
              ) : (
                <StyledButton
                  style={{ backgroundColor: messageThemeColor }}
                  onPress={() => {
                    onProceed && onProceed();

                    dispatch(hideMessageModal());
                  }}>
                  {buttonText || 'Okay'}
                </StyledButton>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
