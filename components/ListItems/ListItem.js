import React from "react";
import {
  View,
  Pressable,
  Image,
  Vibration,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, FancyH1, H4, H2, H3, CommentText } from "../Atomic/StyledText";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleLikedAsync } from "../../store/likesSlice";
// Icons
import IconButtons from "../Buttons/IconButtons";
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
// Services
import {
  likesService,
  commentsService,
  usersService,
} from "../../services/feathersClient";

// temp
import { CommentInput } from "../../screens/RecommendationDetails";

const ListItem = React.memo(
  ({
    spaced = false,
    disableLink = false,
    _id,
    creator,
    thing,
    main_comment,
    isRepost,
    parentId,
    timestamp = "5 min",
  }) => {
    const { category, title, subtitle, image } = thing;

    const theme = useTheme();
    navigation = useNavigation();

    // State
    const likes = useSelector((state) => state.likes);

    const liked = likes.includes(_id);

    // Dispatch
    const dispatch = useDispatch();
    const toggleLiked = () => dispatch(toggleLikedAsync(_id));

    const onRepost = () => {
      navigation.navigate("Create", {
        repost: {
          isRepost: true,
          parentId: _id,
          ...thing,
        },
      });
    };

    const openDetails = () => {
      navigation.navigate("RecommendationDetails", {
        recommendation: {
          _id,
          creator,
          category,
          title,
          subtitle,
          image,
          main_comment,
          timestamp,
        },
      });
    };

    const listStyle = spaced
      ? { flex: 1, marginBottom: 45, paddingBottom: 20 }
      : null;

    return (
      <View style={listStyle}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingBottom: 5,
            // borderBottomColor: theme.bg,
            // borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UsernameNavToFriendDetails friend={creator} />

            <H4> Recommends a {category}</H4>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 5,
            }}
          >
            <H4>{timestamp + " ago"}</H4>
          </View>
        </View>

        <View
          style={{
            width: theme.windowWidth,
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: theme.bg,
            borderRadius: 15,
            // borderTopWidth: 2,
            // borderBottomWidth: 2,
            // borderTopColor: theme.bg,
            overflow: "hidden",
          }}
        >
          <TouchableWithoutFeedback
            disabled={disableLink}
            onPress={openDetails}
          >
            <View
              style={{
                width: theme.windowWidth,
                paddingHorizontal: 10,
                paddingTop: 20,
                // paddingBottom: 5,
                borderBottomColor: theme.wallbg,
                // backgroundColor: theme.bg,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // backgroundColor: "blue",
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {image && (
                    <Image
                      source={{ uri: image }}
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
                    <Title style={{ paddingBottom: 0 }}>{title}</Title>
                    <H4 style={{ fontWeight: "bold" }}>{subtitle}</H4>
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
                {main_comment}
              </FancyH1>
            </View>
          </TouchableWithoutFeedback>

          <ActionBar
            liked={liked}
            toggleLiked={toggleLiked}
            openDetails={openDetails}
            onRepost={onRepost}
          />
        </View>
      </View>
    );
  }
);

const ActionBar = ({ liked, toggleLiked, openDetails, onRepost }) => {
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
          count={3}
          active={liked}
          onPress={toggleLiked}
        />
      </View>

      <IconButtons.CommentButton
        showCount={true}
        count={5} // count of comments for this recommendation_id
        // active={} // user has commented on this recommendation
        onPress={openDetails}
      />

      <IconButtons.RepostButton
        showCount={true}
        count={22} // count of times this recommendation was reposted (not total number of times this item was shared)
        onPress={onRepost}
      />
    </View>
  );
};

export default ListItem;

const CommentsList = ({ recommendation }) => {
  const [comments, setComments] = React.useState([]);

  const fetchComments = () => {
    commentsService
      .find({
        query: {
          recommendation,
          $limit: 1000,
        },
      })
      .then((response) => setComments(response.data))
      .catch((e) => console.log("Error fetching comments", e));
  };

  React.useState(() => {
    fetchComments();
  }, []);

  return (
    <View>
      {comments.map((c) => (
        <Comment text={c.text} creator={c.creator} />
      ))}
    </View>
  );
};

const Comment = ({ text, creator }) => {
  const [friend, setFriend] = React.useState({});
  const theme = useTheme();

  const fetchUser = async (userId) => {
    try {
      const user = await usersService.get(userId);
      setFriend(user);
    } catch (error) {
      console.log("Problem fetching user for comment", error);
    }
  };

  React.useEffect(() => {
    fetchUser(creator);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: theme.contentWidth,
        paddingHorizontal: 15,
        paddingVertical: 7,
      }}
    >
      <UsernameNavToFriendDetails friend={friend} withAvatar={false} />
      <CommentText style={{ paddingLeft: 5, flex: 1, flexWrap: "wrap" }}>
        {text}
      </CommentText>
    </View>
  );
};
