import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { stylesRadioButtonGroup } from './checkboxGroupStyles.';
import Button from '../BasicButton/Button';

interface CheckBoxGroupProps {
  options: {
    value: number | string;
    label: string;
  }[];
  valueIsColor?: boolean;
  stylebutton?: ViewStyle;
  selected?: (number | string)[];
  onSelectionChange: (values: (number | string)[]) => void;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  stylebutton,
  options,
  //valueIsColor,
  selected,
  onSelectionChange
}) => {
  const [selectedValues, setSelectedValues] = useState<(number | string)[]>([]);
  useEffect(() => {
    const handleSelect = () => {
      if (selected && selected.length > 0) {
        setSelectedValues((prevSelectedValues) => [
          ...prevSelectedValues,
          ...selected
        ]);
      }
    };
    handleSelect();
  }, [selected]);
  const handlePress = (value: number | string) => {
    const index = selectedValues.indexOf(value);
    let updatedSelection: (number | string)[] = [];
    if (index !== -1) {
      updatedSelection = selectedValues.filter((val) => val !== value);
    } else {
      updatedSelection = [...selectedValues, value];
    }
    setSelectedValues(updatedSelection);
    onSelectionChange(updatedSelection);
  };
  return (
    <View style={stylesRadioButtonGroup.container}>
      {options.map(({ label, value }) => {
        const index = selectedValues.indexOf(value);
        const isSelected = index !== -1;
        return (
          <Button
            key={value}
            style={[stylesRadioButtonGroup.button, stylebutton]}
            variant={isSelected ? 'primary' : 'default'}
            onPress={() => {
              handlePress(value);
              if (isSelected) {
                selectedValues.splice(index, 1);
              } else {
                selectedValues.push(value);
              }
              setSelectedValues([...selectedValues]);
            }}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default CheckBoxGroup;
