import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SubmitButton from "./SubmitButton";

import {Button} from 'react-native-elements'
import useTheme from '../../hooks/useTheme';

import { toggleFollowingAsync } from "../../store/followsSlice";

export default function FollowUnfollowButton({ userId }) {
  const theme = useTheme()
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

  const isFollowing = sessionUserFollowing.includes(userId);

  return (
    <Button 
    onPress={()=>toggleFollowing(userId)}
    title={isFollowing?"Following":"Follow"}
    titleStyle={{color:isFollowing?theme.iconDefault:theme.purple, paddingHorizontal: 15}}
    type="clear"
    />
  )

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
