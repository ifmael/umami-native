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
  isRadioButton,
  configuration,
  menu,
}) => {
  const [isMenu, setIsMenu] = useState(false);
  debugger;
  const isDish =
    category === "hamburguesas" ||
    category === "bocadillos" ||
    category === "ensaladas";
  const isBurguerSandwich =
    category === "hamburguesas" || category === "bocadillos";

  const IngredientsListComponent = isDish ? (
    // Personalizar ensaladas , bocadillos y hamburguesas
    <UmamiDishIngredients ingredients={ingredients} category={category} />
  ) : (
    // Para las salsas y  patatas
    <UmamiIngredients
      ingredients={ingredients}
      title={"Selecciona las salsas que te de la gana"}
      isRadioButton={isRadioButton}
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

      {isCustomizable ? IngredientsListComponent : null}

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
