import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

const iconButtonCreator = (iconName, Icons = Ionicons) => ({
  showCount = false,
  active = false,
  onPress,
  size = 22,
  count = 0,
  padding = 8,
}) => {
  const theme = useTheme();
  const countColor = theme.tabIconDefault;
  const iconColor = active ? theme.purple : theme.tabIconDefault;
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: size + 2 * padding,
      }}
      onPress={onPress}
    >
      {showCount && count !== 0 ? (
        <View style={{ paddingBottom: 3 }}>
          <H2 style={{ color: countColor }}>{count}</H2>
        </View>
      ) : null}
      <Icons
        style={{ padding }}
        name={iconName}
        size={size}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export const Settings = iconButtonCreator("md-settings");
export const Close = iconButtonCreator("md-close");
export const LikeButton = iconButtonCreator("md-heart");
export const CommentButton = iconButtonCreator("md-text");
export const RepostButton = iconButtonCreator("md-repeat");
export const AddCircle = iconButtonCreator("md-add-circle");
export const AddToList = iconButtonCreator("md-add"); // md-add
export const Bookmark = iconButtonCreator("md-bookmark");
export const Bookmarks = iconButtonCreator("md-bookmarks");
export const RemoveCircle = iconButtonCreator("md-remove-circle-outline");
export const CheckmarkCircle = iconButtonCreator("md-checkmark-circle");
export const Circle = iconButtonCreator("circle", Feather);
export const AddUser = iconButtonCreator("md-person-add");
export const Add = iconButtonCreator("md-add");
export const DownVote = iconButtonCreator("arrow-down", Entypo);
export const UpVote = iconButtonCreator("arrow-up", Entypo);
export const ThreeDots = iconButtonCreator("dots-three-vertical", Entypo);

export const Delete = iconButtonCreator("md-trash");
export const IsShared = iconButtonCreator("md-people");

const IconButtons = {
  Bookmark,
  Bookmarks,
  ThreeDots,
  Settings,
  Close,
  Circle,
  AddToList,
  DownVote,
  UpVote,
  Add,
  AddUser,
  CheckmarkCircle,
  Delete,
  IsShared,
  LikeButton,
  CommentButton,
  AddCircle,
  RemoveCircle,
  RepostButton,
};

export default IconButtons;
