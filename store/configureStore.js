import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import recommendations from "./recommendationsSlice";
import user from "./userSlice";
import likes from "./likesSlice";
import posts from "./postsSlice";

const rootReducer = combineReducers({
  posts,
  likes,
  recommendations,
  user,
});

export default configureStore({
  reducer: rootReducer,
});
