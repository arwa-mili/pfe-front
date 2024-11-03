import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const userCreatedPlans = StyleSheet.create({
  searchBarContainer: {
    height: '10%',
    width: '80%',
    backgroundColor: Color.colorWhite
  },
  topContent: {
    flexDirection: 'row',
    margin: 10
  },
  addIcon: {
    width: '20%',
    marginTop: 10
  }
});
