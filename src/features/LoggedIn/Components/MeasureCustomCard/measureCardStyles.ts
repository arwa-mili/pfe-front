import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
export const stylesMeasuresCard = StyleSheet.create({
  title: {
    fontSize: FontSize.size_17xl,
    fontFamily: FontFamily.poppinsLight,
    textAlign: 'justify'
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite
  },
  cardContainer: {
    margin: 30,
    backgroundColor: Color.colorExtraLightSalmon,
    borderRadius: 10,
    borderColor: Color.colorExtraLightSalmon,
    shadowColor: Color.colorDarkOrange,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 5,
    shadowRadius: 3.84,
    elevation: 10
  },
  titleAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goToval: {
    fontSize: FontSize.size_5xl
  },
  touchableOpacity: {
    alignSelf: 'flex-end',
    textShadowColor: Color.colorBlack,
    textDecorationStyle: 'dashed'
  },
  value: {
    fontFamily: FontFamily.poppinsLight,
    fontSize: FontSize.size_5xl,
    marginRight: 10
  },
  unit: {
    fontFamily: FontFamily.poppinsLight,
    fontSize: FontSize.size_5xl
  },
  measureInfos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10
  },
  text: {
    marginRight: 10,
    fontFamily: FontFamily.arial,
    fontSize: FontSize.size_mini
  },
  infos: {
    fontFamily: FontFamily.arial,
    fontSize: FontSize.size_mini
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0
  }
});
