import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesCheckbox = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  styleColor1: {
    backgroundColor: Color.colorLighterOrange
  },

  checkBox: {
    backgroundColor: Color.colorWhite,
    borderColor: Color.colorLighterOrange,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 4
  },
  label: {
    fontFamily: 'Poppins Regular',
    fontSize: 14
  }
});
