import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../../utils/StylingConsts/fontFamily/fontFamily';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';

export const stylesDrawerContent = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsLight,
    marginTop: 3
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorExtraLightSalmon
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsLight,
    marginTop: 3
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: Color.PLACEHOLDER_COLOR,
    borderTopWidth: 0
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});
