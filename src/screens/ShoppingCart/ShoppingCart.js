import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/DeliveryInfo";
import DeliveryOptions from "/components/DeliveryOptions";
import { GlobalContext } from "/context/GlobalContext";
import useShoppingCart from "./useShoppingCart";
import COLORS from "/styles/colors";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [showDeliveryOptions, setShowDEliveryOptions] = useState(false);

  const toggleModal = () => {
    setShowDEliveryOptions(!showDeliveryOptions);
  };
  const { createNewOrder, deliveryOptions } = useContext(GlobalContext);
  const [{ shoppingCartByCategory, totalPrice }] = useShoppingCart();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <DeliveryInfo showDeliveryOptions={toggleModal} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDEliveryOptions} />

      <Button
        buttonStyle={{ paddingVertical: 12, backgroundColor: COLORS.addButton }}
        onPress={() => createNewOrder(deliveryOptions, shoppingCartByCategory, totalPrice)}
        title={`Pagar: ${totalPrice}€`}
        titleStyle={{
          fontSize: 20,
          fontFamily: "Confortaa",
          fontWeight: "bold",
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        }}
      />
    </View>
  );
}
