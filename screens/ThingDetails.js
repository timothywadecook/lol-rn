import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import * as T from "../components/Atomic/StyledText";
import Screen from "../components/Wrappers/Screen";
import BackButton from "../components/Atomic/BackButton";
import RoundButton from "../components/Buttons/RoundButton";
import ThingImage from "../components/Atomic/ThingImage";
import FilteredRecommendationsList from "../components/Lists/FilteredRecommendationsList";
import { recommendationsService } from "../services/feathersClient";
import { useNavigation } from "@react-navigation/native";
import useThingId from "../hooks/useThingId";
import Animated from "react-native-reanimated";
import IconButtons from "../components/Buttons/IconButtons";
import { addLoadedRecommendations } from "../store/recommendationsSlice";

export default function ThingDetails({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);
  const { thing } = route.params;
  const thingId = useThingId(thing);

  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState([]);
  const [moreToFetch, setMoreToFetch] = React.useState(true);

  const fetchMore = async () => {
    if (!loading && !refreshing && !!thingId && moreToFetch) {
      console.log("fetching more");
      try {
        setLoading(true);
        const res = await recommendationsService.find({
          query: {
            thing: thingId,
            $limit: 20,
            $skip: recommendations.length,
            $or: [{ isPublic: true }, { directRecipients: sessionUserId }],
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
    if (!loading && !refreshing && !!thingId && moreToFetch) {
      try {
        setRefreshing(true);
        const res = await recommendationsService.find({
          query: {
            thing: thingId,
            $limit: 20,
            $or: [{ isPublic: true }, { directRecipients: sessionUserId }],
          },
        });
        dispatch(addLoadedRecommendations(res.data));
        setRecommendations(res.data.map((r) => r._id));
        setMoreToFetch(res.total > res.skip);
      } catch (e) {
        console.log("error fetching recs for ThingDetails", thing, e);
      }
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    refresh();
  }, [thingId]);

  const y = React.useMemo(() => new Animated.Value(0), []);

  return (
    <Screen center={true}>
      <WindowWidthRow pad={true}>
        <BackButton />
        <T.H1>Details</T.H1>
      </WindowWidthRow>

      <ThingImage size={140} thing={thing} />
      <T.Title style={{ paddingVertical: 5 }}>{thing.title}</T.Title>
      <T.H3>{thing.subtitle}</T.H3>

      <WindowWidthRow
        style={{ justifyContent: "center", paddingVertical: 20 }}
        pad={true}
      >
        <RoundButton
          solid={true}
          renderIcon={({ size }) => (
            <IconButtons.Bookmark padding={0} size={size} />
          )}
          title="Save"
          onPress={() =>
            navigation.navigate("AddToCollections", { thingId: thingId })
          }
        />
        <RoundButton
          renderIcon={({ size }) => <IconButtons.Add padding={0} size={size} />}
          title="Recommend"
          onPress={() => navigation.navigate("Create", { thing })}
        />
      </WindowWidthRow>

      {!!recommendations.length && (
        <WindowWidthRow pad={true}>
          <T.Title>All Recommendations</T.Title>
        </WindowWidthRow>
      )}

      <FilteredRecommendationsList
        loading={loading}
        fetchMore={fetchMore}
        refresh={refresh}
        refreshing={refreshing}
        recommendations={recommendations}
        categories={[]}
        y={y}
      />
    </Screen>
  );
}
