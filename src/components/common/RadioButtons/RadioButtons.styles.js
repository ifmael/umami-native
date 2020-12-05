import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8,
    marginVertical: 10,
  },
  text: {
    color: "#000",
  },
});

export const radioButtonStyles = {
  container: {
    padding: 0,
    margin: 0,
    marginRight: 0,
    textAlign: "end",
  },
};

export default styles;
