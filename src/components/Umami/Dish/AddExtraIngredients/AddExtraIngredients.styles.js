import { Dimensions, StyleSheet } from "react-native";

const heightScreen = Dimensions.get("window").height;

const styles = StyleSheet.create({
  addExtraIngredientMainView: { marginVertical: 15 },
});

export const dividerStyles = { marginHorizontal: 70, marginBottom: 15 };
export const ingredientsInfoView = { marginBottom: 15 };
export const ingredientsInfoItem = { flexDirection: "row", marginBottom: 10, justifyContent: "space-between" };
export const modalStyle = {
  backgroundColor: "white",
  paddingHorizontal: 10,
  paddingVertical: 20,
  height: parseInt(heightScreen * 0.8),
  borderRadius: 5,
};
export const modalTitleStyle = { textAlign: "center", marginBottom: 10 };
export const modalDividerStyle = { marginBottom: 20, borderWidth: 0.5 };
export const modalButtonView = { flexDirection: "row", justifyContent: "space-around", marginTop: 10 };

export default styles;
