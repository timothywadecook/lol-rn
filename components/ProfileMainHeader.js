import React from "react";
import { View, Image, Text } from "react-native";
import { Title, H2, H2G, P } from "./Atomic/StyledText";

import UserAvatar from "react-native-user-avatar";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileMainHeader = ({ user, theme, showSettings, setShowSettings }) => {
  return (
    <View>
      <View
        style={{
          width: theme.contentWidth,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 0.8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <UserAvatar
            style={{
              margin: 10,
              borderWidth: 1,
              borderColor: "white",
            }}
            size={50}
            name={user.name}
            bgColor={"black"}
            src={user.avatar}
          />
          <View>
            <Title>{user.username}</Title>
            <H2G>{user.name}</H2G>
            {/* <P>Atlanta, GA</P> */}
          </View>
        </View>

        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!!setShowSettings && (
            <TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
              <Ionicons
                name={showSettings ? "md-close" : "md-settings"}
                size={30}
                color={showSettings ? theme.purple : theme.iconDefault}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileMainHeader;
