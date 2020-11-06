import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ListList from "./Lists/ListList";
import * as T from "./Atomic/StyledText";

import useFollowers from "../hooks/useFollowers";
import useFollowing from "../hooks/useFollowing";
import useSuggested from "../hooks/useSuggested";
import FriendsList from "./Lists/FriendsList";
