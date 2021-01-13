import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { array, boolean, number, string, object, oneOfType } from "prop-types";
import { ListItem } from "react-native-elements";
import FontText from "/components/common/FontText";
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
          <FontText h4>{customName}</FontText>
          <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}>
            <FontText h4 style={{ marginRight: 10 }}>
              {price}
            </FontText>
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
          {typeOfMeat?.name ? <FontText style={{ marginBottom: 5 }}>· {typeOfMeat.name}</FontText> : null}
          {meatPoint?.name ? <FontText style={{ marginBottom: 5 }}>· {meatPoint.name}</FontText> : null}
          {typeOfBread?.name ? <FontText style={{ marginBottom: 5 }}>· {typeOfBread.name}</FontText> : null}
          {side?.name ? <FontText style={{ marginBottom: 5 }}>· {side.name}</FontText> : null}
          {side?.length > 0 ? <FontText>{getListOfIngredients(side)}</FontText> : null}
          {beverage?.name ? <FontText style={{ marginBottom: 5 }}>· {beverage.name}</FontText> : null}
          {ingredients?.length > 0 ? <FontText>{getListOfIngredients(ingredients, "· Con ")} </FontText> : null}
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
  isCustom: boolean,
  isMenu: boolean,
  meatPoint: object,
  name: string,
  price: number,
  side: oneOfType([array, object]),
  typeOfBread: object,
  typeOfMeat: object,
};
