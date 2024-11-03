import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CurvedLineChart from '../../Components/CurvedLineChart/CurvedLineChart';
import { stylesLogin } from '../../../OnBoarding/Screens/Login/loginStyle';
import { tt } from '../../../../locales/translation.config';
import { stylesHealthTrackers } from './healthTrackersStyles';
import { TotalMeasuresDataClient } from '../../../../interfaces/measures/get-measures-for-history-charts.interface';

/**
 * Represents HealthTrackers screen ui
 * @returns JSX.Element
 */
interface HealthTrackersProps {
  navigateToMeasureTablePage: () => void;
  data: TotalMeasuresDataClient[];
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HealthTrackers: React.FC<HealthTrackersProps> = ({
  data,
  navigateToMeasureTablePage
}): JSX.Element => {
  return (
    <>
      <Text style={stylesLogin.text}>
        {tt('Show Table')}
        <TouchableOpacity onPress={navigateToMeasureTablePage}>
          <Text style={stylesLogin.link}>{tt('Show')}</Text>
        </TouchableOpacity>
      </Text>
      <ScrollView>
        <ScrollView style={stylesHealthTrackers.chart}>
          {data.map(
            (item, index) =>
              item.measures_hist.length > 0 && (
                <CurvedLineChart
                  key={index}
                  data={item.measures_hist}
                  name={item.measures_hist[0].measure_name}
                  Width={screenWidth * 0.28}
                  Height={screenHeight * 5}
                />
              )
          )}
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default HealthTrackers;
