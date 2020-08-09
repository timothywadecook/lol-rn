import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet, Image } from "react-native";
import { H4, FancyH1 } from "../components/Atomic/StyledText";
import FacebookLogin from "../components/Login/FacebookLogin";
import GoogleLogin from "../components/Login/GoogleLogin";

import useTheme from "../hooks/useTheme";

import logo from "../assets/logo.png";

export default function LoginScreen({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.purple,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: theme.bg,
          borderBottomEndRadius: 130,
          borderBottomStartRadius: 0,
          shadowColor: theme.wallbg,
          shadowRadius: 5,
          shadowOpacity: 0.8,
          shadowOffset: { width: 0, height: 1 },
          width: theme.windowWidth,
          paddingBottom: 100,
        }}
      >
        <Image source={logo} style={{ width: 200, height: 200 }} />
        <FancyH1 style={{ color: theme.purple }}>Like Out Loud</FancyH1>
        <H4 style={{ color: theme.primary }}>
          Recommend with Friends {"\u00A9"}
        </H4>
      </View>

      <View
        style={{
          width: theme.windowWidth,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderTopStartRadius: 80,
        }}
      >
        <FacebookLogin />
        <GoogleLogin />
      </View>
    </View>
  );
}
