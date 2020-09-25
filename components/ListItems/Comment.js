import React from "react";
import { View, Button, TextInput } from "react-native";
// Components
import ActivityIndicatorCentered from "../Atomic/ActivityIndicatorCentered";
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
import * as T from "../Atomic/StyledText";

// Services
import { usersService } from "../../services/feathersClient";

export default function Comment({ text, creator, large = false }) {
  // fetch user from
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
          alignItems: "flex-start",
          // justifyContent: "flex-start",
          //   flexWrap: "wrap",
          padding: 10,
        }}
      >
        <UsernameNavToFriendDetails
          withAvatar={true}
          withName={false}
          friend={friend}
        />
        <View style={{ flex: 1, flexDirection: "column", paddingTop: 5 }}>
          <T.FancyH1 style={{ fontSize: large ? 20 : 14 }}>{text}</T.FancyH1>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <ActivityIndicatorCentered size="small" />
    </View>
  );
}
