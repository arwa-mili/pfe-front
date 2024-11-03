import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiseasesClient } from '../../interfaces/diseases/diseasesResponse.interface';

export interface DiseasesState {
  //[x: string]: any;
  disease: DiseasesClient[];
}

const initialState: DiseasesState = {
  disease: []
};

export const diseasesSlice = createSlice({
  name: 'disease',
  initialState,
  reducers: {
    setDiseases: (state, action: PayloadAction<DiseasesClient[]>) => {
      state.disease = action.payload;
    },

    logoutDiseases: (state) => {
      state.disease = [];
    }
  }
});

export const { setDiseases, logoutDiseases } = diseasesSlice.actions;

export default diseasesSlice.reducer;
