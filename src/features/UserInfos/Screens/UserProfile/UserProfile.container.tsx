import * as React from 'react';
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import {
  CHANGEHEIGHTWEIGHT_SCREEN,
  EDITPROFILE_SCREEN,
  HEALTHTRACKERSSTACK_SCREEN,
  MEDICALFILES_SCREEN,
  PROFILE_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { useAppSelector } from '../../../../hooks/hooks';
import { useLazyGetPlanByIdQuery } from '../../../../store/apis/nutritionPlansApis/nutritionPlansApis';
import { useLazyGetWeeklyNutrimentsQuery } from '../../../../store/apis/userPlansApis/userPlansApis';

type UserProfileProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof PROFILE_SCREEN
>;

const UserProfileContainer = ({ navigation }: UserProfileProps) => {
  const userplan = useAppSelector((state) => state.user.current_plan);
  const userid = useAppSelector((state) => state.user.id as number);
  const [getPlan] = useLazyGetPlanByIdQuery({});
  const [data, setData] = useState<IMealsOfPlanResponseDoctor | null>(null);
  const [nutrients, setNutrients] = useState({
    carbs: 0,
    fats: 0,
    lipids: 0,
    protein: 0
  });

  const [getMelas] = useLazyGetWeeklyNutrimentsQuery({});

  useEffect(() => {
    const fetchNutriments = async () => {
      try {
        if (userplan !== null) {
          const dataNutriments = await getPlan({ id: userplan }).unwrap();
          setData(dataNutriments);
        }
      } catch (error) {}
    };

    fetchNutriments();
  }, [getPlan, userplan]);

  useEffect(() => {
    const fetchNutriments = async () => {
      try {
        const dataNutriments = await getMelas({ userid: userid }).unwrap();
        console.log(dataNutriments);
        setNutrients({
          carbs: dataNutriments?.carbs,
          lipids: dataNutriments?.lipids,
          protein: dataNutriments?.protein,
          fats: dataNutriments?.fats
        });
      } catch (error) {
        console.error('Error fetching nutriments:', error);
        setNutrients({
          carbs: 0,
          lipids: 0,
          protein: 0,
          fats: 0
        });
      }
    };

    fetchNutriments();
  }, [getMelas, userid]);

  const onClickEditProfile = () => {
    navigation.navigate(EDITPROFILE_SCREEN);
  };

  const onPressHealthTracks = () => {
    navigation.navigate(HEALTHTRACKERSSTACK_SCREEN);
  };
  const onPressMedicalReports = () => {
    navigation.navigate(MEDICALFILES_SCREEN);
  };

  const plan: IMealsOfPlanResponseDoctor = {
    planName: data?.planName
      ? data.planName
      : 'You are not currently subscribed to any plan!',
    weeklyFats: data?.weeklyFats ? data.weeklyFats : 100,
    weeklyProtein: data?.weeklyProtein ? data.weeklyProtein : 100,
    weeklyLipids: data?.weeklyLipids ? data.weeklyLipids : 100,
    weeklyCarbohydrates: data?.weeklyCarbohydrates
      ? data.weeklyCarbohydrates
      : 100,
    weekdaysMeals: [],
    id: data?.id ? data.id : 0
  };
  return (
    <>
      <UserProfile
        onClickEditProfile={onClickEditProfile}
        onPressHealthTracks={onPressHealthTracks}
        onPressMedicalReports={onPressMedicalReports}
        nutriments={nutrients}
        data={plan}
        navigateToYourPlan={() =>
          navigation.navigate(CHANGEHEIGHTWEIGHT_SCREEN)
        }
      />
    </>
  );
};

export default UserProfileContainer;
