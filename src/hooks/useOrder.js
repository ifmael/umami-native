import { useState } from "react";
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

  return [{ contactInfo }, { addContactInfo }];
};

export default useOrder;
