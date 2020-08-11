import { createSlice } from "@reduxjs/toolkit";
import { recommendationsService } from "../services/feathersClient";

import { addLoadedRecommendations } from "./recommendationsSlice";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
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
  },
});

export default feedSlice.reducer;

const {
  addLoadedData,
  setLoading,
  setRefreshing,
  setRefreshedData,
  setMoreToFetch,
} = feedSlice.actions;

// Useable action creators....

export const { addRecommendationToFeed } = feedSlice.actions;

export const refreshFeedAsync = () => async (dispatch, getState) => {
  // start fetching first 10, set refreshing true
  dispatch(setRefreshing(true));

  const feedIds = [...getState().follows.following];
  feedIds.push(getState().user._id);
  console.log("feedIds ?", feedIds);
  try {
    const response = await recommendationsService.find({
      query: {
        $limit: 5,
        creator: { $in: feedIds },
        $sort: { createdAt: -1 },
      },
    });

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
    const feedIds = [...getState().follows.following];
    feedIds.push(getState().user._id);

    const skip = getState().feed.list.length;
    try {
      const response = await recommendationsService.find({
        query: {
          $skip: skip,
          $limit: 5,
          creator: { $in: feedIds },
          $sort: { createdAt: -1 },
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
