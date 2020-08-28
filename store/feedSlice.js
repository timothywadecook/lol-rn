import { createSlice } from "@reduxjs/toolkit";
import { recommendationsService } from "../services/feathersClient";
import * as Haptics from "expo-haptics";

import { addLoadedRecommendations } from "./recommendationsSlice";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    query: {
      $limit: 5,
      creator: { $in: [] },
      recommendation: { $in: [] },
      $sort: { createdAt: -1 },
    },
    loading: false,
    refreshing: false,
    moreToFetch: true,
    list: [], // should just be an array of recIds, and recommendationSlice has single source of truth
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addLoadedData(state, action) {
      state.list.push(...action.payload);
    },
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    setRefreshedData(state, action) {
      state.list = action.payload;
    },
    setMoreToFetch(state, action) {
      state.moreToFetch = action.payload;
    },
    addRecommendationToFeed(state, action) {
      state.list.unshift(action.payload);
    },
    addCreatorToQuery(state, action) {
      state.query.creator["$in"].push(action.payload);
    },
    removeCreatorFromQuery(state, action) {
      state.query.creator["$in"] = state.query.creator["$in"].filter(
        (id) => id !== action.payload
      );
    },
    setRecommendationInQuery(state, action) {
      state.query.recommendation["$in"] = [action.payload];
    },
  },
});

export default feedSlice.reducer;

const {
  addLoadedData,
  setLoading,
  setRefreshing,
  setRefreshedData,
  setMoreToFetch,
  addCreatorToQuery,
  removeCreatorFromQuery,
  setRecommendationInQuery,
} = feedSlice.actions;

// Useable action creators....

export const { addRecommendationToFeed } = feedSlice.actions;

export const refreshFeedAsync = () => async (dispatch, getState) => {
  // start fetching first 10, set refreshing true
  dispatch(setRefreshing(true));

  const stateQuery = getState().feed.query;
  const sessionUserId = getState().user._id;
  console.log("query", stateQuery);
  try {
    const response = await recommendationsService.find({
      query: {
        ...stateQuery,
        // $or: [{ isPublic: true }, { directRecipients: sessionUserId }],
      },
    });
    console.log(
      "feed response.data",
      response.data.map((obj) => obj.creator.email)
    );

    dispatch(addLoadedRecommendations(response.data));
    dispatch(setRefreshedData(response.data.map((r) => r._id)));
    dispatch(setMoreToFetch(response.total > response.skip));
    dispatch(setRefreshing(false));
  } catch {
    console.log("Error while trying to refresh recommendations");
    dispatch(setRefreshing(false));
  }
};

export const fetchMoreFeedAsync = () => async (dispatch, getState) => {
  const moreToFetch = getState().feed.moreToFetch;
  const loading = getState().feed.loading;
  const refreshing = getState().feed.refreshing;
  if (moreToFetch && !loading && !refreshing) {
    dispatch(setLoading(true));

    const stateQuery = getState().feed.query;
    const sessionUserId = getState().user._id;
    const skip = getState().feed.list.length;
    try {
      const response = await recommendationsService.find({
        query: {
          ...stateQuery,
          // $or: [{ isPublic: true }, { directRecipients: sessionUserId }],
          $skip: skip,
        },
      });

      dispatch(addLoadedRecommendations(response.data));
      dispatch(addLoadedData(response.data.map((r) => r._id)));

      dispatch(setMoreToFetch(response.total > response.skip));
      dispatch(setLoading(false));
    } catch {
      console.log("Error while trying to fetch more recommendations");
      dispatch(setLoading(false));
    }
  }
};

export const addCreatorToQueryAndRefresh = (creatorId) => async (dispatch) => {
  dispatch(addCreatorToQuery(creatorId));
  dispatch(refreshFeedAsync());
};

export const removeCreatorFromQueryAndRefresh = (creatorId) => async (
  dispatch
) => {
  dispatch(removeCreatorFromQuery(creatorId));
  dispatch(refreshFeedAsync());
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const setRecommendationInQueryAndRefresh = (recId) => async (
  dispatch
) => {
  dispatch(setRecommendationInQuery(recId));
  dispatch(refreshFeedAsync());
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
