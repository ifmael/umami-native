import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "/graphql/mutations/order";
import { addShoppingCart } from "/hooks/functions";
import { shoppingCartBEComponent } from "/constant";

const useOrder = () => {
  const [createOrder, { data: newOrderData, error: newOrderError, loading: newOrderLoading }] = useMutation(
    CREATE_ORDER
  );

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

  const createNewOrder = (deliveryOptionsInput, shoppingCartByCategories, totalPrice) => {
    try {
      const deliveryOptions = addDelivery(deliveryOptionsInput);
      const shoppingCart = addShoppingCart(shoppingCartByCategories);

      const order = {
        variables: {
          input: { data: { deliveryOptions, shoppingCart, totalPrice } },
        },
      };
      createOrder(order);
    } catch (error) {
      console.log(error);
    }
  };

  return [{ newOrderData, newOrderError, newOrderLoading }, { createNewOrder }];
};

export default useOrder;
