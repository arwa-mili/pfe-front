import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesButton = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 35,
    width: 90,
    alignSelf: 'center',

    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontFamily: FontFamily.openSansBold,
    textAlign: 'center',
    fontSize: FontSize.size_base
  }
});
