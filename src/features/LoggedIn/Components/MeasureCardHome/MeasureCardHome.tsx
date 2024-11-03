import { Card } from '@rneui/themed';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { measureCardHomeStyles } from './measureCardHomeStyles';

interface MeasureCardHomeProps {
  name: string;
  measureTime: string;
  color: string;
}

const MeasureCardHome: React.FC<MeasureCardHomeProps> = ({
  name,
  measureTime,
  color
}) => {
  return (
    <ScrollView>
      <View style={measureCardHomeStyles.container}>
        <Card
          containerStyle={[
            measureCardHomeStyles.cardContainer,
            { backgroundColor: color }
          ]}>
          <View style={measureCardHomeStyles.titleAlign}>
            <Card.Title style={measureCardHomeStyles.title}>{name}</Card.Title>
          </View>

          <View style={measureCardHomeStyles.cardContent}>
            <View style={measureCardHomeStyles.measureInfos}>
              <Text style={measureCardHomeStyles.infos}>{measureTime}</Text>
            </View>
            {<TouchableOpacity />}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default MeasureCardHome;
