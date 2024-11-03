import { Float } from 'react-native/Libraries/Types/CodegenTypes';

import { UnitsForMeals } from '../../enums/UnitsForMeals.enum';
import { Meal } from '../../models/Meal';

export interface MealResponse {
  meals: Meal[];
  totalPages: number;
}

export interface MealsClientResponse {
  meals: MealsClient[];
  totalPages: number;
}
export interface MealsClient {
  id: number;

  name: string;

  mealType: string[];

  unit: UnitsForMeals;

  proteinPerUnit: Float;

  carbohydratesPerUnit: Float;

  dietaryFiberPerUnit: Float;

  lipidsPerUnit: Float;
}

export function mapGetMealByIdResponse(response: Meal): MealsClient {
  return {
    id: response.id,
    name: response.name,
    mealType: response.mealType,

    unit: response.unit,

    proteinPerUnit: response.proteinPerUnit,

    carbohydratesPerUnit: response.carbohydratesPerUnit,

    dietaryFiberPerUnit: response.dietaryFiberPerUnit,

    lipidsPerUnit: response.lipidsPerUnit
  };
}

export function mapFindByMealTypeResponse(
  response: MealResponse
): MealsClientResponse {
  return {
    meals: response.meals,
    totalPages: response.totalPages
  };
}
