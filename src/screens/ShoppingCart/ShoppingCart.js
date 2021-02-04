import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/DeliveryInfo";
import DeliveryOptions from "/components/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import Modal from "react-native-modal";
import useShoppingCart from "./useShoppingCart";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [showDeliveryOptions, setShowDEliveryOptions] = useState(false);
  const [{ isLoading, error, shoppingCartByCategory, totalPrice }, { onCreateNewOrder, setError }] = useShoppingCart();
  const toggleModal = () => {
    setShowDEliveryOptions(!showDeliveryOptions);
  };
  console.log(error);
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        <DeliveryInfo showDeliveryOptions={toggleModal} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDEliveryOptions} />
      <AddButton loading={isLoading} onPress={onCreateNewOrder} title={`A pagar: ${totalPrice?.toFixed(2)} €`} />
      <Modal
        isVisible={error.show}
        onBackButtonPress={() => setError((currentValue) => ({ ...currentValue, show: false }))}
        onBackdropPress={() => setError((currentValue) => ({ ...currentValue, show: false }))}
      >
        <Text
          h4
          style={{
            backgroundColor: "white",
            paddingVertical: 40,
            paddingHorizontal: 10,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          {error.message}
        </Text>
      </Modal>
    </View>
  );
}
