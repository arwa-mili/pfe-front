import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesImagePickerAvatar = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'cover'
  },
  addButton: {
    bottom: 20,
    left: 20,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonIcon: {
    width: 25,
    height: 25,
    tintColor: Color.colorWhite
  },
  usernameText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
