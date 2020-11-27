import React from "react";
import { View, Text } from "react-native";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";

const UmamiIngredients = ({ ingredients, title, isRadioButton }) => {
  debugger;
  return (
    <View>
      <Text>{title}</Text>
      {isRadioButton ? (
        <IngredientsRadio ingredients={ingredients} />
      ) : (
        <IngredientsSwitch ingredients={ingredients} />
      )}
    </View>
  );
};

export default UmamiIngredients;
