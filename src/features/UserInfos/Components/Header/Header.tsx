import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { stylesHeader } from './headerStyles';

interface HeaderPresenterProps {
  title?: string;
  handlePress?: () => void;
  textStyle?: TextStyle;
  medium: boolean;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderPresenterProps> = ({
  title,
  handlePress,
  textStyle,
  medium,
  style
}) => {
  return (
    <View style={[stylesHeader.mainContainer, style]}>
      <TouchableOpacity onPress={handlePress}>
        <Icons.Material
          name="arrow-back-ios-new"
          size={medium ? 24 : 12}
          color="black"
        />
      </TouchableOpacity>
      <Text style={[stylesHeader.text, textStyle]}>{title}</Text>
    </View>
  );
};

export default Header;

//
