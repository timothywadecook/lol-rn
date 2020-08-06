import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import {
  refreshRecommendationsAsync,
  fetchMoreRecommendationsAsync,
} from "../../store/recommendationsSlice";
import { fetchLikesAsync } from "../../store/likesSlice";

export default function HomeScreen() {
  const recommendations = useSelector((state) => state.recommendations.list);
  const loading = useSelector((state) => state.recommendations.loading);
  const refreshing = useSelector((state) => state.recommendations.refreshing);

  const dispatch = useDispatch();
  const fetchLikes = () => dispatch(fetchLikesAsync());
  const refresh = () => dispatch(refreshRecommendationsAsync());
  const fetchMore = () => dispatch(fetchMoreRecommendationsAsync());

  const componentDidMount = () => {
    fetchLikes();
    refresh();
    SplashScreen.hideAsync();
  };
  useEffect(componentDidMount, []);

  return (
    <FilteredRecommendationsList
      recommendations={recommendations}
      loading={loading}
      refreshing={refreshing}
      refresh={componentDidMount}
      fetchMore={fetchMore}
      filterable={true}
      topPad={true}
    />
  );
}
