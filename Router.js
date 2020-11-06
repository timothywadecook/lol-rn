import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar, View } from "react-native";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Icon } from "react-native-elements";
import BackButton from './components/Atomic/BackButton';
import Avatar from './components/Atomic/Avatar';
// Services
import client from "./services/feathersClient";
import useTheme from './hooks/useTheme';
// Screens
import Login from "./screens/Login";
import CreateOrEditList from "./screens/CreateOrEditList";
import SearchUsers from "./screens/SearchUsers";
import Create from "./screens/Create";
import AddToCollections from "./screens/AddToCollections";
import ThingDetails from "./screens/ThingDetails";
import Profile from "./screens/Profile";
import Tabs from "./screens/Tabs";
// Actions
import { login, setAppIsReady } from "./store/userSlice";
const Stack = createStackNavigator();
const SharedStack = createSharedElementStackNavigator();

export default function Router() {
  const dispatch = useDispatch();
  const { appIsReady, isAuthenticated, theme_preference: theme } =
    useSelector((state) => state.user) || {};

  React.useEffect(() => {
    // Listen for authentication success
    client.on("authenticated", (response) => {
      dispatch(login(response.user));
    });
    // Attempt reAuth from local storage
    client
      .reAuthenticate()
      .then(() => {
        console.log("reauth complete success");
      })
      .catch(() => dispatch(setAppIsReady()));
    return () => {
      client.removeAllListeners();
    };
  }, []);

  if (appIsReady) {
    return (
      <NavigationContainer linking={LinkingConfiguration}>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
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
  }
  return null;
}




function AuthStackScreen() {
  const theme = useTheme();
  const sessionUser = useSelector((state) => state.user);
  const options = ({navigation, route}) => ({
    headerLeft: () => <View style={{flexDirection: 'row', alignItems: 'center'}}><Avatar onPress={()=>navigation.navigate("Profile", {user: sessionUser})} style={{marginLeft: 15}} user={sessionUser} /><Icon
    onPress={() => navigation.navigate("Search Users")}
    name="user-plus"
    color={theme.iconDefault}
    type="feather"
    containerStyle={{ paddingLeft: 15 }}
    /></View> ,
    headerRight: () => <Icon
    onPress={() => navigation.navigate("SearchThings")}
    name="plus-circle"
    color={theme.iconDefault}
    type="feather"
    containerStyle={{ paddingHorizontal: 15 }}
  />,
    headerStyle: {
      backgroundColor: theme.menubg,
      shadowColor: theme.iconBg
      
    },
    headerTintColor: theme.purple,
    headerTitleStyle: {
      fontFamily: 'Noteworthy',
    },
  });

  const nonHomescreenOptions = {headerLeft: ()=> <BackButton />, headerTintColor: theme.primary, headerRight: null }
  return (
    <SharedStack.Navigator screenOptions={options} initialRouteName="Like Out Loud">
      <SharedStack.Screen name="Like Out Loud" component={Tabs} />
      <SharedStack.Screen name="Profile" component={Profile} />
      <SharedStack.Screen name="Create" component={Create} options={nonHomescreenOptions} />
      <SharedStack.Screen name="Search Users" component={SearchUsers} options={nonHomescreenOptions} />
      <SharedStack.Screen name="Details" component={ThingDetails} options={nonHomescreenOptions} />
      <SharedStack.Screen
        name="AddToCollections"
        component={AddToCollections}
        options={nonHomescreenOptions}
      />
      <SharedStack.Screen
        name="CreateOrEditList"
        component={CreateOrEditList}
        options={nonHomescreenOptions}
      />
    </SharedStack.Navigator>
  );
}
