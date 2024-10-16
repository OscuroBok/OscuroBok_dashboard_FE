import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false, // This set to false as the user will not be logged in when the app first loads
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    // Created to update the Authentication state
    reducers: {
        // This reducer is called to set LoggedIn to "true" when the user is loggedIn with correct credential from sign in page
        setAuthState: (state) => {
            state.isLoggedIn = true
        },
        // else will call the resetAuth, to make the isLoggedIn value false and make the user logout, either with Token expiration or clicking on Logout button
        resetAuthState: (state) => {
            state.isLoggedIn = false
        }
    }
});

export const {
    setAuthState,
    resetAuthState,
} = AuthSlice.actions;

export default AuthSlice.reducer