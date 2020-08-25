import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../ListItems/ListItem";

import ActivityIndicatorCentered from "../Atomic/ActivityIndicatorCentered";
import FilterMenu from "../FilterMenu";
import * as T from "../Atomic/StyledText";

import useTheme from "../../hooks/useTheme";

const FilteredRecommendationsList = ({
  loading,
  fetchMore,
  refresh,
  refreshing,
  recommendations,
  filterable = false,
  topPad = false,
  categories,
  horizontal = false,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <FlatList
        snapToAlignment={horizontal ? "center" : null}
        snapToInterval={horizontal ? theme.windowWidth : null}
        decelerationRate={horizontal ? "fast" : null}
        horizontal={horizontal}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={refreshing}
        data={recommendations}
        renderItem={({ item }) => (
          <ListItem
            horizontal={horizontal}
            spaced={true}
            recId={item}
            categories={categories}
          />
        )}
        initialNumToRender={4}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        ListFooterComponent={() =>
          loading ? <ActivityIndicatorCentered size="small" /> : null
        }
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
