import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { stylesImagePickerAvatar } from './imagePickerAvatarStyles';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import React from 'react';
interface ImagePickerAvatarProps {
  uri: ImageSourcePropType | undefined | any;
  onPress?: () => void;
  style?: ViewStyle;
  changeable: boolean;
  meal?: boolean;
}

export const ImagePickerAvatar: React.FC<ImagePickerAvatarProps> = ({
  uri,
  onPress,
  style,
  changeable,
  meal
}) => {
  return (
    <>
      <View style={[stylesImagePickerAvatar.avatar, style]}>
        <Image
          style={stylesImagePickerAvatar.avatarImage}
          source={uri ? uri : meal === true ? Images.mealAvatar : Images.avatar}
        />
        {changeable && (
          <TouchableOpacity
            style={stylesImagePickerAvatar.addButton}
            onPress={onPress}>
            <Icons.Material name="add-circle" size={35} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
