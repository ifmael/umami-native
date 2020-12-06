import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    marginHorizontal: 10,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {},
  action: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    marginRight: 5,
  },
  add: {
    backgroundColor: "cornflowerblue",
    borderWidth: 1,
    borderColor: "azure",
  },
});

export default styles;
