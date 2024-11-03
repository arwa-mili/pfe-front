import { StyleSheet } from 'react-native';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesMedicalFiles = StyleSheet.create({
  title: {
    fontSize: FontSize.size_5xl
  },
  scrollView: {
    flex: 1
  },
  fileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  addIcon: {
    marginBottom: 20,
    marginRight: 20,
    alignSelf: 'flex-end'
  }
});
