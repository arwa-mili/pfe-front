import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { stylesHome } from './homeStyles';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { Image } from 'react-native';
import MeasureCardHome from '../../Components/MeasureCardHome/MeasureCardHome';
import { colors } from '../../../../utils/consts/MeasureCardsHomeColorsArray/MeasureCardsHomeColorsArray';
import { tt } from '../../../../locales/translation.config';
import { stylesProfile } from '../../../UserInfos/Screens/UserProfile/userProfileStyles';
import DropDownMenu from '../../Components/NotificationDropDown/DropDownMenu';
import CurrentDayMeal from '../../Components/CurrentDayMeals/CurrentDayMeals';
import SuggestedMeals from '../../Components/SuggestedMeals/SuggestedMeals';
import { useAppSelector } from '../../../../hooks/hooks';

interface HomeProps {
  handlePress: () => void;
  handlePressCharts: () => void;
  user: any;
  notifCount: number;
  handlePressNotifs: () => void;
  showDropDownMenu: boolean;
  handlePlanPress: (id: number) => void;
  checkasdone: () => void;
}

const Home: React.FC<HomeProps> = ({
  handlePress,
  handlePressCharts,
  handlePressNotifs,
  handlePlanPress,
  checkasdone,
  user,
  notifCount,
  showDropDownMenu
}): JSX.Element => {
  const schedules = useAppSelector((state) => state.diseasesschedules.diseases);

  const filteredMeasures = schedules?.flatMap((schedule) =>
    schedule.schedule.measures.filter(
      (measure) => measure.iso_weekday === new Date().getDay()
    )
  );

  return (
    <View style={stylesHome.mainContainer}>
      {showDropDownMenu ? (
        <>
          <DropDownMenu />
          <View style={stylesHome.Drawert}>
            <View style={stylesHome.bar}>
              <TouchableOpacity
                style={stylesHome.DrawerIcon}
                onPress={handlePress}>
                <Icons.Material
                  name="menu"
                  size={35}
                  color={Color.colorBlack}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesHome.notifIcon}
                onPress={handlePressNotifs}>
                <Icons.Material
                  name="notifications"
                  size={35}
                  color={Color.colorBlack}
                />
                {notifCount > 0 && (
                  <View style={stylesHome.notificationCount}>
                    <Text style={stylesHome.notificationText}>
                      {notifCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={stylesHome.Drawer}>
            <View style={stylesHome.bar}>
              <TouchableOpacity
                style={stylesHome.DrawerIcon}
                onPress={handlePress}>
                <Icons.Material
                  name="menu"
                  size={35}
                  color={Color.colorBlack}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesHome.notifIcon}
                onPress={handlePressNotifs}>
                <Icons.Material
                  name="notifications"
                  size={35}
                  color={Color.colorBlack}
                />
                {notifCount > 0 && (
                  <View style={stylesHome.notificationCount}>
                    <Text style={stylesHome.notificationText}>
                      {notifCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={stylesHome.oneThirdContainer}>
              <View>
                <Text style={stylesHome.hello}>{tt('Hello')},</Text>
                <Text style={stylesHome.username}>{user.name} </Text>
              </View>
              <View>
                <TouchableOpacity onPress={handlePressCharts}>
                  <Image style={stylesHome.image} source={Images.dashboard} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView style={stylesHome.mainLayout}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={stylesHome.measureCards}>
              {filteredMeasures?.map((measure, index) => {
                const colorIndex = index % colors.length;
                return (
                  <MeasureCardHome
                    key={index}
                    name={measure.name}
                    measureTime={measure.time}
                    color={colors[colorIndex]}
                  />
                );
              })}
            </ScrollView>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <Text style={stylesProfile.textStyling}>
                  {' '}
                  {tt("Today's Meals")}
                </Text>
              </View>
              <CurrentDayMeal />
              <TouchableOpacity onPress={checkasdone}>
                <Text style={stylesHome.link}>{tt('Check as eaten')}</Text>
              </TouchableOpacity>
            </ScrollView>
            <Text style={stylesProfile.textStyling}>
              {' '}
              {tt('Suggested Plans :')}
            </Text>
            <SuggestedMeals handlePlanPress={handlePlanPress} />
            <View />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Home;

/*

{schedules !== null && (
  <Button
    title="Create Trigger Notification"
    onTap={() => scheduleNotifications(schedules)}
    enabledActiveOpacity={true}
    isloading={false}
  />
)}
<Button
  title="Clear all"
  onTap={() => clearAllNotifications()}
  enabledActiveOpacity={true}
  isloading={false}
/>

*/
