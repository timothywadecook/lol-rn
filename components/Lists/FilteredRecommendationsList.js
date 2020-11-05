import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../ListItems/ListItem";
// Animation
import Animated from "react-native-reanimated";
import { onScrollEvent } from "react-native-redash";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// Components
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
  topPad = 0,
  categories,
  y,
  initialNumToRender = 4,
  renderHeader = null,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const onScroll = onScrollEvent({ y: y });

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={refreshing}
        data={recommendations}
        renderItem={renderItem(categories)}
        initialNumToRender={initialNumToRender}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <RenderFooter loading={loading} recommendations={recommendations} />
        }
        ListHeaderComponent={renderHeader}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: topPad,
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default FilteredRecommendationsList;

const keyExtractor = (item) => item;
const renderItem = (categories) => ({ item }) => (
  <ListItem spaced={true} recId={item} categories={categories} />
);

const RenderFooter = ({ loading, recommendations }) => {
  const theme = useTheme();
  return (
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
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
