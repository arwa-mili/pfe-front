import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeasureHistoryListClient } from '../../interfaces/diseases/measureHistoryList.interface';

export interface MeasureHistoryState {
  measures: MeasureHistoryListClient[] | null;
}

const initialState: MeasureHistoryState = {
  measures: null
};

export const measuresHistorySlice = createSlice({
  name: 'measureHistory',
  initialState,
  reducers: {
    setMeasureHistoryForCurrentUser: (
      state,
      action: PayloadAction<MeasureHistoryListClient[]>
    ) => {
      state.measures = action.payload;
    },
    logout: (state) => {
      state.measures = null;
    }
  }
});

export const { setMeasureHistoryForCurrentUser, logout } =
  measuresHistorySlice.actions;

export default measuresHistorySlice.reducer;
