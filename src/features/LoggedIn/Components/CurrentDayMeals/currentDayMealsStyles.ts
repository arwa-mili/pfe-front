import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylescurrentDayMeal = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContentContainer: {
    backgroundColor: Color.colorWhite,
    margin: 10
  },
  ContainerMeal: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorExtraLightSalmon,
    marginRight: 10
  },
  mealTypeContainer: {
    marginLeft: 20,
    marginRight: 50
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  mealName: {
    fontSize: 16,
    marginLeft: 5
  }
});
