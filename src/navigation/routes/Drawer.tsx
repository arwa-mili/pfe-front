import {
  createDrawerNavigator,
  DrawerScreenProps
} from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../../features/LoggedIn/Components/Drawer/DrawerContent/DrawerContent';
import SettingsScreen from '../../Screens/SettingsScreen';
import UserProfileContainer from '../../features/UserInfos/Screens/UserProfile/UserProfile.container';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileContainer from '../../features/LoggedIn/Screens/EditProfile/EditProfile.container';
import OneMeasureDetailsContainer from '../../features/LoggedIn/Screens/OneMeasureDetails/OneMeasureDetails.container';
import ShowMeasuresContainer from '../../features/LoggedIn/Screens/ShowMeasures/ShowMeasures.container';
import {
  BILANMEASURES_SCREEN,
  BILANMEASURES_STACK,
  ChangeEmail_SCREEN,
  CHANGEHEIGHTWEIGHT_SCREEN,
  ChangeName_SCREEN,
  DIABETIES1_DRAWER,
  DIABETIES2_DRAWER,
  DIABETIES2_SCREEN,
  DIABETIES_SCREEN,
  EDITPROFILE_SCREEN,
  HEALTHTRACKERS_SCREEN,
  HEALTHTRACKERSSTACK_SCREEN,
  HOME_SCREEN,
  HomeTabBar,
  HYPERTENSION_DRAWER,
  HYPERTENSION_SCREEN,
  MeasuresHistory_SCREEN,
  MEDICALFILES_SCREEN,
  ONEMEASUREDETAILS_SCREEN,
  PROFILE_SCREEN,
  PROFILE_STACK,
  SETTINGS_SCREEN,
  VERIFEMAILCHNAGEEMAIL_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import MedicalFilesContainer from '../../features/LoggedIn/Screens/MedicalFiles/MedicalFiles.container';
import HealthTrackersContainer from '../../features/LoggedIn/Screens/HealthTrackers/HealthTrackers.container';
import Diabeties2MeasuresPageContainer from '../../features/LoggedIn/Screens/Diabeties2Measures/DiabetiesMeasuresPage.container';
import DiabetiesMeasuresPageContainer from '../../features/LoggedIn/Screens/DiabetiesMeasures/DiabetiesMeasuresPage.container';
import MeasureHistoryContainer from '../../features/LoggedIn/Screens/MeasureHistory/MeasureHistory.container';
import TabNavigator from './BottomTabNavigator';
import VerifEmailChnageEmailContainer from '../../features/LoggedIn/Screens/VerifEmailChnageEmail/VerifEmailChnageEmail.container';
import GeneralBilanMeasuresScreenContainer from '../../features/LoggedIn/Screens/GeneralBilanMeasuresScreen/GeneralBilanMeasuresScreen.container';
import { UnitMeasure } from '../../enums/UnitsMeasures.enum';
import ChangeNameContainer from '../../features/LoggedIn/Screens/ChangeName/ChangeName.container';
import ChangeEmailContainer from '../../features/LoggedIn/Screens/ChangeEmail/ChangeEmail.container';
import ChangeHeightWeightContainer from '../../features/UserInfos/Screens/ChangeHeightWeight/ChangeHeightWeight.container';
const LeftDrawer = createDrawerNavigator();

export type DrawerNavigatorParamList = {
  [SETTINGS_SCREEN]: undefined;
  [HOME_SCREEN]: undefined;
  [PROFILE_SCREEN]: undefined;
  [PROFILE_STACK]: {
    screen: keyof DrawerNavigatorParamList;
    params?: DrawerNavigatorParamList[keyof DrawerNavigatorParamList];
  };
  [DIABETIES_SCREEN]: undefined;
  [DIABETIES2_SCREEN]: undefined;
  [EDITPROFILE_SCREEN]: undefined;
  [DIABETIES2_DRAWER]: undefined;
  [DIABETIES1_DRAWER]: undefined;
  [HYPERTENSION_DRAWER]: undefined;
  [HYPERTENSION_SCREEN]: undefined;
  [MEDICALFILES_SCREEN]: undefined;
  [HEALTHTRACKERSSTACK_SCREEN]: undefined;
  [HEALTHTRACKERS_SCREEN]: undefined;
  [BILANMEASURES_SCREEN]: undefined;
  [BILANMEASURES_STACK]: undefined;
  [ChangeName_SCREEN]: undefined;
  [ChangeEmail_SCREEN]: undefined;
  [VERIFEMAILCHNAGEEMAIL_SCREEN]: { email: string };
  [CHANGEHEIGHTWEIGHT_SCREEN]: undefined;
  [ONEMEASUREDETAILS_SCREEN]: {
    measure: number | null;
    name: string;
    specification: string | null | undefined;
    lastMeasured: string;
    unit: UnitMeasure;
    iconColor: string | boolean;
    iconName: string | boolean;
    measure_id: number | null | undefined;
    min: number;
    max: number;
    limitInf: number | null;
    limitSup: number | null;
  };

  [MeasuresHistory_SCREEN]: undefined;
  [HomeTabBar]: undefined;
};

export type RootDrawerNavigatorProps<
  Screen extends keyof DrawerNavigatorParamList
> = DrawerScreenProps<DrawerNavigatorParamList, Screen>;

const Drawer = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<DrawerNavigatorParamList>();
  const Stack2 = createNativeStackNavigator<DrawerNavigatorParamList>();
  return (
    <LeftDrawer.Navigator
      screenOptions={{ headerShown: false, drawerType: 'back' }}
      initialRouteName={HomeTabBar}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <LeftDrawer.Screen name={HomeTabBar} component={TabNavigator} />
      <LeftDrawer.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />

      <LeftDrawer.Screen name={PROFILE_STACK}>
        {() => (
          <Stack.Navigator
            initialRouteName={PROFILE_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={PROFILE_SCREEN}
              component={UserProfileContainer}
            />
            <Stack.Screen
              name={EDITPROFILE_SCREEN}
              component={EditProfileContainer}
            />
            <Stack.Screen
              name={CHANGEHEIGHTWEIGHT_SCREEN}
              component={ChangeHeightWeightContainer}
            />
            <Stack.Screen
              name={ChangeName_SCREEN}
              component={ChangeNameContainer}
            />
            <Stack.Screen
              name={VERIFEMAILCHNAGEEMAIL_SCREEN}
              component={VerifEmailChnageEmailContainer}
            />

            <Stack.Screen
              name={ChangeEmail_SCREEN}
              component={ChangeEmailContainer}
            />
            <Stack.Screen
              name={MEDICALFILES_SCREEN}
              component={MedicalFilesContainer}
            />
            <Stack.Screen name={HEALTHTRACKERSSTACK_SCREEN}>
              {() => (
                <Stack2.Navigator
                  initialRouteName={HEALTHTRACKERS_SCREEN}
                  screenOptions={{ headerShown: false }}>
                  <Stack2.Screen
                    name={HEALTHTRACKERS_SCREEN}
                    component={HealthTrackersContainer}
                  />
                  <Stack2.Screen
                    name={MeasuresHistory_SCREEN}
                    component={MeasureHistoryContainer}
                  />
                </Stack2.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </LeftDrawer.Screen>

      <LeftDrawer.Screen name={DIABETIES1_DRAWER}>
        {() => (
          <Stack.Navigator
            initialRouteName={DIABETIES_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name={DIABETIES_SCREEN}
              component={DiabetiesMeasuresPageContainer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={ONEMEASUREDETAILS_SCREEN}
              component={OneMeasureDetailsContainer}
            />
          </Stack.Navigator>
        )}
      </LeftDrawer.Screen>

      <LeftDrawer.Screen name={BILANMEASURES_STACK}>
        {() => (
          <Stack.Navigator
            initialRouteName={BILANMEASURES_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name={BILANMEASURES_SCREEN}
              component={GeneralBilanMeasuresScreenContainer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={ONEMEASUREDETAILS_SCREEN}
              component={OneMeasureDetailsContainer}
            />
          </Stack.Navigator>
        )}
      </LeftDrawer.Screen>

      <LeftDrawer.Screen name={DIABETIES2_DRAWER}>
        {() => (
          <Stack.Navigator
            initialRouteName={DIABETIES2_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name={DIABETIES2_SCREEN}
              component={Diabeties2MeasuresPageContainer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={ONEMEASUREDETAILS_SCREEN}
              component={OneMeasureDetailsContainer}
            />
          </Stack.Navigator>
        )}
      </LeftDrawer.Screen>

      <LeftDrawer.Screen name={HYPERTENSION_DRAWER}>
        {() => (
          <Stack.Navigator
            initialRouteName={HYPERTENSION_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name={HYPERTENSION_SCREEN}
              component={ShowMeasuresContainer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={ONEMEASUREDETAILS_SCREEN}
              component={OneMeasureDetailsContainer}
            />
          </Stack.Navigator>
        )}
      </LeftDrawer.Screen>
    </LeftDrawer.Navigator>
  );
};
export default Drawer;
