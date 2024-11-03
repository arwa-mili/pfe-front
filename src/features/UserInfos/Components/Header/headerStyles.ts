import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
export const stylesHeader = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Color.colorExtraLightSalmon
  },
  text: {
    marginLeft: 10,
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_7xl,
    color: Color.colorBlack
  }
});
