import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "/context/GlobalContext";

const useShoppingCartModals = (isClosedFromSchedule) => {
  const { clearShoppingCart } = useContext(GlobalContext);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showIsClosedFromSchedule, setIsClosedFromSchedule] = useState(isClosedFromSchedule);

  const toggleModalDelivery = () => {
    setShowDeliveryOptions(!showDeliveryOptions);
  };

  useEffect(() => {
    if (isClosedFromSchedule) {
      setIsClosedFromSchedule(true);
      setTimeout(() => clearShoppingCart(), 2000);
    }
  }, [isClosedFromSchedule, clearShoppingCart]);

  return [
    { showDeliveryOptions, showIsClosedFromSchedule },
    { setIsClosedFromSchedule, setShowDeliveryOptions, toggleModalDelivery },
  ];
};

export default useShoppingCartModals;
