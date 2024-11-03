import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesStyledButton = StyleSheet.create({
  container: {
    backgroundColor: Color.neutral,
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10
  },
  text: {
    color: Color.white
  }
});
