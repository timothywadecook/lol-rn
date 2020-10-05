import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import SelectableUser from "./SelectableUser";
import * as T from "../Atomic/StyledText";

import { recommendationsService } from "../../services/feathersClient";
import useTheme from "../../hooks/useTheme";

import { setCreatorQueryAndRefresh } from "../../store/feedSlice";

import * as Notifications from "expo-notifications";

export default function SelectableUserWithUnreadCount({ user }) {
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);
  const [unread, setUnread] = React.useState([]);

  const getUnread = async () => {
    const response = await recommendationsService.find({
      query: {
        creator: user._id,
        directRecipientsUnread: sessionUserId,
      },
    });
    setUnread(response.data);
  };
  React.useEffect(() => {
    getUnread();
  }, []);

  const onPress = async () => {
    if (unread.length > 0) {
      unread.forEach((rec) => {
        recommendationsService.patch(rec._id, {
          $pull: { directRecipientsUnread: sessionUserId },
        });
      });
      // update the badge count
      const count = await Notifications.getBadgeCountAsync();
      if (count >= unread.length) {
        Notifications.setBadgeCountAsync(count - unread.length);
      }
      setUnread([]);
    }
  };

  const query = useSelector((state) => state.feed.query.creator["$in"]);
  const onSelect = () => {
    dispatch(setCreatorQueryAndRefresh([user._id]));
    onPress();
  };
  const onUnselect = () => {
    dispatch(setCreatorQueryAndRefresh([]));
  };

  return (
    <View>
      <CountBubble count={unread.length} />
      <SelectableUser
        user={user}
        onSelect={onSelect}
        onUnselect={onUnselect}
        selected={query.length === 1 && query.includes(user._id)}
      />
    </View>
  );
}

function CountBubble({ count, size = 20 }) {
  const theme = useTheme();

  if (!count) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size / 2,
        backgroundColor: theme.red,
        height: size,
        minWidth: size,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 3,
        elevation: 3,
        borderColor: theme.wallbg,
        borderWidth: 0.5,
      }}
    >
      <T.H3 style={{ color: theme.white }}>{count}</T.H3>
    </View>
  );
}
