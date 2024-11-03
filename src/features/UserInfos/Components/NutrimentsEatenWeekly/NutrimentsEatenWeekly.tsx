import React from 'react';
import { View, Text } from 'react-native';
import { stylesNutrimentsWeeklyEanten } from './nutrimentsEatenWeeklyStyles';
import ProgressCircle from '../../../LoggedIn/Components/CircularProgessBar/ProgressCircle';
import { tt } from '../../../../locales/translation.config';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface NutrimentsEatenWeeklyProps {
  title: string;
  eaten: number;
  goal: number;
}

const NutrimentsEatenWeekly: React.FC<NutrimentsEatenWeeklyProps> = ({
  title,
  eaten,
  goal
}) => {
  return (
    <View style={stylesNutrimentsWeeklyEanten.topContent}>
      <View style={stylesNutrimentsWeeklyEanten.TextInfos}>
        <ProgressCircle
          percent={parseFloat(((eaten / goal) * 100).toFixed(2))}
          radius={50}
          strokeWidth={7}
          shadowColor={Color.colorGray}
          color={Color.colorSalmon}
        />
      </View>
      <View style={stylesNutrimentsWeeklyEanten.line} />
      <View style={stylesNutrimentsWeeklyEanten.progressBarLeftSide}>
        <Text style={stylesNutrimentsWeeklyEanten.text}>{tt(title)}</Text>
        <View style={stylesNutrimentsWeeklyEanten.topContent}>
          <View style={stylesNutrimentsWeeklyEanten.EatenAndGoal}>
            <Text>{tt('Eaten')}</Text>
            <Text style={stylesNutrimentsWeeklyEanten.textCarbohydrates}>
              {eaten}
            </Text>
          </View>
          <View style={stylesNutrimentsWeeklyEanten.line} />

          <View style={stylesNutrimentsWeeklyEanten.EatenAndGoal}>
            <Text style={stylesNutrimentsWeeklyEanten.text}>{tt('Goal')}</Text>
            <Text style={stylesNutrimentsWeeklyEanten.textCarbohydrates}>
              {goal}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NutrimentsEatenWeekly;
