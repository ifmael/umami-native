import { useEffect } from "react";

export default function useCheckErrors(toCheck, productDetailInfo) {
  useEffect(() => {
    if (!productDetailInfo) return;
    const { errors } = productDetailInfo;

    if (!errors) {
      toCheck.forEach(({ setter }) => setter(false));

      return;
    }

    const errorFounds = toCheck.filter((errorConf) => {
      return errors.find((error) => error.type === errorConf.type);
    });

    if (errorFounds && Array.isArray(errorFounds) && errorFounds.length > 0) {
      errorFounds.forEach((error) => error.setter(true));
    }
  }, [productDetailInfo, toCheck]);
}
