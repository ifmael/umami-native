import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  divider: { borderWidth: 0.9, borderStyle: "dotted", borderRadius: 1, borderColor: "black" },
  mainView: { flex: 1, backgroundColor: "white" },
  scrollViewContainer: {
    backgroundColor: "white",
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default styles;
