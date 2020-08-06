import React from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import useTheme from "../../hooks/useTheme";

const mapState = (state) => ({
  conversations: state.conversations,
});

function ConversationsScreen() {
  const theme = useTheme();

  function ConversationListItem({
    participants,
    preview,
    last_message_timestamp,
  }) {
    return (
      <View>
        <Image
          source={{
            uri:
              "https://www.libreriasanjorge.com.ar/core/vendors/v24/wf/clean/images/usuario-avatar-circular.fw-p-500.png",
          }}
          style={{
            width: 24,
            height: 24,
            borderRadius: 10,
            margin: 5,
          }}
        />

        {participants.map((p) => (
          <Text style={{ color: theme.primary }}>{p}</Text>
        ))}
        <Text style={{ color: theme.primary }}>{preview}</Text>
        <Text style={{ color: theme.primary }}>{last_message_timestamp}</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: 30, flex: 1, backgroundColor: theme.wallbg }}>
      <Text style={{ padding: 20, fontSize: 30, color: theme.primary }}>
        Messages
      </Text>
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ConversationListItem {...item} />}
        initialNumToRender={8}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default connect(mapState, null)(ConversationsScreen);
