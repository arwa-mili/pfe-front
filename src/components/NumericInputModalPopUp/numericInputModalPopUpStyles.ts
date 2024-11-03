import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';

export const stylesNumericPopUp = StyleSheet.create({
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textInput: {
    borderStyle: 'dashed',
    borderColor: Color.colorVeryLightSalmon
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  modalBackground: {
    flex: 1,

    justifyContent: 'space-evenly',
    backgroundColor: Color.colorTransparent
  }
});
