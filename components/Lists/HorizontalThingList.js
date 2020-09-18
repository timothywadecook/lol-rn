import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { thingsService } from "../../services/feathersClient";
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";

export default function HorizontalThingList({ listId, canCreate }) {
  const [thingsData, setThingsData] = React.useState([]);
  const theme = useTheme();
  const navigation = useNavigation();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;

  React.useEffect(() => {
    const fetchThings = async () => {
      try {
        const res = await thingsService.find({
          query: { _id: { $in: things }, $limit: 1000 },
        });
        setThingsData(res.data);
      } catch (error) {
        console.log(
          "Error fetching things for horizontal list",
          error.message,
          error
        );
      }
    };
    if (things && !!things.length) {
      fetchThings();
    }
  }, [listId]);

  if (!thingsData.length && !canCreate) {
    return null;
  }

  return (
    <ProfileCard
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
    >
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={thingsData}
        renderItem={({ item: thing }) => <ThingCard thing={thing} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        ListFooterComponent={() => canCreate && <AddThingCard />}
      />
    </ProfileCard>
  );
}

function ThingCard({ thing }) {
  const { image, title, subtitle } = thing;
  return (
    <View
      style={{
        width: 100,
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: 100,
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
              width: 100, //  100,
              height: 140, // 140,
              borderRadius: 15,
              marginRight: 6,
              marginTop: 2,
            }}
          />
        ) : thing.category === "Place" ? (
          <PlaceIcon />
        ) : null}
      </View>

      <T.H2 style={{ paddingBottom: 0 }}>{title}</T.H2>
      {/* <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4> */}
    </View>
  );
}

function AddThingCard() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Create")}
      style={{
        width: 100,
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          backgroundColor: theme.iconBg,
          width: 100,
          height: 140,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: theme.iconBg,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Feather
            style={{ width: 30 }}
            name="search"
            size={30}
            color={theme.iconDefault}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PlaceIcon() {
  const theme = useTheme();

  return (
    <Entypo
      style={{ width: 30, marginRight: 8, marginLeft: -8 }}
      name="location-pin"
      size={40}
      color={theme.iconDefault}
    />
  );
}
