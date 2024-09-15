import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./auth/authSlice"

const persisConfig = {
    key: 'root',
    storage,
}

const authPersistConfig = {
    key: 'auth',
    storage,
}

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, AuthReducer),
    },
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false, immutableCheck: false})
});

const rootReducer = combineReducers({
    auth: AuthReducer,
});

export const persistor = persistStore(store);