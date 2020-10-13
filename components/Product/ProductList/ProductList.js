import React, { useContext } from "react";
import { FlatList } from "react-native";
import ProductItem from "../ProductItem";
import { GlobalContext } from "../../../utils/context/GlobalContext";

const Product = ({ category }) => {
  const { productsByCategory } = useContext(GlobalContext);
  const products = productsByCategory[category];

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Product;
