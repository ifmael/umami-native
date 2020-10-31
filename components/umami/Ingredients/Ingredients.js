import React from "react";
import { View, Text } from "react-native";
import SwitchList from "../../common/Switch/SwitchList";

const UmamiIngredients = ({ ingredients, setIngredient, title }) => {
  return (
    <View>
      <Text>{title}</Text>
      <SwitchList list={ingredients} setItem={setIngredient} />
    </View>
  );
};

export default UmamiIngredients;
