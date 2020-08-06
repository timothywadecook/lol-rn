import React from "react";
import { connect } from "react-redux";

import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Services
import client, { recommendationsService } from "./services/feathersClient";
// Screens
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Login from "./screens/Login";
import FriendDetails from "./screens/FriendDetails";
import RecommendationDetails from "./screens/RecommendationDetails";
import Modal from "./screens/Modal";
// Actions
import { login, logout, setAppIsReady } from "./store/userSlice";

const Stack = createStackNavigator();

const mapState = (state) => ({
  appIsReady: state.user.appIsReady,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatch = {
  login,
  setAppIsReady,
  logout,
};

const Router = ({
  appIsReady,
  isAuthenticated,
  login,
  logout,
  setAppIsReady,
}) => {
  const handleAuthenticated = async (response) => {
    login(response.user);
    setAppIsReady();
  }; // done

  React.useEffect(() => {
    client.on("authenticated", handleAuthenticated);
    client.on("logout", () => logout());
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
      <Stack.Navigator initialRouteName={isAuthenticated && "Tabs"}>
        {isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
            <Stack.Screen
              name="RecommendationDetails"
              component={RecommendationDetails}
            />
            <Stack.Screen name="FriendDetails" component={FriendDetails} />
            <Stack.Screen name="Modal" component={Modal} />
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
