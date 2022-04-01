import React, { useContext, useEffect } from "react";
import { array, string, bool } from "prop-types";
import { View, Switch } from "react-native";
import { Text } from "react-native-elements";
import SwitchList from "/components/common/Switch/SwitchList";
import useSwitchList from "/components/common/Switch/SwitchList/useSwitchList";
import AddExtraIngredients from "/components/Umami/Dish/AddExtraIngredients";
import ProductDetailContext from "/context/ProductDetailContext";
import { productDetailCustomActionStyles, switchStyles } from "/styles/theme";
import styles from "./Ingredients.styles";

const getTitle = (category) => {
  return category === "hamburguesas"
    ? "¿Quíeres personalizarla?"
    : category === "bocadillos"
    ? "¿Quíeres personalizarlo?"
    : category === "ensaladas"
    ? "¿Quíeres personalizarla?"
    : "";
};

const UmamiDishIngredients = ({ ingredients, category, isYourTaste }) => {
  const {
    productDetailInfo: { isCustom, isChildrenMenu },
    setCustom,
    setIngredients,
  } = useContext(ProductDetailContext);
  const [listIngredients, setIngredient, reset] = useSwitchList(ingredients, isYourTaste ? false : true);
  const title = isYourTaste ? "Selecciona los ingredientes" : getTitle(category);

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
      <View
        style={{
          ...styles.container,
          justifyContent: isYourTaste ? "center" : "space-between",
          marginBottom: 0,
        }}
      >
        <Text style={productDetailCustomActionStyles}>{title}</Text>
        {!isYourTaste ? (
          <Switch
            trackColor={{ false: switchStyles.trackColor.false, true: switchStyles.trackColor.true }}
            thumbColor={isCustom ? switchStyles.thumbColor.false : switchStyles.thumbColor.true}
            ios_backgroundColor={switchStyles.ios_backgroundColor}
            onValueChange={() => showIngredients(!isCustom)}
            value={isCustom}
          />
        ) : null}
      </View>

      {isCustom || isYourTaste ? (
        <View style={{ paddingHorizontal: 15 }}>
          {!isYourTaste ? <SwitchList list={listIngredients} setItem={setIngredient} /> : null}
          {!isChildrenMenu ? <AddExtraIngredients originalListIngredients={ingredients} category={category} /> : null}
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
