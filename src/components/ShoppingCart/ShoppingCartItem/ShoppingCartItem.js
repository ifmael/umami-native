import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { array, bool, number, string, object, oneOfType } from "prop-types";
import { ListItem, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalContext } from "/context/GlobalContext";
import { getListOfIngredients } from "/utils/functions";

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
        <View style={{ width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Text h4>{customName}</Text>
          <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}>
            <Text h4 style={{ marginRight: 10 }}>
              {price}
            </Text>
            <Button
              raised
              icon={<Icon name="trash" size={15} color="white" />}
              buttonStyle={{ backgroundColor: "red" }}
              onPress={() => {
                removeItem(id);
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 5, margin: 5 }}>
          {typeOfMeat?.name ? <Text style={{ marginBottom: 5 }}>· {typeOfMeat.name}</Text> : null}
          {meatPoint?.name ? <Text style={{ marginBottom: 5 }}>· {meatPoint.name}</Text> : null}
          {typeOfBread?.name ? <Text style={{ marginBottom: 5 }}>· {typeOfBread.name}</Text> : null}
          {side?.name ? <Text style={{ marginBottom: 5 }}>· {side.name}</Text> : null}
          {side?.length > 0 ? <Text>{getListOfIngredients(side)}</Text> : null}
          {beverage?.name ? <Text style={{ marginBottom: 5 }}>· {beverage.name}</Text> : null}
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
