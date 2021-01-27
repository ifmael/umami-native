import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";
import styles from "./UmamiIngredients.styles.js";
import { array, string, bool, number } from "prop-types";

const UmamiIngredients = ({ ingredients, title, price, isRadioButton }) => {
  const ingredientsWithPrice = ingredients?.map((ingredient) => ({ ...ingredient, price }));

  return (
    <View>
      {title ? <Text>{title}</Text> : null}
      <View style={styles.options}>
        {isRadioButton ? (
          <IngredientsRadio ingredients={ingredientsWithPrice} price={price} />
        ) : (
          <IngredientsSwitch ingredients={ingredientsWithPrice} price={price} />
        )}
      </View>
    </View>
  );
};
UmamiIngredients.propTypes = {
  ingredients: array,
  title: string,
  isRadioButton: bool,
  price: number,
};
export default UmamiIngredients;
