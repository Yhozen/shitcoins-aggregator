import React from "react";
import { View } from "react-native";
import { getStyles } from "./getStyles";
import { ShadowViewProps } from "./ShadowViewProps";

const ShadowView = ({ children, size, ...props }: ShadowViewProps) => (
  <View style={getStyles(size)} {...props}>
    {children}
  </View>
);

export default ShadowView;
