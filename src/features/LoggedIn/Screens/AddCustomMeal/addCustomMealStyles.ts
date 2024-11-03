import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesAddCustomMeal = StyleSheet.create({
  topcontent: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
  Title1: {
    fontFamily: FontFamily.openSansRegular,
    fontSize: FontSize.size_11xl
  },
  Title2: { fontFamily: FontFamily.poppinsLight, fontSize: FontSize.size_11xl },
  textview: { margin: 20 },
  bottomcontent: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: { fontFamily: FontFamily.openSansRegular, fontSize: FontSize.size_7xl }
});
