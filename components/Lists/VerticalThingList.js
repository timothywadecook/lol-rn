import React from "react";
import { FlatList, View } from "react-native";
import ThingCard from "../ListItems/ThingCard";
import * as T from "../Atomic/StyledText";
//
import useTheme from "../../hooks/useTheme";
// Animation
import Animated from "react-native-reanimated";
import { onScrollEvent } from "react-native-redash";
import WindowWidthRow from "../Wrappers/WindowWidthRow";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function VerticalThingList({
  name = "Recent",
  data,
  refresh,
  refreshing,
  fetchMore,
  loading,
  moreAvailable,
  total,
  y = { y },
  bounces = true,
}) {
  const onScroll = onScrollEvent({ y: y });
  const theme = useTheme();

  const renderHeader = () => (
    <WindowWidthRow pad={true}>
      <T.Title>{name}</T.Title>
    </WindowWidthRow>
  );
  const renderItem = ({ item: thing }) => (
    <ThingCard thing={thing} sizeDivider={2.5} />
  );

  const placeholderData = [
    { _id: "abcde1", image: "true", title: "Loading...\n " },
    { _id: "abcde2", image: "true", title: "Loading..." },
    { _id: "abcde3", image: "true", title: "Loading..." },
    { _id: "abcde4", image: "true", title: "Loading..." },
    { _id: "abcde5", image: "true", title: "Loading..." },
  ];

  return refreshing ? (
    <FlatList
      // ListHeaderComponent={renderHeader}
      numColumns={2}
      initialNumToRender={6}
      keyboardShouldPersistTaps="handled"
      data={placeholderData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        alignItems: "center",
        alignSelf: "center",
        paddingBottom: 100,
        paddingTop: theme.topPad + 65,
      }}
    />
  ) : (
    <AnimatedFlatList
      bounces={bounces}
      onScroll={onScroll}
      // ListHeaderComponent={renderHeader}
      // stickyHeaderIndices={[0]}
      scrollEventThrottle={16}
      initialNumToRender={10}
      keyboardShouldPersistTaps="handled"
      data={data}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, i) => item._id + i}
      onEndReached={fetchMore}
      // refreshing={refreshing}
      // onRefresh={refresh}
      loading={loading}
      contentContainerStyle={{
        alignItems: "center",
        alignSelf: "center",
        paddingBottom: 100,
        paddingTop: theme.topPad + 65,
      }}
    />
  );
}
