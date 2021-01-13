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

export const addBurgers = (burgersInput) => {
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

export const addGenericItem = (genericItemInput, category) => {
  try {
    const { beverage, dessert, salad } = shoppingCartBEComponent;

    return genericItemInput?.map(({ name }) => {
      const component =
        category === "bebidas" ? beverage : category === "postres" ? dessert : category === "ensaladas" ? salad : {};

      return {
        name,
        ...component,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMenus = (menusInput) => {
  try {
    return menusInput?.map((menuItem) => {
      const { category, isChildrenMenu } = menuItem;
      const { menu: menuComponent } = shoppingCartBEComponent;
      let newMenuElement = {};

      if (category === "hamburguesas") [newMenuElement.burger] = addBurgers([menuItem]);
      if (category === "bocadillos") [newMenuElement.sandwich] = addSandwiches([menuItem]);
      if (!isChildrenMenu) [newMenuElement.side] = addSides([menuItem?.side]);
      [newMenuElement.beverage] = addGenericItem([menuItem?.beverage], "bebidas");

      return { ...newMenuElement, ...menuComponent };
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSandwiches = (sandwichInput) => {
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

export const addSides = (sideInput) => {
  try {
    const { side } = shoppingCartBEComponent;

    return sideInput?.map((sideElement) => {
      let addToName = "";

      if (Array.isArray(sideElement.side) && sideElement.side.length > 0) {
        addToName = sideElement.side?.map(({ name }) => name).join(", ");
      }

      return {
        name: `${sideElement.name}${addToName ? `: ${addToName}` : ""}`,
        ...side,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const addShoppingCart = (shoppingCartByCategories) => {
  try {
    return shoppingCartByCategories?.reduce((newShoppingCart, { category, data }) => {
      return category === "bocadillos"
        ? [...newShoppingCart, ...addSandwiches(data)]
        : category === "hamburguesas"
        ? [...newShoppingCart, ...addBurgers(data)]
        : category === "menus"
        ? [...newShoppingCart, ...addMenus(data)]
        : category === "complementos"
        ? [...newShoppingCart, ...addSides(data)]
        : category === "bebidas" || category === "postres" || category === "ensaladas"
        ? [...newShoppingCart, ...addGenericItem(data, category)]
        : newShoppingCart;
    }, []);
  } catch (error) {
    console.log(error);
  }
};
