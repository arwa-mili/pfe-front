import React from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { stylesTextInputSimple } from '../../../UserInfos/Components/TextInputSimple/textInputSimpleStyles';
import { stylesInputFieldWithText } from '../../../../components/InputFieldWithText/inputFieldWithTextStyle';

interface TextInputtProps extends TextInputProps {
  error: string | null | boolean;
  isFocused: boolean;
}

const TextInputChangeProfile: React.FC<TextInputtProps> = ({
  error,
  isFocused,
  ...props
}) => {
  return (
    <>
      <TextInput
        placeholderTextColor={Color.colorGray}
        autoCorrect={false}
        style={[
          stylesInputFieldWithText.input,
          isFocused && stylesInputFieldWithText.inputFocused
        ]}
        {...props}
      />
      {error && <Text style={stylesTextInputSimple.error}>{error}</Text>}
    </>
  );
};

export default TextInputChangeProfile;
