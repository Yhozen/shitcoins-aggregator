import React from "react";

import { getStyles } from "./getStyles";
import { ShadowViewProps } from "./ShadowViewProps";
import DropShadow from "react-native-drop-shadow";

const ShadowView = ({ children, size, ...props }: ShadowViewProps) => (
  <DropShadow style={getStyles(size)} {...props}>
    {children}
  </DropShadow>
);

export default ShadowView;
