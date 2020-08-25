import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Image } from "react-native";
import FilteredRecommendationsList from "../../components/Lists/FilteredRecommendationsList";
import { refreshFeedAsync, fetchMoreFeedAsync } from "../../store/feedSlice";
import { fetchFollowsAsync } from "../../store/followsSlice";
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";

import FilterMenu from "../../components/FilterMenu";

import useTheme from "../../hooks/useTheme";
// quick action
import { Feather, Ionicons } from "@expo/vector-icons";

//
import Screen from "../../components/Wrappers/Screen";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });

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

  const [categories, setCategories] = React.useState([]);
  return (
    <Screen fullscreen={false}>
      {/* <FeedHeader showFilter={showFilter} setShowFilter={setShowFilter} /> */}
      <FilterMenu categories={categories} setCategories={setCategories} />
      <FilteredRecommendationsList
        recommendations={feed}
        loading={loading}
        refreshing={refreshing}
        refresh={componentDidMount}
        fetchMore={fetchMore}
        filterable={true}
        topPad={false}
        categories={categories}
      />
      <QuickActionProfileButton />
      <QuickActionCreateButton />
    </Screen>
  );
}

function QuickActionCreateButton() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.purple,
        shadowColor: theme.wallbg,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        borderRadius: 30,
        position: "absolute",
        right: 40,
        bottom: 40,
        zIndex: 3,
        elevation: 3,
      }}
      onPress={() => navigation.navigate("Create")}
    >
      <Ionicons name="md-create" size={30} color={theme.white} />
    </TouchableOpacity>
  );
}

function QuickActionProfileButton() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.iconDefault,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: 20,
        position: "absolute",
        right: 40,
        bottom: 120,
        zIndex: 3,
        elevation: 3,
      }}
      onPress={() => navigation.navigate("Profile")}
    >
      <Feather name="user" size={28} color={theme.white} />
    </TouchableOpacity>
  );
}
