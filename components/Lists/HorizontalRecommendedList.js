import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import ProfileCard from "../Atomic/ProfileCard";

import { recommendationsService } from "../../services/feathersClient";
import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";

export default function HorizontalRecommendedList({ userId, canCreate }) {
  const [thingsData, setThingsData] = React.useState([]);
  const theme = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchThings = async () => {
      try {
        const recs = await recommendationsService.find({
          query: {
            creator: userId,
            $limit: 1000,
          },
        });
        setThingsData(recs.data.map((r) => r.thing));
      } catch (error) {
        console.log(
          "Error fetching things for horizontal recommended list",
          error.message,
          error
        );
      }
    };
    if (userId) {
      fetchThings();
    }
  }, [userId]);

  if (!thingsData.length && !canCreate) {
    return null;
  }

  return (
    <ProfileCard
      renderRightChild={() => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <T.Title style={{ paddingRight: 10, color: theme.purple }}>
            {thingsData.length}
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
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={thingsData}
        renderItem={({ item: thing }) => <ThingCard thing={thing} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => item._id + i}
      />
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
