import React from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FilteredRecommendationsList from "../components/Lists/FilteredRecommendationsList";
import FilterMenu from "../components/FilterMenu";
import NewThingInputPrompt from "../components/Inputs/NewThingInputPrompt";
import useTheme from "../hooks/useTheme";
// Animation
import Animated from "react-native-reanimated";
// Store
import { refreshFeedAsync, fetchMoreFeedAsync } from "../store/feedSlice";

export default function Recommendations() {
  const feed = useSelector((state) => state.feed.list);
  const loading = useSelector((state) => state.feed.loading);
  const refreshing = useSelector((state) => state.feed.refreshing);

  const dispatch = useDispatch();
  const refresh = () => dispatch(refreshFeedAsync());
  const fetchMore = () => dispatch(fetchMoreFeedAsync());

  const theme = useTheme();

  React.useEffect(() => {
    refresh();
  }, []);

  const [categories, setCategories] = React.useState([]);
  const y = React.useMemo(() => new Animated.Value(0), []);
  return (
    <View>
      {/* <NewThingInputPrompt y={y} dy={180} top={0} /> */}
      <FilteredRecommendationsList
        recommendations={feed}
        loading={loading}
        refreshing={refreshing}
        refresh={refresh}
        fetchMore={fetchMore}
        categories={categories}
        y={y}
        topPad={0}
        renderHeader={
          <RenderHeader
            y={y}
            categories={categories}
            setCategories={setCategories}
          />
        }
      />
    </View>
  );
}

function RenderHeader({ y, categories, setCategories }) {
  return (
    <View>
      <FilterMenu
        p={true}
        y={y}
        categories={categories}
        setCategories={setCategories}
      />
    </View>
  );
}
