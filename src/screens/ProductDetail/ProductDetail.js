import React from "react";
import { object } from "prop-types";
import { ScrollView } from "react-native";
import ProductInfo from "/components/Product/ProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;

  return (
    <ScrollView>
      <ProductInfo {...rest} />
    </ScrollView>
  );
};

ProductDetail.propTypes = {
  route: object,
};
export default ProductDetail;
