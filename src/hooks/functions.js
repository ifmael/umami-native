import { getListOfIngredients } from "/utils/functions";

export const getProductsByCategory = (products) => {
  if (!products) return;

  return products.reduce((acc, product) => {
    const { category, ...rest } = product;
    // If the category is forgotten when the customer creates a new product.
    const { slug } = category || "unknow";

    acc[slug] = acc[slug] || [];
    acc[slug].push({ ...rest, category: slug });

    return acc;
  }, {});
};

// ### ORDERS ###

export const addBurger = (burgersInput) => {
  try {
    return burgersInput?.map(({ ingredients, meatPoint, name, price, typeOfMeat }) => ({
      ingredients: ingredients?.length > 0 ? getListOfIngredients(ingredients, "· Sin ", true) : "",
      meatPoint: meatPoint?.name,
      name,
      price,
      typeOfMeat: typeOfMeat?.name,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const addSandwich = (sandwichInput) => {
  try {
    return sandwichInput?.map(({ ingredients, name, price, typeOfBread }) => ({
      ingredients: ingredients?.length > 0 ? getListOfIngredients(ingredients, "· Sin ", true) : "",
      name,
      price,
      typeOfBread: typeOfBread?.name,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const addShoppingCart = (shoppingCartByCategories, totalPrice) => {
  try {
    return shoppingCartByCategories?.reduce(
      (newShoppingCart, { category, data }) => {
        if (category === "hamburguesas") {
          const burgers = addBurger(data);
          return { ...newShoppingCart, burgers };
        }
        if (category == "bocadillos") {
          const sandwich = addSandwich(data);
          return { ...newShoppingCart, sandwich };
        }
      },
      { totalPrice }
    );
  } catch (error) {
    console.log(error);
  }
};
