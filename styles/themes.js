import Layout from "./Layout";

const base = {
  white: "#fafafa",
  windowHeight: Layout.window.height,
  windowWidth: Layout.window.width,
  contentWidth: Layout.window.width * 0.95,
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeText: "#fff",
};

export const themes = {
  light: {
    ...base,
    primary: "#0a0a0a",
    selected: "rgba(0,0,0,0.05)",
    // purple: "#5856D6",
    purple: "#20B6D9",
    activeButtonBg: "#f5f5f5",
    // wallbg: "#fafafa",
    bg: "#f5f5f5",
    // wallbg: "#F5FFFA",
    // bg: "#E8E8E8",
    wallbg: "#fcfcfc",
    deepwallbg: "#E0E0E0",
    // wallbg: "#f5f5f5",
    inputBackground: "rgba(240,240,240,1)",
    // iconDefault: "#ccc",
    // iconDefault: "#C1C7C9",
    iconDefault: "rgba(0,0,0,0.25)",
    // iconDefault: "#8C979A",
    tabIconDefault: "#ccc",
    tabIconSelected: "#5856D6",
    noticeBackground: "black",
  },
  dark: {
    ...base,
    primary: "#f5f5f5",
    selected: "rgba(255,255,255,0.1)",
    // purple: "#5856D6",
    purple: "#20B6D9",
    activeButtonBg: "#f5f5f5",
    wallbg: "#0a0a0a",
    deepwallbg: "black",
    // bg: "#131313",
    bg: "#24292e",
    inputBackground: "rgba(240,240,240,1)",
    iconDefault: "rgba(255,255,255,0.3)",
    tabIconDefault: "rgba(255,255,255,0.3)",
    tabIconSelected: "#5856D6",
    noticeBackground: "white",
  },
};

export default themes;
