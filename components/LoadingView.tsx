/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { ActivityIndicator } from "react-native";

import React from "react";

import { View } from "../components/Themed";

export const LoadingView = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);
