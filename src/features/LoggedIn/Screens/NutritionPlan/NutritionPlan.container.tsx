// NutritionPlanContainer.js
import React from 'react';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import NutritionPlan from './NutritionPlan';
import Header from '../../../UserInfos/Components/Header/Header';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import { NUTRITIONPLAN_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppSelector } from '../../../../hooks/hooks';
import { useGetPlanByIdQuery } from '../../../../store/apis/nutritionPlansApis/nutritionPlansApis';
import { Text } from 'react-native';

/**
 * Container used to separate NutritionPlan logic as a wrapper to NutritionPlan screen
 * @returns JSX.Element
 */
interface NutritionPlanContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof NUTRITIONPLAN_SCREEN
  > {}

const NutritionPlanContainer: React.FC<
  NutritionPlanContainerProps
> = (): JSX.Element => {
  const planid = useAppSelector((state) => state.user.current_plan);

  const handleDeletePlan = () => {
    console.log(data?.id);
  };

  const { data } = useGetPlanByIdQuery({ id: planid as number });
  return (
    <>
      <Header medium={true} />
      {data ? (
        <NutritionPlan
          mealsTypes={[
            { title: 'Breakfast' },
            { title: 'Lunch' },
            { title: 'Dinner' },
            { title: 'Snack' }
          ]}
          handleAddMealPress={() => console.log('pressed')}
          data={data}
          handleDelete={handleDeletePlan}
        />
      ) : (
        <Text>No data to show</Text>
      )}
    </>
  );
};

export default NutritionPlanContainer;
