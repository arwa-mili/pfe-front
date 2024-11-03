import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesDoctorSearchMeals = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    flex: 2,
    alignSelf: 'center',
    borderRadius: 5,
    resizeMode: 'cover'
  },
  flatListContainer: {
    flex: 1
  },
  maincontainer: {
    flex: 1,
    backgroundColor: Color.colorWhite
  },
  searchBarContainer: {
    height: '10%',
    backgroundColor: Color.colorWhite
  }
});
