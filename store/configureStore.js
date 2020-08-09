import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import recommendations from "./recommendationsSlice";
import user from "./userSlice";
import posts from "./postsSlice";
import follows from "./followsSlice";
import feed from "./feedSlice";

const rootReducer = combineReducers({
  feed,
  posts,
  recommendations,
  follows,
  user,
});

export default configureStore({
  reducer: rootReducer,
});
