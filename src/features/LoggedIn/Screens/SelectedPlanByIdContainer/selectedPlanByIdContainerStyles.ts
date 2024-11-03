import { StyleSheet } from 'react-native';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesSelectedPlanById = StyleSheet.create({
  flatlistContainer: {
    marginLeft: 30,
    marginVertical: 20
  },
  titleView: {
    margin: 10
  },
  value: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack
  },
  title: {
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_4xl,
    color: Color.colorDimgray
  },
  inside: {
    marginLeft: 20,
    marginRight: 30,
    flexWrap: 'wrap'
  },
  top: {
    flexDirection: 'row',
    alignSelf: 'auto',
    flexWrap: 'wrap'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    padding: 10
  }
});
