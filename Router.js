import React from "react";
import { connect } from "react-redux";
import { StatusBar, Text, View } from "react-native";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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
import Network from "./screens/Network";
// Actions
import { login, setAppIsReady } from "./store/userSlice";

const Stack = createStackNavigator();

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
        initialRouteName={"Home"}
      >
        {isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="RecommendationDetails"
              component={RecommendationDetails}
            />
            <Stack.Screen name="FriendDetails" component={FriendDetails} />
            <Stack.Screen
              name="CreateOrEditList"
              component={CreateOrEditList}
            />

            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Search Users" component={SearchUsers} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Collections" component={Collections} />
            <Stack.Screen name="SearchThings" component={SearchThings} />
            <Stack.Screen name="ThingDetails" component={ThingDetails} />
            <Stack.Screen
              name="AddToCollections"
              component={AddToCollections}
            />
            <Stack.Screen name="Network" component={Network} />
          </React.Fragment>
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
