import React, { useEffect, useRef } from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import { stylesCode } from './codeStyles';

interface OTPInputProps {
  length: number;
  value: Array<string>;
  disabled: boolean;
  onChange(value: Array<string>): void;
}

const OTPContainer: React.FC<OTPInputProps> = ({
  length,
  value,
  disabled,
  onChange
}) => {
  const inputRefs = useRef<Array<TextInput>>(Array(length).fill(null));

  const onChangeValue = (text: string, index: number) => {
    const newValue = [...value];
    newValue[index] = text;
    onChange(newValue);
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);
    if (text.length !== 0 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      handleChange('', index - 1);
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <View style={stylesCode.container}>
      {[...Array(length)].map((_, index) => (
        <TextInput
          ref={(ref) =>
            (inputRefs.current[index] = ref || inputRefs.current[index])
          }
          key={index}
          style={stylesCode.input}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          keyboardType="decimal-pad"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleBackspace(event, index)}
        />
      ))}
    </View>
  );
};

export default OTPContainer;
