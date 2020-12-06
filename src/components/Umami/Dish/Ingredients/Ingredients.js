import React, { useContext, useEffect } from "react";
import { array, string, bool } from "prop-types";
import { View, Text, Switch } from "react-native";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import ProductDetailContext from "/context/ProductDetailContext";
import styles from "./Ingredients.styles";

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
  const {
    productDetailInfo: { isCustom },
    setCustom,
    setIngredients,
  } = useContext(ProductDetailContext);
  const [listIngredients, setIngredient, reset] = useSwitchList(ingredients, isYourTaste ? false : true);
  const title = isYourTaste ? "Selecciona los ingredientes que desees:" : getTitle(category);

  const showIngredients = (value) => {
    setCustom(value);
    if (!value) {
      reset();
      setIngredients([]);
    }
  };

  useEffect(() => {
    if (!isCustom) return;

    setIngredients(listIngredients);
  }, [isCustom, listIngredients]);

  return (
    <View>
      <View style={styles.container}>
        <Text>{title}</Text>
        {!isYourTaste ? (
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isCustom ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => showIngredients(!isCustom)}
            value={isCustom}
          />
        ) : null}
      </View>

      {isCustom || isYourTaste ? <SwitchList list={listIngredients} setItem={setIngredient} /> : null}
    </View>
  );
};

UmamiDishIngredients.propTypes = {
  ingredients: array,
  category: string,
  isYourTaste: bool,
};

export default UmamiDishIngredients;
