import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesEditProfile = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    flexDirection: 'column'
  },
  sport: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20
  },
  main: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    flexDirection: 'column'
  },
  inputs: {
    justifyContent: 'center',
    flexDirection: 'column'
  },

  panel: {
    padding: 20,
    backgroundColor: Color.colorWhite,
    paddingTop: 20
  },
  header: {
    backgroundColor: Color.colorWhite,
    shadowColor: Color.colorTransparent,
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.colorBlack,
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  action: {
    backgroundColor: Color.colorWhite,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorWhite,
    paddingBottom: 5
  }
});
