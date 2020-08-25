import React from "react";
import { View } from "react-native";
import Card from "./Card";
import * as T from "./StyledText";
import SubmitButton from "../Buttons/SubmitButton";

import useTheme from "../../hooks/useTheme";

export default ProfileCard = (props) => {
  const theme = useTheme();

  return (
    <Card style={{ padding: 10, backgroundColor: theme.wallbg }}>
      <CardHeader
        title={props.title}
        renderRightChild={
          !!props.renderRightChild
            ? props.renderRightChild
            : () => <View></View>
        }
      />
      {props.children}
      {!!props.footerCta && (
        <CardFooter cta={props.footerCta} onPress={props.onFooterCtaPress} />
      )}
    </Card>
  );
};

function CardHeader({ title, renderRightChild }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.bg,
      }}
    >
      <T.Title>{title}</T.Title>
      {renderRightChild()}
    </View>
  );
}

function CardFooter({ cta, onPress }) {
  return <SubmitButton title={cta} fullwidth={true} onPress={onPress} />;
}
