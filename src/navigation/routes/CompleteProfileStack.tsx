import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

import CompleteProfile1Container from '../../features/UserInfos/Screens/CompleteProfile/CompleteProfile1/CompleteProfile1.container';

import {
  COMPLETE1_SCREEN,
  Complete2_SCREEN,
  Complete3_SCREEN,
  Complete4_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import CompleteProfile3Container from '../../features/UserInfos/Screens/CompleteProfile/CompleteProfile3/CompleteProfile3.container';
import CompleteProfile2Container from '../../features/UserInfos/Screens/CompleteProfile/CompleteProfile2/CompleteProfile2.container';
import CompleteProfile4Container from '../../features/UserInfos/Screens/CompleteProfile/CompleteProfile4/CompleteProfile4.container';

declare global {
  namespace ReactNavigation {
    interface CompleteProfileParamList extends RootParamList {}
  }
}

export type CompleteProfileParamList = {
  [COMPLETE1_SCREEN]: undefined;
  [Complete2_SCREEN]: { name: string; surname: string; gender: boolean | null };
  [Complete3_SCREEN]: undefined;
  [Complete4_SCREEN]: undefined;
};
export type RootCompleteProfileScreenProps<
  Screen extends keyof CompleteProfileParamList
> = NativeStackScreenProps<CompleteProfileParamList, Screen>;

const Stack = createNativeStackNavigator<CompleteProfileParamList>();

const CompleteProfilStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={COMPLETE1_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={COMPLETE1_SCREEN}
        component={CompleteProfile1Container}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Complete2_SCREEN}
        component={CompleteProfile2Container}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Complete3_SCREEN}
        component={CompleteProfile3Container}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Complete4_SCREEN}
        component={CompleteProfile4Container}
      />
    </Stack.Navigator>
  );
};

export default CompleteProfilStack;
