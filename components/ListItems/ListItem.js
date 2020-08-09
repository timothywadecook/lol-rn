import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { Title, FancyH1, H4, H2, H3, CommentText } from "../Atomic/StyledText";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
import IconButtons from "../Buttons/IconButtons";
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
    console.log("show", show);
    if (!show) {
      return null;
    }
  }

  return (
    <View style={listStyle}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            flex: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <UsernameNavToFriendDetails friend={r.creator} />

          <H4> Recommends a {r.thing.category}</H4>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 5,
          }}
        >
          <H4>{moment(r.createdAt).fromNow()}</H4>
        </View>
      </View>

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
        <TouchableWithoutFeedback disabled={disableLink} onPress={openDetails}>
          <View
            style={{
              width: theme.windowWidth,
              paddingHorizontal: 10,
              paddingTop: 20,
              borderBottomColor: theme.wallbg,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                {r.thing.image && (
                  <Image
                    source={{ uri: r.thing.image }}
                    style={{
                      resizeMode: "cover",
                      width: "10%",
                      height: 40,
                      borderRadius: 5,
                      marginRight: 5,
                      marginTop: 2,
                    }}
                  />
                )}

                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Title style={{ paddingBottom: 0 }}>{r.thing.title}</Title>
                  <H4 style={{ fontWeight: "bold" }}>{r.thing.subtitle}</H4>
                </View>
              </View>

              <View>
                <IconButtons.AddToListButton />
              </View>
            </View>

            <FancyH1
              style={{
                paddingBottom: 20,
                fontSize: 20,
              }}
            >
              {r.main_comment}
            </FancyH1>
          </View>
        </TouchableWithoutFeedback>

        <ActionBar
          r={r}
          toggleLiked={toggleLiked}
          openDetails={openDetails}
          onRepost={onRepost}
        />
      </View>
    </View>
  );
}

const ActionBar = ({ r, toggleLiked, openDetails, onRepost }) => {
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
