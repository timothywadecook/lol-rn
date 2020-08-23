import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList } from "react-native";
import * as T from "../Atomic/StyledText";

import SelectableUserAddNew from "../ListItems/SelectableUserAddNew";
import SelectableUser from "../ListItems/SelectableUser";

import { usersService } from "../../services/feathersClient";

import useTheme from "../../hooks/useTheme";

export default function SelectDirectRecipients({
  directRecipients,
  setDirectRecipients,
}) {
  const sessionUserFollowing = useSelector((state) => state.follows.following);
  const [following, setFollowing] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const res = await usersService.find({
          query: { _id: { $in: sessionUserFollowing }, $limit: 1000 },
        });
        setFollowing(res.data);
      } catch (error) {
        console.log(
          "Error fetching following for participants",
          sessionUserFollowing,
          error.message,
          error
        );
      }
    };
    fetchFollowingUsers();
  }, [sessionUserFollowing]);

  const onSelect = (userId) => {
    setDirectRecipients([...directRecipients, userId]);
  };

  const onUnselect = (userId) => {
    setDirectRecipients(directRecipients.filter(uId !== userId));
  };

  return (
    <View style={{ width: theme.windowWidth }}>
      <View style={{ paddingVertical: 10 }}>
        <T.H2G>Direct Recipients</T.H2G>

        <FlatList
          data={following}
          renderItem={({ item: user }) => (
            <SelectableUser
              user={user}
              onSelect={() => onSelect(user._id)}
              onUnselect={() => onUnselect(user._id)}
            />
          )}
          ListFooterComponent={() => <SelectableUserAddNew />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}
