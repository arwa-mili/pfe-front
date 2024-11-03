import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesCustomMealAddition = StyleSheet.create({
  container: {
    backgroundColor: Color.colorWhite,
    flexDirection: 'column',
    padding: 20,

    borderRadius: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  infocontainer: {
    margin: 5,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  }
});
