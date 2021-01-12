import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "/graphql/mutations/order";
import { addShoppingCart } from "/hooks/functions";
import { validateContactInfo } from "/utils/functions";

const contactInfoInitialValue = () => ({
  block: null,
  flat: null,
  locality: null,
  number: null,
  phone: null,
  street: null,
});

// const shoppingCartInitialValue = () => ({
//   burger: [],
// });

const useOrder = () => {
  // Contact Info
  const [contactInfo, setContactInfo] = useState(contactInfoInitialValue);
  const [createOrder, { data: newOrderData, error: newOrderError, loading: newOrderLoading }] = useMutation(
    CREATE_ORDER
  );

  // ShoppingCart
  // const [shoppingCart, setShoppingCart] = useState(shoppingCartInitialValue);

  const addContactInfo = (contactInfoInput) => {
    try {
      // Valide mandatory fields
      const { phone, street, locality } = contactInfoInput;
      const { isValid } = validateContactInfo({
        phone,
        street,
        locality,
      });
      if (isValid) {
        console.log(contactInfoInput);
        setContactInfo(contactInfoInput);
      } else {
        console.log("No se ha podido añadir la información de contacto");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewOrder = (shoppingCartByCategories, totalPrice) => {
    try {
      const shoppingCart = addShoppingCart(shoppingCartByCategories, totalPrice);
      const contactInfoMockup = {
        locality: "",
        phone: "",
        street: "",
      };

      const order = { variables: { input: { data: { contactInfo: contactInfoMockup, shoppingCart: shoppingCart } } } };
      createOrder(order);
    } catch (error) {
      console.log(error);
    }
  };

  return [
    { contactInfo, newOrderData, newOrderError, newOrderLoading },
    { addContactInfo, createNewOrder },
  ];
};

export default useOrder;
