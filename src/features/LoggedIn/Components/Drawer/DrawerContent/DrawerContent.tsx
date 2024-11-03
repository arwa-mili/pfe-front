import React from 'react';
import { View, Text, Switch, ImageSourcePropType } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  TouchableRipple
} from 'react-native-paper';
import { stylesDrawerContent } from './drawerContentStyles';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';

import { tt } from '../../../../../locales/translation.config';
import {
  BILANMEASURES_STACK,
  DIABETIES2_DRAWER,
  HOME_SCREEN,
  HYPERTENSION_DRAWER,
  PROFILE_STACK,
  SETTINGS_SCREEN
} from '../../../../../utils/consts/screensNames/ScreensNames';

import { handleLogout } from '../../../../OnBoarding/Utils/HelperFunctions/helper';
import { Images } from '../../../../../utils/StylingConsts/images/Images';
import { DISEASES_NAMES } from '../../../../../utils/consts/diseasesNames/diseasesNames';

export const DrawerContent = (props: any) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const diseases = useAppSelector((state) => state.diseasesschedules?.diseases);

  const paperTheme = useTheme();
  //const { signOut, toggleTheme } = React.useContext(AuthContext);

  //logout
  const Logout = async () => {
    await handleLogout(false, dispatch);
  };

  return (
    <>
      <View style={stylesDrawerContent.container}>
        <DrawerContentScrollView {...props}>
          <View style={stylesDrawerContent.drawerContent}>
            <View style={stylesDrawerContent.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={Images.avatar as ImageSourcePropType}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={stylesDrawerContent.title}>
                    {user.name} {user.surname}
                  </Title>
                  <Caption style={stylesDrawerContent.caption}>
                    @{user.name}_{user.surname}
                  </Caption>
                </View>
              </View>
            </View>

            <Drawer.Section style={stylesDrawerContent.drawerSection}>
              <DrawerItem
                labelStyle={stylesDrawerContent.labelStyle}
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label={tt('Home')}
                onPress={() => {
                  props.navigation.navigate(HOME_SCREEN);
                }}
              />

              <DrawerItem
                labelStyle={stylesDrawerContent.labelStyle}
                icon={({ color, size }) => (
                  <Icon
                    name="account-check-outline"
                    color={color}
                    size={size}
                  />
                )}
                label={tt('Profile')}
                onPress={() => {
                  props.navigation.navigate(PROFILE_STACK);
                }}
              />

              <DrawerItem
                labelStyle={stylesDrawerContent.labelStyle}
                icon={({ color, size }) => (
                  <Icon name="cog-outline" color={color} size={size} />
                )}
                label={tt('Settings')}
                onPress={() => {
                  props.navigation.navigate(SETTINGS_SCREEN);
                }}
              />
            </Drawer.Section>
            <Drawer.Section title={tt('Measures View')}>
              <DrawerItem
                labelStyle={stylesDrawerContent.labelStyle}
                icon={({ color, size }) => (
                  <Icon name="diabetes" color={color} size={size} />
                )}
                label={tt('BilanMeasures')}
                onPress={() => {
                  props.navigation.navigate(BILANMEASURES_STACK);
                }}
              />
              {diseases?.some(
                (disease) =>
                  disease.diseaseName === DISEASES_NAMES.DIABETIES_TYPE_1
              ) && (
                <DrawerItem
                  labelStyle={stylesDrawerContent.labelStyle}
                  icon={({ color, size }) => (
                    <Icon name="diabetes" color={color} size={size} />
                  )}
                  label={tt('Diab1')}
                  onPress={() => {
                    props.navigation.navigate(DIABETIES2_DRAWER);
                  }}
                />
              )}

              {diseases?.some(
                (disease) =>
                  disease.diseaseName === DISEASES_NAMES.DIABETIES_TYPE_2
              ) && (
                <DrawerItem
                  labelStyle={stylesDrawerContent.labelStyle}
                  icon={({ color, size }) => (
                    <Icon name="diabetes" color={color} size={size} />
                  )}
                  label={tt('Diab2')}
                  onPress={() => {
                    props.navigation.navigate(DIABETIES2_DRAWER);
                  }}
                />
              )}
              {diseases?.some(
                (disease) => disease.diseaseName === DISEASES_NAMES.HYPERTENSION
              ) && (
                <DrawerItem
                  labelStyle={stylesDrawerContent.labelStyle}
                  icon={({ color, size }) => (
                    <Icon name="diabetes" color={color} size={size} />
                  )}
                  label={tt('Hypertension')}
                  onPress={() => {
                    props.navigation.navigate(HYPERTENSION_DRAWER);
                  }}
                />
              )}
            </Drawer.Section>
            <Drawer.Section title={tt('Preferences')}>
              <TouchableRipple
                onPress={() => {
                  undefined;
                }}>
                <View style={stylesDrawerContent.preference}>
                  <Text style={stylesDrawerContent.labelStyle}>
                    {tt('Measures Notifications')}
                  </Text>
                  <View pointerEvents="none">
                    <Switch value={paperTheme.dark} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={stylesDrawerContent.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              Logout();
            }}
          />
        </Drawer.Section>
      </View>
    </>
  );
};
