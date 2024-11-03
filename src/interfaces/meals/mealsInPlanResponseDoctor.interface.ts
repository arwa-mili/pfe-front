import {
  IMealsInPlanResponse,
  Weekday_Meal
} from './mealsInPlanResponse.interface';

export interface IMealsOfPlanResponseDoctor {
  planName: string;
  id: number;
  weeklyFats: number;
  weeklyProtein: number;
  weeklyLipids: number;
  weeklyCarbohydrates: number;
  weekdaysMeals: Weekday_Meal[];
}

export function mapMealsOfPlanResponse(
  response: IMealsInPlanResponse
): IMealsOfPlanResponseDoctor {
  return {
    planName: response.plan_name,
    id: response.id,
    weeklyFats: response.weekly_fats,
    weeklyProtein: response.weekly_calories,
    weeklyLipids: response.weekly_lipids,
    weeklyCarbohydrates: response.weekly_carbohydrates,
    weekdaysMeals: response.weekdays_meals
  };
}

export function mapSuggestedPlansResponse(
  response: IMealsInPlanResponse[]
): IMealsOfPlanResponseDoctor[] {
  return response.map((res) => {
    return mapMealsOfPlanResponse(res);
  });
}
