import React from "react";
import { useSelector } from "react-redux";

import useTheme from "../../hooks/useTheme";
import ActivityIndicatorCentered from "../Atomic/ActivityIndicatorCentered";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";

import { View, TextInput } from "react-native";
import { P, H2 } from "../Atomic/StyledText";

import { usersService, commentsService } from "../../services/feathersClient";
import { ScrollView, FlatList } from "react-native-gesture-handler";

export default function CommentsList({ recommendation }) {
  // on mount, fetch the comments and setState
  // on scrollToEnd fetch comments and appendState
  // on create comment appendState beginning
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const creator = useSelector((state) => state.user._id);

  const fetchComments = async () => {
    // fetch comments with skip = comments.length
    if (!loading) {
      setLoading(true);
      try {
        const response = await commentsService.find({
          query: {
            recommendation: recommendation,
            $limit: 100,
            $sort: { createdAt: -1 },
          },
        });
        const data = response.data;

        setComments(data);
      } catch (error) {
        console.log("Error finding comments for list", error);
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  const onSubmitComment = async (text) => {
    setLoading(true);

    try {
      const newComment = await commentsService.create({
        text,
        creator,
        recommendation,
      });
      setComments((comments) => [newComment, ...comments]);
      setLoading(false);
    } catch (error) {
      console.log("Error trying to create comment", error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 5 }}
      >
        <FlatList
          inverted={true}
          // horizontal={true}
          data={comments}
          renderItem={({ item }) => <Comment {...item} />}
          initialNumToRender={4}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{ transform: [{ scaleY: -1 }], paddingHorizontal: 10 }}
            >
              <H2>0 comments</H2>
            </View>
          )}
        />
      </View>
      <CommentInput onSubmitComment={onSubmitComment} />
    </View>
  );
}

function CommentInput({ onSubmitComment }) {
  const theme = useTheme();
  const [input, setInput] = React.useState("");

  const onSubmit = () => {
    onSubmitComment(input);
    setInput("");
  };

  return (
    <TextInput
      style={{
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 7,
        borderRadius: 20,
        // flex: 1,
        color: theme.primary,
      }}
      value={input}
      onChangeText={(text) => setInput(text)}
      autoCorrect={true}
      placeholderTextColor="#5d5d5d"
      placeholder="Leave a comment..."
      onSubmitEditing={onSubmit}
      keyboardAppearance={theme.theme}
      returnKeyType="send"
    />
  );
}

function Comment({ text, creator }) {
  // fetch user from creator
  const [friend, setFriend] = React.useState({});

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

  if (friend.username) {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        <UsernameNavToFriendDetails friend={friend} />
        <P>{text}</P>
      </View>
    );
  }
  return <ActivityIndicatorCentered size="small" />;
}
