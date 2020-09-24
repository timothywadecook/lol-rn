import React from "react";
import { useSelector } from "react-redux";
// Components
import { View, TouchableWithoutFeedback, Image } from "react-native";
import * as T from "../Atomic/StyledText";
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
// Helper
import moment from "moment";
import UserListItem from "./UserListItem";
import { Feather, Entypo } from "@expo/vector-icons";

export default function PressableListItem({ recId, categories }) {
  const theme = useTheme();
  navigation = useNavigation();

  const r = useSelector((state) => state.recommendations[recId]);
  const sessionUserId = useSelector((state) => state.user._id);

  const openDetails = () => {
    navigation.navigate("RecommendationDetails", {
      recId,
    });
  };

  // FILTER BY CATEGORY
  if (categories && categories.length > 0) {
    const show = categories.includes(r.thing.category + "s");
    if (!show) {
      return null;
    }
  }

  const [revealDetails, setRevealDetails] = React.useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={openDetails}
      onLongPress={() => setRevealDetails(!revealDetails)}
      //   onPressOut={() => setRevealDetails(false)}
    >
      <View
        style={{
          width: theme.windowWidth * 0.9,
          height: theme.windowWidth * 1,
          borderRadius: theme.windowWidth * 0.05,
          overflow: "hidden",
          margin: 15,
          backgroundColor: theme.wallbg,
          shadowRadius: 3,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        {revealDetails ? (
          <RecommendationInfo r={r} />
        ) : (
          <ThingImage thing={r.thing} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

function ThingImage({ thing }) {
  const { image, title } = thing;
  const theme = useTheme();
  return (
    <View>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            resizeMode: "cover",
            width: theme.windowWidth * 0.4,
            height: theme.windowWidth * 0.6,
          }}
        />
      ) : (
        <View
          style={{
            width: theme.windowWidth * 0.4,
            height: theme.windowWidth * 0.6,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.iconBg,
          }}
        >
          {thing.category === "Place" && <PlaceIcon size={20} />}
          <T.Title>{title}</T.Title>
        </View>
      )}
    </View>
  );
}

function RecommendationInfo({ r }) {
  return (
    <View style={{ padding: 15 }}>
      <UserListItem user={r.creator} lean={true}>
        <T.H4>{moment(r.createdAt).fromNow()}</T.H4>
      </UserListItem>
      <T.FancyH1 style={{ fontSize: 24, marginVertical: 20 }}>
        {r.main_comment}
      </T.FancyH1>
    </View>
  );
}

function PlaceIcon({ size = 50 }) {
  const theme = useTheme();

  return <Entypo name="location-pin" size={size} color={theme.red} />;
}
