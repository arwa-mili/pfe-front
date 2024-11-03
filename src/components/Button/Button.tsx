import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicator
} from 'react-native';
import { stylesButton } from './buttonStyles';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

interface ButtonProps {
  title: string;
  onTap: () => void;
  isloading: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  enabledActiveOpacity: boolean;
  textStyles?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  enabledActiveOpacity,
  title,
  disabled,
  onTap,
  isloading,
  textStyles,
  style
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={enabledActiveOpacity ? 0.5 : 1}
      style={[
        stylesButton.btnCustom,
        style,
        disabled ? stylesButton.disabled : null
      ]}
      onPress={onTap}>
      {isloading ? (
        <ActivityIndicator color={Color.colorExtraLightSalmon} />
      ) : (
        <Text style={[stylesButton.btnText, textStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
