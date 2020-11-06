import React from "react";
import { View, TouchableOpacity } from "react-native";
import Card from "./Card";
import * as T from "./StyledText";
import SubmitButton from "../Buttons/SubmitButton";

import useTheme from "../../hooks/useTheme";

export default ProfileCard = (props) => {
  const theme = useTheme();

  return (
    <Card
      bottomMargin={props.bottomMargin}
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 0,
          backgroundColor: theme.bg
        },
        props.style,
      ]}
    >
      <CardHeader
        onPress={props.onPressHeader}
        title={props.title}
        subtitle={props.subtitle}
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

function CardHeader({ title, subtitle, renderRightChild, onPress }) {
  const theme = useTheme();
  const ContentComponent = onPress ? TouchableOpacity : View;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <ContentComponent onPress={onPress} activeOpacity={0.7}>
          <T.Title>{title}</T.Title>
          {subtitle && <T.H2G>{subtitle}</T.H2G>}
        </ContentComponent>
      </View>
      {renderRightChild()}
    </View>
  );
}

function CardFooter({ cta, onPress }) {
  return <SubmitButton title={cta} fullwidth={true} onPress={onPress} />;
}
