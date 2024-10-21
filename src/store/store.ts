import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CustomizerReducer from "./customizer/CustomizerSlice";
import AuthReducer from "./auth/authSlice";
import profileReducer from "./auth/profileSlice";
import menuReducer from "./auth/menuSlice";

const persistConfig = {
  key: "root",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};


export const store = configureStore({
  reducer: {
    customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    auth: persistReducer<any>(authPersistConfig, AuthReducer),
    profile: profileReducer,
    menu: menuReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const rootReducer = combineReducers({
 customizer: CustomizerReducer,
 auth: AuthReducer,
 profile: profileReducer,
 menu: menuReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
