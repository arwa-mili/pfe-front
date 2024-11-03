import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  Chat_SCREEN,
  Chat_Stack,
  CHATCONVERSATIONS_SCREEN,
  SEARCHDOCTORS_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import SearchDoctorsContainer from '../../features/LoggedIn/Screens/SearchDoctors/SearchDoctors.container';
import ChatConversationsContainer from '../../features/LoggedIn/Screens/ChatConversations/ChatConversations.container';
import ChatScreenContainer from '../../Screens/ChatScreen/ChatScreen.container';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../utils/StylingConsts/fontSize/FontSizes';

export type TopTabNavigatorParamList = {
  [SEARCHDOCTORS_SCREEN]: undefined;
  [CHATCONVERSATIONS_SCREEN]: undefined;
  [Chat_SCREEN]: { chatid: number };
  [Chat_Stack]: undefined;
};
const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();
const Stack = createNativeStackNavigator<TopTabNavigatorParamList>();

const DoctorsStack = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName={SEARCHDOCTORS_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: Color.colorBlack,
        tabBarInactiveTintColor: Color.colorDimgray,
        tabBarLabelStyle: { fontSize: FontSize.size_base, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: Color.colorExtraLightSalmon }
      }}>
      <Tab.Screen
        name={SEARCHDOCTORS_SCREEN}
        component={SearchDoctorsContainer}
      />
      <Tab.Screen name={Chat_Stack}>
        {() => (
          <Stack.Navigator
            initialRouteName={CHATCONVERSATIONS_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={CHATCONVERSATIONS_SCREEN}
              component={ChatConversationsContainer}
            />
            <Stack.Screen name={Chat_SCREEN} component={ChatScreenContainer} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default DoctorsStack;
