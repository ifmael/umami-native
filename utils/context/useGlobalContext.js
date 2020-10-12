import { useState, useEFfect, useEffect } from "react";
import { useQuery } from "@apollo/client";
import GET_ALL_DATA from "../../graphql/querys/getAllData";
import { sortAsc } from "../functions";

const formatProducts = (products) => {
  if (!products) return;

  return products.sort(sortAsc).map((product) => {
    const { id, name, description, price, ingredients } = product;
    const newIngredients = ingredients.map(({ name, type }) => ({
      name,
      type,
    }));

    return {
      id,
      name,
      description,
      price,
      ingredients: newIngredients,
    };
  });
};

const formatProductCategories = (productCategories) => {
  if (!productCategories) return;

  return productCategories.sort(sortAsc).map(({ id, name, color }) => ({
    id,
    name,
    color,
  }));
};

const useGlobalContext = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [products, setProducts] = useState();
  const [productCategories, setProductCategories] = useState();

  useEffect(() => {
    if (!data) return;

    const {
      products: productsServer,
      productCategories: productCategoriesServer,
    } = data;

    const productsFormatted = formatProducts(productsServer);
    // why is frozen ??
    const productCategoriesFormatted = formatProductCategories(
      productCategoriesServer.slice()
    );

    setProducts(productsFormatted);
    setProductCategories(productCategoriesFormatted);

    console.log(data);
  }, [data]);

  return { loading, error, products, productCategories };
};

export default useGlobalContext;
