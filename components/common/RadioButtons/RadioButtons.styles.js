import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#3740ff",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});

export default styles;
