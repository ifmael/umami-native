import React from "react";
import ProductList from "../../components/Product/ProductList";

const Product = ({ route }) => {
  const { name } = route.params;
  return <ProductList category={name} />;
};

export default Product;
