import React, { useState } from "react";
import { array, string, bool } from "prop-types";
import { View, Text, Switch } from "react-native";
import SwitchList from "../../../common/Switch/SwitchList";
import useSwitchList from "../../../common/Switch/SwitchList/useSwitchList";

const getTitle = (category) => {
  return category === "hamburguesas"
    ? "¿Quíeres personalizar tu hamburguesa?"
    : category === "bocadillos"
    ? "¿Quíeres personalizar tu bocadillo?"
    : category === "ensaladas"
    ? "¿Quíeres personalizar tu ensalada?"
    : "";
};

const UmamiDishIngredients = ({ ingredients, category, isYourTaste }) => {
  const { items, setItem } = useSwitchList(ingredients, isYourTaste ? false : true);
  const [isEnabled, setIsEnabled] = useState(false);

  const title = isYourTaste ? "Selecciona los ingredientes que desees:" : getTitle(category);
  return (
    <View>
      <Text>{title}</Text>
      {!isYourTaste ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      ) : null}

      {isEnabled || isYourTaste ? <SwitchList list={items} setItem={setItem} /> : null}
    </View>
  );
};

UmamiDishIngredients.propTypes = {
  ingredients: array,
  category: string,
  isYourTaste: bool,
};

export default UmamiDishIngredients;
