import React from "react";
import ProductList from "../../components/Product/ProductList";

const Product = ({ route }) => {
  const { slug } = route.params;
  return <ProductList category={slug} />;
};

export default Product;
