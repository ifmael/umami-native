import React from "react";
import { array, string, bool } from "prop-types";
import { View, Text } from "react-native";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";

const UmamiIngredients = ({ ingredients, title, isRadioButton }) => {
  return (
    <View>
      <Text>{title}</Text>
      {isRadioButton ? <IngredientsRadio ingredients={ingredients} /> : <IngredientsSwitch ingredients={ingredients} />}
    </View>
  );
};
UmamiIngredients.propTypes = {
  ingredients: array,
  title: string,
  isRadioButton: bool,
};
export default UmamiIngredients;
