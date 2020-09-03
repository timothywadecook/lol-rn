import { createSlice } from "@reduxjs/toolkit";
import client, { usersService } from "../services/feathersClient";
import * as Haptics from "expo-haptics";

const userSlice = createSlice({
  name: "user",
  initialState: { theme_preference: "dark" },
  reducers: {
    login(state, action) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        appIsReady: true,
      };
    },
    logout(state, action) {
      return { theme_preference: "dark", appIsReady: true };
    },
    setAppIsReady(state, action) {
      state.appIsReady = true;
    },
    toggleIsFocusing(state, action) {
      state.isFocusing = !state.isFocusing;
    },
    toggleTheme(state, action) {
      state.theme_preference =
        state.theme_preference === "light" ? "dark" : "light";
    },
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  logout,
  login,
  appIsReady,
  setAppIsReady,
  toggleTheme,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;

export const logoutAsync = () => async (dispatch, getState) => {
  dispatch(logout());
  client.logout();
};

export const saveNameAsync = (name) => async (dispatch, getState) => {
  dispatch(updateUser({ name }));
  const sessionUserId = getState().user._id;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

  return usersService
    .patch(sessionUserId, { name })
    .catch((e) =>
      console.log("Error saving new name for user", sessionUserId, name)
    );
};

export const saveUsernameAsync = (username) => async (dispatch, getState) => {
  dispatch(updateUser({ username }));
  const sessionUserId = getState().user._id;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

  return usersService
    .patch(sessionUserId, { username })
    .catch((e) =>
      console.log("Error saving new username for user", sessionUserId, username)
    );
};
