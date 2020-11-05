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
  SelectableUserMe,
  SelectableUserFollowing,
} from "./ListItems/SelectableUserAddNew";
import MultiSelectFilterButtons from "./MultiSelectFilterButtons";
import * as T from "./Atomic/StyledText";

// Services
import { usersService } from "../services/feathersClient";
// Hooks
import useTheme from "../hooks/useTheme";

export const HEIGHT = 70;

export default function FilterMenu({
  y,
  categories,
  setCategories,
  c = true,
  p = true,
}) {
  const theme = useTheme();

  // const MIN = 200;

  // const diffClampY = diffClamp(y, 0, MIN + 2 * HEIGHT);

  return (
    // <Animated.View
    //   style={{
    //     top: 65 + theme.topPad,
    //     position: "absolute",
    //     zIndex: 1,
    //     transform: [
    //       {
    //         translateY: interpolate(y, {
    //           inputRange: [0, HEIGHT],
    //           outputRange: [0, -HEIGHT / 1.5],
    //           // extrapolateLeft: "clamp",
    //         }),
    //       },
    //     ],
    //     backgroundColor: "transparent",

    //     width: theme.windowWidth,
    //     // borderTopColor: theme.iconBg,
    //     // borderTopWidth: 1,
    //     borderBottomColor: theme.iconBg,
    //     borderBottomWidth: 1,
    //     // opacity: interpolate(diffClampY, {
    //     //   inputRange: [80, 90],
    //     //   outputRange: [1, 0],
    //     //   extrapolateLeft: "clamp",
    //     // }),
    //   }}
    // >
    <View style={{ width: theme.windowWidth }}>
      <View
        style={{
          // marginHorizontal: 10,
          // width: theme.windowWidth,
          // paddingBottom: 20,
          paddingVertical: 10,
          flexDirection: "column",
          // backgroundColor: theme.iconBg,
          borderBottomColor: theme.iconBg,
          borderBottomWidth: 1,
          // borderRadius: 15,
        }}
      >
        {p && <ListSelectableUsersWithUnreadCountAndAddNew />}
        {c && (
          <MultiSelectFilterButtons
            options={["Movies", "Shows", "Books", "Places"]}
            selected={categories}
            setSelected={setCategories}
          />
        )}
      </View>
    </View>
    // </Animated.View>
  );
}

const renderUser = ({ item: user }) => (
  <SelectableUserWithUnreadCount user={user} />
);
const renderFooter = () => <SelectableUserAddNew />;
const renderHeader = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <SelectableUserAll />
    <SelectableUserMe />
    <SelectableUserFollowing />
  </View>
);
const keyExtractor = (item) => item._id;

function ListSelectableUsersWithUnreadCountAndAddNew() {
  const following = useSelector((state) => state.follows.following);
  console.log("following is ids ?");

  const [userList, setUserList] = React.useState([]);
  React.useEffect(() => {
    if (following.length) {
      usersService
        .find({
          query: {
            _id: { $in: following },
          },
        })
        .then((res) => setUserList([...res.data]));
    }
  }, [following]);

  return (
    <FlatList
      data={userList}
      renderItem={renderUser}
      // ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
    />
  );
}
