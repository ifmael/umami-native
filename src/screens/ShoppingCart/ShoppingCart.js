import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import useShoppingCart from "./useShoppingCart";
import COLORS from "/styles/colors";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [{ shoppingCartByCategory, totalPrice }] = useShoppingCart();

  return (
    <>
      <ScrollView style={styles.container}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
      </ScrollView>
      <Button
        title={`Pagar: ${totalPrice}€`}
        buttonStyle={{ paddingVertical: 12, backgroundColor: COLORS.addButton }}
        titleStyle={{
          fontSize: 20,
          fontFamily: "Confortaa",
          fontWeight: "bold",
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        }}
      />
    </>
  );
}
