import React from "react";
import { View, Text } from "react-native";
import useTheme from "../hooks/useTheme";

////////////////////////////////////////////////////////////////////////////////
// navigation.navigate("Modal", { message: "my message to you", duration: 3500});
////////////////////////////////////////////////////////////////////////////////

export default function Modal({ navigation, route }) {
  navigation.setOptions({
    headerShown: false,
  });
  const { message, duration = 3000 } = route.params;

  const theme = useTheme();

  // We want the modal to auto disappear after duration seconds
  React.useEffect(() => {
    setTimeout(() => navigation.goBack(), duration);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // opacity: 0.3,
        backgroundColor: theme.wallbg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.primary, width: "60%" }}>{message}</Text>
    </View>
  );
}

// View style={styles.container}>
//         <Image
//           source={logo}
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 50,
//             margin: 20,
//           }}
//         />
//         <FancyH1>Great recommendation!</FancyH1>
//         <Text style={{ color: theme.primary, padding: 20 }}>
//           Your friends are very lucky to know you :)
//         </Text>
//       </View>
