import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import Avatar from "../Atomic/Avatar";
import useTheme from "../../hooks/useTheme";

export default function SelectableUser({
  user,
  size = 40,
  onSelect,
  onUnselect,
}) {
  const theme = useTheme();

  const [selected, setSelected] = React.useState(false);

  const onPress = () => {
    if (selected) {
      onUnselect();
      setSelected(false);
    } else {
      onSelect();
      setSelected(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {selected ? (
        <View
          style={{
            overflow: "hidden",
            backgroundColor: theme.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
            height: size,
            width: size,
          }}
        >
          <Ionicons name="md-checkmark" size={size - 10} color={theme.purple} />
        </View>
      ) : (
        <Avatar
          // style={{ borderWidth: 2, borderColor: theme.wallbg }}
          user={user}
          size={size}
        />
      )}
      <T.H3 style={{ marginTop: 3 }}>{user.username}</T.H3>
    </TouchableOpacity>
  );
}
