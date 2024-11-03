import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import React from 'react';
import {
  ADDCUSTOMMEAL_SCREEN,
  ADDNUTRITIONPLAN_SCREEN,
  Meals_SCREEN,
  NUTRITIONPLAN_SCREEN,
  NutritionPlanMeals_SCREEN,
  SEARCHMEALSDOCTOR_SCREEN,
  SelectedPlanById_SCREEN,
  USERCREATEDPLANS_SCREEN
} from '../../utils/consts/screensNames/ScreensNames';
import AddNutritionPlanContainer from '../../features/LoggedIn/Screens/AddNutritionPlan/AddNutritionPlan.container';
import MealsInPlanContainer from '../../features/LoggedIn/Screens/MealsInPlan/MealsInPlan.container';
import SearchMealsDoctorContainer from '../../features/LoggedIn/Screens/SearchMealsDoctor/SearchMealsDoctor.container';
import MealsScreenContainer from '../../features/LoggedIn/Screens/MealsScreen/MealsScreen.container';
import AddCustomMealContainer from '../../features/LoggedIn/Screens/AddCustomMeal/AddCustomMeal.container';
import NutritionPlanContainer from '../../features/LoggedIn/Screens/NutritionPlan/NutritionPlan.container';
import UserCreatedPlansContainer from '../../features/LoggedIn/Screens/UserCreatedPlans/UserCreatedPlans.container';
import SelectedPlanByIdContainerContainer from '../../features/LoggedIn/Screens/SelectedPlanByIdContainer/SelectedPlanByIdContainer.container';

declare global {
  namespace ReactNavigation {
    interface CompleteProfileParamList extends RootParamList {}
  }
}

export type AddNutritionPlanParamList = {
  [ADDNUTRITIONPLAN_SCREEN]: undefined;
  [NutritionPlanMeals_SCREEN]: { plan_id: number };
  [SEARCHMEALSDOCTOR_SCREEN]: { mealType: string };
  [ADDCUSTOMMEAL_SCREEN]: { mealType: string };
  [NUTRITIONPLAN_SCREEN]: undefined;
  [USERCREATEDPLANS_SCREEN]: undefined;
  [SelectedPlanById_SCREEN]: { id: number };
  //[ADDFOODTOPLAN_SCREEN]: {id:number}
  [Meals_SCREEN]: { id: number; add: boolean };
};
export type RootAddNutritionPlanStackProps<
  Screen extends keyof AddNutritionPlanParamList
> = NativeStackScreenProps<AddNutritionPlanParamList, Screen>;

const Stack = createNativeStackNavigator<AddNutritionPlanParamList>();

const AddNutritionPlanStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={USERCREATEDPLANS_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ADDNUTRITIONPLAN_SCREEN}
        component={AddNutritionPlanContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={NUTRITIONPLAN_SCREEN}
        component={NutritionPlanContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SelectedPlanById_SCREEN}
        component={SelectedPlanByIdContainerContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={USERCREATEDPLANS_SCREEN}
        component={UserCreatedPlansContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ADDCUSTOMMEAL_SCREEN}
        component={AddCustomMealContainer}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={NutritionPlanMeals_SCREEN}
        component={MealsInPlanContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={SEARCHMEALSDOCTOR_SCREEN}
        component={SearchMealsDoctorContainer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Meals_SCREEN}
        component={MealsScreenContainer}
      />
    </Stack.Navigator>
  );
};

export default AddNutritionPlanStack;
