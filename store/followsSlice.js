import { createSlice } from "@reduxjs/toolkit";
import { followsService } from "../services/feathersClient";
import * as Haptics from "expo-haptics";

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
    dispatch(setFollowing(getFollowing.data.map((f) => f.following._id)));

    const getFollowers = await followsService.find({
      query: {
        following: userId,
        $limit: 1000,
      },
    });
    dispatch(setFollowers(getFollowers.data.map((f) => f.follower._id)));
  } catch {
    console.log("Error fetching follows", userId);
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
    dispatch(unFollowById(friendId));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

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
    dispatch(followById(friendId));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      return followsService.create({
        follower: userId,
        following: friendId,
      });
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
