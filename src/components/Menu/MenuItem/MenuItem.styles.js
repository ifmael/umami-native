import { StyleSheet } from "react-native";
import COLORS from "/styles/colors";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat-Regular",
    fontSize: 24,
  },
  description: {
    marginBottom: 10,
    fontFamily: "Montserrat-Regular",
  },
});
export const stylesRNElements = {
  action: {
    backgroundColor: COLORS.defaultButton,
  },
};

export default styles;
