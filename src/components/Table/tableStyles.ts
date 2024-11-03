import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../utils/StylingConsts/fontSize/FontSizes';

export const stylesTable = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Color.colorVeryLightBlue,
    borderWidth: 0
  },
  borderStyles: {
    borderWidth: 0,
    borderColor: Color.colorGray
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  row: { height: 40 },

  dataWrapper: { marginTop: -1 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    paddingTop: 30
  },
  text: { textAlign: 'center', fontSize: FontSize.size_sm }
});
