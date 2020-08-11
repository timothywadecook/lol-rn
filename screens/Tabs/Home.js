import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import { refreshFeedAsync, fetchMoreFeedAsync } from "../../store/feedSlice";
import { fetchFollowsAsync } from "../../store/followsSlice";

export default function HomeScreen() {
  const feed = useSelector((state) => state.feed.list);
  const loading = useSelector((state) => state.feed.loading);
  const refreshing = useSelector((state) => state.feed.refreshing);

  const dispatch = useDispatch();
  const refresh = () => dispatch(refreshFeedAsync());
  const fetchMore = () => dispatch(fetchMoreFeedAsync());
  const fetchFollows = () => dispatch(fetchFollowsAsync());

  const componentDidMount = async () => {
    await fetchFollows();
    refresh();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <FilteredRecommendationsList
      recommendations={feed}
      loading={loading}
      refreshing={refreshing}
      refresh={componentDidMount}
      fetchMore={fetchMore}
      filterable={true}
      topPad={true}
    />
  );
}
