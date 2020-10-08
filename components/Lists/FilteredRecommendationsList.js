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

  const renderItem = ({ item }) => (
    <ListItem spaced={true} recId={item} categories={categories} />
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
        initialNumToRender={initialNumToRender}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
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

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
