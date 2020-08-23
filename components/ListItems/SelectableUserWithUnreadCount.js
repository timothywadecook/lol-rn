import React from "react";
import { useDispatch } from "react-redux";
import { TouchableWithoutFeedback, View } from "react-native";
import SelectableUser from "./SelectableUser";
import * as T from "../Atomic/StyledText";

import { recommendationsService } from "../../services/feathersClient";
import useTheme from "../../hooks/useTheme";

import {
  addCreatorToQueryAndRefresh,
  removeCreatorFromQueryAndRefresh,
} from "../../store/feedSlice";

export default function SelectableUserWithUnreadCount({ user }) {
  const dispatch = useDispatch();
  const [unread, setUnread] = React.useState([]);

  const getUnread = async () => {
    const response = await recommendationsService.find({
      query: { directRecipientsUnread: user._id },
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
          directRecipientsUnread: { $pull: user._id },
        });
      });
      setUnread([]);
    }
  };

  const onUnselect = () => {
    dispatch(removeCreatorFromQueryAndRefresh(user._id));
  };

  const onSelect = () => {
    dispatch(addCreatorToQueryAndRefresh(user._id));
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <CountBubble count={unread.length} />
        <SelectableUser
          user={user}
          onSelect={onSelect}
          onUnselect={onUnselect}
        />
      </View>
    </TouchableWithoutFeedback>
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
      <T.H3>{count}</T.H3>
    </View>
  );
}
