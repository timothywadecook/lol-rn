import React from "react";
import { Text } from "react-native";
import useTheme from "../../hooks/useTheme";

export function FancyH1(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Noteworthy",
          color: "#8C979A",
          fontSize: 36,
        },
        props.style,
      ]}
    />
  );
}

export function H1(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: theme.primary, fontSize: 36, fontWeight: "bold" },
        props.style,
      ]}
    />
  );
}

export function Title(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        {
          color: theme.primary,
          fontSize: 24,
          fontWeight: "bold",
        },
        props.style,
      ]}
    />
  );
}

export function H2(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: theme.primary, fontSize: 14, fontWeight: "bold" },
        props.style,
      ]}
    />
  );
}

export function H2G(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: theme.iconDefault, fontSize: 14, fontWeight: "bold" },
        props.style,
      ]}
    />
  );
}

export function H3(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[{ fontSize: 12, color: theme.primary }, props.style]}
    />
  );
}

export function CommentText(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[{ fontSize: 14, color: theme.iconDefault }, props.style]}
    />
  );
}

export function H4(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[{ fontSize: 12, color: theme.iconDefault }, props.style]}
    />
  );
}

export function P(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: theme.primary, fontSize: 11, paddingVertical: 5 },
        props.style,
      ]}
    />
  );
}

export function Label(props) {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { color: theme.primary, fontSize: 11, paddingTop: 3 },
        props.style,
      ]}
    />
  );
}
