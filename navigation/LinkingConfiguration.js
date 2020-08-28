import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Tabs: {
      path: "tabs",
      screens: {
        Home: "home",
        Create: "create",
        Profile: "profile",
      },
    },
    FriendDetails: {
      path: "friend",
    },
  },
};
