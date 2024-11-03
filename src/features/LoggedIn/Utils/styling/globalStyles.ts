import { StyleSheet } from 'react-native';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesGlobal = StyleSheet.create({
  fixedView: {
    position: 'absolute',
    margin: 15,
    zIndex: 1
  },
  textinput: {
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderColor: Color.colorExtraLightSalmon,
    borderRadius: 5,
    margin: 20,
    shadowColor: Color.colorLightsalmon,
    elevation: 1
  },
  link: {
    color: Color.colorDimgray,
    textDecorationLine: 'underline'
  },
  HeaderText: {
    fontFamily: FontFamily.arial,
    marginTop: 3,
    fontSize: FontSize.size_xl
  },

  Appheader: {
    backgroundColor: Color.colorWhite
  },

  button: {
    backgroundColor: Color.colorDimgray,
    width: 40,
    height: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  buttonBigger: {
    backgroundColor: Color.colorDimgray,
    width: 75,
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: Color.DISABLED_COLOR,
    fontSize: 10
  },

  buttonTextBigger: {
    color: Color.DISABLED_COLOR,
    fontSize: 15
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.colorWhite
  },

  text: {
    fontFamily: FontFamily.arial,
    fontSize: 14,
    color: Color.colorBlack
  },

  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6
  },

  section: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D56F0',
    width: 30,
    height: 30,
    borderRadius: 100
  },

  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.white,
    borderRadius: 100,
    marginRight: 12
  },

  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Color.white,
    margin: 12
  }
});
