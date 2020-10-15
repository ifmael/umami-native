import { sortAsc } from "../functions";

export const formatProducts = (products) => {
  if (!products) return;

  return products.sort(sortAsc).map((product) => {
    const {
      id,
      name,
      description,
      price,
      ingredients,
      product_category: { name: nameCategory },
      isCustomizable,
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
      isCustomizable,
    };
  });
};

export const getProductsByCategory = (products) => {
  if (!products) return;

  return products.reduce((acc, product) => {
    const { category } = product;
    const categoryInLowercase = category.toLowerCase();

    acc[categoryInLowercase] = acc[categoryInLowercase] || [];
    acc[categoryInLowercase].push(product);

    return acc;
  }, {});
};

export const formatProductCategories = (productCategories) => {
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
