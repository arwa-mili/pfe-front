import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
export const stylesPlansCard = StyleSheet.create({
  cardTitle: {
    alignSelf: 'flex-start',
    marginRight: 10,
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_5xl
  },
  container: {
    flex: 1
  },

  progressBarLeftSide: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
    marginLeft: 20
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0
  },
  cardBorder: {
    marginTop: 10,
    marginBottom: 20,
    marginVertical: 40,
    borderRadius: 20,
    backgroundColor: Color.colorWhitesmoke,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
