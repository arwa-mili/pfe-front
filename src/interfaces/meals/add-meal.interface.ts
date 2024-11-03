import { Recipe } from '../../models/Recipe';

export interface ICustomMealInfoClient {
  name: string;
  calories: number;
  fats: number;
  protein: number;
  carbohydrates: number;
  sugarIndex: number;
}

export interface RecipesClient {
  id: number;
  TotalTime: string;
  Calories: number;
  FatContent: number;
  ConcentratedFatContent: number;
  CholesterolContent: number;
  SodiumContent: number;
  CarbohydratesContent: number;
  FiberContent: number;
  SugarContent: number;
  ProteinContent: number;
  name: string;
  ingredients: string;
  steps: string;
  //tags: string;
}

export function mapGetRecipeByIdResponse(response: Recipe): RecipesClient {
  return {
    id: response.id,
    name: response.name,
    TotalTime: response.TotalTime,
    Calories: response.Calories,
    FatContent: response.FatContent,
    ConcentratedFatContent: response.ConcentratedFatContent,
    CholesterolContent: response.CholesterolContent,
    SodiumContent: response.SodiumContent,
    CarbohydratesContent: response.CarbohydratesContent,
    FiberContent: response.FiberContent,
    SugarContent: response.SugarContent,
    ProteinContent: response.ProteinContent,
    ingredients: response.ingredients,
    steps: response.steps
    //tags:
  };
}
