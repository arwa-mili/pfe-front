import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const styledCurvedLineChart = StyleSheet.create({
  container: {},
  config: {
    borderRadius: 10,
    margin: 4
  },
  chartTitle: {
    fontSize: FontSize.size_5xl,
    fontWeight: 'bold',
    color: Color.colorLighterOrange,
    textAlign: 'center',
    marginVertical: 10
  }
});
