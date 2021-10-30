import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { array, bool, number, string, object, oneOfType } from "prop-types";
import { ListItem, Text } from "react-native-elements";
import { GlobalContext } from "/context/GlobalContext";
import { getListOfIngredients } from "/utils/functions";
import styles, { stylesRNEComponents } from "./ShoppingCartItem.styles";

const ShoppingCartItem = ({
  beverage = {},
  category = "",
  id,
  ingredients = [],
  ingredientsExtra = [],
  isCustom,
  isMenu,
  isYourTaste,
  meatPoint = {},
  name,
  price,
  side = {},
  typeOfBread = {},
  typeOfMeat = {},
}) => {
  const { removeItem } = useContext(GlobalContext);

  const customName =
    isMenu && isCustom ? `${category.charAt(0).toUpperCase()}${category.slice(1, -1)} ${name.toLowerCase()}` : name;
  const withoutSomeIngredient = ingredients?.length > 0 ? ingredients.some(({ isSelected }) => !isSelected) : false;

  return (
    <ListItem>
      <ListItem.Content>
        <View style={styles.titleView}>
          <Text style={stylesRNEComponents.titleText}>{customName}</Text>
          <View style={styles.priceView}>
            <Text h4 style={{ ...styles.titleText, marginRight: 10 }}>
              {price?.toFixed(2)} €
            </Text>
            <Button
              buttonStyle={stylesRNEComponents.deleteButton}
              icon={<Icon name="trash-alt" size={18} color="rgba(204,51,51,0.8)" type="font-awesome-5" />}
              onPress={() => {
                removeItem(id);
              }}
              type="outline"
            />
          </View>
        </View>
        <View style={styles.optionsView}>
          {typeOfMeat?.name ? <Text style={stylesRNEComponents.optionText}>· {typeOfMeat.name}</Text> : null}
          {meatPoint?.name ? <Text style={stylesRNEComponents.optionText}>· {meatPoint.name}</Text> : null}
          {typeOfBread?.name ? <Text style={stylesRNEComponents.optionText}>· {typeOfBread.name}</Text> : null}
          {side?.name && ingredients?.length === 0 ? (
            <Text style={stylesRNEComponents.optionText}>· {side.name}</Text>
          ) : null}
          {side?.name && ingredients?.length ? (
            <Text style={stylesRNEComponents.optionText}>
              · {side.name} con {getListOfIngredients(ingredients)}
            </Text>
          ) : null}
          {Array.isArray(side?.data) && side?.data.length ? (
            <Text>
              {getListOfIngredients(side.data, side?.showWith ? "" : "· Sin ", side?.showWith ? false : true)}
            </Text>
          ) : null}
          {beverage?.name ? <Text style={stylesRNEComponents.optionText}>· {beverage.name}</Text> : null}
          {withoutSomeIngredient && !isYourTaste ? (
            <Text>{getListOfIngredients(ingredients, "· Sin ", true)} </Text>
          ) : null}
          {ingredientsExtra?.length > 0 ? <Text>{getListOfIngredients(ingredientsExtra, "· Con ")} </Text> : null}
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

ShoppingCartItem.propTypes = {
  beverage: object,
  category: string,
  id: string,
  ingredients: array,
  ingredientsExtra: array,
  isCustom: bool,
  isMenu: bool,
  isYourTaste: bool,
  meatPoint: object,
  name: string,
  price: number,
  side: oneOfType([array, object]),
  typeOfBread: object,
  typeOfMeat: object,
};

export default ShoppingCartItem;
