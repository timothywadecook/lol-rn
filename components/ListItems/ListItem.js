import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, TouchableWithoutFeedback } from "react-native";
import { FancyH1, H4 } from "../Atomic/StyledText";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
import IconButtons from "../Buttons/IconButtons";
import { ThingItemWithAddToList } from "./ThingItem";
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
  spaced = false,
  disableLink = false,
  recId,
  category,
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

  const listStyle = spaced
    ? { flex: 1, marginBottom: 45, paddingBottom: 20 }
    : null;
  // FILTER BY CATEGORY
  if (category) {
    const show = category === "All" || category.includes(r.thing.category);
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

      <Card>
        <TouchableWithoutFeedback disabled={disableLink} onPress={openDetails}>
          <CardContent>
            <ThingItemWithAddToList thing={r.thing} />

            <FancyH1 style={{ fontSize: 20 }}>{r.main_comment}</FancyH1>
          </CardContent>
        </TouchableWithoutFeedback>

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
        paddingVertical: 20,
        borderBottomColor: theme.wallbg,
        borderBottomWidth: 1,
      }}
    >
      {props.children}
    </View>
  );
};

const Card = (props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: theme.windowWidth,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: theme.bg,
        borderRadius: 15,
        overflow: "hidden",
      }}
    >
      {props.children}
    </View>
  );
};
