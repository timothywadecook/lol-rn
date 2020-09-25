import React from "react";
import { View } from "react-native";
import Card from "./Card";
import * as T from "./StyledText";
import SubmitButton from "../Buttons/SubmitButton";

import useTheme from "../../hooks/useTheme";

export default ProfileCard = (props) => {
  const theme = useTheme();

  return (
    <Card
      bottomMargin={false}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 0,
        // marginBottom: 30,
        // backgroundColor: theme.iconBg,
      }}
    >
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
        padding: 10,
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
