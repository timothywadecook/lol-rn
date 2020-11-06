import React from "react";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";
import {Icon} from 'react-native-elements';

export default function BackButton({ noLeftMargin = false }) {
  const navigation = useNavigation();
  const theme = useTheme();


  return (
    <Icon
        onPress={() => navigation.goBack()}
        name="chevron-left"
        color={theme.purple}
        type="feather"
        containerStyle={{ padding: 7 }}
      />
  )
}
