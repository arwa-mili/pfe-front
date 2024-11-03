import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';

export const stylesHome = StyleSheet.create({
  thumbnailPreview: {
    marginBottom: 20
  },
  link: {
    color: Color.colorLighterOrange,
    textDecorationLine: 'underline',
    marginBottom: -3,
    marginLeft: 150
  },
  Drawert: {
    height: '11%',
    width: '100%',
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    flexDirection: 'column',
    overflow: 'scroll',
    backgroundColor: Color.colorExtraLightSalmon
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    flexDirection: 'column'
  },
  measureCards: {
    flexDirection: 'row'
  },
  thumbnailImage: {
    width: 200,
    height: 200
  },
  thumbnailInfo: {
    marginTop: 5
  },
  oneThirdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: -15,
    marginHorizontal: 20
  },
  bar: {
    flexDirection: 'row'
  },
  Drawer: {
    height: '25%',
    width: '100%',
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    flexDirection: 'column',
    backgroundColor: Color.colorExtraLightSalmon
  },
  DrawerIcon: {
    margin: 10
  },
  hello: {
    fontSize: FontSize.size_7xl
  },
  notifIcon: {
    marginLeft: 120,
    margin: 10
  },
  notificationCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color.colorMediumVioletRed,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_4xl,
    fontFamily: FontFamily.openSansRegular
  },
  image: { alignSelf: 'center' },
  username: {
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_7xl,
    color: Color.colorBlack
  },
  progressPie: {
    margin: 10
  },

  thumbnailError: {
    color: 'red'
  },
  macros: {
    flexDirection: 'row',
    margin: 10
  },

  mainLayout: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 50
  },
  counter: {
    fontSize: 15,
    padding: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    margin: 50,

    padding: 10
  }
});
