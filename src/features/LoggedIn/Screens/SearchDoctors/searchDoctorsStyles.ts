import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesSearchDoctors = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Color.colorWhite
  },
  searchBarContainer: {
    paddingVertical: 10,
    height: '15%',
    backgroundColor: Color.colorWhite
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    marginBottom: 20
  },
  flatlistContent: {
    paddingBottom: 5
  }
});
