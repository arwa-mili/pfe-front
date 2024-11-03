import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export interface AuthState {
  token?: string | null;
  rtoken?: string | null;
  isAuthenticated?: boolean;
  isFirstSignedUp?: boolean;
  loadSplash?: boolean;
  //isVisitor : boolean; // token generated and stocked in local storage
  //role
}

const initialState: AuthState = {
  token: null,
  rtoken: null,
  get isAuthenticated() {
    return this.token !== null || this.rtoken !== null;
  },
  isFirstSignedUp: false,
  loadSplash: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadSplash: (
      state,
      action: PayloadAction<{
        loadSplash?: boolean;
      }>
    ) => {
      state.loadSplash = action.payload.loadSplash;
    },
    setUser: (
      state,
      action: PayloadAction<{
        token?: string | null;
        rtoken?: string | null;
        isauthenticated?: boolean;
        isFirstSignedUp?: boolean;
      }>
    ) => {
      state.token = action.payload.token;
      state.rtoken = action.payload.rtoken;
      state.isAuthenticated = action.payload.isauthenticated;
      state.isFirstSignedUp = action.payload.isFirstSignedUp;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  }
});

export const { setUser, loadSplash } = authSlice.actions;

export default authSlice.reducer;
