import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { styledCurvedLineChart } from './curvedLineChartStyles';
import { ScrollView, Text } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { MeasureHistoryListForChartClient } from '../../../../interfaces/measures/get-measures-for-history-charts.interface';

interface CurvedLineChartProps {
  data: MeasureHistoryListForChartClient[];
  Width: number;
  Height: number;
  name: string;
}

const CurvedLineChart: React.FC<CurvedLineChartProps> = ({
  data,
  Width,
  Height,
  name
}) => {
  const labels = data.map((item) => item.created_at);

  const datasets = [
    {
      // Configure line dataset
      data: data.map((item) => item.value),
      color: (opacity = 1) => `rgba(0, 128, 2500, ${opacity})`,
      strokeWidth: 3
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: Color.colorLightGray,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Color.colorDarkOrange,
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(140, 50, 45, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.9,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: Color.colorExtraLightSalmon
    }
    /*
    propsForLabels: {
      FontSize: FontSize.size_micro,
      paddingBottom: 150,
      color: Color.colorAquamarine
    },
    propsForVerticalLabels: {
      FontSize: FontSize.size_micro,
      paddingBottom: 150,
      color: Color.colorAquamarine
    }
    */
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator
      style={styledCurvedLineChart.container}>
      <Text style={styledCurvedLineChart.chartTitle}>{name}</Text>
      <ScrollView horizontal>
        <LineChart
          data={{ labels, datasets }}
          fromZero
          width={Width * 3.5}
          height={Height / 5.6}
          yAxisSuffix="mg"
          yAxisInterval={1}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          bezier
          style={styledCurvedLineChart.config}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default CurvedLineChart;
