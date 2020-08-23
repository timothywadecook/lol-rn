import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import SelectableUserWithUnreadCount from "./ListItems/SelectableUserWithUnreadCount";
import SelectableUserAddNew from "./ListItems/SelectableUserAddNew";

import { usersService } from "../services/feathersClient";

import useTheme from "../hooks/useTheme";

export default function FilterMenu() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: theme.windowWidth,
        flexDirection: "column",
      }}
    >
      <ListSelectableUsersWithUnreadCountAndAddNew />
    </View>
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
