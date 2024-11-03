export interface Recipe {
  id: number;
  TotalTime: string;
  RecipeCategory: string;
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
  tags: string;
  disease: number;
}
