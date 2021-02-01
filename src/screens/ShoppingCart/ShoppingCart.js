import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/DeliveryInfo";
import DeliveryOptions from "/components/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import { GlobalContext } from "/context/GlobalContext";
import useShoppingCart from "./useShoppingCart";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [showDeliveryOptions, setShowDEliveryOptions] = useState(false);
  const { createNewOrder, deliveryOptions } = useContext(GlobalContext);
  const [{ shoppingCartByCategory, totalPrice }] = useShoppingCart();
  const toggleModal = () => {
    setShowDEliveryOptions(!showDeliveryOptions);
  };

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        <DeliveryInfo showDeliveryOptions={toggleModal} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDEliveryOptions} />
      <AddButton
        onPress={() => createNewOrder(deliveryOptions, shoppingCartByCategory, totalPrice)}
        title={`A pagar: ${totalPrice?.toFixed(2)} €`}
      />
    </View>
  );
}
