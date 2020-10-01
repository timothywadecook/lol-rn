import React from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;
// Components
import SelectableUserWithUnreadCount from "./ListItems/SelectableUserWithUnreadCount";
import SelectableUserAddNew, {
  SelectableUserAll,
  SelectableUserFollowing,
} from "./ListItems/SelectableUserAddNew";
import MultiSelectFilterButtons from "./MultiSelectFilterButtons";
import * as T from "./Atomic/StyledText";

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
        top: 120,
        position: "absolute",
        zIndex: 1,
        transform: [
          {
            translateY: interpolate(y, {
              inputRange: [0, HEIGHT],
              outputRange: [0, -HEIGHT / 1.5],
              // extrapolateLeft: "clamp",
            }),
          },
        ],
        backgroundColor: "transparent",

        width: theme.windowWidth,
        // borderTopColor: theme.iconBg,
        // borderTopWidth: 1,
        borderBottomColor: theme.iconBg,
        borderBottomWidth: 1,
        // opacity: interpolate(diffClampY, {
        //   inputRange: [80, 90],
        //   outputRange: [1, 0],
        //   extrapolateLeft: "clamp",
        // }),
      }}
    >
      <View
        style={{
          // margin: 5,
          padding: 5,
          paddingVertical: 10,
          flexDirection: "column",
          backgroundColor: theme.bg,
        }}
      >
        <T.H4 style={{ paddingHorizontal: 10, paddingBottom: 5, fontSize: 14 }}>
          Tap to filter by users and categories
        </T.H4>
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
  const sessionUser = useSelector((state) => state.user);
  const me = { ...sessionUser, username: "me" };

  const [userList, setUserList] = React.useState([]);
  React.useEffect(() => {
    usersService
      .find({
        query: {
          _id: { $in: following },
        },
      })
      .then((res) => setUserList([me, ...res.data]));
  }, [following]);

  const renderUser = ({ item: user }) => (
    <SelectableUserWithUnreadCount user={user} />
  );

  const renderFooter = () => <SelectableUserAddNew />;

  const renderHeader = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SelectableUserAll />
      <SelectableUserFollowing />
    </View>
  );

  return (
    <FlatList
      data={userList}
      renderItem={renderUser}
      // ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
    />
  );
}
