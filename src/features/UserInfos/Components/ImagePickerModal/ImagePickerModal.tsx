import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesImagePickerModal } from './imagePickerModalStyles';
import Modal from 'react-native-modal';

interface ImagePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onImageLibraryPress: () => void;
}
export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isVisible,
  onClose,
  onImageLibraryPress
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={stylesImagePickerModal.modal}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <SafeAreaView style={stylesImagePickerModal.buttons}>
        <Pressable
          style={stylesImagePickerModal.button}
          onPress={onImageLibraryPress}>
          <Image
            style={stylesImagePickerModal.buttonIcon}
            source={require('../../../../assets/vector-3.png')}
          />
          <Text style={stylesImagePickerModal.buttonText}>Gallery</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};
