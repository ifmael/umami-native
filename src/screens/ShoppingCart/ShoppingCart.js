import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import Modal from "react-native-modal";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/Delivery/DeliveryInfo";
import DeliveryOptions from "/components/Delivery/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import useShoppingCart from "./useShoppingCart";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [
    {
      deliveryOptions,
      error,
      isDeliveryOption,
      isLoading,
      lowerMinPayment,
      shoppingCartByCategory,
      showModalMinPayment,
      titleMinPayment,
      totalPrice,
    },
    { onCreateNewOrder, setError, setShowModalMinPayment },
  ] = useShoppingCart();

  const toggleModal = () => {
    setShowDeliveryOptions(!showDeliveryOptions);
  };

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        <DeliveryInfo options={deliveryOptions} showDeliveryOptions={toggleModal} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDeliveryOptions} />
      <AddButton
        disabled={!isDeliveryOption || lowerMinPayment}
        loading={isLoading}
        onPress={onCreateNewOrder}
        title={lowerMinPayment ? titleMinPayment : `A pagar: ${totalPrice?.toFixed(2)} €`}
      />
      <Modal
        isVisible={showModalMinPayment}
        onBackButtonPress={() => setShowModalMinPayment(false)}
        onBackdropPress={() => setShowModalMinPayment(false)}
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
          {titleMinPayment}
        </Text>
      </Modal>
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
