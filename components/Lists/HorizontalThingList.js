import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { thingsService } from "../../services/feathersClient";
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";
import ThingImage from "../Atomic/ThingImage";
import AnimateExpand from "../Wrappers/AnimateExpand";

export default function HorizontalThingList({
  listId,
  canCreate,
  autoOpen = true,
  openDelay = 0,
}) {
  const theme = useTheme();
  const navigation = useNavigation();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;

  if (!things.length && !canCreate) {
    return null;
  }

  const [
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  ] = useListService(thingsService, {
    _id: { $in: things.length && things },
  });

  const [show, setShow] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const size = theme.windowWidth / 5;
  const maxHeight = size * 2.18;

  React.useEffect(() => {
    if (autoOpen) {
      setLoaded(true);
      const timeout = setTimeout(() => {
        setShow(true);
      }, 500 + openDelay);
      return () => clearTimeout(timeout);
    }
  }, []);

  // React.useEffect(() => {
  //   if (total > 0) {
  //     setLoaded(true);
  //     setShow(true);
  //   }
  // }, [total]);

  return (
    <ProfileCard
      onPressHeader={() => {
        setLoaded(true);
        setShow(!show);
      }}
      renderRightChild={() =>
        canCreate && (
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
        )
      }
      title={name}
      subtitle={`${total} things`}
    >
      {loaded && (
        <AnimateExpand fast={false} doAnimation={show} height={maxHeight}>
          <View style={{ width: theme.windowWidth }}>
            <FlatList
              initialNumToRender={5}
              keyboardShouldPersistTaps="handled"
              data={data}
              renderItem={({ item: thing }) => <ThingCard thing={thing} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id + listId}
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
  const maxHeight = size * 2.18;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        maxHeight: maxHeight,
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
        <ThingImage size={size} thing={thing} />
      </View>

      <T.P style={{ paddingBottom: 0 }}>{title}</T.P>
    </TouchableOpacity>
  );
}

function PlaceIcon({ size = 50 }) {
  const theme = useTheme();

  return <Entypo name="location-pin" size={size} color={theme.red} />;
}
