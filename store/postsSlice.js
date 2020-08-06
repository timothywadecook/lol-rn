import { createSlice } from "@reduxjs/toolkit";
import { recommendationsService } from "../services/feathersClient";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    refreshing: false,
    moreToFetch: true,
    total: 0,
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
    setTotal(state, action) {
      state.total = action.payload;
    },
    addPost(state, action) {
      state.list.unshift(action.payload);
    },
  },
});

export default postsSlice.reducer;

const {
  setLoadingTrue,
  setLoadingFalse,
  addLoadedData,
  setRefreshingTrue,
  setRefreshingFalse,
  setRefreshedData,
  setMoreToFetch,
  setTotal,
} = postsSlice.actions;

// Useable action creators....

export const { addPost } = postsSlice.actions;

export const refreshPostsAsync = () => async (dispatch, getState) => {
  // start fetching, set refreshing true
  dispatch(setRefreshingTrue());

  const creator = getState().user._id;
  try {
    const response = await recommendationsService.find({
      query: {
        $limit: 5,
        creator,
        $sort: { createdAt: -1 },
      },
    });
    dispatch(setRefreshedData(response.data));
    dispatch(setTotal(response.total));
    dispatch(setMoreToFetch(response.total > response.skip));
    dispatch(setRefreshingFalse());
  } catch {
    console.log("Error while trying to refresh posts");
    dispatch(setRefreshingFalse());
  }
};

export const fetchMorePostsAsync = () => async (dispatch, getState) => {
  const moreToFetch = getState().posts.moreToFetch;
  const loading = getState().posts.loading;
  const refreshing = getState().posts.refreshing;
  if (moreToFetch && !loading && !refreshing) {
    // console.log("MORE BEING FETCHED");
    dispatch(setLoadingTrue());
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
      dispatch(setMoreToFetch(response.total > response.skip));
      dispatch(setTotal(response.total));
      dispatch(addLoadedData(response.data));
      dispatch(setLoadingFalse());
    } catch {
      console.log("Error while trying to fetch more posts");
      dispatch(setLoadingFalse());
    }
  }
};
