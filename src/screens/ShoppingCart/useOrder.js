import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import CREATE_ORDER from "/graphql/mutations/order";
import GET_MORE_ORDERS from "/graphql/querys/getMoreOrders";
import { addShoppingCart } from "/hooks/functions";
import { GlobalContext } from "/context/GlobalContext";
import { shoppingCartBEComponent } from "/constant";

const addDelivery = (deliveryOptions) => {
  try {
    const { atHome, inLocal } = shoppingCartBEComponent;
    if (deliveryOptions?.option === "home") {
      return { ...deliveryOptions?.contactInfo, ...atHome };
    } else if (deliveryOptions?.option === "restaurant") {
      return { ...deliveryOptions?.contactInfo, ...inLocal };
    } else {
      console.log(`it should be impossibe(addDelivery): ${deliveryOptions?.option}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const useOrder = () => {
  const { setProperty, clearShoppingCart } = useContext(GlobalContext);
  const client = useApolloClient();

  const createNewOrder = async (deliveryOptionsInput, shoppingCartByCategories, totalPrice) => {
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
        // const deliveryOptions = {
        //   __component: "contact.in-local",
        //   __typename: "ComponentContactInLocal",
        //   name: "Vhj",
        //   phone: "987654321",
        // };
        const shoppingCart = addShoppingCart(shoppingCartByCategories);

        await client.mutate({
          mutation: CREATE_ORDER,
          variables: {
            input: { data: { deliveryOptions, shoppingCart, totalPrice } },
          },
        });

        return { create: true, message: "ok" };
      } else {
        !moreOrder.moreOrder ? setProperty("moreOrders", moreOrder) : setProperty("close", close);
        setTimeout(() => clearShoppingCart(), 2000);

        return !moreOrder.moreOrder
          ? { create: false, message: moreOrder?.titleNoMoreOrders }
          : { create: false, message: close?.title };
      }
    } catch (error) {
      throw new Error("Error in request");
    }
  };

  return createNewOrder;
};

export default useOrder;
