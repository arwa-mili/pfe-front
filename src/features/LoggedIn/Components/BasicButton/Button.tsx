import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { stylesButton } from './buttonStyles';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface ButtonProps {
  variant: 'default' | 'primary';
  onPress: () => void;
  label: string;
  style: (ViewStyle | { height: number; margin: number } | undefined)[];
}

const Button: React.FC<ButtonProps> = ({ variant, onPress, label, style }) => {
  const backgroundColor =
    variant === 'primary' ? Color.colorBlack : Color.colorGray;
  const color = variant === 'primary' ? Color.colorGray : Color.colorBlack;

  return (
    <RectButton
      onPress={onPress}
      style={[stylesButton.container, { backgroundColor }, style]}>
      <Text style={[stylesButton.text, { color }]}>{label}</Text>
    </RectButton>
  );
};

export default Button;
