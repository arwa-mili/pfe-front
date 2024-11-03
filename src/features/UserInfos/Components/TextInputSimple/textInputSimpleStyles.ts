import { Platform, StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesTextInputSimple = StyleSheet.create({
  action: {
    backgroundColor: Color.colorWhite,
    flexDirection: 'row',

    marginHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorWhite,
    paddingBottom: 5
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginHorizontal: 40
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingLeft: 10,

    color: Color.colorBlack
  }
});
