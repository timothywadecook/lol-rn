import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { thingsService } from "../../services/feathersClient";
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";

import AnimateExpand from "../Wrappers/AnimateExpand";

export default function HorizontalThingList({
  listId,
  canCreate,
  autoOpen = true,
  openDelay = 0,
}) {
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

  if (!thingsData.length && !canCreate) {
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
            {things.length}
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
      title={name}
    >
      {loaded && (
        <AnimateExpand doAnimation={show} height={maxHeight}>
          <View style={{ width: theme.windowWidth }}>
            <FlatList
              initialNumToRender={5}
              keyboardShouldPersistTaps="handled"
              data={thingsData}
              renderItem={({ item: thing }) => <ThingCard thing={thing} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id + listId}
              // ListFooterComponent={() => canCreate && <AddThingCard />}
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
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              width: size, //  100,
              height: size * 1.4, // 140,
              borderRadius: 15,
              // marginRight: 6,
              // marginTop: 2,
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
    </TouchableOpacity>
  );
}

function AddThingCard() {
  const theme = useTheme();
  const navigation = useNavigation();
  const size = 100;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Create")}
      style={{
        width: size,
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          backgroundColor: theme.iconBg,
          width: size,
          height: size * 1.4,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            height: size / 2,
            width: size / 2,
            backgroundColor: theme.iconBg,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Feather
            style={{ width: size / 3 }}
            name="search"
            size={size / 3}
            color={theme.iconDefault}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PlaceIcon({ size = 50 }) {
  const theme = useTheme();

  return <Entypo name="location-pin" size={size} color={theme.red} />;
}
