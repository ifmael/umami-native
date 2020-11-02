import React, { useContext } from "react";
import { FlatList } from "react-native";
import ProductItem from "../ProductItem";
import { GlobalContext } from "../../../utils/context/GlobalContext";
import { sortAsc } from "../../../utils/functions";

const ProductList = ({ category }) => {
  const { productsByCategory } = useContext(GlobalContext);
  const products = productsByCategory[category] || [];
  const sortedProducts = products?.sort(sortAsc);

  return (
    <FlatList
      data={sortedProducts}
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProductList;
