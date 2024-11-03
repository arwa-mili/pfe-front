import { StyleSheet } from 'react-native';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';

export const stylesTouchableOpacity = StyleSheet.create({
  touchableOpacity: {
    paddingVertical: 15,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.PLACEHOLDER_COLOR,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBlockColor: Color.DISABLED_COLOR,
    elevation: 1
  },

  iconwithtile: { flexDirection: 'row' },
  text: {
    fontSize: 18,
    color: Color.colorBlack,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 10
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGray
  }
});
