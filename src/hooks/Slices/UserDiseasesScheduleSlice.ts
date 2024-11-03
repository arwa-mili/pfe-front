import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiseasesAndSchedulesClient } from '../../interfaces/diseases/userDiseasesAndSchedules.interface';
export interface DiseasesSchedulesState {
  diseases: DiseasesAndSchedulesClient[] | null;
}
const initialState: DiseasesSchedulesState = {
  diseases: null
};

export const diseasesSchedulesSlice = createSlice({
  name: 'diseasesschedules',
  initialState,
  reducers: {
    setDiseasesSchedules: (
      state,
      action: PayloadAction<DiseasesAndSchedulesClient[]>
    ) => {
      state.diseases = action.payload;
    },

    logout: (state) => {
      state.diseases = null;
    }
  }
});

export const { setDiseasesSchedules, logout } = diseasesSchedulesSlice.actions;

export default diseasesSchedulesSlice.reducer;
