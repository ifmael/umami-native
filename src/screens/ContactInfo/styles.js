import { Dimensions, StyleSheet } from "react-native";
import COLORS from "/styles/colors";

const paddingHorizontal = 10;
const windowWidth = Dimensions.get("window").width;
const listViewWidth = windowWidth * 0.95;
const offsetHorizontal = (windowWidth - listViewWidth) / 2;

const spaceForInputs = windowWidth - paddingHorizontal - 10;
const inputNumberWidth = spaceForInputs / 3;
const inputLocationWidth = spaceForInputs / 2;

export const autocompleteStyle = {
  container: {
    width: "97%",
    flex: null,
    marginTop: 20,
  },

  listView: {
    borderColor: "#c8c7cc",
    borderWidth: 1,
    borderRadius: 2,
    position: "absolute",
    width: parseInt(listViewWidth),
    left: parseInt(offsetHorizontal),
    top: 40,
  },
  textInput: {
    height: 38,
    color: "#5d5d5d",
    fontSize: 16,
  },

  predefinedPlacesDescription: {
    color: "black",
  },
  loader: { backgroundColor: "red" },
};

export const searchStyles = {
  containerStyle: {
    width: "100%",
    padding: 0,
    borderColor: "white",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: "white",
  },
  inputStyle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
};

const styles = StyleSheet.create({
  addContactInfoButtonContainer: {
    marginTop: 50,
    paddingHorizontal: paddingHorizontal + 40,
    zIndex: -1,
  },
  buttonAdd: {
    backgroundColor: COLORS.addButton,
  },
  buttonAddTitle: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contactInfoContainer: {
    marginTop: 20,
    paddingHorizontal: paddingHorizontal,
    zIndex: -1,
  },
  directionRow: {
    flexDirection: "row",
  },
  inputNumbers: {
    width: inputNumberWidth,
  },
  inputLocation: {
    width: inputLocationWidth,
  },
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default styles;
