import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import Modal from "react-native-modal";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/Delivery/DeliveryInfo";
import DeliveryOptions from "/components/Delivery/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import { GlobalContext } from "/context/GlobalContext";
import useShoppingCart from "./useShoppingCart";
import styles from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const [showDeliveryOptions, setShowDEliveryOptions] = useState(false);
  const { deliveryOptions } = useContext(GlobalContext);
  const [{ isLoading, error, shoppingCartByCategory, totalPrice }, { onCreateNewOrder, setError }] = useShoppingCart();
  const isDeliveryOption = deliveryOptions?.option && deliveryOptions?.contactInfo;
  const toggleModal = () => {
    setShowDEliveryOptions(!showDeliveryOptions);
  };

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        <DeliveryInfo options={deliveryOptions} showDeliveryOptions={toggleModal} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={setShowDEliveryOptions} />
      <AddButton
        disabled={!isDeliveryOption}
        loading={isLoading}
        onPress={onCreateNewOrder}
        title={`A pagar: ${totalPrice?.toFixed(2)} €`}
      />
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
