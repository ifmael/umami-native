import { StyleSheet } from "react-native";
import { lineHeight } from "/styles/theme";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  description: {
    marginBottom: 10,
  },
});

export const stylesRNElements = {
  containerStyle: {
    borderWidth: 0,
    borderRadius: 20,
    margin: 0,
    padding: 0,
  },
  textDescription: {
    lineHeight,
    marginTop: 15,
    textAlign: "justify",
  },
};

export default styles;
