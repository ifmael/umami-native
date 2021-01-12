import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "/graphql/mutations/order";
import { validateContactInfo } from "/utils/functions";

const contactInfoInitialValue = () => ({
  block: "",
  flat: "",
  locality: "",
  number: "",
  phone: "",
  street: "",
});

const useOrder = () => {
  const [contactInfo, setContactInfo] = useState(contactInfoInitialValue);
  const [createOrder, { data: newOrderData, error: newOrderError, loading: newOrderLoading }] = useMutation(
    CREATE_ORDER
  );

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

  const createNewOrder = (orderInput) => {
    const order = { variables: { input: { data: { contactInfo: orderInput } } } };
    createOrder(order);
  };

  return [
    { contactInfo, newOrderData, newOrderError, newOrderLoading },
    { addContactInfo, createNewOrder },
  ];
};

export default useOrder;
