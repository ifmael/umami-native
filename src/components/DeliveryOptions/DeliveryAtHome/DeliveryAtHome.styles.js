import { Dimensions, StyleSheet } from "react-native";
import COLORS from "/styles/colors";

const paddingHorizontal = 0;

export const getStyles = (parentWidth) => {
  const containerWidth = parentWidth ? parentWidth : Dimensions.get("window").width;
  const listViewWidth = containerWidth * 0.94;
  // const offsetHorizontal = (containerWidth - listViewWidth) / 2;
  const offsetHorizontal = 0;
  const spaceForInputs = containerWidth - paddingHorizontal - 10;
  const inputNumberWidth = spaceForInputs / 3;
  const inputLocalityWidth = spaceForInputs / 2;

  return {
    autocompleteStyle: {
      container: {
        width: "97%",
        flex: null,
      },
      listView: {
        borderColor: "#c8c7cc",
        borderWidth: 1,
        borderRadius: 2,
        position: "absolute",
        width: parseInt(listViewWidth),
        left: parseInt(offsetHorizontal),
        top: 40,
        maxHeight: 250,
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
    },
    inputStyles: {
      locality: {
        width: inputLocalityWidth,
      },
      numbers: {
        width: inputNumberWidth,
      },
    },
  };
};

export const searchStyles = {
  containerStyle: {
    width: "100%",
    padding: 0,
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

export const buttonStyles = {
  buttonAddStyles: {
    backgroundColor: COLORS.addButton,
  },
  buttonAddTitle: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
};

const styles = StyleSheet.create({
  addContactInfoButtonContainer: {
    marginTop: 50,
    paddingHorizontal: paddingHorizontal + 40,
    zIndex: -1,
  },

  contactInfoContainer: {
    marginTop: 20,
    paddingHorizontal: paddingHorizontal,
    zIndex: -1,
  },
  directionRow: {
    flexDirection: "row",
  },

  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default styles;
