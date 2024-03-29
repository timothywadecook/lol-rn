import React, { Component } from "react";
import { Alert, View } from "react-native";
import { GoogleSocialButton } from "react-native-social-buttons";
import * as Google from "expo-google-app-auth";

import client from "../../services/feathersClient";

import useTheme from "../../hooks/useTheme";

export default function GoogleLogin(props) {
  const theme = useTheme();

  const logIn = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId:
          "1056179560527-q7694rk6m43td4d8a3lajq29narasq7f.apps.googleusercontent.com",
        iosClientId:
          "1056179560527-q9do9dp5bv574eh91981nvp57i9lrsgc.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "1056179560527-cj0eh5gu1g34d3fumdnf7hsgii79km4v.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "1056179560527-7bl65ebn2e6f35ij65gcp7cugdha1l99.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        const res = await client.authenticate({
          strategy: "google",
          access_token: accessToken,
          profile: user,
        });
      } else {
        console.log("Google Login Cancelled");
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Error loging in with Google", e);
      return { error: true };
    }
  };

  return (
    <View>
      <GoogleSocialButton
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
