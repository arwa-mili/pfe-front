import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const addNutritionPlanStyle = StyleSheet.create({
  mainview: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 10,
    borderWidth: 0,
    backfaceVisibility: 'hidden',
    //backgroundColor: Color.colorExtraLightSalmon,
    elevation: 5,
    padding: 10,
    marginBottom: 110
  },
  text: {
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_7xl
  },
  buttons: {
    height: 50,
    width: 120
  },
  textinputStyle: {
    borderRadius: 20
  },
  textInput: {
    fontFamily: FontFamily.openSansRegular,
    fontSize: FontSize.size_5xl
  }
});
