import React, { Component } from "react";
import { Alert, View } from "react-native";
import { FacebookSocialButton } from "react-native-social-buttons";
import * as Facebook from "expo-facebook";

import useTheme from "../../hooks/useTheme";

export default function FacebookLogin(props) {
  const theme = useTheme();

  const logIn = async () => {
    try {
      await Facebook.initializeAsync("576643239675500");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View>
      <FacebookSocialButton
        buttonViewStyle={{
          width: theme.windowWidth * 0.8,
          borderWidth: 0,
          height: 50,
          marginBottom: 10,
        }}
        onPress={logIn}
      />
    </View>
  );
}
