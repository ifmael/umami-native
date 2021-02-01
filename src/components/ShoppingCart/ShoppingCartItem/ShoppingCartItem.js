import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { array, bool, number, string, object, oneOfType } from "prop-types";
import { ListItem, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalContext } from "/context/GlobalContext";
import { getListOfIngredients } from "/utils/functions";
import { red } from "/styles/theme";
import styles, { stylesRNEComponents } from "./ShoppingCartItem.styles";

export default function ShoppingCartItem({
  beverage = {},
  category = "",
  id,
  ingredients = [],
  isCustom,
  isMenu,
  meatPoint = {},
  name,
  price,
  side = {},
  typeOfBread = {},
  typeOfMeat = {},
}) {
  const { removeItem } = useContext(GlobalContext);

  const customName =
    isMenu && isCustom ? `${category.charAt(0).toUpperCase()}${category.slice(1, -1)} ${name.toLowerCase()}` : name;

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
              icon={<Icon name="trash" size={18} color={red} />}
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
          {side?.name ? <Text style={stylesRNEComponents.optionText}>· {side.name}</Text> : null}
          {side?.length > 0 ? <Text>{getListOfIngredients(side)}</Text> : null}
          {beverage?.name ? <Text style={stylesRNEComponents.optionText}>· {beverage.name}</Text> : null}
          {ingredients?.length > 0 ? <Text>{getListOfIngredients(ingredients, "· Con ")} </Text> : null}
        </View>
      </ListItem.Content>
    </ListItem>
  );
}

ShoppingCartItem.propTypes = {
  beverage: object,
  category: string,
  id: string,
  ingredients: array,
  isCustom: bool,
  isMenu: bool,
  meatPoint: object,
  name: string,
  price: number,
  side: oneOfType([array, object]),
  typeOfBread: object,
  typeOfMeat: object,
};
