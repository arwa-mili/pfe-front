import { Platform, StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const weekdayMealsStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  daySlider: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.colorLightsalmon
  },
  dayItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopColor: Color.colorDarkOrange,
    borderBlockEndColor: Color.colorDarkOrange,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  selectedDayItem: {
    backgroundColor: Color.colorWhitesmoke
  },
  dayText: {
    fontSize: 16,
    color: Color.colorBlack
  },
  selectedDayText: {
    color: Color.colorBlack
  },
  placeholderImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  meal: {
    marginHorizontal: 25,
    maxWidth: 5000,
    maxHeight: 5000
  },
  flatlistContainer: {
    backgroundColor: Color.colorWhitesmoke,
    borderColor: Color.colorBlack,
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 3
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    backgroundColor: Color.colorWhite,
    marginVertical: 5,
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: Color.colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
      }
    })
  },
  title: {
    fontSize: 18
  },
  subItem: {
    backgroundColor: Color.colorWhite,
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorWhite2
  },
  selectedDayContainer: {
    backgroundColor: Color.colorWhitesmoke
  },
  flatlist: {
    backgroundColor: Color.colorWhite,
    borderRadius: 10
  }
});
