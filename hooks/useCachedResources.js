import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load logo
        await Asset.loadAsync(require("../assets/logo.png"));

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...Feather.font,
          ...Entypo.font,
          Noteworthy: require("../assets/fonts/Noteworthy-Lt.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
