import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, TouchableOpacity } from "react-native";
import ProfileCard from "../Atomic/ProfileCard";
import ThingCard from "../ListItems/ThingCard";
import { thingsService } from "../../services/feathersClient";
import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";
//
import { ParticipantsRow } from "../ListItems/ListListItem";

export default function HorizontalThingList({ listId, canCreate }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;

  if (!things.length && !canCreate) {
    return null;
  }

  const {
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  } = useListService(thingsService, {
    _id: { $in: things.length && things },
  });

  const placeholderData = [
    { _id: "abcd1", image: "true", title: "Loading...\n " },
    { _id: "abcd2", image: "true", title: "Loading..." },
    { _id: "abcd3", image: "true", title: "Loading..." },
    { _id: "abcd4", image: "true", title: "Loading..." },
    { _id: "abcd5", image: "true", title: "Loading..." },
  ];

  return (
    <ProfileCard
      renderRightChild={() => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ParticipantsRow participants={participants} />
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
      title={name}
      subtitle={`${total} things`}
    >
      <View style={{ width: theme.windowWidth }}>
        {!refreshing ? (
          <FlatList
            initialNumToRender={5}
            keyboardShouldPersistTaps="handled"
            data={data}
            renderItem={({ item: thing }) => <ThingCard thing={thing} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id + listId}
            onEndReached={fetchMore}
            loading={loading}
          />
        ) : (
          <FlatList
            initialNumToRender={5}
            keyboardShouldPersistTaps="handled"
            data={placeholderData}
            renderItem={({ item: thing }) => <ThingCard thing={thing} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id + listId}
            onEndReached={fetchMore}
            loading={loading}
          />
        )}
      </View>
    </ProfileCard>
  );
}
