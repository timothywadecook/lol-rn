import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

const iconButtonCreator = (iconName) => ({
  showCount = false,
  active = false,
  onPress,
  size = 22,
  count = 0,
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
      }}
      onPress={onPress}
    >
      {showCount && count > 0 ? (
        <View style={{ paddingBottom: 3 }}>
          <H2 style={{ color: countColor }}>{count}</H2>
        </View>
      ) : null}
      <Ionicons
        style={{ padding: 8 }}
        name={iconName}
        size={size}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export const LikeButton = iconButtonCreator("md-heart");
export const CommentButton = iconButtonCreator("md-text");
export const RepostButton = iconButtonCreator("md-repeat");
export const AddCircle = iconButtonCreator("md-add-circle-outline");
export const RemoveCircle = iconButtonCreator("md-remove-circle-outline");
export const CheckmarkCircle = iconButtonCreator("md-checkmark-circle");

export const Delete = iconButtonCreator("md-trash");
export const IsShared = iconButtonCreator("md-people");

const IconButtons = {
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
