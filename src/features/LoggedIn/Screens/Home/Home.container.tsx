import React, { useEffect, useState, useCallback } from 'react';

import Home from './Home';

import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  HEALTHTRACKERS_SCREEN,
  HEALTHTRACKERSSTACK_SCREEN,
  HOME_SCREEN,
  PROFILE_STACK
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { Pusher } from '@pusher/pusher-websocket-react-native';
import { useLazyGetNotifsCountQuery } from '../../../../store/apis/notificationsApi/notificationsApi';
import { useCheckfoodMutation } from '../../../../store/apis/userPlansApis/userPlansApis';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { handleHomeError } from './helper/HomeErrorHandling';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../locales/translation.config';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import { MessageTypes } from '../../../../enums/MessageTypes';
/**
 * Container used to separate Home logic as a wrapper to Home screen
 * @returns JSX.Element
 */

type HomeContainerProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof HOME_SCREEN
>;

const HomeContainer: React.FC<HomeContainerProps> = ({
  navigation
}): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [getLazyNotifs] = useLazyGetNotifsCountQuery();
  const [checkdone] = useCheckfoodMutation();
  const dispatch = useAppDispatch();
  const [notificationCount, setNotificationCount] = useState(0);
  const fetchAndSetNotifications = useCallback(async () => {
    try {
      const result = await getLazyNotifs({ id: user.id as number }).unwrap();
      setNotificationCount(result);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [getLazyNotifs, user.id]);

  const checkasdone = useCallback(async () => {
    try {
      const result = await checkdone({
        userid: user.id as number
      });
      if ('error' in result) {
        throw result.error;
      }
      dispatch(
        showMessageModal({
          headerText: tt('Meals Of day Submitted Successfully'),
          messageText: tt('You have successfully submitted your meals'),
          buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
          messageType: MessageTypes.SUCCESS
        })
      );
    } catch (error) {
      if (isErrorInterface(error) && error?.status === ErrorCode.FORBIDDEN) {
        const mappederror = mapErrorResponse(error);
        await handleHomeError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  }, [checkdone, dispatch, user.id]);

  const initPusher = useCallback(async () => {
    try {
      const pusher = Pusher.getInstance();
      await pusher.init({
        apiKey: 'c1f6a6fbf9074ad6c343',
        cluster: 'eu',
        useTLS: true
      });
      await pusher.connect();
      await pusher.subscribe({
        channelName: 'my-channel',
        onEvent: () => {
          fetchAndSetNotifications();
        }
      });
    } catch (error) {}
  }, [fetchAndSetNotifications]);

  useEffect(() => {
    initPusher();
    fetchAndSetNotifications();
  }, [initPusher, fetchAndSetNotifications]);

  const handlePress = () => {
    navigation.openDrawer();
  };

  const handlePressNotifs = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Home
        handlePressNotifs={handlePressNotifs}
        handlePress={handlePress}
        user={user}
        notifCount={notificationCount}
        handlePressCharts={() =>
          navigation.navigate(PROFILE_STACK, {
            screen: HEALTHTRACKERSSTACK_SCREEN,
            params: { screen: HEALTHTRACKERS_SCREEN }
          })
        }
        showDropDownMenu={showDropdown}
        handlePlanPress={
          (id) => {
            console.log(id);
          }
          //navigation.jumpTo(SelectedPlanById_SCREEN, { id: id })
        }
        checkasdone={checkasdone}
      />
    </>
  );
};

export default HomeContainer;
