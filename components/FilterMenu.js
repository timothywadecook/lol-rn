import React from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;
// Components
import SelectableUserWithUnreadCount from "./ListItems/SelectableUserWithUnreadCount";
import SelectableUserAddNew from "./ListItems/SelectableUserAddNew";
import MultiSelectFilterButtons from "./MultiSelectFilterButtons";
// Services
import { usersService } from "../services/feathersClient";
// Hooks
import useTheme from "../hooks/useTheme";

export const HEIGHT = 170;

export default function FilterMenu({ y, categories, setCategories }) {
  const theme = useTheme();

  const MIN = 200;

  const diffClampY = diffClamp(y, 0, MIN + 2 * HEIGHT);

  return (
    <Animated.View
      style={{
        paddingTop: theme.topPad,
        height: HEIGHT,
        position: "absolute",
        zIndex: 2,
        transform: [
          {
            translateY: interpolate(diffClampY, {
              inputRange: [MIN, MIN + 2 * HEIGHT],
              outputRange: [0, -HEIGHT],
              extrapolateLeft: "clamp",
            }),
          },
        ],
        backgroundColor: "transparent",
        paddingVertical: 10,
        width: theme.windowWidth,
        opacity: interpolate(diffClampY, {
          inputRange: [250, 300],
          outputRange: [1, 0],
        }),
      }}
    >
      <View
        style={{
          borderRadius: 15,
          margin: 5,
          elevation: 5,
          flexDirection: "column",
          backgroundColor: theme.wallbg,
          shadowRadius: 3,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <ListSelectableUsersWithUnreadCountAndAddNew />
        <MultiSelectFilterButtons
          options={["Movies", "Shows", "Books", "Places"]}
          selected={categories}
          setSelected={setCategories}
        />
      </View>
    </Animated.View>
  );
}

function ListSelectableUsersWithUnreadCountAndAddNew() {
  const following = useSelector((state) => state.follows.following);
  const sessionUserId = useSelector((state) => state.user._id);
  const filterableUserIds = [sessionUserId, ...following];

  const [userList, setUserList] = React.useState([]);
  React.useEffect(() => {
    usersService
      .find({
        query: {
          _id: { $in: filterableUserIds },
        },
      })
      .then((res) => setUserList(res.data));
  }, [following]);

  return (
    <FlatList
      data={userList}
      renderItem={({ item: user }) => (
        <SelectableUserWithUnreadCount user={user} />
      )}
      ListFooterComponent={() => <SelectableUserAddNew />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
    />
  );
}
