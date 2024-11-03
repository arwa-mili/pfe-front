import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesFoodFlatlist = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.colorWhitesmoke,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  }
});
