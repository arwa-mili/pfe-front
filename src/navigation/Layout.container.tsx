import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import Splash from '../features/OnBoarding/Screens/Splash/Splash';
import { NavigationContainer } from '@react-navigation/native';
import linking from '../utils/linking/linking';
import MainStack from './routes/MainStack';
import AuthStack from './routes/AuthStack';
import DoctorFlowStack from './routes/DoctorFlowStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthStackS,
  Chat_SCREEN,
  DoctorFlowS,
  MainStackS
} from '../utils/consts/screensNames/ScreensNames';
import { MessageModal } from '../components/PopUp/MessageModal';
import Loader from '../components/Loader/Loader';
import { Linking } from 'react-native';
import { splashLoading } from '../utils/consts/numericValues/numericValues';

const Stack = createNativeStackNavigator<LayoutParamList>();

export type LayoutParamList = {
  [MainStackS]: undefined;
  [AuthStackS]: undefined;
  [DoctorFlowS]: undefined;
  [Chat_SCREEN]: { url: string };
};
const LayoutContainer = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [initUrl, setInitUrl] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);
  const auth = useAppSelector((state) => state.auth);
  const modalstate = useAppSelector((state) => state.modal);
  const loader = useAppSelector((state) => state.loader.loading);
  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      handleOpenURL(url);
    };
    const handleOpenURL = (url: string | null) => {
      if (url) {
        const route = url.replace(/.*?:\/\//g, '');
        const match = route.match(/reset-password\/reset\/(.*)/);

        if (match) {
          setInitUrl(url);
        }
      }
    };
    getInitialURL();
  }, [initUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, splashLoading);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <>
          {user.id != null && auth.loadSplash === true ? (
            <Splash />
          ) : (
            <NavigationContainer linking={linking}>
              <Stack.Navigator>
                {user.id == null && initUrl == null ? (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name={AuthStackS}
                    component={AuthStack}
                  />
                ) : user.id == null && initUrl != null ? (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name={DoctorFlowS}
                    component={DoctorFlowStack}
                  />
                ) : (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name={MainStackS}
                    component={MainStack}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </>
      )}
      {modalstate.messageModalVisible && (
        <MessageModal
          isVisible
          messageType={modalstate.messageType}
          headerText={modalstate.headerText}
          messageText={modalstate.messageText}
          buttonText={modalstate.buttonText}
          altButtonText={modalstate.altbuttonText}
          onProceed={modalstate.onProceed}
          onReject={modalstate.onReject}
        />
      )}
      {loader && <Loader loading />}
    </>
  );
};

export default LayoutContainer;
