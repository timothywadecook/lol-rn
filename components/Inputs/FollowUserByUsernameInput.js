import React from "react";
import { View, TextInput } from "react-native";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function FollowUserByUsernameInput({
  placeholder = "Find friends by username...",
  navToOnFocus = "Search Users",
}) {
  return (
    <View style={{ flex: 1 }}>
      <FakeTextInput placeholder={placeholder} navToOnFocus={navToOnFocus} />
    </View>
  );
}

function FakeTextInput({ placeholder, navToOnFocus }) {
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
        backgroundColor: theme.iconBg,
        borderRadius: 20,
        height: 38,
      }}
    >
      <TextInput
        onFocus={() => {
          navigation.navigate(navToOnFocus);
        }}
        style={{
          flex: 1,
          color: theme.primary,
        }}
        keyboardAppearance={theme.theme}
        placeholderTextColor={theme.iconDefault}
        placeholder={placeholder}
      />
    </View>
  );
}
