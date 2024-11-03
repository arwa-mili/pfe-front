import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesUserPlanFlatlist = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.colorWhitesmoke,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  itemcurrentplan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.colorExtremeLightSalmon,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  mainContainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column'
  },
  link: {
    color: Color.colorLighterOrange,
    textDecorationLine: 'underline',
    marginRight: 30,
    alignSelf: 'flex-end'
  },
  link2: {
    color: Color.colorLighterOrange,
    textDecorationLine: 'underline',
    marginLeft: 30,
    alignSelf: 'flex-start'
  }
});
