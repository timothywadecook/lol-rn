import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { recommendationsService } from "../../services/feathersClient";
import ThingImage from "../Atomic/ThingImage";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";

import AnimateExpand from "../Wrappers/AnimateExpand";

export default function HorizontalRecommendedList({
  userId,
  canCreate,
  autoOpen = true,
  openDelay = 0,
}) {
  const theme = useTheme();

  const [
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  ] = useListService(recommendationsService, {
    creator: userId,
  });

  if (total === 0 && !canCreate) {
    return null;
  }

  const placeholderData = [
    { _id: "abc1", image: "true", title: "Loading...\n " },
    { _id: "abc2", image: "true", title: "Loading..." },
    { _id: "abc3", image: "true", title: "Loading..." },
    { _id: "abc4", image: "true", title: "Loading..." },
    { _id: "abc5", image: "true", title: "Loading..." },
  ];

  return (
    <ProfileCard
      onPressHeader={() => {
        setLoaded(true);
        setShow(!show);
      }}
      renderRightChild={() => (
        <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      )}
      title={`Recommended`}
      subtitle={`${total} things`}
    >
      <View style={{ width: theme.windowWidth }}>
        {!refreshing ? (
          <FlatList
            keyboardShouldPersistTaps="handled"
            renderItem={({ item: thing }) => <ThingCard thing={thing} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, i) => item._id + i}
            data={data.map((r) => r.thing)}
            onEndReached={fetchMore}
            loading={loading}
          />
        ) : (
          <FlatList
            keyboardShouldPersistTaps="handled"
            renderItem={({ item: thing }) => <ThingCard thing={thing} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, i) => item._id + i}
            data={placeholderData}
            onEndReached={fetchMore}
            loading={loading}
          />
        )}
      </View>
    </ProfileCard>
  );
}

function ThingCard({ thing }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / 5;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        width: size,
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: size,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        <ThingImage transition={false} size={size} thing={thing} />
      </View>

      <T.P style={{ paddingBottom: 0 }}>{title}</T.P>
    </TouchableOpacity>
  );
}
