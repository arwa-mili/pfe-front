import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const pdfStyles = StyleSheet.create({
  overlay: {
    position: 'relative',
    color: Color.colorDarkOrange,

    backgroundColor: Color.colorWhitesmoke,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 8,
    padding: 5,
    margin: 10,
    marginTop: 0,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  Image: { flex: 1, width: '100%', height: 50 },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderBlockColor: Color.colorBlack,
    borderRadius: 8,
    borderColor: Color.colorBlack
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.colorDimgray,
    fontSize: FontSize.size_sm,
    textDecorationLine: 'underline'
  },

  bottom: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    alignItems: 'center'
  },
  text4: {
    justifyContent: 'flex-end',
    marginBottom: 7
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  ViewL: {
    alignItems: 'flex-end',
    margin: 5
  }
});
