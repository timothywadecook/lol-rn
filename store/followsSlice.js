import { createSlice } from "@reduxjs/toolkit";
import { followsService } from "../services/feathersClient";

const followsSlice = createSlice({
  name: "follows",
  initialState: { following: [], followers: [] }, // array of [userIds]
  reducers: {
    setFollowing(state, action) {
      return { ...state, following: [...action.payload] };
    },
    setFollowers(state, action) {
      return { ...state, followers: [...action.payload] };
    },
    unFollowById(state, action) {
      state.following = state.following.filter((id) => id !== action.payload);
      return {
        ...state,
        following: state.following.filter((id) => id !== action.payload),
      };
    },
    followById(state, action) {
      return { ...state, following: [...state.following, action.payload] };
    },
  },
});

export default followsSlice.reducer;
const {
  setFollowers,
  setFollowing,
  unFollowById,
  followById,
} = followsSlice.actions;

// Useable action creators....

export const fetchFollowsAsync = () => async (dispatch, getState) => {
  const userId = getState().user._id;

  try {
    const getFollowing = await followsService.find({
      query: {
        follower: userId,
        $limit: 1000,
      },
    });
    console.log("getfollowing.data", getFollowing.data);
    dispatch(setFollowing(getFollowing.data.map((f) => f.following)));

    const getFollowers = await followsService.find({
      query: {
        following: userId,
        $limit: 1000,
      },
    });
    console.log("getfollowers.data", getFollowers.data);
    dispatch(setFollowers(getFollowers.data.map((f) => f.follower)));
  } catch {
    console.log("Error fetching follows");
  }
};

export const toggleFollowingAsync = (friendId) => async (
  dispatch,
  getState
) => {
  const sessionUserFollowing = getState().follows.following;
  const isFollowing = sessionUserFollowing.includes(friendId);
  const userId = getState().user._id;

  if (isFollowing) {
    // THEN UNFOLLOW USER
    dispatch(unFollowById(friendId));
    try {
      const findFollow = await followsService.find({
        query: { follower: userId, following: friendId },
      });
      return followsService.remove(findFollow.data[0]._id);
    } catch {
      console.log(
        "Error trying to unfollow",
        "userId",
        userId,
        "friendId",
        friendId
      );
      dispatch(followById(friendId));
    }
  } else {
    // THEN FOLLOW USER
    dispatch(followById(friendId));
    try {
      return followsService.create({ follower: userId, following: friendId });
    } catch {
      console.log(
        "Error trying to create follow",
        "user",
        userId,
        "friend",
        friendId
      );
      dispatch(unFollowById(friendId));
    }
  }
};