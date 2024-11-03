import { StyleSheet } from 'react-native';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';

export const stylesCompleteProfile2 = StyleSheet.create({
  screen: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    color: Color.colorBlack,
    left: 25,
    top: 14
  },
  width: {
    width: 130,
    marginLeft: 10
  },
  inputsContainer: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 50
  },
  inputcontainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});
