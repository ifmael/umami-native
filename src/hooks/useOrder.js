import { useApolloClient } from "@apollo/client";
import CREATE_ORDER from "/graphql/mutations/order";
import GET_MORE_ORDERS from "/graphql/querys/getMoreOrders";
import { addShoppingCart } from "/hooks/functions";
import { shoppingCartBEComponent } from "/constant";

const useOrder = () => {
  const client = useApolloClient();

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

  const createNewOrder = async (deliveryOptionsInput, shoppingCartByCategories, totalPrice) => {
    try {
      //Check if is possible make more order
      const { data } = await client.query({
        query: GET_MORE_ORDERS,
        fetchPolicy: "network-only",
      });
      const moreOrders = data?.configurations[0]?.configuration[0]?.moreOrder;
      const titleNoMoreOrder = data?.configurations[0]?.configuration[0]?.titleNoMoreOrders;

      if (moreOrders) {
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
        return { create: false, message: titleNoMoreOrder };
      }
    } catch (error) {
      throw new Error("Error in request");
    }
  };

  return [{}, { createNewOrder }];
};

export default useOrder;
