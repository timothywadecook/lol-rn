import React from "react";
import { View, Switch, ScrollView, Button, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import IconButtons from "../components/Buttons/IconButtons";
import SubmitButton from "../components/Buttons/SubmitButton";

import { Title, H2G, H2 } from "../components/Atomic/StyledText";

import useTheme from "../hooks/useTheme";

import UserListItem from "../components/ListItems/UserListItem";

import { usersService, listsService } from "../services/feathersClient";

import { updateList, addCreatedList } from "../store/listsSlice";

export default function CreateOrEditList({ navigation, route }) {
  navigation.setOptions({
    headerShown: false,
  });
  const { list } = route.params;
  const theme = useTheme();
  const isEditMode = !!list;
  const sessionUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  // local form state. field = name, participants, isPrivate
  const [name, setName] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [participants, setParticipants] = React.useState([sessionUserId]);

  const ifEditMode = () => {
    if (isEditMode) {
      setName(list.name);
      setIsPrivate(list.isPrivate);
      setParticipants(list.participants);
    }
  };
  React.useEffect(ifEditMode, []);

  const isParticipant = (userId) => participants.includes(userId);

  const onAddParticipant = (userId) =>
    setParticipants([...participants, userId]);
  const onRemoveParticipant = (userId) =>
    setParticipants(participants.filter((id) => id !== userId));

  const onNavBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    if (isEditMode) {
      try {
        const updatedList = await listsService.patch(list._id, {
          name,
          isPrivate,
          participants,
        });
        dispatch(updateList(updatedList));
      } catch (error) {
        console.log(
          "Error saving edit changes to list",
          list._id,
          name,
          isPrivate,
          participants,
          error
        );
      }
    } else {
      try {
        const newList = await listsService.create({
          name,
          isPrivate,
          participants,
        });
        dispatch(addCreatedList(newList));
      } catch (error) {
        console.log(
          "Error creating new list",
          name,
          isPrivate,
          participants,
          error
        );
      }
    }
    onNavBack();
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.wallbg, alignItems: "center" }}
    >
      <EditListHeader isEditMode={isEditMode} onNavBack={onNavBack} />
      <EditName name={name} setName={setName} />
      <ToggleIsPrivate
        isPrivate={isPrivate}
        toggleIsPrivate={() => setIsPrivate((prev) => !prev)}
      />
      <SelectableUserList
        participants={participants}
        isParticipant={isParticipant}
        onAddParticipant={onAddParticipant}
        onRemoveParticipant={onRemoveParticipant}
      />
      <EditListFooter
        show={name.length > 0 && participants.length > 0}
        onSubmit={onSubmit}
      />
    </View>
  );
}

function EditListHeader({ onNavBack, isEditMode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingTop: 50,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Button title="Back" onPress={onNavBack} color={theme.purple}></Button>
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <H2>{isEditMode ? "Edit List" : "Create List"}</H2>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

function EditListFooter({ show, onSubmit }) {
  const theme = useTheme();
  return (
    show && (
      <View style={{ paddingBottom: 30, width: theme.contentWidth }}>
        <SubmitButton intent="primary" title="Save List" onPress={onSubmit} />
      </View>
    )
  );
}

function EditName({ name, setName }) {
  const theme = useTheme();
  return (
    <View style={{ width: theme.contentWidth }}>
      <View style={{ paddingTop: 30, paddingBottom: 15 }}>
        <H2G>List Name</H2G>
      </View>

      <TextInput
        style={{ fontSize: 26, fontWeight: "bold", color: theme.primary }}
        placeholder="List name..."
        value={name}
        onChangeText={(text) => setName(text)}
        autoFocus={false}
        // style={[styles.textInput, { minHeight: 60, marginTop: 15 }]}
        autoCorrect={true}
        underlineColorAndroid="transparent"
        keyboardAppearance={theme.theme}
        returnKeyType="done"
        blurOnSubmit={true}
      />
    </View>
  );
}

function ToggleIsPrivate({ isPrivate, toggleIsPrivate }) {
  const theme = useTheme();
  return (
    <View style={{ width: theme.contentWidth }}>
      <View style={{ paddingTop: 30, paddingBottom: 15 }}>
        <H2G>Private List</H2G>
      </View>

      <Switch value={isPrivate} onValueChange={toggleIsPrivate} />
    </View>
  );
}

function SelectableUserList({
  participants,
  isParticipant,
  onAddParticipant,
  onRemoveParticipant,
}) {
  const [candidates, setCandidates] = React.useState([]);
  const theme = useTheme();

  const sessionUserFollowing = useSelector((state) => state.follows.following);
  // fetch candidates and set state
  React.useEffect(() => {
    const candidateIds = [
      ...participants,
      sessionUserFollowing.filter((uId) => !participants.includes(uId)),
    ];
    const fetchCandidates = async () => {
      try {
        const res = await usersService.find({
          query: { _id: { $in: candidateIds }, $limit: 1000 },
        });
        setCandidates(res.data);
      } catch (error) {
        console.log("Error fetching candidates for participants", candidates);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <View style={{ flex: 1, width: theme.contentWidth }}>
      <View style={{ paddingTop: 30, paddingBottom: 15 }}>
        <H2G>Participants</H2G>
      </View>
      <ScrollView>
        {candidates.map((u) => (
          <UserListItem key={u._id} user={u}>
            {!isParticipant(u._id) ? (
              <IconButtons.AddCircle onPress={() => onAddParticipant(u._id)} />
            ) : (
              <IconButtons.CheckmarkCircle
                active={true}
                onPress={() => onRemoveParticipant(u._id)}
              />
            )}
          </UserListItem>
        ))}
      </ScrollView>
    </View>
  );
}
