import { Platform, StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
export const stylesMealsPlan = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: -10,
    paddingBottom: 5,
    backgroundColor: Color.colorWhite
  },
  selectedDayItem: {},
  titleView: {
    margin: 16
  },
  daySlider: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Color.colorLightsalmon
  },
  titlle: {
    backgroundColor: Color.colorWhite,
    fontFamily: FontFamily.openSansRegular,
    color: Color.colorBlack,
    fontSize: FontSize.size_7xl
  },
  dayItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopColor: Color.colorDarkOrange,
    backgroundColor: Color.colorLighterOrange,
    borderBlockEndColor: Color.colorDimgray,
    borderTopLeftRadius: -3,
    borderTopRightRadius: 3
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
    backgroundColor: Color.colorWhite,
    borderColor: Color.colorBlack,
    borderRadius: 5,
    flexDirection: 'column',
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
    borderBottomColor: '#ccc'
  },
  selectedDayContainer: {
    backgroundColor: Color.colorWhitesmoke
  },
  flatlist: {
    backgroundColor: Color.colorWhite,
    borderRadius: 10
  }
});
