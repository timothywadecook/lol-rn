import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform, TouchableOpacity, View, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
// Components
import * as T from "../../../components/Atomic/StyledText";
import Screen from "../../../components/Wrappers/Screen";
import Avatar from "../../../components/Atomic/Avatar";
import { Icon, Button } from "react-native-elements";
import Recommendations from "../../Recommendations";
// State Management
import { fetchFollowsAsync } from "../../../store/followsSlice";
import { addLoadedLists } from "../../../store/listsSlice";
// Services
import { listsService, usersService } from "../../../services/feathersClient";
// Hooks
import useTheme from "../../../hooks/useTheme";
import WindowWidthRow from "../../../components/Wrappers/WindowWidthRow";
// PUSH NOTIFICATIONS
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// How to handle notifications recieved when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home({ navigation }) {
  const sessionUserId = useSelector((state) => state.user._id);

  const [expoPushToken, setExpoPushToken] = React.useState();
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      if (!!token) {
        usersService.patch(sessionUserId, {
          expoPushToken: token,
        });
      }
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification received", notification);
        setNotification(notification);
      }
    );
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const dispatch = useDispatch();
  const fetchFollows = () => dispatch(fetchFollowsAsync());

  const fetchLists = async () => {
    try {
      const res = await listsService.find({
        query: { participants: sessionUserId, $limit: 1000 },
      });
      dispatch(addLoadedLists(res.data));
    } catch (error) {
      console.log("Error trying to fetch lists for user", userId, error);
    }
  };

  const componentDidMount = async () => {
    await fetchFollows();
    fetchLists();
    SplashScreen.hideAsync();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <Screen fullscreen={true}>
      {/* <HomeHeader /> */}
      <Recommendations />
    </Screen>
  );
}

export function HomeHeader() {
  const theme = useTheme();
  const sessionUser = useSelector((state) => state.user);
  return (
    <WindowWidthRow
      blur={true}
      pad={true}
      style={{
        // position: "absolute",
        backgroundColor: theme.bg,
        zIndex: 3,
        paddingTop: theme.topPad,
        borderBottomWidth: 1,
        borderBottomColor: theme.iconBg,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { user: sessionUser })}
        style={{
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar user={sessionUser} />
      </TouchableOpacity> */}
      <Icon
        onPress={() => navigation.navigate("Search Users")}
        name="user-plus"
        size={20}
        color={theme.iconDefault}
        type="feather"
        containerStyle={{ padding: 7 }}
      />
      <T.FancyH1
        allowFontScaling={false}
        style={{
          color: theme.purple,
          paddingLeft: 10,
          marginTop: -2,
          fontSize: 24,
        }}
      >
        Like Out Loud
      </T.FancyH1>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {/* <Icon
          onPress={() => navigation.navigate("Search Users")}
          name="filter"
          size={20}
          color={theme.iconDefault}
          type="feather"
          containerStyle={{ padding: 7 }}
        /> */}

        {/* <Button
          type="outline"
          buttonStyle={{ borderRadius: 20, borderColor: theme.iconDefault }}
          // containerStyle={{ borderRadiu: 10 }}
          titleStyle={{
            color: theme.iconDefault,
            fontSize: 12,
            paddingHorizontal: 3,
          }}
          title="ADD"
          color={theme.iconDefault}
          icon={
            <Icon
              name="plus"
              type="feather"
              color={theme.iconDefault}
              size={20}
            />
          }
        /> */}

        {/* <Icon
          onPress={() => navigation.navigate("SearchThings")}
          name="plus-circle"
          size={30}
          // reverse
          color={theme.purple}
          reverseColor={theme.purple}
          // type="font-awesome"
          type="feather"
          containerStyle={{ padding: 7 }}
        /> */}
        <Icon
          onPress={() => navigation.navigate("SearchThings")}
          name="search"
          size={20}
          // reverse
          color={theme.iconDefault}
          reverseColor={theme.purple}
          type="feather"
          // type="feather"
          containerStyle={{ padding: 7 }}
        />
      </View>
    </WindowWidthRow>
  );
}
