import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  View,
  TextInput,
  Image,
  GestureResponderEvent
} from 'react-native';
import { stylesInputFieldWithText } from './inputFieldWithTextStyle';
import { Images } from '../../utils/StylingConsts/images/Images';

interface InputFieldWithTextProps {
  title: string;
  placeholder: string;
  isSecure?: boolean;
  style?: ViewStyle;
  placeholderTextColor: string;
  onChange: (text: string) => void;
  condition: boolean;
  value: any;
  onPress?: (event: GestureResponderEvent) => void;
  conditionSecure?: boolean;
  errorText: string;
}

export const InputFieldWithText: React.FC<InputFieldWithTextProps> = ({
  title,
  placeholder,
  isSecure,
  style,
  value,
  placeholderTextColor,
  onChange,
  condition,
  errorText,
  onPress,
  conditionSecure,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={[stylesInputFieldWithText.crossedText, style]}>{title}</Text>
      <View>
        <TextInput
          style={[
            stylesInputFieldWithText.input,
            isFocused && stylesInputFieldWithText.inputFocused
          ]}
          placeholder={placeholder}
          autoCapitalize="none"
          value={value}
          secureTextEntry={conditionSecure}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isSecure && (
          <TouchableOpacity
            style={stylesInputFieldWithText.touchableOpacity}
            onPress={onPress}>
            <Image
              style={stylesInputFieldWithText.styleicon}
              source={conditionSecure ? Images.show : Images.hide}
            />
          </TouchableOpacity>
        )}
      </View>
      {!condition && (
        <Text style={stylesInputFieldWithText.errorText}>{errorText}</Text>
      )}
    </View>
  );
};
