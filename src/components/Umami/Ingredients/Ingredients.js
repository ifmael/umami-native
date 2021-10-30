import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import IngredientsSwitch from "./IngredientsSwitch";
import IngredientsRadio from "./IngredientsRadio";
import styles from "./UmamiIngredients.styles.js";
import { array, string, bool, number } from "prop-types";

const UmamiIngredients = ({
  ingredients,
  title,
  price,
  isRadioButton,
  initialSwitchValue,
  additionalIngredientSide = false,
  showWith,
}) => {
  const ingredientsWithPrice = ingredients?.map((ingredient) => ({ ...ingredient, price }));

  return (
    <View>
      {title ? <Text>{title}</Text> : null}
      <View style={styles.options}>
        {isRadioButton ? (
          <IngredientsRadio
            ingredients={ingredientsWithPrice}
            price={price}
            additionalIngredientSide={additionalIngredientSide}
          />
        ) : (
          <IngredientsSwitch
            ingredients={ingredientsWithPrice}
            price={price}
            initialSwitchValue={initialSwitchValue}
            showWith={showWith}
          />
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
  initialSwitchValue: bool,
  additionalIngredientSide: bool,
  showWith: bool,
};
export default UmamiIngredients;
