import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { UnitsForMeals } from '../enums/UnitsForMeals.enum';

export interface Meal {
  id: number;
  name: string;
  mealType: string[];
  unit: UnitsForMeals;
  proteinPerUnit: Float;
  carbohydratesPerUnit: Float;
  dietaryFiberPerUnit: Float;
  lipidsPerUnit: Float;
}
