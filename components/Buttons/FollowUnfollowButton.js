import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SubmitButton from "./SubmitButton";

import { toggleFollowingAsync } from "../../store/followsSlice";

export default function FollowUnfollowButton({ userId }) {
  const dispatch = useDispatch();
  const toggleFollowing = (userId) => dispatch(toggleFollowingAsync(userId));

  const sessionUserFollowing = useSelector((state) => state.follows.following);
  const sessionUserId = useSelector((state) => state.user._id);

  if (userId === sessionUserId) {
    return null;
  }

  return (
    <SubmitButton
      onPress={() => toggleFollowing(userId)}
      intent={sessionUserFollowing.includes(userId) ? "info" : "primary"}
      title={sessionUserFollowing.includes(userId) ? "Unfollow" : "Follow"}
    />
  );
}
