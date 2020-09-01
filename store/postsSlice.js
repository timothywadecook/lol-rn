import { createSlice } from "@reduxjs/toolkit";
import { recommendationsService } from "../services/feathersClient";

import { addLoadedRecommendations } from "./recommendationsSlice";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    refreshing: false,
    moreToFetch: true,
    total: 0,
    list: [], // should be an array of recIds, all actual recs are in recommendationsSlice by Id
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
    setTotal(state, action) {
      state.total = action.payload;
    },
    addRecommendationToPosts(state, action) {
      state.list.unshift(action.payload);
    },
  },
});

export default postsSlice.reducer;

const {
  setLoading,
  addLoadedData,
  setRefreshing,
  setRefreshedData,
  setMoreToFetch,
  setTotal,
} = postsSlice.actions;

// Useable action creators....

export const { addRecommendationToPosts } = postsSlice.actions;

export const refreshPostsAsync = () => async (dispatch, getState) => {
  // start fetching, set refreshing true
  dispatch(setRefreshing(true));

  const creator = getState().user._id;
  try {
    const response = await recommendationsService.find({
      query: {
        $limit: 5,
        creator,
        $sort: { createdAt: -1 },
      },
    });
    dispatch(addLoadedRecommendations(response.data));
    dispatch(setRefreshedData(response.data.map((r) => r._id)));
    dispatch(setTotal(response.total));
    dispatch(setMoreToFetch(response.total > response.skip));
    dispatch(setRefreshing(false));
  } catch {
    console.log("Error while trying to refresh posts");
    dispatch(setRefreshing(false));
  }
};

export const fetchMorePostsAsync = () => async (dispatch, getState) => {
  const moreToFetch = getState().posts.moreToFetch;
  const loading = getState().posts.loading;
  const refreshing = getState().posts.refreshing;
  if (moreToFetch && !loading && !refreshing) {
    dispatch(setLoading(true));
    const creator = getState().user._id;
    const skip = getState().posts.list.length;
    try {
      const response = await recommendationsService.find({
        query: {
          $skip: skip,
          $limit: 5,
          creator,
          $sort: { createdAt: -1 },
        },
      });
      dispatch(addLoadedRecommendations(response.data));
      dispatch(addLoadedData(response.data.map((r) => r._id)));
      dispatch(setMoreToFetch(response.total > response.skip));
      dispatch(setTotal(response.total));
      dispatch(setLoading(false));
    } catch {
      console.log("Error while trying to fetch more posts");
      dispatch(setLoading(false));
    }
  }
};
