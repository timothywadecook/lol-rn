import { createSlice } from "@reduxjs/toolkit";
import { likesService } from "../services/feathersClient";
import { Vibration } from "react-native";

const likesSlice = createSlice({
  name: "likes",
  initialState: [], // array of [recIds]
  reducers: {
    setLikes(state, action) {
      return action.payload;
    },
    toggleLike(state, action) {
      const liked = state.includes(action.payload);
      if (liked) {
        return state.filter((l) => l != action.payload);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export default likesSlice.reducer;
const { toggleLike, setLikes } = likesSlice.actions;

// Useable action creators....

export const fetchLikesAsync = () => async (dispatch, getState) => {
  const creator = getState().user._id;
  try {
    const response = await likesService.find({
      query: {
        creator: creator,
        $limit: 1000,
      },
    });
    console.log("likes?", response);
    dispatch(setLikes(response.data.map((l) => l.recommendation)));
  } catch {
    console.log("Error fetching likes");
  }
};

export const toggleLikedAsync = (recommendation) => async (
  dispatch,
  getState
) => {
  Vibration.vibrate();

  const liked = getState().likes.includes(recommendation);
  console.log("liked", liked);

  dispatch(toggleLike(recommendation));

  const creator = getState().user._id;

  if (liked) {
    try {
      const findLike = await likesService.find({
        query: { creator, recommendation },
      });
      return likesService.remove(findLike.data[0]._id);
    } catch {
      console.log("Error trying to unlike via likesService");
      dispatch(toggleLike(recommendation));
    }
  } else {
    try {
      return likesService.create({ creator, recommendation });
    } catch {
      console.log("Error trying to create like");
      dispatch(toggleLike(recommendation));
    }
  }
};
