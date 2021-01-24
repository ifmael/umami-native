import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export const radioButtonStyles = {
  container: {
    padding: 0,
    marginRight: 0,
  },
};
export const priceView = {
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "space-between",
};

export default styles;
