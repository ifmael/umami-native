import { useState } from "react";

const initialState = {
  contactInfo: null,
  name: null,
  option: null,
};

const useDelivery = () => {
  const [deliveryOptions, setDeliveryOptions] = useState(initialState);

  const clearDeliveryOptions = () => {
    setDeliveryOptions(initialState);
  };

  const setContactInfo = (contactInfo) => {
    setDeliveryOptions((currentDeliveryOptions) => ({ ...currentDeliveryOptions, contactInfo }));
  };

  const setDeliveryOption = (name, option) => {
    setDeliveryOptions((currentDeliveryOptions) => ({ ...currentDeliveryOptions, name, option }));
  };

  return [{ deliveryOptions }, { clearDeliveryOptions, setContactInfo, setDeliveryOption }];
};

export default useDelivery;
