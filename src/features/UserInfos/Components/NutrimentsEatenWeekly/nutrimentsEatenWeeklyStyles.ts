import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesNutrimentsWeeklyEanten = StyleSheet.create({
  EatenAndGoal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 100
  },

  progressBarLeftSide: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
    marginLeft: 20,
    width: 150
  },
  text: {
    color: Color.colorSalmon
  },
  line: {
    width: 2,
    height: '100%',
    backgroundColor: Color.colorBlack
  },
  textCarbohydrates: {
    flexWrap: 'wrap',
    color: Color.colorBlack,
    marginLeft: 5
  },
  TextInfos: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 0,
    marginVertical: 15
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
  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-around',
    flex: 2
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
