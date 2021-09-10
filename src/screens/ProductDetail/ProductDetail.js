import React, { useRef } from "react";
import { object } from "prop-types";
import { ScrollView } from "react-native";
import ProductInfo from "/components/Product/ProductDetail";
import ProductDetailAdd from "/components/Product/ProductDetailAdd";

import ProductDetailContext from "/context/ProductDetailContext";
import useProductDetail from "./useProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;
  const { isChildrenMenu, isYourTaste, price } = rest;
  const scrollViewElement = useRef(null);
  const [selectorProductDetail, handlerProductDetail] = useProductDetail({
    name: rest.name,
    category: rest.category,
    customiseSideIngredients: rest.customiseSideIngredients,
  });

  return (
    <ProductDetailContext.Provider
      value={{
        ...selectorProductDetail,
        ...handlerProductDetail,
      }}
    >
      <ScrollView style={{ backgroundColor: "white" }} ref={scrollViewElement}>
        <ProductInfo {...rest} />
      </ScrollView>
      <ProductDetailAdd
        goTo={scrollViewElement}
        isChildrenMenu={isChildrenMenu}
        isYourTaste={isYourTaste}
        price={price}
      />
    </ProductDetailContext.Provider>
  );
};

ProductDetail.propTypes = {
  route: object,
};
export default ProductDetail;
