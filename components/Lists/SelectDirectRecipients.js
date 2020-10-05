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
  const sessionUserFollowers = useSelector((state) => state.follows.followers);
  const [followers, setFollowers] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchFollowersUsers = async () => {
      try {
        const res = await usersService.find({
          query: { _id: { $in: sessionUserFollowers }, $limit: 1000 },
        });
        setFollowers(res.data);
      } catch (error) {
        console.log(
          "Error fetching followers for direct recipients",
          sessionUserFollowers,
          error.message,
          error
        );
      }
    };
    fetchFollowersUsers();
  }, [sessionUserFollowers]);

  const onSelect = (userId) => {
    setDirectRecipients([...directRecipients, userId]);
  };

  const onUnselect = (userId) => {
    setDirectRecipients(directRecipients.filter(uId !== userId));
  };

  if (sessionUserFollowers.length < 1) {
    return null;
  }

  return (
    <View
      style={{ width: theme.windowWidth, paddingHorizontal: 10, paddingTop: 3 }}
    >
      <T.H2G>Tag a Friend</T.H2G>

      <FlatList
        keyboardShouldPersistTaps="handled"
        data={followers}
        renderItem={({ item: user }) => (
          <SelectableUser
            user={user}
            onSelect={() => onSelect(user._id)}
            onUnselect={() => onUnselect(user._id)}
            selected={directRecipients.includes(user._id)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
