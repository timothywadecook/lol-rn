import React from "react";
import { connect } from "react-redux";
import { StatusBar, Text, View } from "react-native";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
// Services
import client from "./services/feathersClient";
// Screens
import Login from "./screens/Login";
import FriendDetails from "./screens/FriendDetails";
import RecommendationDetails from "./screens/RecommendationDetails";
import CreateOrEditList from "./screens/CreateOrEditList";
import SearchUsers from "./screens/SearchUsers";
import List from "./screens/List";
import Home from "./screens/Tabs/Home";
import Create from "./screens/Tabs/Create";
import Collections from "./screens/Collections";
import AddToCollections from "./screens/AddToCollections";
import SearchThings from "./screens/SearchThings";
import ThingDetails from "./screens/ThingDetails";
import Profile from "./screens/Profile";
// Actions
import { login, setAppIsReady } from "./store/userSlice";

const Stack = createStackNavigator();
const SharedStack = createSharedElementStackNavigator();

const mapState = (state) => ({
  appIsReady: state.user.appIsReady,
  isAuthenticated: state.user.isAuthenticated,
  theme: state.user.theme_preference,
});

const mapDispatch = {
  login,
  setAppIsReady,
};

const Router = ({
  appIsReady,
  isAuthenticated,
  login,
  setAppIsReady,
  theme,
}) => {
  const handleAuthenticated = async (response) => {
    login(response.user);
  }; // done

  React.useEffect(() => {
    client.on("authenticated", handleAuthenticated);
    client
      .reAuthenticate()
      .then(() => {
        console.log("reauth complete success");
      })
      .catch(() => setAppIsReady());
    return () => {
      client.removeAllListeners();
    };
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ marginTop: 50 }}>Close the app and reopen it.</Text>
      </View>
    );
  }

  const AuthStackScreen = () => (
    <SharedStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureResponseDistance: {
          horizontal: 350,
          vertical: 500,
        },
      }}
      initialRouteName="Home"
    >
      <SharedStack.Screen name="Home" component={Home} />
      <SharedStack.Screen
        name="RecommendationDetails"
        component={RecommendationDetails}
      />
      <SharedStack.Screen name="FriendDetails" component={FriendDetails} />
      <SharedStack.Screen
        name="CreateOrEditList"
        component={CreateOrEditList}
      />

      <SharedStack.Screen name="Create" component={Create} />
      <SharedStack.Screen name="Search Users" component={SearchUsers} />
      <SharedStack.Screen name="List" component={List} />
      <SharedStack.Screen name="Collections" component={Collections} />
      <SharedStack.Screen name="SearchThings" component={SearchThings} />
      <SharedStack.Screen name="ThingDetails" component={ThingDetails} />
      <SharedStack.Screen
        name="AddToCollections"
        component={AddToCollections}
      />
      <SharedStack.Screen name="Profile" component={Profile} />
    </SharedStack.Navigator>
  );

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 350,
            vertical: 500,
          },
        }}
        initialRouteName={"Auth"}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStackScreen} />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              animationTypeForReplace: "push",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(mapState, mapDispatch)(Router);
