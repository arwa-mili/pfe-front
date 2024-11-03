import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesDropDownMenu = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: Color.colorWhite,
    marginBottom: 20
  },
  flatListContentContainer: {
    paddingBottom: 5
  },

  pagination: {
    flexDirection: 'row-reverse',
    flex: 1,
    justifyContent: 'space-between'
  },

  text: {
    color: Color.colorBlack
  },
  textcontainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    paddingRight: 10
  },

  avatar: {
    height: 45,
    width: 45
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhitesmoke,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 16
  }
});
