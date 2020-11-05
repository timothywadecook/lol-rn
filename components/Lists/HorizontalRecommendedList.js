import React from "react";
import { View, FlatList } from "react-native";
import ProfileCard from "../Atomic/ProfileCard";

import { recommendationsService } from "../../services/feathersClient";
import ThingCard, { ThingCardAdd } from "../ListItems/ThingCard";

import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";

export default function HorizontalRecommendedList({
  userId,
  title = "Recommended",
  canCreate,
}) {
  const theme = useTheme();

  const {
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  } = useListService(recommendationsService, {
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
    <ProfileCard title={title} subtitle={`${total} things`}>
      <View style={{ width: theme.windowWidth }}>
        {!refreshing ? (
          <FlatList
            // ListHeaderComponent={<ThingCardAdd />}
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
