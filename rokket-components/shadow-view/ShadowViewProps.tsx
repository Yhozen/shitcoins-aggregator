import React from "react";
import { ViewProps } from "react-native";
import { ShadowSizes } from "./styles";

export type ShadowViewProps = ViewProps & {
  size: ShadowSizes;
  children: React.ReactNode;
};
