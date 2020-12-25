import React from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
// import { Divider } from "react-native-elements";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import FontText from "/components/common/FontText";

import useShoppingCart from "./useShoppingCart";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [{ shoppingCartByCategory, totalPrice }] = useShoppingCart();

  return (
    <View style={styles.container}>
      <ScrollView>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        {/* <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderStyle: "dotted" }} /> */}
        <View
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderRadius: 1,
            marginHorizontal: 5,
            marginTop: 20,
          }}
        ></View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16, marginRight: 16 }}>
          <FontText h4>Total: </FontText>
          <FontText h4>{totalPrice}</FontText>
        </View>
      </ScrollView>
    </View>
  );
}
