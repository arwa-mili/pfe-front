import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const mealStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  numericInput: {
    height: 25,
    alignSelf: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    alignContent: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flex: 1
  },
  detailText: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  separator: {
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 12
  },
  unitContainer: {
    borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 10,

    backgroundColor: Color.colorWhite,
    padding: 10,
    marginBottom: 50
  },

  rowUnit: {
    flexDirection: 'row',

    justifyContent: 'space-between'
  },

  image: {
    flex: 1,
    justifyContent: 'center'
  },

  Icon: {
    marginRight: 10
  },

  Image: {
    width: 200,
    height: 200,
    borderRadius: 100,

    resizeMode: 'cover'
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  unitLabel: {
    marginRight: 26
  },
  unitTextContainer: {},
  buttonView: {
    alignSelf: 'flex-end'
  },
  button: {
    marginTop: -30,
    marginBottom: 15
  }
});
