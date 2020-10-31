import React from "react";
import { ScrollView } from "react-native";
import ProductInfo from "../../components/Product/ProductDetail";

const ProductDetail = ({ route }) => {
  const { ...rest } = route.params;

  return (
    <ScrollView>
      <ProductInfo {...rest} />
    </ScrollView>
  );
};

export default ProductDetail;
