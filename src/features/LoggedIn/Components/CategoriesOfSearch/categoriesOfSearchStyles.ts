import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesCatoegoriesForSearch = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  categoryBtn: {
    height: 45,
    marginRight: 10,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: FontSize.size_4xl,
    fontWeight: 'bold',
    marginLeft: 5
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Color.colorWhite,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
