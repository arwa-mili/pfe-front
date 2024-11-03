import React from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import MealsInPlan from './MealsInPlan';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import {
  NutritionPlanMeals_SCREEN,
  SEARCHMEALSDOCTOR_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { MealType } from '../../Components/WeekdayMeals/WeekdayMeals';
import { useAppDispatch } from '../../../../hooks/hooks';
import {
  setmealTypeAndDay,
  setNutriments,
  setPlanId
} from '../../../../hooks/Slices/mealOfPlanSlice';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { useGetMealsOfPlanQuery } from '../../../../store/apis/userPlansApis/userPlansApis';

/**
 * Container used to separate MealsInPlan logic as a wrapper to MealsInPlan screen
 * @returns JSX.Element
 */

interface MealsInPlanContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof NutritionPlanMeals_SCREEN
  > {}

const MealsInPlanContainer: React.FC<MealsInPlanContainerProps> = ({
  navigation,
  route
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const plan_id = route.params.plan_id;
  const { data } = useGetMealsOfPlanQuery({ id: plan_id });
  /*
  dispatch(
    setNutriments({
      weeklyFats: (data as IMealsOfPlanResponseDoctor).weeklyFats,
      weeklyProtein: (data as IMealsOfPlanResponseDoctor).weeklyProtein,
      weeklyLipids: (data as IMealsOfPlanResponseDoctor).weeklyLipids,
      weeklyCarbohydrates: (data as IMealsOfPlanResponseDoctor)
        .weeklyCarbohydrates
    })
  );
  */
  const handleAddMealPress = async (item: MealType, dayIndex: number) => {
    dispatch(
      setNutriments({
        weeklyFats: (data as IMealsOfPlanResponseDoctor).weeklyFats,
        weeklyProtein: (data as IMealsOfPlanResponseDoctor).weeklyProtein,
        weeklyLipids: (data as IMealsOfPlanResponseDoctor).weeklyLipids,
        weeklyCarbohydrates: (data as IMealsOfPlanResponseDoctor)
          .weeklyCarbohydrates
      })
    );
    dispatch(setPlanId({ nutrition_plan_id: plan_id }));
    dispatch(setmealTypeAndDay({ day: dayIndex, mealType: item.title }));
    navigation.navigate(SEARCHMEALSDOCTOR_SCREEN, { mealType: item.title });
  };

  return (
    <MealsInPlan
      handleAddMealPress={(item, dayIndex) =>
        handleAddMealPress(item, dayIndex)
      }
      data={data ? data : []}
    />
  );
};

export default MealsInPlanContainer;
