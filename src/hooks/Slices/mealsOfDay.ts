import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealOfDay } from '../../interfaces/meals/get-meals-of-day.interface';

export interface MealsOfDayState {
  mealsOfDay: MealOfDay[];
  day: number | undefined;
  planid: number | null;
}

const initialState: MealsOfDayState = {
  mealsOfDay: [],
  day: undefined,
  planid: null
};

export const mealsOfDaySlice = createSlice({
  name: 'mealsOfDay',
  initialState,
  reducers: {
    setMealsAndDay: (
      state,
      action: PayloadAction<{
        mealsOfDay: MealOfDay[];
        day: number | undefined;
      }>
    ) => {
      state.mealsOfDay = action.payload.mealsOfDay;
      state.day = action.payload.day;
    },
    setPlanId: (
      state,
      action: PayloadAction<{
        planid: number | null;
      }>
    ) => {
      state.planid = action.payload.planid;
    }
  }
});

export const { setMealsAndDay, setPlanId } = mealsOfDaySlice.actions;

export default mealsOfDaySlice.reducer;
