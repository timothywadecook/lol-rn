import { createSlice } from "@reduxjs/toolkit";
import { unfollow, follow } from "../services/client";
// import { login, signUp } from "../services/client";

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
      state.appIsReady = true;
    },
    toggleIsFocusing(state, action) {
      state.isFocusing = !state.isFocusing;
    },
    toggleFollowing(state, action) {
      const userId = state.following.find((id) => id === action.payload);
      if (userId) {
        state.following = state.following.filter((id) => id !== action.payload);
      } else {
        state.following.push(action.payload);
      }
    },
    toggleTheme(state, action) {
      state.theme_preference =
        state.theme_preference === "light" ? "dark" : "light";
    },
  },
});

export const {
  login,
  logout,
  appIsReady,
  setAppIsReady,
  toggleFollowing,
  toggleTheme,
} = userSlice.actions;

export default userSlice.reducer;

export const toggleFollowingAsync = (userId) => async (dispatch, getState) => {
  console.log("we made it here toggle following");
  const sessionUser = getState().user;
  // First determine is following based on state
  const isFollowing = sessionUser.following.includes(userId);

  // Then update state for response UX
  dispatch(toggleFollowing(userId));

  // Then update db
  if (isFollowing) {
    console.log("unfollow this userId", userId);
    return unfollow({ sessionUserId: sessionUser._id, userId }).catch((e) => {
      dispatch(toggleFollowing(userId));
      console.log("Error unfollowing user", e.message);
    });
  } else {
    console.log("follow this userId:", userId);
    return follow({ sessionUserId: sessionUser._id, userId }).catch((e) => {
      dispatch(toggleFollowing(userId));
      console.log("Error unfollowing user", e.message);
    });
  }
};
