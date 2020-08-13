import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import { refreshFeedAsync, fetchMoreFeedAsync } from "../../store/feedSlice";
import { fetchFollowsAsync } from "../../store/followsSlice";
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";

export default function HomeScreen() {
  const feed = useSelector((state) => state.feed.list);
  const loading = useSelector((state) => state.feed.loading);
  const refreshing = useSelector((state) => state.feed.refreshing);
  const sessionUserId = useSelector((state) => state.user._id);

  const dispatch = useDispatch();
  const refresh = () => dispatch(refreshFeedAsync());
  const fetchMore = () => dispatch(fetchMoreFeedAsync());
  const fetchFollows = () => dispatch(fetchFollowsAsync());

  const fetchLists = async () => {
    try {
      const res = await listsService.find({
        query: { participants: sessionUserId, $limit: 1000 },
      });
      dispatch(addLoadedLists(res.data));
    } catch (error) {
      console.log("Error trying to fetch lists for user", userId, error);
    }
  };

  const componentDidMount = async () => {
    await fetchFollows();
    refresh();
    fetchLists();
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
