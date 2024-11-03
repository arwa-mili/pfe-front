import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export const stylesUserCard = StyleSheet.create({
  container: {
    flex: 1
  },
  TextInfos: {
    flex: 1,
    flexWrap: 'wrap',
    margin: 10
  },
  touch: {
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  cardTitle: {
    alignSelf: 'flex-end',
    marginRight: 10
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
  },
  additionalInfos: {
    flex: 1,
    flexDirection: 'row'
  },
  infos: {
    color: Color.colorBlack
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
    flex: 2
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20
  },
  Name: {
    fontFamily: FontFamily.arialn,
    fontSize: FontSize.size_11xl,
    color: Color.colorBlack
  },
  touchable: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 50
  },
  icons: {
    marginRight: 0
  },
  touchableText: {
    marginLeft: 5,
    color: Color.colorBlack
  }
});
