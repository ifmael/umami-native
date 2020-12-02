import React from "react";
import { object } from "prop-types";
import ProductList from "/components/Product/ProductList";

const Product = ({ route }) => {
  const { slug } = route.params;
  return <ProductList category={slug} />;
};

Product.propTypes = {
  route: object,
};

export default Product;
