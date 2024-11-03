import MealsScreen from './MealsScreen';
import React from 'react';
import {
  Meals_SCREEN,
  NutritionPlanMeals_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { resetDefault } from '../../../../hooks/Slices/mealOfPlanSlice';
import { IMealPerTypeDTO } from '../../../../interfaces/meals/addMealToPlan.interface';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetMealByIdQuery } from '../../../../store/apis/customMealApis/customMealApis';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../locales/translation.config';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { useAddMealToPlanMutation } from '../../../../store/apis/userPlansApis/userPlansApis';

interface MealsScreenContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof Meals_SCREEN
  > {}

const MealsScreenContainer: React.FC<MealsScreenContainerProps> = ({
  navigation,
  route
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const id = route.params.id;
  const numericInput = route.params.add;
  const [addMealtoPlan] = useAddMealToPlanMutation();
  const user = useAppSelector((state) => state.user);
  const nutriments = useAppSelector((state) => state?.mealplan);
  console.log(nutriments);

  const { data, isLoading, isFetching, isError, error } = useGetMealByIdQuery({
    id: id
  });
  setLoading(isLoading, data, dispatch, isFetching);
  if (isError) {
    dispatch(setLoaderFalse());
    handleGenericError(error, dispatch);
  }
  const day = useAppSelector((state) => state.mealplan.day) as number;
  const mealType = useAppSelector((state) => state.mealplan.mealType) as string;
  const planid = useAppSelector(
    (state) => state.mealplan.nutrition_plan_id
  ) as number;

  const viewMoreDetails = async () => {
    //open modal and show details
  };

  const handleAdd = async (
    meal_carbs: number,
    meal_calories: number,
    meal_protein: number,
    meal_fibers: number,
    qty: number
  ) => {
    try {
      const dto: IMealPerTypeDTO = {
        quantityPerUnit: qty,
        mealType: mealType,
        MealId: id,
        fiber_in_meal: meal_fibers,
        fats_in_meal: meal_carbs,
        lipids_in_meal: meal_calories,
        protein_in_meal: meal_protein
      };
      if (
        dto.fiber_in_meal * qty + (nutriments.weeklyCarbohydrates as number) <=
          user.weekly_carbohydrates &&
        dto.fats_in_meal * qty + (nutriments.weeklyFats as number) <=
          user.weekly_fats &&
        dto.lipids_in_meal * qty + (nutriments.weeklyLipids as number) <=
          user.weekly_calories &&
        dto.protein_in_meal * qty + (nutriments.weeklyProtein as number) <=
          user.weekly_protein
      ) {
        await addMealtoPlan({
          dto: dto,
          day: day,
          nutrition_plan_id: planid,
          meal_id: id
        }).unwrap();
        navigation.navigate(NutritionPlanMeals_SCREEN, { plan_id: planid });
        dispatch(resetDefault());
      } else {
        dispatch(
          showMessageModal({
            headerText: tt('Unable to add meal'),
            messageText: tt(
              'You have exceeded your weekly limits of needed nutriments allowed !'
            ),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.FAIL,
            onProceed: () => {}
          })
        );
      }
    } catch (error) {
      handleGenericError(error, dispatch);
    }
  };

  return data ? (
    <MealsScreen
      data={data}
      numericInput={numericInput}
      handleAdd={handleAdd}
      viewMoreDetails={viewMoreDetails}
    />
  ) : (
    <></>
  );
};

export default MealsScreenContainer;
