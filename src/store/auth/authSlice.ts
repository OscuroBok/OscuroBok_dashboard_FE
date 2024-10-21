import { authSliceType } from '@/types/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState: authSliceType = {
    isLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state: authSliceType) => {
      state.isLoggedIn = true;
    },
    resetAuthState: (state: authSliceType) => {
        state.isLoggedIn = false;
      },
  },
});

export const {
  setAuthState,
  resetAuthState,
} = AuthSlice.actions;

export default AuthSlice.reducer;
