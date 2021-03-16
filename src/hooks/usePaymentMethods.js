import { useEffect, useState } from "react";

const useCategories = (dataFromServer) => {
  const [paymentMethods, setPaymentMethods] = useState();

  useEffect(() => {
    if (!dataFromServer) return;

    const { paymentMethods: paymentMethodsServer } = dataFromServer;

    setPaymentMethods(paymentMethodsServer.slice().sort((a, b) => a.id - b.id));
  }, [dataFromServer]);

  return paymentMethods;
};

export default useCategories;
