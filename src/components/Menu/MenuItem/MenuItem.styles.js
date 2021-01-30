import { StyleSheet } from "react-native";
import { lineHeight } from "/styles/theme";
import COLORS from "/styles/colors";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  description: {
    marginBottom: 10,
  },
});

export const stylesRNElements = {
  action: {
    backgroundColor: COLORS.defaultButton,
  },
  textDescription: {
    lineHeight,
    marginTop: 15,
    textAlign: "justify",
  },
};

export default styles;
