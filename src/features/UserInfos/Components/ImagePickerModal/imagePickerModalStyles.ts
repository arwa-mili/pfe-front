import { StyleSheet } from 'react-native';

export const stylesImagePickerModal = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },

  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    width: 30,
    height: 30
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600'
  }
});
