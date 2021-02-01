import { StyleSheet } from "react-native";
import { red } from "/styles/theme";

const styles = StyleSheet.create({
  titleView: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  priceView: { marginLeft: "auto", flexDirection: "row", alignItems: "center" },
  optionsView: { paddingHorizontal: 5, margin: 5 },
});

export const stylesRNEComponents = {
  titleText: {
    fontFamily: "Comfortaa_600SemiBold",
    fontWeight: "normal",
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderColor: red,
    borderWidth: 1,
    padding: 4,
  },
  optionText: { marginBottom: 5 },
};

export default styles;
