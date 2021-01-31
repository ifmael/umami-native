import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleView: {
    marginBottom: 10,
  },
  titleViewText: {
    position: "relative",
    textAlign: "center",
  },

  mainView: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonView: {
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
