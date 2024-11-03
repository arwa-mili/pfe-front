import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesProfile = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    backgroundColor: Color.colorWhite,
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  progressCircleContainer: {
    position: 'relative',
    top: 160,
    left: 160,
    alignContent: 'center',
    maxWidth: 40,
    height: 11
  },
  textStyling: {
    fontFamily: FontFamily.arial,
    marginTop: 25,
    marginBottom: 0,
    marginHorizontal: 20
  },
  nutritionPlan: {
    alignContent: 'center'
  },

  elementsView: {
    flexDirection: 'column',
    backgroundColor: Color.colorWhite,
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
});
