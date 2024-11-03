import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesVerifyEmail = StyleSheet.create({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flex: 1,
    backgroundColor: Color.colorVeryLightSalmon,
    padding: 50,
    justifyContent: 'space-between'
  }
});
