import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, TouchableWithoutFeedback } from "react-native";
import { FancyH1, H4 } from "../Atomic/StyledText";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
import IconButtons from "../Buttons/IconButtons";
import { ThingItemWithAddToList } from "./ThingItem";
import Card from "../Atomic/Card";
// Actions
import {
  likeByRecIdAsync,
  unlikeByRecIdAsync,
} from "../../store/recommendationsSlice";
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
// Helper
import moment from "moment";
import UserListItem from "./UserListItem";

export default function ListItem({
  horizontal = false,
  spaced = false,
  disableLink = false,
  recId,
  categories,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  navigation = useNavigation();

  const r = useSelector((state) => state.recommendations[recId]);

  const toggleLiked = () => {
    if (r.likes.liked) {
      dispatch(unlikeByRecIdAsync(recId));
    } else {
      dispatch(likeByRecIdAsync(recId));
    }
  };

  const onRepost = () => {
    navigation.navigate("Create", {
      repost: {
        isRepost: true,
        parentId: recId,
        ...r.thing,
      },
    });
  };

  const openDetails = () => {
    navigation.navigate("RecommendationDetails", {
      recId,
    });
  };

  const listStyle = spaced ? { flex: 1, marginVertical: 4 } : null;
  // FILTER BY CATEGORY
  if (categories.length > 0) {
    const show = categories.includes(r.thing.category + "s");
    if (!show) {
      return null;
    }
  }

  return (
    <View style={listStyle}>
      <UserListItem
        user={r.creator}
        lean={true}
        adjacentText={`Recommends a ${r.thing.category}`}
      >
        <H4>{moment(r.createdAt).fromNow()}</H4>
      </UserListItem>

      <Card horizontal={horizontal}>
        <CardContent>
          <ThingItemWithAddToList border={false} thing={r.thing} />
          <TouchableWithoutFeedback
            disabled={disableLink}
            onPress={openDetails}
          >
            <FancyH1 style={{ fontSize: 20 }}>{r.main_comment}</FancyH1>
          </TouchableWithoutFeedback>
        </CardContent>

        <CardActionBar
          r={r}
          toggleLiked={toggleLiked}
          openDetails={openDetails}
          onRepost={onRepost}
        />
      </Card>
    </View>
  );
}

const CardActionBar = ({ r, toggleLiked, openDetails, onRepost }) => {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <IconButtons.LikeButton
          showCount={true}
          count={r.likes.total}
          active={r.likes.liked}
          onPress={toggleLiked}
        />
      </View>

      <IconButtons.CommentButton
        showCount={true}
        count={r.comments.total}
        active={r.comments.commented}
        onPress={openDetails}
      />

      <IconButtons.RepostButton
        showCount={true}
        active={r.reposts.reposted}
        count={r.reposts.total}
        onPress={onRepost}
      />
    </View>
  );
};

const CardContent = (props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: theme.windowWidth,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: theme.wallbg,
        borderBottomWidth: 1,
      }}
    >
      {props.children}
    </View>
  );
};
