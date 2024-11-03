import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { stylesTouchableOpacity } from './customTouchableOpacityStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomTouchableOpacityProps {
  title: string;
  onPress: () => void;
  iconname: string;
}

const CustomTouchableOpacity: React.FC<CustomTouchableOpacityProps> = ({
  title,
  onPress,
  iconname
}) => {
  return (
    <View>
      <TouchableOpacity
        style={stylesTouchableOpacity.touchableOpacity}
        onPress={onPress}>
        <View style={stylesTouchableOpacity.iconwithtile}>
          <View style={stylesTouchableOpacity.icon}>
            <Ionicons name={iconname} size={24} />
          </View>
          <Text style={stylesTouchableOpacity.text}>{title}</Text>
        </View>
        <View style={stylesTouchableOpacity.icon}>
          <Ionicons name="chevron-forward-outline" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTouchableOpacity;
