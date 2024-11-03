import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesSuggestedMeals = StyleSheet.create({
  cardBorder: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginVertical: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: Color.colorExtraLightSalmon,
    borderWidth: 2,
    backgroundColor: Color.colorWhitesmoke,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  flatListContentContainer: {
    margin: 10
  }
});
