import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import SwitchList from "../../../common/Switch/SwitchList";

const getTitle = (category) => {
  return category === "hamburguesas"
    ? "¿Quíeres personalizar tu hamburguesa?"
    : category === "bocadillos"
    ? "¿Quíeres personalizar tu bocadillo?"
    : category === "ensaladas"
    ? "¿Quíeres personalizar tu ensalada?"
    : "";
};

const UmamiDishIngredients = ({ ingredients, setIngredient, category }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View>
      <Text>{getTitle(category)}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEnabled(!isEnabled)}
        value={isEnabled}
      />
      {isEnabled ? (
        <SwitchList list={ingredients} setItem={setIngredient} />
      ) : null}
    </View>
  );
};

export default UmamiDishIngredients;
