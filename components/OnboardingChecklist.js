import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { recommendationsService } from "../services/feathersClient";
import useTheme from "../hooks/useTheme";
import ProfileCard from "./Atomic/ProfileCard";
import * as T from "./Atomic/StyledText";
import IconButtons from "./Buttons/IconButtons";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function OnboardingChecklist(props) {
  const theme = useTheme();
  const { appleId, facebookId, googleId, createdAt, _id } = useSelector(
    (state) => state.user
  );
  let socialLoginName = "Google";
  if (!!appleId) {
    socialLoginName = "Apple";
  } else if (!!facebookId) {
    socialLoginName = "Facebook";
  }

  const [hasPosted5Recs, setHasPosted5Recs] = React.useState(false);
  React.useEffect(() => {
    recommendationsService
      .find({
        query: {
          creator: _id,
          $limit: 0,
        },
      })
      .then((res) => {
        setHasPosted5Recs(res.total > 4);
      })
      .catch((e) => console.log("Error checking hasposted5recs", e));
  }, []);

  const listIds = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].participants.includes(_id)
    )
  );
  const lists = useSelector((state) => state.lists);
  const [hasSaved3Things, setHasSaved3Things] = React.useState(0);
  React.useEffect(() => {
    let count = 0;
    listIds.forEach((listId) => {
      count += lists[listId].things.length;
    });
    setHasSaved3Things(count > 2);
  }, [listIds]);

  const following = useSelector((state) => state.follows.following);
  const hasFollowed1Person = following.length > 0;

  const stage1Done =
    !!socialLoginName &&
    hasPosted5Recs &&
    hasSaved3Things &&
    hasFollowed1Person;

  const planChosen = false;

  const [timesup, setTimesup] = React.useState(false);

  const onTimesup = () => setTimesup(true);

  if (timesup || stage1Done) {
    return null;
  }

  return (
    <ProfileCard
      title="Onboarding Checklist"
      subtitle={"Great start! Time to finish"}
      renderRightChild={() => (
        <CountDownTimer onTimesup={onTimesup} startDate={new Date()} />
      )}
      style={{ backgroundColor: theme.iconBg, paddingBottom: 15 }}
    >
      <ChecklistItem
        name={`Sign up with ${socialLoginName}`}
        done={!!socialLoginName}
      />
      <ChecklistItem name="View home page" done={true} />
      <ChecklistItem
        name="Post 5 recommendations"
        done={hasPosted5Recs}
        page={"SearchThings"}
      />
      <ChecklistItem
        name="Save 3 things to a list"
        done={hasSaved3Things}
        page={"SearchThings"}
      />
      <ChecklistItem
        name="Follow 1 person"
        done={hasFollowed1Person}
        page={"Search Users"}
      />
      {stage1Done && (
        <ChecklistItem
          name="Last thing. Select plan preference"
          done={planChosen}
        />
      )}
    </ProfileCard>
  );
}

function ChecklistItem({ name, done, page }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = done ? null : () => navigation.navigate(page);
  const style = done
    ? {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        color: theme.iconDefault,
      }
    : {};
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SelectableCircle selected={done} />
      <T.H2 onPress={onPress} style={style}>
        {name}
      </T.H2>
    </View>
  );
}

function CountDownTimer({ startDate, onTimesup }) {
  const [s, setS] = React.useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const expire = startDate.getTime() + 1000000;
      const seconds = parseInt((expire - now) / 1000);
      if (seconds < 1) {
        onTimesup();
      }
      setS(seconds);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  let sec = s % 60;
  if (sec < 10) {
    sec = `0${sec}`;
  }

  const min = Math.floor(s / 60);
  // const hours = Math.floor(s / (60 * 60))

  return (
    <T.Title style={{ color: theme.iconDefault }}>{`${min}:${sec}`}</T.Title>
  );
}

function SelectableCircle({ selected }) {
  return selected ? (
    <IconButtons.CheckmarkCircle active={true} />
  ) : (
    <IconButtons.Circle />
  );
}
