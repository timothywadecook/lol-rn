import React from "react";
import { View, Button, TextInput } from "react-native";
// Components
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import UsernameNavToFriendDetails from "../components/Atomic/UsernameNavToFriendDetails";
import ListItem from "../components/ListItems/ListItem";
import { P, FancyH1, H2 } from "../components/Atomic/StyledText";
// Services
import { commentsService, usersService } from "../services/feathersClient";
// Hooks
import useTheme from "../hooks/useTheme";
import useService from "../hooks/useService";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

export default function RecommendationDetails({ navigation, route }) {
  navigation.setOptions({
    headerShown: false,
  });

  const theme = useTheme();

  const { recId } = route.params;
  const comments = useService(commentsService, {
    recommendation: recId,
  });

  return (
    <View
      style={{
        paddingTop: 32,
        backgroundColor: theme.wallbg,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: theme.windowWidth,
          alignItems: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        <Button
          title="Back"
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.primary}
        ></Button>
      </View>

      <ListItem disableLink={true} recId={recId} />

      <View style={{ flex: 1, width: theme.windowWidth, paddingHorizontal: 6 }}>
        <H2 style={{ padding: 10 }}>Comments</H2>
        <CommentInput recId={recId} />
        <FlatList
          data={comments}
          renderItem={({ item }) => <Comment {...item} />}
          initialNumToRender={8}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export function CommentInput({ recId, onComplete }) {
  const theme = useTheme();
  const [input, setInput] = React.useState("");

  const creator = useSelector((state) => state.user._id);

  const onSubmitComment = async () => {
    try {
      commentsService.create({ text: input, creator, recommendation: recId });
    } catch (error) {
      console.log("Error trying to create comment", error);
    }
  };

  const onSubmit = () => {
    onSubmitComment();
    setInput("");
    if (onComplete) onComplete();
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
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        <UsernameNavToFriendDetails withAvatar={true} friend={friend} />
        <FancyH1 style={{ fontSize: 14 }}>{text}</FancyH1>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <ActivityIndicatorCentered size="small" />
    </View>
  );
}
