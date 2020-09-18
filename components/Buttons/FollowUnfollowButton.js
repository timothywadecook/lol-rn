import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SubmitButton from "./SubmitButton";

import { toggleFollowingAsync } from "../../store/followsSlice";

export default function FollowUnfollowButton({ userId }) {
  const [processing, setProcessing] = React.useState(false);
  const dispatch = useDispatch();
  const toggleFollowing = (userId) => {
    setProcessing(true);
    dispatch(toggleFollowingAsync(userId)).then((res) => setProcessing(false));
  };

  const sessionUserFollowing = useSelector((state) => state.follows.following);
  const sessionUserId = useSelector((state) => state.user._id);

  if (userId === sessionUserId) {
    return null;
  }

  return (
    <SubmitButton
      style={{ paddingVertical: 5, paddingHorizontal: 10 }}
      isProcessing={processing}
      onPress={() => toggleFollowing(userId)}
      intent={sessionUserFollowing.includes(userId) ? "info" : "primary"}
      title={sessionUserFollowing.includes(userId) ? "Following" : "Follow"}
    />
  );
}
