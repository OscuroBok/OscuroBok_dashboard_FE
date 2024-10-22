import { authSliceType } from '@/types/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState: authSliceType = {
    isLoggedIn: false, // This set to false as the user will not be logged in when the app first loads
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers created to update the Authentication state
  reducers: {
    // This reducer is called to set LoggedIn to "true" when the user is loggedIn with correct credential from sign in page
    setAuthState: (state: authSliceType) => {
      state.isLoggedIn = true;
    },
    // Called to make the isLoggedIn value false and make the user logout, either with Token expiration/Cookie Deletion or clicking on Logout button
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