import Layout from "./Layout";
import { Platform } from "react-native";

const isIphoneXOrGreater = Platform.OS === "ios" && Layout.window.height > 800;

const base = {
  // white: "#fafafa",
  white: "white",
  black: "#0a0a0a",
  green: "#20d942",
  purple: "#20B6D9",
  red: "#d92a20",
  windowHeight: Layout.window.height,
  windowWidth: Layout.window.width,
  contentWidth: Layout.window.width * 0.95,
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeText: "#fff",
  topPad: isIphoneXOrGreater ? 40 : 10,
};

export const themes = {
  light: {
    ...base,
    primary: "#0a0a0a",
    selected: "rgba(0,0,0,0.05)",
    activeButtonBg: "#f5f5f5",
    bg: "#EEEEEE",
    wallbg: "#EEEEEE",
    // wallbg: "#fcfcfc",
    // bg: "#fcfcfc",
    borderColor: "rgba(0,0,0,0)",
    inputBackground: "#fafafa",
    iconDefault: "rgba(0,0,0,0.4)",
    iconBg: "rgba(0,0,0,0.1)",
    tabIconDefault: "#ccc",
    tabIconSelected: "#5856D6",
    noticeBackground: "black",
  },
  dark: {
    ...base,
    primary: "#f5f5f5",
    selected: "rgba(255,255,255,0.1)",
    activeButtonBg: "#f5f5f5",
    wallbg: "#0a0a0a",
    borderColor: "#0a0a0a",
    deepwallbg: "black",
    // bg: "#24292e",
    bg: "#0a0a0a",
    inputBackground: "rgba(240,240,240,1)",
    iconDefault: "rgba(255,255,255,0.3)",
    iconBg: "rgba(255,255,255,0.05)",
    // iconBg: "rgba(32,182,217, 0.1)",
    tabIconDefault: "rgba(255,255,255,0.3)",
    tabIconSelected: "#5856D6",
    noticeBackground: "white",
  },
};

export default themes;
