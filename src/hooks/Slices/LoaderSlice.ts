import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    setLoaderFalse: (state) => {
      return {
        ...state,
        loading: false
      };
    }
  }
});

export const { setLoader, setLoaderFalse } = loaderSlice.actions;

export default loaderSlice.reducer;
