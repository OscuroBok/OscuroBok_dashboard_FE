import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state) => {
            state.isLoggedIn = true
        },
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