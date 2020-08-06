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
}) => {
  const [category, setCategory] = useState("All");

  const theme = useTheme();
  const styles = getStyles(theme);

  const data =
    category === "All"
      ? recommendations
      : recommendations.filter(
          (r) => r.thing.category === category.slice(0, category.length - 1)
        );

  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={refreshing}
        data={data}
        renderItem={({ item }) => <ListItem spaced={true} {...item} />}
        initialNumToRender={4}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
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
      backgroundColor: theme.wallbg,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
