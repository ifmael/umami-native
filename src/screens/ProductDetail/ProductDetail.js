import React, { useRef } from "react";
import { object } from "prop-types";
import { ScrollView } from "react-native";
import ProductInfo from "/components/Product/ProductDetail";
import ProductDetailAdd from "/components/Product/ProductDetailAdd";

import ProductDetailContext from "/context/ProductDetailContext";
import useProductDetail from "./useProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;
  const { isChildrenMenu, isMenu, isYourTaste, price, menu } = rest;
  const scrollViewElement = useRef(null);
  const {
    productDetailInfo,
    setCustom,
    setIngredients,
    setDishConfiguration,
    setIsMenu,
    setBeverage,
    setSide,
    setErrors,
    removeError,
  } = useProductDetail({
    name: rest.name,
    category: rest.category,
  });

  const menuInfo = menu?.find(({ __typename }) => {
    return __typename === "ComponentMenuInfo";
  });

  return (
    <ProductDetailContext.Provider
      value={{
        productDetailInfo,
        setCustom,
        setIngredients,
        setDishConfiguration,
        setIsMenu,
        setBeverage,
        setSide,
        setErrors,
        removeError,
      }}
    >
      <ScrollView style={{ backgroundColor: "white" }} ref={scrollViewElement}>
        <ProductInfo {...rest} />
      </ScrollView>
      <ProductDetailAdd
        goTo={scrollViewElement}
        isChildrenMenu={isChildrenMenu}
        isMenu={isMenu}
        isYourTaste={isYourTaste}
        price={price}
        priceMenu={menuInfo?.price}
      />
    </ProductDetailContext.Provider>
  );
};

ProductDetail.propTypes = {
  route: object,
};
export default ProductDetail;
