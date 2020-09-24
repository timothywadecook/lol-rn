import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../ListItems/ListItem";
// Animation
import Animated from "react-native-reanimated";
import { onScrollEvent } from "react-native-redash";
import { HEIGHT } from "../FilterMenu";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// Components
import PressableListItem from "../ListItems/PressableListItem";
import ActivityIndicatorCentered from "../Atomic/ActivityIndicatorCentered";
import * as T from "../Atomic/StyledText";
// Hooks
import useTheme from "../../hooks/useTheme";

const FilteredRecommendationsList = ({
  loading,
  fetchMore,
  refresh,
  refreshing,
  recommendations,
  topPad = false,
  categories,
  y,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const renderItem = ({ item }) => (
    <ListItem spaced={true} recId={item} categories={categories} />
    // <PressableListItem recId={item} categories={categories} />
  );

  const renderFooter = () => (
    <View
      style={{
        paddingVertical: 30,
        width: theme.windowWidth,
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicatorCentered size="small" />
      ) : recommendations.length > 0 ? (
        <T.H2>The End</T.H2>
      ) : null}
    </View>
  );

  // const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
  //   useNativeDriver: true,
  // });

  const onScroll = onScrollEvent({ y: y });

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={refreshing}
        data={recommendations}
        renderItem={renderItem}
        initialNumToRender={4}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        bounces={true}
        // onScrollEndDrag={onScroll}
        onScroll={onScroll}
        scrollEventThrottle={16}
        maintainVisibleContentPosition={{
          minIndexForVisible: 1,
          autoscrollToTopThreshold: 3,
        }}
        contentContainerStyle={{
          paddingTop: topPad ? HEIGHT + 50 : 0,
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default FilteredRecommendationsList;

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
