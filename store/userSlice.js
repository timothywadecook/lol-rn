import { createSlice } from "@reduxjs/toolkit";
import client from "../services/feathersClient";
import * as SplashScreen from "expo-splash-screen";

const userSlice = createSlice({
  name: "user",
  initialState: { theme_preference: "dark" },
  reducers: {
    login(state, action) {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    logout(state, action) {
      return { theme_preference: "dark", appIsReady: true };
    },
    setAppIsReady(state, action) {
      SplashScreen.hideAsync();
      state.appIsReady = true;
    },
    toggleIsFocusing(state, action) {
      state.isFocusing = !state.isFocusing;
    },
    toggleTheme(state, action) {
      state.theme_preference =
        state.theme_preference === "light" ? "dark" : "light";
    },
  },
});

export const {
  logout,
  login,
  appIsReady,
  setAppIsReady,
  toggleTheme,
} = userSlice.actions;

export default userSlice.reducer;

export const logoutAsync = () => async (dispatch, getState) => {
  dispatch(logout());
  client.logout();
};
