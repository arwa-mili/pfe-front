import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesChatConversations = StyleSheet.create({
  textlastmessages: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  textlastmessage: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  datetext: {
    color: Color.colorBlack,
    alignItems: 'flex-end'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Color.colorWhite,
    padding: 15,
    borderRadius: 0,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
