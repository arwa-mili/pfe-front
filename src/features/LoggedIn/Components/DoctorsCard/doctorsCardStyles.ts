import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';

export const stylesDoctorsCard = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.colorWhite
  },
  userInfo: {
    marginBottom: 20
  },
  userName: {
    fontFamily: FontFamily.poppinsLight,
    color: Color.colorTransparent2,
    marginBottom: 5
  },
  userType: {
    fontSize: 15,
    color: Color.colorGrayLight
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 25,
    resizeMode: 'cover'
  },
  cardDetails: {
    flex: 1
  },
  name: {
    fontFamily: FontFamily.openSansBold,
    fontSize: FontSize.size_base,
    color: Color.colorTransparent2,
    marginBottom: 5
  },
  email: {
    fontSize: FontSize.size_sm,
    color: Color.colorGrayLight
  }
});
