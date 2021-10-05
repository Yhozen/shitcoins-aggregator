import styles, { ShadowSizes } from "./styles";

export const getStyles = (size: ShadowSizes) => styles[size] ?? styles.md;
