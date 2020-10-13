import { useState, useEFfect, useEffect } from "react";
import { useQuery } from "@apollo/client";
import GET_ALL_DATA from "../../graphql/querys/getAllData";
import { sortAsc } from "../functions";

const formatProducts = (products) => {
  if (!products) return;

  return products.sort(sortAsc).map((product) => {
    const {
      id,
      name,
      description,
      price,
      ingredients,
      product_category: { name: nameCategory },
    } = product;
    const newIngredients = ingredients.map(({ id, name, type }) => ({
      id,
      name,
      type,
    }));

    return {
      id,
      name,
      description,
      price,
      ingredients: newIngredients,
      category: nameCategory,
    };
  });
};

const getProductsByCategory = (products) => {
  if (!products) return;

  return products.reduce((acc, product) => {
    const { category } = product;
    const categoryInLowercase = category.toLowerCase();

    acc[categoryInLowercase] = acc[categoryInLowercase] || [];
    acc[categoryInLowercase].push(product);

    return acc;
  }, {});
};

const formatProductCategories = (productCategories) => {
  if (!productCategories) return;

  const formatedProducCategories = productCategories
    .sort(sortAsc)
    .map(({ id, name, color }) => ({
      id,
      name,
      color,
    }));
  const simpleCategories = formatedProducCategories.map(({ name }) => name);

  return [formatedProducCategories, simpleCategories];
};

const useGlobalContext = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [products, setProducts] = useState();
  const [productsByCategory, setProductsByCategory] = useState();
  const [categories, setCategories] = useState();
  const [simpleCategories, setSimpleCategories] = useState();

  useEffect(() => {
    if (!data) return;

    const {
      products: productsServer,
      productCategories: productCategoriesServer,
    } = data;

    const productsFormatted = formatProducts(productsServer);
    const productsCategory = getProductsByCategory(productsFormatted);
    // why is frozen ??
    const [
      productCategoriesFormatted,
      simpleCategoriesAux,
    ] = formatProductCategories(productCategoriesServer.slice());

    setProducts(productsFormatted);
    setProductsByCategory(productsCategory);
    setCategories(productCategoriesFormatted);
    setSimpleCategories(simpleCategoriesAux);
  }, [data]);

  return {
    loading,
    error,
    products,
    productsByCategory,
    categories,
    simpleCategories,
  };
};

export default useGlobalContext;
