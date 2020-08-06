import { createSlice } from "@reduxjs/toolkit";
import { recommendationsService } from "../services/feathersClient";

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {
    loading: false,
    refreshing: false,
    moreToFetch: true,
    list: [],
  },
  reducers: {
    setLoadingTrue(state, action) {
      state.loading = true;
    },
    setLoadingFalse(state, action) {
      state.loading = false;
    },
    addLoadedData(state, action) {
      state.list.push(...action.payload);
    },
    setRefreshingTrue(state, action) {
      state.refreshing = true;
    },
    setRefreshingFalse(state, action) {
      state.refreshing = false;
    },
    setRefreshedData(state, action) {
      state.list = action.payload;
    },
    setMoreToFetch(state, action) {
      state.moreToFetch = action.payload;
    },
    addRecommendation(state, action) {
      state.list.unshift(action.payload);
    },
  },
});

export default recommendationsSlice.reducer;

const {
  setLoadingTrue,
  setLoadingFalse,
  addLoadedData,
  setRefreshingTrue,
  setRefreshingFalse,
  setRefreshedData,
  setMoreToFetch,
} = recommendationsSlice.actions;

// Useable action creators....

export const { addRecommendation } = recommendationsSlice.actions;

export const refreshRecommendationsAsync = () => async (dispatch, getState) => {
  // start fetching first 10, set refreshing true
  dispatch(setRefreshingTrue());

  const feedIds = getState().user.feedIds;
  try {
    const response = await recommendationsService.find({
      query: {
        $limit: 5,
        creator: { $in: feedIds },
        $sort: { createdAt: -1 },
      },
    });
    dispatch(setRefreshedData(response.data));
    dispatch(setMoreToFetch(response.total > response.skip));
    dispatch(setRefreshingFalse());
  } catch {
    console.log("Error while trying to refresh recommendations");
    dispatch(setRefreshingFalse());
  }
};

export const fetchMoreRecommendationsAsync = () => async (
  dispatch,
  getState
) => {
  const moreToFetch = getState().recommendations.moreToFetch;
  const loading = getState().recommendations.loading;
  const refreshing = getState().recommendations.refreshing;
  if (moreToFetch && !loading && !refreshing) {
    // console.log("MORE BEING FETCHED");
    dispatch(setLoadingTrue());
    const feedIds = getState().user.feedIds;
    const skip = getState().recommendations.list.length;
    try {
      const response = await recommendationsService.find({
        query: {
          $skip: skip,
          $limit: 5,
          creator: { $in: feedIds },
          $sort: { createdAt: -1 },
        },
      });
      dispatch(setMoreToFetch(response.total > response.skip));
      dispatch(addLoadedData(response.data));
      dispatch(setLoadingFalse());
    } catch {
      console.log("Error while trying to fetch more recommendations");
      dispatch(setLoadingFalse());
    }
  }
};
