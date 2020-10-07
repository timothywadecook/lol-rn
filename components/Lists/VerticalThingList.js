import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
//
import { SharedElement } from "react-navigation-shared-element";

export default function HorizontalThingList({
  name = "Recent",
  data,
  refresh,
  refreshing,
  fetchMore,
  loading,
  moreAvailable,
  total,
}) {
  return (
    <ProfileCard title={name}>
      <FlatList
        contentContainerStyle={{ alignSelf: "center", paddingBottom: 100 }}
        initialNumToRender={10}
        keyboardShouldPersistTaps="handled"
        data={data}
        renderItem={({ item: thing }) => <ThingCard thing={thing} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => item._id + i}
        onEndReached={fetchMore}
        refreshing={refreshing}
        onRefresh={refresh}
        loading={loading}
      />
    </ProfileCard>
  );
}

function ThingCard({ thing }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / 2.5;
  const maxHeight = size * 2.18;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        maxHeight: maxHeight,
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
        {image ? (
          <SharedElement id={`image-${thing._id}`}>
            <Image
              source={{ uri: image }}
              style={{
                resizeMode: "cover",
                width: size,
                height: size * 1.4,
                borderRadius: 15,
              }}
            />
          </SharedElement>
        ) : thing.category === "Place" ? (
          <View
            style={{
              width: size,
              height: size * 1.4,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.iconBg,
            }}
          >
            <PlaceIcon size={size / 2.5} />
          </View>
        ) : null}
      </View>
      <SharedElement id={`title-${thing._id}`}>
        <T.P style={{ paddingBottom: 0 }}>{title}</T.P>
      </SharedElement>
    </TouchableOpacity>
  );
}

function PlaceIcon({ size = 50 }) {
  const theme = useTheme();

  return <Entypo name="location-pin" size={size} color={theme.red} />;
}
