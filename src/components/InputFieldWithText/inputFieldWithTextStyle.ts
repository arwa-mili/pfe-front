import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesInputFieldWithText = StyleSheet.create({
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

  styleicon: { width: 30, height: 20 },

  errorText: {
    color: 'red',
    marginTop: 5
  },
  touchableOpacity: {
    position: 'absolute',
    right: 20,
    top: 30
  },
  input: {
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

  inputFocused: {
    borderColor: Color.colorBlack,
    borderWidth: 2
  }
});
