import React from 'react';
import WeekdayMeals, {
  MealType
} from '../../Components/WeekdayMeals/WeekdayMeals';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { mealTypes } from '../../../../utils/consts/mealTypes/mealTypes.ts';
/**
 * Represents MealsInPlan screen ui
 * @returns JSX.Element
 */
interface MealsInPlanProps {
  handleAddMealPress: (item: MealType, dayIndex: number) => void;
  data: IMealsOfPlanResponseDoctor | never[];
}

const MealsInPlan: React.FC<MealsInPlanProps> = ({
  handleAddMealPress,
  data
}): JSX.Element => {
  return (
    <WeekdayMeals
      mealsTypes={mealTypes}
      handleAddMealPress={handleAddMealPress}
      data={data}
    />
  );
};

export default MealsInPlan;
