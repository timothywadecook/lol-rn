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
  data,
  refresh,
  refreshing,
  fetchMore,
  loading,
  initialNumToRender=10,
  numColumns = 2,
  y = { y },
  bounces = true,
  topPad = 10,
  renderHeader=null
}) {
  const onScroll = onScrollEvent({ y: y });
  const theme = useTheme();

  const renderItem = ({ item: thing }) => (
    <ThingCard thing={thing} sizeDivider={numColumns + 0.7} />
  );

  const placeholderData = [
    { _id: "abcde1", image: "true", title: "Loading...\n " },
    { _id: "abcde2", image: "true", title: "Loading..." },
    { _id: "abcde3", image: "true", title: "Loading..." },
    { _id: "abcde4", image: "true", title: "Loading..." },
    { _id: "abcde5", image: "true", title: "Loading..." },
    { _id: "abcde6", image: "true", title: "Loading..." },
    { _id: "abcde7", image: "true", title: "Loading..." },
    { _id: "abcde8", image: "true", title: "Loading..." },
    { _id: "abcde9", image: "true", title: "Loading..." },
    { _id: "abcde10", image: "true", title: "Loading..." },
  ];

  return refreshing ? (
    <FlatList
      ListHeaderComponent={renderHeader}
      numColumns={numColumns}
      initialNumToRender={initialNumToRender}
      keyboardShouldPersistTaps="handled"
      data={placeholderData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        alignItems: "center",
        alignSelf: "center",
        paddingBottom: 100,
        paddingTop: topPad,
      }}
    />
  ) : (
    <AnimatedFlatList
    ListHeaderComponent={renderHeader}
      bounces={bounces}
      onScroll={onScroll}
      scrollEventThrottle={16}
      initialNumToRender={initialNumToRender}
      keyboardShouldPersistTaps="handled"
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, i) => item._id + i}
      onEndReached={fetchMore}
      loading={loading}
      contentContainerStyle={{
        width: theme.windowWidth,
        alignItems: "center",
        paddingBottom: 100,
        paddingTop: topPad,
      }}
    />
  );
}
