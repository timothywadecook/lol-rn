import React from "react";
import { ActivityIndicator, View } from "react-native";
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
import IconButtons from "../components/Buttons/IconButtons";
import { addLoadedRecommendations } from "../store/recommendationsSlice";
import { SharedElement } from "react-navigation-shared-element";
//
import useTheme from "../hooks/useTheme";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;

export default function ThingDetails({ route }) {
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

  const renderHeader = () => (
    <View style={{ alignItems: "center" }}>
      <ThingDetails.FloatingHeader thing={thing} y={y} thingId={thingId} />
      {refreshing && <ActivityIndicator />}
      {!refreshing && (
        <WindowWidthRow pad={true}>
          <View>
            <T.Title>
              {!!recommendations.length
                ? "All Recommendations"
                : "No Recommendations Yet"}
            </T.Title>
            <T.H4>
              {!!recommendations.length ? "" : "You could be the first"}
            </T.H4>
          </View>
        </WindowWidthRow>
      )}
    </View>
  );

  return (
    <Screen fullscreen={true} center={true}>
      <WindowWidthRow style={{ zIndex: 3 }} topPad={true} pad={true}>
        <BackButton />
        <T.H1>Details</T.H1>
      </WindowWidthRow>

      {/* <ThingDetails.FloatingHeader thing={thing} y={y} /> */}

      <FilteredRecommendationsList
        // topPad={375}
        loading={loading}
        fetchMore={fetchMore}
        // refresh={refresh}
        // refreshing={refreshing}
        recommendations={recommendations}
        categories={[]}
        y={y}
        renderHeader={renderHeader}
        initialNumToRender={1}
      />
    </Screen>
  );
}

ThingDetails.sharedElements = (navigation) => {
  const thing = navigation.getParam("thing");
  if (thing._id) {
    return [
      `image-${thing._id}`,
      // `title-${thing._id}`,
      // `subtitle-${thing._id}`,
    ];
  }
};

ThingDetails.FloatingHeader = ({ thing, y, thingId }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const HEIGHT = 375;

  return (
    <Animated.View
      style={{
        // top: 110,
        // position: "absolute",
        // zIndex: 1,
        // transform: [
        //   {
        //     translateY: interpolate(y, {
        //       inputRange: [0, HEIGHT],
        //       outputRange: [0, -HEIGHT / 1.5],
        //       extrapolateLeft: "clamp",
        //     }),
        //   },
        // ],
        backgroundColor: theme.wallbg,
        borderBottomColor: theme.iconBg,
        borderBottomWidth: 1,
        alignItems: "center",
      }}
    >
      <ThingImage size={140} thing={thing} />
      <SharedElement id={`title-${thing._id}`}>
        <T.Title
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            textAlign: "center",
          }}
        >
          {thing.title}
        </T.Title>
      </SharedElement>
      <SharedElement id={`subtitle-${thing._id}`}>
        <T.H3 style={{ paddingHorizontal: 15, textAlign: "center" }}>
          {thing.subtitle}
        </T.H3>
      </SharedElement>

      <WindowWidthRow
        style={{ justifyContent: "center", paddingVertical: 15 }}
        pad={true}
      >
        <RoundButton
          solid={true}
          renderIcon={({ size }) => (
            <IconButtons.Bookmark padding={0} size={size} />
          )}
          title="Save"
          onPress={() =>
            navigation.navigate("AddToCollections", { thingId, thing })
          }
        />
        <RoundButton
          renderIcon={({ size }) => <IconButtons.Add padding={0} size={size} />}
          title="Recommend"
          onPress={() => navigation.navigate("Create", { thing })}
        />
      </WindowWidthRow>
    </Animated.View>
  );
};
