import React, { useState } from "react";
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

const UmamiDishIngredients = ({ ingredients, category }) => {
  const { items, setItem } = useSwitchList(ingredients, true);

  const [isEnabled, setIsEnabled] = useState(true);
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
      {isEnabled ? <SwitchList list={items} setItem={setItem} /> : null}
    </View>
  );
};

export default UmamiDishIngredients;
