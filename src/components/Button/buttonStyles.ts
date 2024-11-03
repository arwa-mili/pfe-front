import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesButton = StyleSheet.create({
  btnCustom: {
    height: 40,
    backgroundColor: Color.colorBlack,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 30
  },
  disabled: {
    backgroundColor: Color.DISABLED_COLOR
  },
  btnText: {
    fontSize: 15,
    color: Color.colorWhite
  }
});
