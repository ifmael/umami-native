import React from "react";
import { array, string, bool, number } from "prop-types";
import { View } from "react-native";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";
import FontText from "/components/common/FontText";
import styles from "./UmamiIngredients.styles.js";

const UmamiIngredients = ({ ingredients, title, price, isRadioButton }) => {
  const ingredientsWithPrice = ingredients?.map((ingredient) => ({ ...ingredient, price }));

  return (
    <View>
      {title ? <FontText>{title}</FontText> : null}
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
