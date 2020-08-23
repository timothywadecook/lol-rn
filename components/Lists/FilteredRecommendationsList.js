import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import SingleFilterButtonSpan from "../SingleFilterButtonSpan";
import ListItem from "../ListItems/ListItem";

import ActivityIndicatorCentered from "../Atomic/ActivityIndicatorCentered";

import useTheme from "../../hooks/useTheme";

const FilteredRecommendationsList = ({
  loading,
  fetchMore,
  refresh,
  refreshing,
  recommendations,
  filterable = false,
  topPad = false,
  horizontal = false,
}) => {
  const [category, setCategory] = useState("All");

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
            category={category}
          />
        )}
        initialNumToRender={4}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        ListFooterComponent={() =>
          loading ? <ActivityIndicatorCentered size="small" /> : null
        }
        ListHeaderComponent={() => (
          <View
            style={{
              paddingTop: topPad ? 40 : 0,
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            {filterable && (
              <SingleFilterButtonSpan
                options={["All", "Movies", "Shows", "Books", "Places"]}
                filter={category}
                setFilter={setCategory}
              />
            )}
          </View>
        )}
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
