import { createSlice } from "@reduxjs/toolkit";
import {
  recommendationsService,
  likesService,
  dislikesService,
} from "../services/feathersClient";
import { addRecommendationToFeed } from "./feedSlice";
import { addRecommendationToPosts } from "./postsSlice";
import * as Haptics from "expo-haptics";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {}, // {recId: {rec object}}
  reducers: {
    addLoadedRecommendations(state, action) {
      const recObject = convertArrayToObject(action.payload, "_id");
      return { ...state, ...recObject };
    },
    clearData(state, action) {
      return {};
    },
    likeByRecId(state, action) {
      state[action.payload].likes.liked = true;
      state[action.payload].likes.total += 1;
    },
    unlikeByRecId(state, action) {
      state[action.payload].likes.liked = false;
      state[action.payload].likes.total -= 1;
    },
    dislikeByRecId(state, action) {
      state[action.payload].dislikes.disliked = true;
      state[action.payload].dislikes.total += 1;
    },
    undislikeByRecId(state, action) {
      state[action.payload].dislikes.disliked = false;
      state[action.payload].dislikes.total -= 1;
    },
    addCommentByRecId(state, action) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      state[action.payload].comments.total += 1;
      state[action.payload].comments.commented = true;
    },
    addCreatedRecommendation(state, action) {
      // if is repost .. update that one too
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      state[action.payload._id] = action.payload;
      if (action.payload.isRepost) {
        state[action.payload.parentId].reposts.total += 1;
        state[action.payload.parentId].reposts.reposted = true;
      }
    },
  },
});

export default recommendationsSlice.reducer;

// Useable action creators....

const {
  addCreatedRecommendation,
  unlikeByRecId,
  likeByRecId,
  dislikeByRecId,
  undislikeByRecId,
} = recommendationsSlice.actions;

export const {
  addLoadedRecommendations,
  clearData,
  addCommentByRecId,
} = recommendationsSlice.actions;

export const dislikeByRecIdAsync = (recId) => async (dispatch, getState) => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  dispatch(dislikeByRecId(recId));
  const userId = getState().user._id;
  try {
    dislikesService.create({ creator: userId, recommendation: recId });
  } catch (error) {
    console.log(
      "Error disliking by rec id async",
      "recId",
      recId,
      "userId",
      userId,
      error
    );
  }
};

export const undislikeByRecIdAsync = (recId) => async (dispatch, getState) => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  dispatch(undislikeByRecId(recId));
  const userId = getState().user._id;
  try {
    const existingDislike = await dislikesService.find({
      query: { recommendation: recId, creator: userId },
    });
    dislikesService.remove(existingDislike.data[0]._id);
  } catch (error) {
    console.log(
      "Error undisliking by rec id async",
      "recId",
      recId,
      "userId",
      userId,
      error
    );
  }
};

export const likeByRecIdAsync = (recId) => async (dispatch, getState) => {
  // Vibration.vibrate();
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  dispatch(likeByRecId(recId));
  const userId = getState().user._id;
  try {
    likesService.create({ creator: userId, recommendation: recId });
  } catch (error) {
    console.log(
      "Error liking by rec id async",
      "recId",
      recId,
      "userId",
      userId,
      error
    );
  }
};

export const unlikeByRecIdAsync = (recId) => async (dispatch, getState) => {
  // Vibration.vibrate();
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  dispatch(unlikeByRecId(recId));
  const userId = getState().user._id;
  try {
    const existingLike = await likesService.find({
      query: { recommendation: recId, creator: userId },
    });
    likesService.remove(existingLike.data[0]._id);
  } catch (error) {
    console.log(
      "Error unliking by rec id async",
      "recId",
      recId,
      "userId",
      userId,
      error
    );
  }
};

export const createRecommendationAsync = (rec) => async (
  dispatch,
  getState
) => {
  try {
    const r = await recommendationsService.create(rec);
    dispatch(addCreatedRecommendation(r));
    dispatch(addRecommendationToFeed(r._id));
    dispatch(addRecommendationToPosts(r._id));
  } catch (error) {
    console.log("Error creating recommendation", error, error.message);
  }
};
