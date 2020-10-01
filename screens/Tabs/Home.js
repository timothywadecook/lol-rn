import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
// Components
import * as T from "../../components/Atomic/StyledText";
import Screen from "../../components/Wrappers/Screen";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import FilterMenu from "../../components/FilterMenu";
import QuickActionToolbar from "../../components/Buttons/QuickActionToolbar";
import { Feather } from "@expo/vector-icons";

// State Management
import { refreshFeedAsync, fetchMoreFeedAsync } from "../../store/feedSlice";
import { fetchFollowsAsync } from "../../store/followsSlice";
import { addLoadedLists } from "../../store/listsSlice";
// Services
import { listsService, usersService } from "../../services/feathersClient";
// Animation
import Animated from "react-native-reanimated";
import { HEIGHT } from "../../components/FilterMenu";
// Hooks
import useTheme from "../../hooks/useTheme";
import WindowWidthRow from "../../components/Wrappers/WindowWidthRow";
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

export default function HomeScreen({ navigation }) {
  const sessionUserId = useSelector((state) => state.user._id);
  const sessionUser = useSelector((state) => state.user);

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

  const feed = useSelector((state) => state.feed.list);
  const loading = useSelector((state) => state.feed.loading);
  const refreshing = useSelector((state) => state.feed.refreshing);
  const theme = useTheme();

  const dispatch = useDispatch();
  const refresh = () => dispatch(refreshFeedAsync());
  const fetchMore = () => dispatch(fetchMoreFeedAsync());
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
    refresh();
    fetchLists();
    SplashScreen.hideAsync();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  const [categories, setCategories] = React.useState([]);
  const y = React.useMemo(() => new Animated.Value(0), []);
  return (
    <Screen fullscreen={true}>
      <WindowWidthRow
        // pad={true}
        style={{
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
        <TouchableOpacity
          onPress={() => navigation.navigate("Search Users")}
          style={{
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="user-plus" size={24} color={theme.iconDefault} />
        </TouchableOpacity>

        <T.FancyH1
          style={{ color: theme.purple, paddingBottom: 5, fontSize: 30 }}
        >
          Like Out Loud
        </T.FancyH1>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchThings")}
          style={{
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="edit" size={24} color={theme.iconDefault} />
        </TouchableOpacity>
        {/* <T.H1>Like Out Loud</T.H1> */}
        {/* <T.H3>Recommendations you can trust</T.H3> */}
      </WindowWidthRow>

      <FilterMenu y={y} categories={categories} setCategories={setCategories} />
      {/* <AnimatedLOL y={y} /> */}
      <FilteredRecommendationsList
        recommendations={feed}
        loading={loading}
        refreshing={refreshing}
        refresh={componentDidMount}
        fetchMore={fetchMore}
        filterable={true}
        topPad={true}
        categories={categories}
        y={y}
      />
      {/* <QuickActionProfileButton y={y} /> */}
      {/* <QuickActionCreateButton y={y} /> */}
      <QuickActionToolbar y={y} />
    </Screen>
  );
}

function AnimatedLOL({ y }) {
  const theme = useTheme();
  return (
    <Animated.View
      style={{
        width: theme.windowWidth,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 20,
        position: "absolute",
        top: HEIGHT,
        zIndex: 2,
        opacity: Animated.interpolate(y, {
          inputRange: [0, 50],
          outputRange: [1, 0],
        }),
        transform: [
          {
            translateY: Animated.interpolate(y, {
              inputRange: [0, 400],
              outputRange: [0, -200],
            }),
          },
        ],
      }}
    >
      {/* <Image source={logo} style={{ width: 44, height: 44, paddingTop: 5 }} /> */}
      <T.FancyH1 style={{ color: theme.purple }}>Like Out Loud</T.FancyH1>
    </Animated.View>
  );
}
