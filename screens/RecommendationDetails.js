import React from "react";
import { View, Button, TextInput } from "react-native";
// Components
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import UsernameNavToFriendDetails from "../components/Atomic/UsernameNavToFriendDetails";
import ListItem from "../components/ListItems/ListItem";
import { P, FancyH1, H2 } from "../components/Atomic/StyledText";
import Screen from "../components/Wrappers/Screen";
import BackButton from "../components/Atomic/BackButton";
import Comment from "../components/ListItems/Comment";
// Services
import { commentsService, usersService } from "../services/feathersClient";
// Hooks
import useTheme from "../hooks/useTheme";
import useService from "../hooks/useService";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { addCommentByRecId } from "../store/recommendationsSlice";

export default function RecommendationDetails({ route }) {
  const theme = useTheme();

  if (!route || !route.params || !route.params.recId) {
    return null;
  }
  const { recId } = route.params;
  const comments = useService(commentsService, {
    recommendation: recId,
  });

  return (
    <Screen center={true}>
      <View
        style={{
          width: theme.windowWidth,
          alignItems: "flex-start",
        }}
      >
        <BackButton />
      </View>

      <View style={{ flex: 1, width: theme.windowWidth, paddingHorizontal: 6 }}>
        <FlatList
          ListHeaderComponent={
            <View style={{}}>
              <ListItem disableLink={true} recId={recId} />
              <H2 style={{ padding: 10 }}>Comments</H2>
              <CommentInput recId={recId} />
            </View>
          }
          ListFooterComponent={
            <View style={{ height: theme.windowHeight / 2 }}></View>
          }
          data={comments}
          renderItem={({ item }) => <Comment {...item} />}
          initialNumToRender={8}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
}

export function CommentInput({ recId, onComplete }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [input, setInput] = React.useState("");

  const creator = useSelector((state) => state.user._id);

  const onSubmitComment = async () => {
    try {
      dispatch(addCommentByRecId(recId));
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
