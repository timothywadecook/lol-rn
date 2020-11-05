import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform, TouchableOpacity, View, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
// Components
import * as T from "../components/Atomic/StyledText";
import Screen from "../components/Wrappers/Screen";
import SectionHeader from "../components/Atomic/SectionHeader";
import { ListItem, Icon, Button } from "react-native-elements";
// State Management
import { fetchFollowsAsync } from "../store/followsSlice";
import { addLoadedLists } from "../store/listsSlice";
// Services
import { listsService, usersService } from "../services/feathersClient";
// Hooks
import useTheme from "../hooks/useTheme";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
// PUSH NOTIFICATIONS
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";

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
      <HomeHeader />
      <RenderHome />
    </Screen>
  );
}

function HomeHeader() {
  const theme = useTheme();
  return (
    <WindowWidthRow
      blur={true}
      style={{
        justifyContent: "space-between",
      }}
      pad={true}
      topPad={true}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Icon
          name="settings"
          type="feather"
          color="transparent"
          reverse
          reverseColor={theme.iconDefault}
          containerStyle={{ margin: 0 }}
        />
      </View>
      <Button
        icon={<Icon name="plus" color={theme.purple} type="feather" />}
        title="Add Item"
        titleStyle={{ color: theme.purple }}
        type="clear"
      />
    </WindowWidthRow>
  );
}

function ContainerCard({ children, style, onPress }) {
  const theme = useTheme();
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      onPress={onPress}
      style={{
        margin: 10,
        padding: 15,
        backgroundColor: theme.iconBg,
        flex: 1,
        borderRadius: 10,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

function SpotifyCard({ title, subtitle, onPress, color, iconColor, icon }) {
  const theme = useTheme();
  return (
    <ContainerCard
      onPress={onPress}
      style={{ backgroundColor: color, paddingBottom: 30, overflow: "hidden" }}
    >
      <T.Title>{title}</T.Title>
      {subtitle && <T.H3>{subtitle}</T.H3>}
      <View
        style={{
          position: "absolute",
          bottom: -5,
          right: -5,
          transform: [{ rotate: "-10deg" }],
        }}
      >
        <Icon
          type="feather"
          name={icon}
          containerStyle={{ alignSelf: "flex-end" }}
          color={iconColor ? iconColor : theme.primary}
          size={60}
        />
      </View>
    </ContainerCard>
  );
}

function RenderHome() {
  const navigation = useNavigation();
  const theme = useTheme();
  const sessionUserId = useSelector((state) => state.user._id);
  const lists = useSelector((state) => state.lists);
  const listIds = Object.keys(lists).filter((id) =>
    lists[id].participants.includes(sessionUserId)
  );

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <WindowWidthRow style={{ paddingTop: 40 }}>
        <SpotifyCard
          title="Browse"
          color={theme.softpurple}
          iconColor={theme.softpurplelight}
          icon="search"
        />
        <SpotifyCard
          title="Nearby"
          color={theme.softred}
          iconColor={theme.softredlight}
          icon="map"
        />
      </WindowWidthRow>
      <WindowWidthRow>
        <SpotifyCard
          title="Recommendations"
          color={theme.purpledark}
          iconColor={theme.purplelight}
          icon="thumbs-up"
          onPress={() => navigation.navigate("Recommendations")}
        />
      </WindowWidthRow>

      <SectionHeader title="My Lists">
        <Button
          title="New List"
          type="clear"
          titleStyle={{ color: theme.purple }}
        />
      </SectionHeader>
      <WindowWidthRow>
        <ContainerCard>
          {listIds.map((id, i) => (
            <ListItem
              containerStyle={{
                backgroundColor: "transparent",
                borderBottomColor: theme.iconDefault,
              }}
              key={id}
              bottomDivider={i !== listIds.length - 1}
            >
              <Icon color={theme.purple} name="list" />
              <ListItem.Content>
                <ListItem.Title style={{ color: theme.primary }}>
                  {lists[id].name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ContainerCard>
      </WindowWidthRow>

      <SectionHeader title="Group Lists" />
      <WindowWidthRow>
        <SpotifyCard
          title="Build lists together"
          subtitle="Learn more"
          icon="users"
          iconColor={theme.purpledark}
          color={theme.purple}
        />
      </WindowWidthRow>
    </ScrollView>
  );
}
