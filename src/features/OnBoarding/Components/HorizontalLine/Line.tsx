import React from 'react';
import { View } from 'react-native';
import { stylesLine } from './lineStyles';

interface LineProps {
  color: string;
  thickness: number;
}

const Line: React.FC<LineProps> = ({ color, thickness }) => {
  return (
    <View
      style={[stylesLine.line, { backgroundColor: color, height: thickness }]}
    />
  );
};

export default Line;
