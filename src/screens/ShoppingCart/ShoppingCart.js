import React, { useContext } from "react";

// React Native components
import { View, ScrollView } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import Modal from "react-native-modal";

// Components
import ShoppingCartList from "/components/ShoppingCart/ShoppingCartList";
import DeliveryInfo from "/components/Delivery/DeliveryInfo";
import DeliveryOptions from "/components/Delivery/DeliveryOptions";
import AddButton from "/components/common/AddButton";
import Payments from "/components/Payments";
import RadioButtons from "/components/common/RadioButtons";

// Contex
import { GlobalContext } from "/context/GlobalContext";

// Hooks
import useShoppingCart from "./useShoppingCart";
import useShoppingCartModals from "./useShoppingCartModals";
import useRadioButtons from "/components/common/RadioButtons/useRadioButtons";

// Utils
import { getSchedule } from "/utils/time";

// Styles
import { green } from "/styles/theme";
import styles from "./ShoppingCart.styles";

const ShoppingCart = () => {
  const { configuration, paymentMethods } = useContext(GlobalContext);
  const isClosedFromSchedule = getSchedule(configuration?.schedule) ? false : true;
  const isClose = configuration?.close.isClose;
  const moreOrder = configuration?.moreOrders.moreOrder;
  const titleClose = configuration?.close?.title;
  const { options, setOption, selected: paymentMethod, setSelected } = useRadioButtons(paymentMethods);
  const [{ showDeliveryOptions, showIsClosedFromSchedule, showPaymentsMethod }, handlers] = useShoppingCartModals(
    isClosedFromSchedule
  );
  const [
    {
      deliveryOptions,
      error,
      isDeliveryOption,
      isLoading,
      showModalOrderCompleted,
      shoppingCartByCategory,
      totalPrice,
      priceForSupplement,
    },
    { onCreateNewOrder, resetOrder, setError },
  ] = useShoppingCart(paymentMethod);

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewContainer}>
        <ShoppingCartList shoppingCartByCategory={shoppingCartByCategory} />
        <View style={styles.divider} />
        {totalPrice - 1 < priceForSupplement ? (
          <>
            <View style={{ marginVertical: 20 }}>
              <Text h5 style={{ textAlign: "right" }}>
                Suplemento de un 1€ por pedidos inferiores a 20€
              </Text>
            </View>
            <View style={styles.divider} />
          </>
        ) : null}
        <DeliveryInfo options={deliveryOptions} showDeliveryOptions={handlers.toggleModalDelivery} />
        <Payments method={paymentMethod} showPaymentMethods={handlers.setShowPaymentsMethod} />
      </ScrollView>
      <DeliveryOptions showComponent={showDeliveryOptions} showModalHandler={handlers.setShowDeliveryOptions} />
      <AddButton
        disabled={!isDeliveryOption || isClosedFromSchedule || isClose || !moreOrder || !paymentMethod}
        loading={isLoading}
        onPress={onCreateNewOrder}
        title={`A pagar: ${totalPrice?.toFixed(2)} €`}
      />

      {/*
          SHOW ERROR MODAL
      */}
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

      {/*
        CLOSE
      */}
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

      {/*
  PEDIDO COMPLETADO
 */}
      <Modal
        isVisible={showModalOrderCompleted?.isCompleted}
        onBackButtonPress={() => resetOrder()}
        onBackdropPress={() => resetOrder()}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 5,
            paddingVertical: 40,
          }}
        >
          <Icon
            color={green}
            name="check-circle"
            size={36}
            type="font-awesome-5"
            containerStyle={{ marginRight: 15 }}
          />

          <Text h4>Pedido completado.</Text>
          {/* {showModalOrderCompleted?.orderId ? <Text h4>Id: {showModalOrderCompleted?.orderId}</Text> : null} */}
        </View>
      </Modal>

      {/*
       PAYMENT METHOD
      */}
      <Modal
        isVisible={showPaymentsMethod}
        onBackButtonPress={() => handlers.setShowPaymentsMethod(false)}
        onBackdropPress={() => handlers.setShowPaymentsMethod(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text h3 style={{ textAlign: "center", marginBottom: 10 }}>
            Elige una opción
          </Text>
          <RadioButtons options={options} setOption={setOption} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <Button
              title="Cancelar"
              onPress={() => {
                handlers.setShowPaymentsMethod(false);
                setSelected(null);
              }}
            />
            <Button disabled={!paymentMethod} title="Aceptar" onPress={() => handlers.setShowPaymentsMethod(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShoppingCart;
