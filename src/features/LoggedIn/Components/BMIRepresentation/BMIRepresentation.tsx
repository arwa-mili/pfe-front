import React, { useState, useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { stylesBMIRepresentation } from './bmiRepresentationStyles';
import { tt } from '../../../../locales/translation.config';

interface BMIProps {
  bmi: number;
}

const BMIRepresentation: React.FC<BMIProps> = ({ bmi }) => {
  const [stepperPosition] = useState(new Animated.Value(0));
  const [labelText, setLabelText] = useState<string | null>(null);

  useEffect(() => {
    moveStepper();
    setLabel();
  }, [bmi]);

  const setLabel = () => {
    if (bmi >= 15 && bmi <= 15.99) {
      setLabelText(tt('Severely Underweight'));
    }
    if (bmi < 15) {
      setLabelText(tt('Severely Underweight'));
    } else if (bmi >= 16 && bmi <= 18.49) {
      setLabelText(tt('Underweight'));
    } else if (bmi >= 18.5 && bmi <= 24.99) {
      setLabelText(tt('Healthy Weight'));
    } else if (bmi >= 25 && bmi <= 29.99) {
      setLabelText(tt('Overweight'));
    } else if (bmi >= 30 && bmi <= 34.99) {
      setLabelText(tt('Moderely Obese'));
    } else if (bmi >= 35 && bmi <= 39.99) {
      setLabelText(tt('Severely Obese'));
    } else {
      setLabelText('Very Severely Obese');
    }
  };
  const moveStepper = () => {
    let position = 0;
    if (bmi >= 15 && bmi <= 40) {
      position = (bmi - 15) / (40.0 - 15);
    } else {
      position = -0.99;
    }

    Animated.timing(stepperPosition, {
      toValue: position,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const ranges = [
    { start: 15, end: 15.99, color: 'blue', borderRadius: 10 },
    { start: 16.0, end: 18.49, color: 'green', borderRadius: 20 },
    { start: 18.5, end: 24.99, color: 'yellow', borderRadius: 30 },
    { start: 25.0, end: 29.99, color: 'orange', borderRadius: 40 },
    { start: 30.0, end: 34.99, color: 'purple', borderRadius: 50 },
    { start: 35.0, end: 39.99, color: 'pink', borderRadius: 60 }
  ];

  const renderColoredRange = (
    start: number,
    end: number,
    color: string,
    borderRadius: number
  ) => {
    const rangeWidth = ((end - start) * 100) / 25;
    return (
      <>
        <View
          key={`${end}-${start}`}
          style={[
            stylesBMIRepresentation.range,
            { backgroundColor: color, width: `${rangeWidth}%`, borderRadius }
          ]}>
          <Text style={stylesBMIRepresentation.rangeLimit}>{start}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={stylesBMIRepresentation.container}>
      <View style={stylesBMIRepresentation.bmiView}>
        <Text style={stylesBMIRepresentation.bmiValue}>{labelText}</Text>
      </View>
      {ranges.map((range) =>
        renderColoredRange(
          range.start,
          range.end,
          range.color,
          range.borderRadius
        )
      )}
      <Animated.View
        style={[
          stylesBMIRepresentation.stepper,
          {
            left: stepperPosition.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]}
      />
      <Animated.Text
        style={[
          stylesBMIRepresentation.bmiLabel,
          {
            left: stepperPosition.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '97%']
            })
          }
        ]}>
        {bmi}
      </Animated.Text>
    </View>
  );
};

export default BMIRepresentation;
