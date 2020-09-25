import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { View, TouchableWithoutFeedback } from "react-native";
import * as T from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import SuggestedActions from "../SuggestedActions";
import { ThingItem } from "./ThingItem";
import Card from "../Atomic/Card";
import Comment from "./Comment";
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
// Helper
import moment from "moment";
import UserListItem from "./UserListItem";
import { commentsService } from "../../services/feathersClient";
import { addCommentByRecId } from "../../store/recommendationsSlice";

export default function ListItem({ recId, categories }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  navigation = useNavigation();
  const r = useSelector((state) => state.recommendations[recId]);
  const sessionUserId = useSelector((state) => state.user._id);

  const userIsTagged =
    r.directRecipients && r.directRecipients.includes(sessionUserId);
  const isVisible =
    categories.includes(r.thing.category + "s") || categories.length === 0;

  const onSubmitComment = async (text) => {
    try {
      const newComment = await commentsService.create({
        text,
        creator: sessionUserId,
        recommendation: recId,
      });
      dispatch(addCommentByRecId({ recId, comment: newComment }));
    } catch (error) {
      console.log("Error trying to create comment", error);
    }
  };

  return (
    isVisible && (
      <Card bottomMargin={true}>
        <UserListItem
          user={r.creator}
          lean={true}
          adjacentText={() => (
            <T.H4
              style={{ color: userIsTagged ? theme.purple : theme.iconDefault }}
            >
              {userIsTagged
                ? `tagged you in a ${r.thing.category}`
                : `recommends a ${r.thing.category}`}
            </T.H4>
          )}
        >
          <T.H4>{moment(r.createdAt).fromNow()}</T.H4>
        </UserListItem>

        <ThingItem border={false} thing={r.thing} />

        <T.FancyH1 style={{ fontSize: 20, padding: 10, marginBottom: 10 }}>
          "{r.main_comment}" -{r.creator.username}
        </T.FancyH1>

        {r.comments.list.map((c) => (
          <Comment key={c._id} {...c} />
        ))}

        <SuggestedActions onSubmitComment={onSubmitComment} r={r} />
      </Card>
    )
  );
}
