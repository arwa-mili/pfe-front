import { StyleSheet } from 'react-native';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';
import { FontFamily } from '../../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesCompleteProfile1 = StyleSheet.create({
  /*COLOR_WHITE*/

  screen: {
    backgroundColor: Color.colorWhite,
    flex: 1
  },

  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },

  buttonMan: {
    backgroundColor: Color.colorLighterOrange,
    width: 120,
    textAlign: 'center',
    borderRadius: 4
  },

  buttonNext: {
    color: Color.colorBlack,
    backgroundColor: Color.colorWhite,

    alignContent: 'center'
  },
  buttonNextContainer: {
    backgroundColor: Color.colorWhite
  },

  buttonWoman: {
    textAlign: 'center',
    backgroundColor: Color.colorLightGray,
    width: 120,
    borderRadius: 4
  },
  inputsContainer: {
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40
  },
  StyleText: {
    fontFamily: FontFamily.arial,
    fontSize: FontSize.size_11xl
  },
  StyleText2: {
    fontFamily: FontFamily.arial,
    fontSize: FontSize.size_7xl,
    color: Color.colorBlack,
    justifyContent: 'flex-start'
  },
  buttonActive: {
    borderStyle: 'solid',
    borderColor: Color.colorGray,
    borderWidth: 2
  }
});
