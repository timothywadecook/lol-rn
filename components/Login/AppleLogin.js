import React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import client from "../../services/feathersClient";

import useTheme from "../../hooks/useTheme";

export default function AppleLogin() {
  const theme = useTheme();
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    const checkIsAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (isAvailable) {
        setHide(false);
      }
    };
    checkIsAvailable();
  }, []);

  const login = async () => {
    try {
      const applePayload = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      client.authenticate({
        strategy: "apple",
        applePayload, // {user, fullName, email, identityToken, authorizationCode}
      });
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
        alert("Apple Login Canceled");
      } else {
        // handle other errors
        alert(`Apple Login Error: ${e.message}`);
      }
    }
  };

  if (hide) {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: theme.windowWidth * 0.8, height: 44 }}
      onPress={login}
    />
  );
}
