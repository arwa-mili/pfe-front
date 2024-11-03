import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  View,
  TextInput,
  Image
  //KeyboardTypeOptions,
} from 'react-native';
import { stylesNumberInput } from './numberInputStyles';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
interface NumberInputProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  value: string;
  date?: Date | null;
  onChange: (text: string) => void;
  onChangeDate?:
    | ((event: DateTimePickerEvent, date?: Date | null | undefined) => void)
    | undefined;
  condition?: boolean;
  showDatePicker?: boolean;
  errorText?: string;
  max: number;
  isPickerVisible?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  title,

  value,
  onPress,
  onChange,
  onChangeDate,
  condition,
  errorText,
  showDatePicker,
  max,
  style,
  date,
  isPickerVisible
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={stylesNumberInput.container}>
      <Text style={stylesNumberInput.title}>{title}</Text>
      <View>
        <TextInput
          style={[
            style,
            stylesNumberInput.input,
            isFocused && stylesNumberInput.inputFocused
          ]}
          value={value}
          maxLength={max}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {showDatePicker && (
          <TouchableOpacity
            style={stylesNumberInput.touchableOpacity}
            onPress={onPress}>
            <Image
              style={{ width: 30, height: 20 }}
              source={require('../../assets/images/hide/hide.png')}
            />
          </TouchableOpacity>
        )}
        {isPickerVisible && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date || new Date()}
            onChange={onChangeDate}
          />
        )}
      </View>

      {!condition && (
        <Text style={stylesNumberInput.errorText}>{errorText}</Text>
      )}
    </View>
  );
};
