import { useState } from "react";

const useDelivery = () => {
  const [deliveryOptions, setDeliveryOption] = useState(null);

  return [{ deliveryOptions }, { setDeliveryOption }];
};

export default useDelivery;
