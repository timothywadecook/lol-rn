import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, TouchableWithoutFeedback } from "react-native";
import { FancyH1, H4 } from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import { ThingItemWithAddToList } from "./ThingItem";
import Card from "../Atomic/Card";
// Actions
import {
  dislikeByRecIdAsync,
  undislikeByRecIdAsync,
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
  categories,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  navigation = useNavigation();

  const r = useSelector((state) => state.recommendations[recId]);
  const sessionUserId = useSelector((state) => state.user._id);

  const toggleLiked = () => {
    if (r.likes.liked) {
      dispatch(unlikeByRecIdAsync(recId));
    } else {
      dispatch(likeByRecIdAsync(recId));
    }
  };

  const toggleDisliked = () => {
    if (r.dislikes.disliked) {
      dispatch(undislikeByRecIdAsync(recId));
    } else {
      dispatch(dislikeByRecIdAsync(recId));
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

  const directShareText = () => {
    if (r.directRecipients && r.directRecipients.includes(sessionUserId)) {
      return <H4 style={{ color: theme.purple }}>thinks you would like...</H4>;
    }
    return <H4>{`likes a ${r.thing.category}`}</H4>;
  };

  const listStyle = spaced
    ? { flex: 1, marginVertical: 4, backgroundColor: theme.bg }
    : null;
  // FILTER BY CATEGORY
  if (categories && categories.length > 0) {
    const show = categories.includes(r.thing.category + "s");
    if (!show) {
      return null;
    }
  }

  return (
    <View style={listStyle}>
      <UserListItem user={r.creator} lean={true} adjacentText={directShareText}>
        <H4>{moment(r.createdAt).fromNow()}</H4>
      </UserListItem>

      <Card>
        <CardContent>
          <ThingItemWithAddToList border={false} thing={r.thing} />
          <TouchableWithoutFeedback
            disabled={disableLink}
            onPress={openDetails}
          >
            <FancyH1 style={{ fontSize: 20, marginVertical: 20 }}>
              {r.main_comment}
            </FancyH1>
          </TouchableWithoutFeedback>
        </CardContent>

        <CardActionBar
          r={r}
          toggleDisliked={toggleDisliked}
          toggleLiked={toggleLiked}
          openDetails={openDetails}
          onRepost={onRepost}
        />
      </Card>
    </View>
  );
}

const CardActionBar = ({
  r,
  toggleDisliked,
  toggleLiked,
  openDetails,
  onRepost,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "flex-start", flex: 1 }}
      >
        <IconButtons.LikeButton
          showCount={true}
          count={r.likes.total}
          active={r.likes.liked}
          onPress={toggleLiked}
        />
        {/* <IconButtons.DownVote
          showCount={true}
          count={r.likes.total - r.dislikes.total}
          active={r.dislikes.disliked}
          onPress={toggleDisliked}
        /> */}
      </View>

      <View style={{ flex: 1 }}>
        <IconButtons.CommentButton
          showCount={true}
          count={r.comments.total}
          active={r.comments.commented}
          onPress={openDetails}
        />
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <IconButtons.RepostButton
          showCount={true}
          active={r.reposts.reposted}
          count={r.reposts.total}
          onPress={onRepost}
        />
      </View>
    </View>
  );
};

const CardContent = (props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: theme.windowWidth,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: theme.wallbg,
        borderBottomWidth: 1,
      }}
    >
      {props.children}
    </View>
  );
};
