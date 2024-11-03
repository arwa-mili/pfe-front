import {
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import React from 'react';
import { ReactNode } from 'react';
import { stylesStyledButton } from './styledButtonStyle';
import { StyledText } from '../StyledText/StyledText';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export interface StyledButtonProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disabled?: boolean;

  onPress: (() => void) | undefined;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  style,
  textStyle,
  onPress,
  isLoading,
  disabled
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[stylesStyledButton.container, style]}
      disabled={disabled || isLoading}>
      <StyledText
        style={[stylesStyledButton.text, textStyle]}
        small={false}
        big={false}
        bold>
        {isLoading ? (
          <ActivityIndicator size="small" color={Color.white} />
        ) : (
          children
        )}
      </StyledText>
    </TouchableOpacity>
  );
};
