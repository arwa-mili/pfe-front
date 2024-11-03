import { Text, StyleProp, TextStyle, Platform } from 'react-native';
import React from 'react';
import { stylesGlobal } from '../../features/LoggedIn/Utils/styling/globalStyles';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { FontFamily } from '../../utils/StylingConsts/fontFamily/fontFamily';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numberOfLine?: number;
}

const TextComponent = (props: Props) => {
  const { text, size, flex, font, color, styles, title, numberOfLine } = props;

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      numberOfLines={numberOfLine}
      style={[
        stylesGlobal.text,
        {
          color: color ?? Color.colorBlack,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font ? font : title ? FontFamily.arialn : FontFamily.arial
        },
        styles
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
