import { StyleSheet } from 'react-native';

export const stylesReset = StyleSheet.create({
  input2: {
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    padding: 0,
    margin: 15,
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },

  button: {
    borderRadius: 4,
    width: '50%'
  },

  container: {
    flex: 1,
    display: 'flex',
    marginHorizontal: 50,
    justifyContent: 'center',

    alignContent: 'center',

    flexDirection: 'column'
  }
});
