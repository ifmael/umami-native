import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContainerText: {
    position: "relative",
    textAlign: "center",
  },

  mainContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
});

export const titleContainerIcon = {
  position: "absolute",
  right: 0,
};

export default styles;
