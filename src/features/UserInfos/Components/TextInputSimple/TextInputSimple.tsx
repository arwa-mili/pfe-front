import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { stylesTextInputSimple } from './textInputSimpleStyles';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface TextInputtProps {
  placeholder: string;
  withIcon: boolean;
  name?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
  textStyle?: TextStyle;
  val?: string;
  onChange?: (val: string) => void;

  error: string | null | boolean;
}

export const TextInputSimple: React.FC<TextInputtProps> = ({
  placeholder,
  name,
  keyboardType,
  withIcon,
  style,
  textStyle,
  val,
  onChange,

  error
}) => {
  return (
    <>
      <View style={[stylesTextInputSimple.action, style]}>
        {withIcon && name && (
          <FontAwesome name={name} color={Color.colorBlack} size={20} />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Color.white}
          autoCorrect={false}
          value={val}
          onChangeText={onChange}
          keyboardType={keyboardType ? keyboardType : undefined}
          style={[
            stylesTextInputSimple.textInput,
            {
              color: Color.colorBlack
            },
            textStyle
          ]}
        />
      </View>
      {error && <Text style={stylesTextInputSimple.error}>{error}</Text>}
    </>
  );
};
