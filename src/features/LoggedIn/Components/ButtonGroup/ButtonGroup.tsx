import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import Button from '../BasicButton/Button';
import { stylesButtonGroup } from './buttonGroupStyles';

interface ButtonGroupProps {
  options: {
    value: number | string;
    label: string;
  }[];
  stylebutton?: ViewStyle;
  selected?: number | string | null;
  onSelectionChange: (value: number | string | null) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  stylebutton,
  options,
  onSelectionChange
}) => {
  const [selectedValue, setSelectedValue] = useState<number | string | null>(
    null
  );

  const handlePress = (value: number | string) => {
    //console.log(value);
    setSelectedValue(value === selectedValue ? null : value);
    onSelectionChange(value === selectedValue ? null : value);
  };

  return (
    <View style={stylesButtonGroup.container}>
      {options.map(({ label, value }) => {
        const isSelected = value === selectedValue;
        return (
          <Button
            key={value}
            style={[stylesButtonGroup.button, stylebutton]}
            variant={isSelected ? 'primary' : 'default'}
            onPress={() => handlePress(value)}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default ButtonGroup;
