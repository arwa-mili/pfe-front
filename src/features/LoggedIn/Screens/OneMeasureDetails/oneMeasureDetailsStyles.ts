import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesOneMeasueDetails = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  MeasuresIndicator: {
    flex: 3,
    alignContent: 'center',

    marginRight: 30
  },
  OneIconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40
  },
  text: {
    color: Color.colorBlack,
    margin: 20
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Color.colorWhite
  }
});
