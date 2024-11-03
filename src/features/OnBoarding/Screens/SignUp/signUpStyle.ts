import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { Border } from '../../../../utils/StylingConsts/BorderRadius/BorderRadiusSize';
import { StyleSheet } from 'react-native';
export const stylesSignUp = StyleSheet.create({
  gradientBackground: {
    flex: 1
  },

  crossedText: {
    position: 'absolute',
    top: 8,
    left: 10,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 2
  },
  input2: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowColor: Color.colorLightsalmon,
    elevation: 1
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  error: {
    color: 'red',
    marginTop: 2
  },

  login: {
    fontSize: FontSize.size_29xl,
    display: 'flex',

    fontFamily: FontFamily.openSansBold,
    fontWeight: '800',
    color: Color.colorLightsalmon
  },
  loginLayout: {
    flex: 1
  },
  loginScreen: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    display: 'flex',
    flexDirection: 'column'
  },

  rectangleViewBorder: {
    backgroundColor: Color.colorWhite
  },
  rectangleIconLayout: {
    borderRadius: Border.br_3xs
  },
  rectangleView: {
    position: 'relative',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 50,
    flex: 4,

    borderColor: Color.colorGainsboro
  },
  TextInput: {
    height: 20,
    flex: 1,
    padding: 10,
    marginLeft: 20
  },

  vectorIconPosition: {
    alignContent: 'center',
    width: 200,
    height: 200,
    marginLeft: 15
  }
});
