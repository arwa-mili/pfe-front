import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const styleSearchBar = StyleSheet.create({
  searchPlaceholder: { flex: 1, fontSize: FontSize.size_mini },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  layout: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Color.colorLightGray,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Color.colorDarkOrange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    height: 220,
    width: 100,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: Color.white
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
