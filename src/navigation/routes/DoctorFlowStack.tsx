import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../utils/StylingConsts/fontSize/FontSizes';
import {
  CHATDOCTOR_SCREEN,
  DataUser_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import UserDataForDoctorContainer from '../../Screens/DoctorFlow/UserDataForDoctor/UserDataForDoctor.container';
import ChatDoctorScreenContainer from '../../Screens/DoctorFlow/ChatDoctor_SCREEN/ChatDoctorScreen.container';
// import { setLoaderFalse } from '../../hooks/Slices/LoaderSlice';
// import { useAppDispatch } from '../../hooks/hooks';

export type DoctorsFlowParamList = {
  [CHATDOCTOR_SCREEN]: undefined;
  [DataUser_SCREEN]: undefined;
};
const Tab = createMaterialTopTabNavigator<DoctorsFlowParamList>();

const DoctorFlowStack = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  // dispatch(setLoaderFalse());

  return (
    <Tab.Navigator
      initialRouteName={DataUser_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: Color.colorBlack,
        tabBarInactiveTintColor: Color.colorDimgray,
        tabBarLabelStyle: { fontSize: FontSize.size_base, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: Color.colorExtraLightSalmon }
      }}>
      <Tab.Screen
        name={CHATDOCTOR_SCREEN}
        component={ChatDoctorScreenContainer}
      />
      <Tab.Screen
        name={DataUser_SCREEN}
        component={UserDataForDoctorContainer}
      />
    </Tab.Navigator>
  );
};

export default DoctorFlowStack;
