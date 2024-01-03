import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import CREATE_ORDER from "/graphql/mutations/order";
import GET_MORE_ORDERS from "/graphql/querys/getMoreOrders";
import { addShoppingCart } from "/hooks/functions";
import { GlobalContext } from "/context/GlobalContext";
import { shoppingCartBEComponent } from "/constant";
// import * as Sentry from "sentry-expo";

const addDelivery = (deliveryOptions) => {
  try {
    const { atHome, inLocal } = shoppingCartBEComponent;
    if (deliveryOptions?.option === "home") {
      return { ...deliveryOptions?.contactInfo, time: `${deliveryOptions?.contactInfo.time}`, ...atHome };
    } else if (deliveryOptions?.option === "restaurant") {
      return { ...deliveryOptions?.contactInfo, time: `${deliveryOptions?.contactInfo.time}`, ...inLocal };
    } else {
      console.log(`it should be impossibe(addDelivery): ${deliveryOptions?.option}`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const useOrder = () => {
  const { setProperty, clearShoppingCart } = useContext(GlobalContext);
  const client = useApolloClient();

  const createNewOrder = async (
    deliveryOptionsInput,
    shoppingCartByCategories,
    totalPrice,
    paymentMethod,
    withSupplement,
  ) => {
    let payload;
    try {
      //Check if is possible make more order
      const { data } = await client.query({
        query: GET_MORE_ORDERS,
        fetchPolicy: "network-only",
      });
      const componentClose = "ComponentConfigurationsClose";
      const componentOrders = "ComponentConfigurationsMoreOrders";
      const configuration = data?.configurations[0]?.configuration;
      const close = configuration?.find(({ __typename }) => __typename === componentClose);
      const moreOrder = configuration?.find(({ __typename }) => __typename === componentOrders);

      if (!close?.isClose && moreOrder.moreOrder) {
        const deliveryOptions = addDelivery(deliveryOptionsInput);
        const shoppingCart = addShoppingCart(shoppingCartByCategories);

        payload = {
          deliveryOptions,
          shoppingCart,
          totalPrice,
          paymentMethod: paymentMethod.id,
          supplement: withSupplement ? 1 : 0,
        };
        const response = await client.mutate({
          mutation: CREATE_ORDER,
          variables: {
            input: {
              data: payload,
            },
          },
        });
        const orderId = response?.data?.createOrder?.order?.id || "";

        return { create: true, message: orderId };
      } else {
        !moreOrder.moreOrder ? setProperty("moreOrders", moreOrder) : setProperty("close", close);
        setTimeout(() => clearShoppingCart(), 2000);

        return !moreOrder.moreOrder
          ? { create: false, message: moreOrder?.titleNoMoreOrders }
          : { create: false, message: close?.title };
      }
    } catch (error) {
      // const context = {
      //   level: "fatal",
      //   contexts: payload,
      //   tags: "order",
      // };
      // if (Sentry?.Native?.captureException) {
      //   Sentry.Native.captureException(new Error("error creating a new order"), context);
      // } else if (Sentry?.Browser?.captureException) {
      //   Sentry.Browser.captureException(new Error("error creating a new order"), context);
      // }

      throw new Error("Error in request");
    }
  };

  return createNewOrder;
};

export default useOrder;
