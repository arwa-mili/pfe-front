import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { stylesCheckbox } from './checkboxStyles';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label: string | number;
  style?: ViewStyle;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  style,
  isChecked,
  onChange,
  label
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!isChecked)}
      style={stylesCheckbox.container}>
      <View style={[stylesCheckbox.checkBox, style]}>
        {isChecked && stylesCheckbox.styleColor1 && (
          <Text style={stylesCheckbox.checkBoxText}>✔</Text>
        )}
      </View>
      <Text style={stylesCheckbox.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
