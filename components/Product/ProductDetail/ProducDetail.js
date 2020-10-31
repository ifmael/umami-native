import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

import UmamiDishConfiguration from "../../Umami/Dish/Configurations";

import UmamiIngredients from "../../Umami/Ingredients";
import UmamiDishIngredients from "../../Umami/Dish/Ingredients";
import UmamiMenu from "../../Umami/Menu";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
import useSwitchList from "../../common/Switch/SwitchList/useSwitchList";

const ProductDetail = ({
  name,
  description,
  price,
  isCustomizable,
  ingredients,
  category,
  isMenuable,
  configuration,
  menu,
}) => {
  const [isMenu, setIsMenu] = useState(false);

  const isDish =
    category === "hamburguesas" ||
    category === "bocadillos" ||
    category === "ensaladas";
  const isBurguerSandwich =
    category === "hamburguesas" || category === "bocadillos";

  const { items, setItem } = useSwitchList(ingredients, isDish ? true : false);

  const Ingredients = isDish ? (
    <UmamiDishIngredients
      ingredients={items}
      setIngredient={setItem}
      category={category}
    />
  ) : (
    <UmamiIngredients
      ingredients={items}
      setIngredient={setItem}
      title={"Selecciona las salsas que te de la gana"}
    />
  );

  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
      {isBurguerSandwich ? (
        <UmamiDishConfiguration
          configurations={configuration}
          title={"hello"}
        />
      ) : null}

      {isCustomizable ? Ingredients : null}

      {isMenuable ? (
        <View>
          <Text>¿Quíeres convertirlo en Menú?</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isMenu ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsMenu(!isMenu)}
            value={isMenu}
          />
          {isMenu ? <UmamiMenu options={menu} /> : null}
        </View>
      ) : null}

      {/* <CheckBox
        center
        title="¿Quíeres convertirlo en Menú?"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        uncheckedColor="green"
        checkedColor="red"
        checked={isMenu}
        onPress={() => setIsMenu(!isMenu)}
      /> */}
    </View>
  );
};

export default ProductDetail;
