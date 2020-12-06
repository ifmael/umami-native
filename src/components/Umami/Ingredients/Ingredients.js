import React from "react";
import { array, string, bool } from "prop-types";
import { View } from "react-native";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";
import FontText from "/components/common/FontText";

const UmamiIngredients = ({ ingredients, title, isRadioButton }) => {
  return (
    <View>
      <FontText>{title}</FontText>
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
