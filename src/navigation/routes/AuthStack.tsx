import React from 'react';
import LoginContainer from '../../features/OnBoarding/Screens/Login/Login.container';
import SignUpContainer from '../../features/OnBoarding/Screens/SignUp/SignUp.container';
import VerifyEmailContainer from '../../features/OnBoarding/Screens/VerifyEmail/VerifyEmail.container';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResetPasswordContainer from '../../features/OnBoarding/Screens/ResetPassword/ResetPassword.container';
import {
  Login_SCREEN,
  Register_SCREEN,
  Verif_SCREEN,
  ResetPassword_SCREEN,
  SignUpAs_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import SignUpAsContainer from '../../features/OnBoarding/PatientOrDoctor/SignUpAs.container';

declare global {
  namespace ReactNavigation {
    interface AuthStackParamList extends RootParamList {}
  }
}
export type AuthStackParamList = {
  [Register_SCREEN]: { role: number };
  [Login_SCREEN]: undefined;
  [Verif_SCREEN]: { email: string; reset: boolean };
  [ResetPassword_SCREEN]: undefined;
  [SignUpAs_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Login_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Login_SCREEN}
        component={LoginContainer}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={SignUpAs_SCREEN}
        component={SignUpAsContainer}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Register_SCREEN}
        component={SignUpContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Verif_SCREEN}
        component={VerifyEmailContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ResetPassword_SCREEN}
        component={ResetPasswordContainer}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
