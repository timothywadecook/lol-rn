import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { recommendationsService } from "../../services/feathersClient";
import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";

import AnimateExpand from "../Wrappers/AnimateExpand";

export default function HorizontalRecommendedList({
  userId,
  canCreate,
  autoOpen = true,
  openDelay = 0,
}) {
  const theme = useTheme();
  const navigation = useNavigation();

  const [show, setShow] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const size = theme.windowWidth / 5;
  const maxHeight = size * 2.18;

  React.useEffect(() => {
    if (autoOpen) {
      setLoaded(true);
      const timeout = setTimeout(() => {
        setShow(true);
      }, 1500 + openDelay);
      return () => clearTimeout(timeout);
    }
  }, []);

  const [
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  ] = useListService(recommendationsService, {
    creator: userId,
  });

  if (!data.length && !canCreate) {
    return null;
  }

  return (
    <ProfileCard
      onPressHeader={() => {
        setLoaded(true);
        setShow(!show);
      }}
      renderRightChild={() => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <T.Title style={{ paddingRight: 10, color: theme.purple }}>
            {total}
          </T.Title>
          {canCreate && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrEditList", { list, isEdit: true })
              }
              style={{
                height: 30,
                width: 30,
                backgroundColor: theme.iconBg,
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 15,
              }}
            >
              <Entypo name="dots-two-vertical" size={20} color={theme.purple} />
            </TouchableOpacity>
          )}
        </View>
      )}
      title={"Recommended"}
    >
      {loaded && (
        <AnimateExpand doAnimation={show} height={maxHeight}>
          <View style={{ width: theme.windowWidth }}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              renderItem={({ item: thing }) => <ThingCard thing={thing} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, i) => item._id + i}
              data={data.map((r) => r.thing)}
              onEndReached={fetchMore}
              refreshing={refreshing}
              onRefresh={refresh}
              loading={loading}
            />
          </View>
        </AnimateExpand>
      )}
    </ProfileCard>
  );
}

function ThingCard({ thing }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / 5;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        width: size,
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: size,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              width: size,
              height: size * 1.4,
              borderRadius: 15,
            }}
          />
        ) : thing.category === "Place" ? (
          <View
            style={{
              width: size,
              height: size * 1.4,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.iconBg,
            }}
          >
            <PlaceIcon size={size / 2.5} />
          </View>
        ) : null}
      </View>

      <T.P style={{ paddingBottom: 0 }}>{title}</T.P>
      {/* <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4> */}
    </TouchableOpacity>
  );
}

function PlaceIcon({ size = 50 }) {
  const theme = useTheme();

  return <Entypo name="location-pin" size={size} color={theme.red} />;
}
