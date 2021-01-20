import React, { useContext, useEffect } from "react";
import { array, string, bool } from "prop-types";
import { View, Switch } from "react-native";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import ProductDetailContext from "/context/ProductDetailContext";
import styles from "./Ingredients.styles";
import FontText from "/components/common/FontText";

const getTitle = (category) => {
  return category === "hamburguesas"
    ? "¿Quíeres personalizarla?"
    : category === "bocadillos"
    ? "¿Quíeres personalizarlo?"
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
    if (isYourTaste) setCustom(true);
  }, [setCustom, isYourTaste]);

  useEffect(() => {
    if (!isCustom) return;

    setIngredients(listIngredients);
  }, [isCustom, listIngredients, setIngredients]);

  return (
    <View>
      <View style={styles.container}>
        <FontText style={{ fontSize: 18, fontWeight: "bold" }}>{title}</FontText>
        {!isYourTaste ? (
          <Switch
            trackColor={{ false: "#767577", true: "#c96" }}
            thumbColor={isCustom ? "#fc0" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => showIngredients(!isCustom)}
            value={isCustom}
          />
        ) : null}
      </View>

      {isCustom || isYourTaste ? (
        <View style={{ paddingHorizontal: 15 }}>
          <SwitchList list={listIngredients} setItem={setIngredient} />
        </View>
      ) : null}
    </View>
  );
};

UmamiDishIngredients.propTypes = {
  ingredients: array,
  category: string,
  isYourTaste: bool,
};

export default UmamiDishIngredients;
