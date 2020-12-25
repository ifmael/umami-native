import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { number, string, object } from "prop-types";
import { ListItem } from "react-native-elements";
import FontText from "/components/common/FontText";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalContext } from "/context/GlobalContext";

export default function ShoppingCartItem({
  // beverage,
  id,
  // ingredients,
  // meatPoint,
  name,
  price,
  // side,
  // typeOfBread,
  // typeOfMeat,
}) {
  const { removeItem } = useContext(GlobalContext);
  return (
    <ListItem>
      <ListItem.Content>
        <View style={{ width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <FontText h4>{name} </FontText>
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
        <FontText style={{ paddingHorizontal: 5, margin: 5 }}>
          Esto es una prueba. Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba. Esto es una
          prueba. Esto es una prueba.
        </FontText>
      </ListItem.Content>
    </ListItem>
  );
}

ShoppingCartItem.propTypes = {
  id: string,
  name: string,
  price: number,
  props: object,
};
