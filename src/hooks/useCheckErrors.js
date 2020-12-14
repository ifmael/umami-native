import { useEffect } from "react";

export default function useCheckErrors(type, productDetailInfo, setLocalError) {
  useEffect(() => {
    if (!productDetailInfo) return;
    const { errors } = productDetailInfo;

    if (!errors) return;
    const errorFound = errors?.find((errors) => errors.type === type);

    errorFound ? setLocalError(true) : setLocalError(false);
  }, [productDetailInfo, type, setLocalError]);
}
