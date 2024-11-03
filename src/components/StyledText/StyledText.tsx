import { Text } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';
export interface StyledTextProps {
  children?: ReactNode;
  small?: boolean;
  big?: boolean;
  bold?: boolean;
  style: StyleProp<TextStyle>;
}

export const StyledText: React.FC<StyledTextProps> = ({
  children,
  small,
  big,
  bold,
  style
}) => {
  return (
    <Text
      style={[
        {
          color: Color.tint,
          fontSize: small ? 13 : big ? 24 : 16,
          fontWeight: bold ? 'bold' : 'normal'
        },
        style
      ]}>
      {children}
    </Text>
  );
};
