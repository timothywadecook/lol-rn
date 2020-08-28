import React from "react";
import { View, TextInput } from "react-native";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function FollowUserByUsernameInput() {
  return (
    <View style={{ flex: 1 }}>
      <FakeTextInput />
    </View>
  );
}

function FakeTextInput({}) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 20,
        margin: 7,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.bg,
        borderRadius: 20,
        height: 38,
      }}
    >
      <TextInput
        onFocus={() => {
          navigation.navigate("Search Users");
        }}
        style={{
          flex: 1,
          color: theme.primary,
        }}
        keyboardAppearance={theme.theme}
        placeholderTextColor={theme.iconDefault}
        placeholder="Find friends by username..."
      />
    </View>
  );
}
