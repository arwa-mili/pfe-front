import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MealOfPlanState {
  day?: number | null;
  nutrition_plan_id?: number | null;
  mealType?: string | null;
  weeklyFats?: number;
  weeklyProtein?: number;
  weeklyLipids?: number;
  weeklyCarbohydrates?: number;
}

const initialState: MealOfPlanState = {
  day: null,
  nutrition_plan_id: null,
  mealType: null,
  weeklyFats: 0,
  weeklyProtein: 0,
  weeklyLipids: 0,
  weeklyCarbohydrates: 0
};

export const mealOfPlanSlice = createSlice({
  name: 'mealOfPlan',
  initialState,
  reducers: {
    setPlanId: (
      state,
      action: PayloadAction<{
        nutrition_plan_id: number | null;
      }>
    ) => {
      state.nutrition_plan_id = action.payload.nutrition_plan_id;
    },
    setmealTypeAndDay: (
      state,
      action: PayloadAction<{
        mealType: string;
        day: number;
      }>
    ) => {
      state.mealType = action.payload.mealType;
      state.day = action.payload.day;
    },
    setNutriments: (
      state,

      action: PayloadAction<{
        weeklyFats: number;
        weeklyProtein: number;
        weeklyLipids: number;
        weeklyCarbohydrates: number;
      }>
    ) => {
      state.weeklyCarbohydrates = action.payload.weeklyCarbohydrates;
      state.weeklyFats = action.payload.weeklyFats;
      state.weeklyLipids = action.payload.weeklyLipids;
      state.weeklyProtein = action.payload.weeklyProtein;
    },

    resetDefault: (state) => {
      return {
        ...state,
        mealType: null,
        day: null,
        nutrition_plan_id: null,
        weeklyCarbohydrates: 0,
        weeklyFats: 0,
        weeklyLipids: 0,
        weeklyProtein: 0
      };
    }
  }
});

export const { setPlanId, setmealTypeAndDay, setNutriments, resetDefault } =
  mealOfPlanSlice.actions;

export default mealOfPlanSlice.reducer;
