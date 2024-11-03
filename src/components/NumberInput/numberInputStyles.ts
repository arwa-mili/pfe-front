import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesNumberInput = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5
  },
  touchableOpacity: {
    right: 10,
    top: 10,
    position: 'absolute'
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    color: Color.colorBlack,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,

    shadowColor: Color.colorLightsalmon,
    elevation: 2
  },

  inputFocused: {
    borderColor: Color.colorBlack,
    borderWidth: 3
  }
});
