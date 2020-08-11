import React, { Component } from "react";
import { Alert, View } from "react-native";
import { FacebookSocialButton } from "react-native-social-buttons";
import * as Facebook from "expo-facebook";

import client from "../../services/feathersClient";

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
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        client.authenticate({
          strategy: "facebook",
          access_token: token,
        });
      } else {
        // type === 'cancel'
        alert("Facebook Login Cancelled");
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
          height: 45,
          marginBottom: 10,
        }}
        onPress={logIn}
      />
    </View>
  );
}
