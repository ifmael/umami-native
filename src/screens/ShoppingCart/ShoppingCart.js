import React, { useContext } from "react";
import { GlobalContext } from "/context/GlobalContext";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import Modal from "react-native-modal";
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/Delivery/DeliveryInfo";
import DeliveryOptions from "/components/Delivery/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import useShoppingCart from "./useShoppingCart";
import useShoppingCartModals from "./useShoppingCartModals";
import { getSchedule } from "/utils/time";
import styles from "./ShoppingCart.styles";

const ShoppingCart = () => {
  const { configuration } = useContext(GlobalContext);
  const isClosedFromSchedule = getSchedule(configuration?.schedule) ? false : true;
  const isClose = configuration?.close.isClose;
  const moreOrder = configuration?.moreOrders.moreOrder;
  const titleClose = configuration?.close?.title;
  const [{ showDeliveryOptions, showIsClosedFromSchedule }, handlers] = useShoppingCartModals(isClosedFromSchedule);
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
  ] = useShoppingCart(isClosedFromSchedule);

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        <DeliveryInfo options={deliveryOptions} showDeliveryOptions={handlers.toggleModalDelivery} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={handlers.setShowDeliveryOptions} />
      <AddButton
        disabled={!isDeliveryOption || lowerMinPayment || isClosedFromSchedule || isClose || !moreOrder}
        loading={isLoading}
        onPress={onCreateNewOrder}
        title={lowerMinPayment ? titleMinPayment : `A pagar: ${totalPrice?.toFixed(2)} €`}
      />
      <Modal
        isVisible={showModalMinPayment && showModalMinPayment && !isClosedFromSchedule && !isClose && moreOrder}
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
      <Modal
        isVisible={showIsClosedFromSchedule}
        onBackButtonPress={() => handlers.setIsClosedFromSchedule(false)}
        onBackdropPress={() => handlers.setIsClosedFromSchedule(false)}
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
          {titleClose}
        </Text>
      </Modal>
    </View>
  );
};

export default ShoppingCart;
