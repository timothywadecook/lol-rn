import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
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
      thing: {
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
      return (
        <T.H4 style={{ color: theme.purple }}>
          {`recommends a ${r.thing.category}`}
        </T.H4>
      );
    }
    return <T.H4>{`likes a ${r.thing.category}`}</T.H4>;
  };

  const listStyle = spaced
    ? { marginVertical: 4, backgroundColor: theme.wallbg }
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
        <T.H4>{moment(r.createdAt).fromNow()}</T.H4>
      </UserListItem>

      <Card bottomMargin={spaced}>
        <TouchableWithoutFeedback onPress={openDetails} disabled={disableLink}>
          <View>
            <CardContent>
              <ThingItemWithAddToList border={false} thing={r.thing} />

              <T.FancyH1 style={{ fontSize: 20, paddingVertical: 10 }}>
                {r.main_comment}
              </T.FancyH1>
            </CardContent>

            <CardActionBar
              r={r}
              toggleDisliked={toggleDisliked}
              toggleLiked={toggleLiked}
              openDetails={openDetails}
              onRepost={onRepost}
            />
          </View>
        </TouchableWithoutFeedback>
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
  const theme = useTheme();
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
        // width: theme.windowWidth,
        paddingHorizontal: 15,
        paddingVertical: 15,
        // borderBottomColor: theme.wallbg,
        // borderBottomWidth: 1,
      }}
    >
      {props.children}
    </View>
  );
};