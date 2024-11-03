import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icons } from '../../utils/StylingConsts/Icons/icons';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { StyleSheet } from 'react-native';

import {
  AddNutritionPlanS,
  ChatBot_Screen,
  Doctors_Stack,
  EDITPROFILE_SCREEN,
  HOME_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';

import { isAndroidDevice } from '../../utils/helpers/IsAndroidDevice';
import CircleComponent from '../../features/LoggedIn/Components/CircleComponent/CircleComponent';
import TextComponent from '../../components/TextComponent/TextComponent';
import HomeContainer from '../../features/LoggedIn/Screens/Home/Home.container';

import AddNutritionPlanStack from './AddNutritionplanStack';
import Chatbot from '../../Screens/chatbot';
import EditProfileContainer from '../../features/LoggedIn/Screens/EditProfile/EditProfile.container';
import DoctorsStack from './DoctorsStack';
import { stylesGlobal } from '../../features/LoggedIn/Utils/styling/globalStyles';

export type BottomTabNavigatorParamList = {
  [HOME_SCREEN]: undefined;
  [Doctors_Stack]: undefined;
  [EDITPROFILE_SCREEN]: undefined;
  [AddNutritionPlanS]: undefined;
  [ChatBot_Screen]: undefined;
};

export type RootBottomTabNavigatorParamList<
  Screen extends keyof BottomTabNavigatorParamList
> = BottomTabScreenProps<BottomTabNavigatorParamList, Screen>;

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const renderIcon = (
  routeName: string,
  focused: boolean,
  color: string,
  size: number
) => {
  switch (routeName) {
    case HOME_SCREEN:
      return (
        <CircleComponent
          size={53}
          styles={[
            stylesGlobal.shadow,
            { marginTop: !isAndroidDevice() ? -50 : -40 }
          ]}>
          <Icons.Material name="home" size={size} color={color} />
        </CircleComponent>
      );
    case ChatBot_Screen:
      return <Icons.Material name="smart-toy" size={size} color={color} />;
    case AddNutritionPlanS:
      return (
        <Icons.Material name="medication-liquid" size={size} color={color} />
      );
    case Doctors_Stack:
      return <Icons.Material name="person-search" size={size} color={color} />;
    case EDITPROFILE_SCREEN:
      return <Icons.Material name="account-circle" size={size} color={color} />;

    default:
      return (
        <CircleComponent
          size={53}
          styles={[
            stylesGlobal.shadow,
            { marginTop: !isAndroidDevice() ? -50 : -40 }
          ]}>
          <Icons.Material name="home" size={size} color={color} />
        </CircleComponent>
      );
  }
};

const getTabBarLabel = (routeName: string, focused: boolean) => {
  if (routeName === HOME_SCREEN) {
    return null;
  }

  return (
    <TextComponent
      text={routeName}
      flex={0}
      size={12}
      color={focused ? Color.colorBlack : Color.colorGray}
      styles={styles.TextComponent}
    />
  );
};

const TabNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          color = focused ? Color.colorLighterOrange : Color.colorGray;
          size = 24;
          return renderIcon(route.name, focused, color, size);
        },
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabel: ({ focused }) => getTabBarLabel(route.name, focused)
      })}>
      <Tab.Screen name={ChatBot_Screen} component={Chatbot} />
      <Tab.Screen name={AddNutritionPlanS} component={AddNutritionPlanStack} />
      <Tab.Screen name={HOME_SCREEN} component={HomeContainer} />
      <Tab.Screen name={EDITPROFILE_SCREEN} component={EditProfileContainer} />
      <Tab.Screen name={Doctors_Stack} component={DoctorsStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: !isAndroidDevice() ? 88 : 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorExtraLightSalmon
  },
  tabBarIconStyle: {
    marginTop: 8
  },
  TextComponent: {
    marginBottom: isAndroidDevice() ? 12 : 0
  }
});

export default TabNavigator;
