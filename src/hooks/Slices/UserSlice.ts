import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HasSportActivity } from '../../enums/SportActivity.enum';

export interface UserState {
  id: number | null;
  email: string | null;
  diseases_of_user: number[];
  name: string | null;
  surname: string | null;
  height: number | null;
  weight: number | null;
  phoneNumber: number | null;
  BMI: number | null;
  gender: string | null;
  current_plan: number | null;
  weekly_calories: number;
  weekly_fats: number;
  weekly_carbohydrates: number;
  weekly_protein: number;
  age: number | null;
  language: string;
  sportActivity: HasSportActivity | null;
  cardiohist: boolean | null;
  diabhist: boolean | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  surname: null,
  height: null,
  weight: null,
  phoneNumber: null,
  BMI: null,
  current_plan: null,
  weekly_calories: 0,
  weekly_fats: 0,
  weekly_carbohydrates: 0,
  weekly_protein: 0,
  gender: null,
  age: null,
  language: 'en',
  sportActivity: null,
  diseases_of_user: [],
  cardiohist: null,
  diabhist: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUserInfos: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    setDiseasesOfUser: (state, action: PayloadAction<number[]>) => {
      state.diseases_of_user = action.payload;
    },
    setCurrentPlan: (state, action: PayloadAction<number>) => {
      state.current_plan = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    defaultState: () => initialState,
    onLoginFalse: (state) => {
      return {
        ...state,
        onLogin: false
      };
    }
  }
});

export const {
  setCurrentUserInfos,
  setDiseasesOfUser,
  defaultState,
  onLoginFalse,
  setLanguage,
  setCurrentPlan
} = userSlice.actions;

export default userSlice.reducer;
