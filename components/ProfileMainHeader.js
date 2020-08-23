import React from "react";
import { View, TouchableOpacity } from "react-native";
import Avatar from "./Atomic/Avatar";
import FollowUserByUsernameInput from "./Inputs/FollowUserByUsernameInput";

import useTheme from "../hooks/useTheme";

const ProfileMainHeader = ({
  user,
  showSettings,
  setShowSettings,
  setInputFocus,
  inputFocus,
}) => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          width: theme.contentWidth,
          flexDirection: "row",
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <FollowUserByUsernameInput
          inputFocus={inputFocus}
          setInputFocus={setInputFocus}
        />

        {!inputFocus && (
          <View
            style={{
              flexDirection: "row",
              flex: 0.25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setShowSettings(!showSettings)}
            >
              <Avatar
                style={{
                  marginRight: 15,
                  marginLeft: 10,
                }}
                size={30}
                user={user}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileMainHeader;
