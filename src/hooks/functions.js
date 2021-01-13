import { getListOfIngredients } from "/utils/functions";
import { shoppingCartBEComponent } from "/constant";

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
    const { burger } = shoppingCartBEComponent;

    return burgersInput?.map(({ ingredients, meatPoint, name, price, typeOfMeat }) => ({
      ingredients: ingredients?.length > 0 ? getListOfIngredients(ingredients, "· Sin ", true) : "",
      meatPoint: meatPoint?.name,
      name,
      price,
      typeOfMeat: typeOfMeat?.name,
      ...burger,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const addMenus = (menusInput) => {
  try {
    return menusInput?.map((menuItem) => {
      const { category } = menuItem;
      const { menu: menuComponent } = shoppingCartBEComponent;
      let newMenuElement = {};

      if (category === "hamburguesas") [newMenuElement.burger] = addBurger([menuItem]);
      if (category === "bocadillos") [newMenuElement.sandwich] = addSandwich([menuItem]);

      return { ...newMenuElement, ...menuComponent };
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSandwich = (sandwichInput) => {
  try {
    const { sandwich } = shoppingCartBEComponent;

    return sandwichInput?.map(({ ingredients, name, price, typeOfBread }) => ({
      ingredients: ingredients?.length > 0 ? getListOfIngredients(ingredients, "· Sin ", true) : "",
      name,
      price,
      typeOfBread: typeOfBread?.name,
      ...sandwich,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const addShoppingCart = (shoppingCartByCategories) => {
  try {
    return shoppingCartByCategories?.reduce((newShoppingCart, { category, data }) => {
      return category === "bocadillos"
        ? [...newShoppingCart, ...addSandwich(data)]
        : category === "hamburguesas"
        ? [...newShoppingCart, ...addBurger(data)]
        : category === "menus"
        ? [...newShoppingCart, ...addMenus(data)]
        : newShoppingCart;
    }, []);
  } catch (error) {
    console.log(error);
  }
};
