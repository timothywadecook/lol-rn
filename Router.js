import React from "react";
import { connect } from "react-redux";
import { StatusBar } from "react-native";
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
import Profile from "./screens/Tabs/Profile";
import Create from "./screens/Tabs/Create";
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
    setAppIsReady();
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
    return null;
  }
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack.Navigator initialRouteName={isAuthenticated && "Home"}>
        {isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen
              name="RecommendationDetails"
              component={RecommendationDetails}
            />
            <Stack.Screen name="FriendDetails" component={FriendDetails} />
            <Stack.Screen
              name="CreateOrEditList"
              component={CreateOrEditList}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Search Users" component={SearchUsers} />
            <Stack.Screen name="List" component={List} />
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
