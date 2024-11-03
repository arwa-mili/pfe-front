import { UnitsForMeals } from '../../enums/UnitsForMeals.enum';
import { Weekday } from '../../enums/WeekDay.enum';
import { MealType } from '../../features/LoggedIn/Components/WeekdayMeals/WeekdayMeals';

export interface IMealsInPlanResponse {
  plan_name: string;
  id: number;
  weekly_fats: number;
  weekly_calories: number;
  weekly_lipids: number;
  weekly_carbohydrates: number;
  weekdays_meals: Weekday_Meal[];
}

export interface Weekday_Meal {
  day: Weekday;
  meals_pertype: Meals_Per_Type[];
}

export interface Meals_Per_Type {
  mealType: MealType;

  meals: MealResponse[];
}

export interface MealResponse {
  name: string;
  fats: number;
  quantity: number;
  unit: UnitsForMeals;
  carbohydrates: number;
  lipids: number;
  protein: number;
}
