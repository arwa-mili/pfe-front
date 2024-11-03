import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeasureClient } from '../../interfaces/measures/measures-client.interface';

export interface MeasuresLaboState {
  measuresLabo: MeasureClient[] | null;
}

const initialState: MeasuresLaboState = {
  measuresLabo: null
};

export const measuresLaboSlice = createSlice({
  name: 'measure',
  initialState,
  reducers: {
    setMeasures: (state, action: PayloadAction<MeasureClient[]>) => {
      state.measuresLabo = action.payload;
    },

    logoutMeasures: (state) => {
      state.measuresLabo = null;
    }
  }
});

export const { setMeasures, logoutMeasures } = measuresLaboSlice.actions;

export default measuresLaboSlice.reducer;
