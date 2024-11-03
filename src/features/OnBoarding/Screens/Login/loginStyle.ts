import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { Border } from '../../../../utils/StylingConsts/BorderRadius/BorderRadiusSize';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';

export const stylesLogin = StyleSheet.create({
  crossedText: {
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

    shadowColor: Color.colorLightsalmon,
    elevation: 1
  },

  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagesBottom: {
    flex: 1,
    position: 'relative'
  },

  errorText: {
    color: 'red',
    marginTop: 5
  },

  login: {
    fontSize: FontSize.size_29xl,

    fontFamily: FontFamily.openSansBold,
    fontWeight: '800',
    color: Color.colorLightsalmon
  },
  loginLayout: {
    width: '100%'
  },
  button: {
    marginTop: 20,
    marginBottom: 30
  },
  loginScreen: {
    flex: 1,

    backgroundColor: Color.colorWhite,
    display: 'flex',
    flexDirection: 'column'
  },

  rectangleViewBorder: {
    borderWidth: 0,

    backgroundColor: Color.colorWhite
  },
  rectangleIconLayout: {
    borderRadius: Border.br_3xs
  },
  rectangleView: {
    justifyContent: 'center',

    marginLeft: 40,
    marginRight: 40,
    marginTop: 50,
    marginBottom: 50,
    flex: 3,

    borderColor: Color.colorGainsboro
  },
  TextInput: {
    height: 20,
    flex: 1,
    padding: 10,
    marginLeft: 20
  },
  text: {
    textAlign: 'auto',
    margin: 5
  },
  link: {
    color: Color.colorLighterOrange,
    textDecorationLine: 'underline',
    marginBottom: -4,
    marginLeft: 10
  },
  divider: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center'
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: 'black'
  },

  imageTop: {
    justifyContent: 'flex-start',
    width: 200,
    height: 200,
    marginLeft: 15
  },

  vectorIconPosition: {
    //flex:1,
    alignContent: 'center',
    width: 200,
    height: 200,
    marginLeft: 15
  }
});
