import React, { useRef } from "react";
import { object } from "prop-types";
import { ScrollView } from "react-native";
import ProductInfo from "/components/Product/ProductDetail";
import ProductDetailAdd from "/components/Product/ProductDetailAdd";

import ProductDetailContext from "/context/ProductDetailContext";
import useProductDetail from "./useProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;
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
    product: rest.name,
    category: rest.category,
  });

  console.log(productDetailInfo);
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
      <ProductDetailAdd goTo={scrollViewElement} />
    </ProductDetailContext.Provider>
  );
};

ProductDetail.propTypes = {
  route: object,
};
export default ProductDetail;
