import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '../../hooks/hooks';
import Drawer from './Drawer';
import {
  CompleteProfileStackS,
  DrawerS,
  HomeTabBar
} from '../../utils/consts/screensNames/ScreensNames';

import CompleteProfilStack from './CompleteProfileStack';

type MainStackParamList = {
  [DrawerS]: undefined;
  [HomeTabBar]: undefined;
  CompleteProfileStack: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = (): JSX.Element => {
  const auth = useAppSelector((state) => state.user);
  return (
    <Stack.Navigator>
      {auth.id &&
      (!auth.age ||
        !auth.height ||
        !auth.weight ||
        !auth.name ||
        !auth.sportActivity ||
        !auth.cardiohist === null ||
        auth.diabhist === null ||
        !auth.surname ||
        !auth.gender) ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name={CompleteProfileStackS}
          component={CompleteProfilStack}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name={DrawerS}
          component={Drawer}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
