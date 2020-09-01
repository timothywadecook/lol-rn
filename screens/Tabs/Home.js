import React, { useEffect } from "react";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
// Components
import Screen from "../../components/Wrappers/Screen";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import FilterMenu from "../../components/FilterMenu";
import QuickActionCreateButton from "../../components/Buttons/QuickActionCreateButton";
import QuickActionProfileButton from "../../components/Buttons/QuickActionProfileButton";
// State Management
import { refreshFeedAsync, fetchMoreFeedAsync } from "../../store/feedSlice";
import { fetchFollowsAsync } from "../../store/followsSlice";
import { addLoadedLists } from "../../store/listsSlice";
// Services
import { listsService } from "../../services/feathersClient";
// Animation
import Animated from "react-native-reanimated";
import { HEIGHT } from "../../components/FilterMenu";
// LOL
import * as T from "../../components/Atomic/StyledText";
import logo from "../../assets/logo.png";
// Hooks
import useTheme from "../../hooks/useTheme";

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
    console.log("do we even have sessionUserId?", sessionUserId);
    await fetchFollows();
    refresh();
    fetchLists();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  const [categories, setCategories] = React.useState([]);
  const y = React.useMemo(() => new Animated.Value(0), []);
  return (
    <Screen fullscreen={true}>
      <FilterMenu y={y} categories={categories} setCategories={setCategories} />
      <AnimatedLOL y={y} />
      <FilteredRecommendationsList
        recommendations={feed}
        loading={loading}
        refreshing={refreshing}
        refresh={componentDidMount}
        fetchMore={fetchMore}
        filterable={true}
        topPad={true}
        categories={categories}
        y={y}
      />
      <QuickActionProfileButton y={y} />
      <QuickActionCreateButton y={y} />
    </Screen>
  );
}

function AnimatedLOL({ y }) {
  const theme = useTheme();
  return (
    <Animated.View
      style={{
        width: theme.windowWidth,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 20,
        position: "absolute",
        top: HEIGHT,
        zIndex: 2,
        opacity: Animated.interpolate(y, {
          inputRange: [0, 50],
          outputRange: [1, 0],
        }),
        transform: [
          {
            translateY: Animated.interpolate(y, {
              inputRange: [0, 400],
              outputRange: [0, -200],
            }),
          },
        ],
      }}
    >
      <Image source={logo} style={{ width: 44, height: 44, paddingTop: 5 }} />
      <T.FancyH1 style={{ color: theme.purple }}>Like Out Loud</T.FancyH1>
    </Animated.View>
  );
}
