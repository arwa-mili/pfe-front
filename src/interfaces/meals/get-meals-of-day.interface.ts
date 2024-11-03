import { MealType } from '../../features/LoggedIn/Components/WeekdayMeals/WeekdayMeals';

export interface MealOfDay {
  mealType: MealType;

  meals: MealResponse[];
}
export interface MealResponse {
  name: string;
  fats: number;
  quantity: number;
  carbohydrates: number;
  lipids: number;
  protein: number;
}
