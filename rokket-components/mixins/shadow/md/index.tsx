import React from "react";

import { StyleSheet, View, ViewProps } from "react-native";

const styles = StyleSheet.create({
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

type ShadowViewProps = ViewProps & {
  children: React.ReactNode;
};

const ShadowView = ({ children, ...props }: ShadowViewProps) => (
  <View style={styles.md} {...props}>
    {children}
  </View>
);

export default ShadowView;
