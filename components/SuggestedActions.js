import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList } from "react-native";
import RoundButton from "./Buttons/RoundButton";
import IconButtons from "./Buttons/IconButtons";
import Avatar from "./Atomic/Avatar";
import RoundButtonToCommentInput from "./Inputs/RoundButtonToCommentInput";
import useTheme from "../hooks/useTheme";
import {
  likeByRecIdAsync,
  unlikeByRecIdAsync,
} from "../store/recommendationsSlice";

export default function SuggestedActions({ r, onSubmitComment }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.user);

  const [options, setOptions] = React.useState([
    "Yessss! 🙌",
    "More like this? 👀",
    "Where is this? 🧐",
    "Dopee 👌",
    "💯",
    "⭐⭐⭐⭐⭐",
  ]);

  const toggleLiked = () => {
    if (r.likes.liked) {
      dispatch(unlikeByRecIdAsync(r._id));
    } else {
      dispatch(likeByRecIdAsync(r._id));
    }
  };

  const flatlistRef = React.useRef();

  return (
    <View
      style={{
        // width: theme.windowWidth,
        paddingVertical: 10,
        flexDirection: "row",
        marginBottom: 0,
        zIndex: 3,
      }}
    >
      <FlatList
        ref={(r) => {
          flatlistRef.current = r;
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={options}
        ListHeaderComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RoundButton
              solid={true}
              renderIcon={() => (
                <IconButtons.LikeButton
                  showCount={true}
                  count={r.likes.total}
                  active={r.likes.liked}
                  onPress={toggleLiked}
                  padding={0}
                />
              )}
              onPress={toggleLiked}
              active={r.likes.liked}
            />
            <RoundButtonToCommentInput
              scrollToInput={() => {
                flatlistRef.current.scrollToOffset({
                  offset: 90,
                });
              }}
              scrollToStart={() => {
                flatlistRef.current.scrollToIndex({
                  index: 0,
                  viewPosition: 0,
                });
              }}
              onSubmitComment={onSubmitComment}
            />
          </View>
        }
        renderItem={({ item }) => (
          <RoundButton
            solid={true}
            // renderIcon={() => (
            //   <Avatar user={sessionUser} style={{ marginRight: 10 }} />
            // )}
            onPress={() => {
              onSubmitComment(item);
              setOptions(options.filter((o) => o !== item));
            }}
            title={item}
          />
        )}
        keyExtractor={(item) => item + Math.random()}
      />
    </View>
  );
}
