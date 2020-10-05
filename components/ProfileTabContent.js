import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, View, FlatList } from "react-native";
import ListList from "./Lists/ListList";

import * as T from "./Atomic/StyledText";

import ProfileCard from "./Atomic/ProfileCard";
import Animated from "react-native-reanimated";

import useTheme from "../hooks/useTheme";
import FilteredRecommendationsList from "./Lists/FilteredRecommendationsList";
import SelectableUserAddNew from "./ListItems/SelectableUserAddNew";
import SelectableUser from "./ListItems/SelectableUser";
import { useNavigation } from "@react-navigation/native";
import { recommendationsService } from "../services/feathersClient";
import { addLoadedRecommendations } from "../store/recommendationsSlice";

export default function ProfileTabContent({ userId, followers, following }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const sessionUserId = useSelector((state) => state.user._id);
  const isSessionUser = sessionUserId === userId;

  const openFriendDetails = (user) => {
    if (user._id === sessionUserId) {
      navigation.navigate("Profile");
    } else {
      navigation.push("FriendDetails", { friend: user });
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState([]);
  const [moreToFetch, setMoreToFetch] = React.useState(true);

  const fetchMore = async () => {
    if (!loading && !refreshing && !!userId && moreToFetch) {
      try {
        setLoading(true);
        const res = await recommendationsService.find({
          query: {
            creator: userId,
            $limit: 20,
            $skip: recommendations.length,
            $sort: { createdAt: -1 },
            $or: [
              { isPublic: true },
              { directRecipients: sessionUserId },
              { creator: sessionUserId },
            ],
          },
        });
        dispatch(addLoadedRecommendations(res.data));
        setRecommendations([...recommendations, ...res.data.map((r) => r._id)]);
        setMoreToFetch(res.total > res.skip);
      } catch (e) {
        console.log("error fetching recs for ThingDetails", thing, e);
      }
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!loading && !refreshing && !!userId && moreToFetch) {
      try {
        setRefreshing(true);
        const res = await recommendationsService.find({
          query: {
            creator: userId,
            $limit: 20,
            $sort: { createdAt: -1 },
            $or: [
              { isPublic: true },
              { directRecipients: sessionUserId },
              { creator: sessionUserId },
            ],
          },
        });
        dispatch(addLoadedRecommendations(res.data));
        setRecommendations(res.data.map((r) => r._id));
        setMoreToFetch(res.total > res.data.length);
      } catch (e) {
        console.log("error fetching recs for ThingDetails", thing, e);
      }
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    refresh();
  }, [userId]);

  const y = React.useMemo(() => new Animated.Value(0), []);

  const renderHeader = () => (
    <View style={{ alignItems: "center" }}>
      <T.H4 style={{ paddingTop: 20 }}>Friends</T.H4>

      <ProfileCard title="Following">
        <View>
          <FlatList
            initialNumToRender={6}
            data={following}
            renderItem={({ item: user }) => (
              <SelectableUser
                selectable={false}
                user={user}
                onSelect={() => openFriendDetails(user)}
                onUnselect={() => console.log("unselect")}
              />
            )}
            ListFooterComponent={() =>
              isSessionUser && <SelectableUserAddNew />
            }
            ListEmptyComponent={() =>
              !isSessionUser && (
                <T.H2 style={{ fontWeight: "normal", padding: 10 }}>
                  Following 0 Users
                </T.H2>
              )
            }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ProfileCard>

      <ProfileCard title="Followers">
        <View>
          <FlatList
            initialNumToRender={6}
            data={followers}
            renderItem={({ item: user }) => (
              <SelectableUser
                selectable={false}
                user={user}
                onSelect={() => openFriendDetails(user)}
              />
            )}
            ListEmptyComponent={() => (
              <T.H2 style={{ fontWeight: "normal", padding: 10 }}>
                0 Followers
              </T.H2>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ProfileCard>
      <T.H4 style={{ paddingTop: 10 }}>Lists</T.H4>

      <ListList userId={userId} />

      {/* <T.H4 style={{ paddingTop: 20, paddingBottom: 10 }}>Recommendations</T.H4> */}
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      {renderHeader()}
      {/* <FilteredRecommendationsList
        loading={loading}
        fetchMore={fetchMore}
        refresh={refresh}
        refreshing={refreshing}
        recommendations={recommendations}
        categories={[]}
        y={y}
        renderHeader={renderHeader}
        initialNumToRender={1}
      /> */}
    </ScrollView>
  );
}
