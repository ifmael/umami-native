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

    return burgersInput?.map(
      ({
        ingredients,
        ingredientsExtra,
        isYourTaste,
        meatPoint,
        name,
        // price,
        typeOfMeat,
        typeOfBread,
        mainProductPrice,
        isChildrenMenu,
      }) => {
        let listOfIngredients = !isYourTaste
          ? ingredients
              .filter(({ isSelected }) => !isSelected)
              .map(({ name }) => `- Sin ${name}`)
              .join(",")
          : "";

        listOfIngredients =
          ingredientsExtra.length > 0
            ? listOfIngredients !== ""
              ? `${listOfIngredients} ||${ingredientsExtra
                  .map(({ name, price }) => `- Con ${name}--${price}`)
                  .join(",")}`
              : ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")
            : listOfIngredients;
        // : listOfIngredients;
        // ? listOfIngredients !== ""
        //   ? `${listOfIngredients} ||${ingredientsExtra.map(({ name }) => `- Con ${name}`).join(",")}`
        //   : ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")
        // : listOfIngredients;

        return {
          ingredients: listOfIngredients ?? "",
          meatPoint: meatPoint?.name,
          name,
          price: mainProductPrice,
          typeOfMeat: typeOfMeat?.price ? `${typeOfMeat?.name}||${typeOfMeat?.price}` : typeOfMeat?.name,
          typeOfBread: typeOfBread?.price ? `${typeOfBread?.name}||${typeOfBread?.price}` : typeOfBread?.name,
          isChildrenMenu: isChildrenMenu ?? false,
          ...burger,
        };
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const addGenericItem = (genericItemInput, category) => {
  try {
    const { beverage, dessert, salad } = shoppingCartBEComponent;

    return genericItemInput?.map(({ name, price }) => {
      const component =
        category === "bebidas" ? beverage : category === "postres" ? dessert : category === "ensaladas" ? salad : {};

      return {
        name,
        price,
        ...component,
      };
    });
  } catch (error) {
    throw new Error(error);
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
      if (!isChildrenMenu) [newMenuElement.side] = addSidesMenu([menuItem?.side]);
      [newMenuElement.beverage] = addGenericItem([menuItem?.beverage], "bebidas");

      return { ...newMenuElement, ...menuComponent };
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addSandwiches = (sandwichInput) => {
  try {
    const { sandwich } = shoppingCartBEComponent;

    return sandwichInput?.map(({ ingredients, ingredientsExtra, isYourTaste, name, typeOfBread, mainProductPrice }) => {
      let listOfIngredients = !isYourTaste
        ? ingredients
            .filter(({ isSelected }) => !isSelected)
            .map(({ name }) => `- Sin ${name}`)
            .join(",")
        : "";

      listOfIngredients =
        ingredientsExtra.length > 0
          ? listOfIngredients !== ""
            ? `${listOfIngredients} ||${ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")}`
            : ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")
          : listOfIngredients;

      return {
        ingredients: ingredients?.length > 0 ? listOfIngredients : "",
        name,
        price: mainProductPrice,
        typeOfBread: typeOfBread?.name,
        ...sandwich,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addSidesMenu = (sideInput) => {
  try {
    const { side } = shoppingCartBEComponent;

    return sideInput?.map((sideElement) => {
      let addToName = "";
      let isSauce = false;
      let sauces = [];
      let ingredientsSide;

      if (Array.isArray(sideElement.side) && sideElement.side.length > 0) {
        // Normal
        addToName = sideElement.side?.map(({ name }) => name).join(", ");
      } else if (Array.isArray(sideElement.option) && sideElement.option.length > 0) {
        // Sides from menu, custom ingredients
        ingredientsSide = sideElement.option
          .filter(({ isSelected }) => !isSelected)
          .map(({ name }) => `Sin ${name}`)
          .join(",");
      } else if (typeof sideElement === "object" && sideElement !== null && !Array.isArray(sideElement)) {
        // Tequeños from  menu
        if (sideElement?.option?.main && sideElement?.option?.secondary) {
          const { main, secondary } = sideElement.option;
          ingredientsSide = `Con ${main.name},Con ${secondary.name}`;
        } else if (sideElement?.option) {
          addToName = sideElement.option;
        }
      } else if (
        typeof sideElement.side === "object" &&
        sideElement.side !== null &&
        !Array.isArray(sideElement.side)
      ) {
        if (Array.isArray(sideElement.ingredients) && sideElement.ingredients.length) {
          // Tequeños
          if (sideElement.side.name) {
            ingredientsSide = `Con ${sideElement.side.name.toLowerCase()},`;
          }
          ingredientsSide += sideElement.ingredients.map(({ name }) => `Con ${name.toLowerCase()}`).join(",");
        } else if (sideElement.side?.data && Array.isArray(sideElement.side.data)) {
          if (sideElement.side?.showWith) {
            // sauce
            isSauce = true;
            sauces = sideElement.side.data.map(({ name, price }) => ({
              name: `${sideElement.name}: ${name}`,
              price,
              ...side,
            }));
          } else {
            //custom ingredients ( nachos y pattas umami)
            ingredientsSide = sideElement.side?.data.map(({ name }) => `Sin ${name.toLowerCase()}`).join(",");
            // addToName = `${sideElement.side?.showWith ? "" : "Sin "}${ingredients}`;
          }
        } else if (sideElement.side.name) {
          // patatas
          addToName = sideElement.side.name;
        }
      }

      const name = sideElement.name.includes("uds)")
        ? sideElement.name.substr(0, sideElement.name.length - 6)
        : sideElement.name;
      return isSauce
        ? sauces
        : {
            name: `${name}${addToName ? `: ${addToName}` : ""}`,
            price: sideElement.price,
            ...side,
            ingredients: ingredientsSide,
          };
    });
  } catch (error) {
    throw new Error(error);
  }
};

const addSides = (sideInput) => {
  const { side } = shoppingCartBEComponent;

  return sideInput?.map((sideElement) => {
    let addToName = "";
    let ingredientsSide;
    let isSauce = false;
    let sauces = [];

    if (sideElement.side && !sideElement.side?.data && !sideElement?.ingredients?.length) {
      // patatas
      addToName = sideElement.side?.name;
    } else if (sideElement.side && sideElement.side?.data && sideElement.side?.data?.length) {
      if (sideElement.side?.showWith) {
        // sauce
        isSauce = true;
        sauces = sideElement.side.data.map(({ name, price }) => ({
          name: `${sideElement.name}: ${name}`,
          price,
          ...side,
        }));
      } else {
        //custom ingredients ( nachos y pattas umami)
        ingredientsSide = sideElement.side?.data.map(({ name }) => `Sin ${name.toLowerCase()}`).join(",");
      }
    } else if (sideElement.side && !sideElement.side?.data && sideElement?.ingredients?.length) {
      if (sideElement.side.name) {
        ingredientsSide = `Con ${sideElement.side.name.toLowerCase()},`;
      }
      ingredientsSide += sideElement.ingredients.map(({ name }) => `Con ${name.toLowerCase()}`).join(",");
    }
    const name = sideElement.name.includes("uds)")
      ? sideElement.name.substr(0, sideElement.name.length - 6)
      : sideElement.name;

    return isSauce
      ? sauces
      : {
          name: `${name}${addToName ? `: ${addToName}` : ""}`,
          price: sideElement.price,
          ...side,
          ingredients: ingredientsSide,
        };
  });
};

export const addSalad = (saladInput) => {
  try {
    const { salad } = shoppingCartBEComponent;

    return saladInput?.map(({ ingredients, ingredientsExtra, name, mainProductPrice }) => {
      let listOfIngredients = ingredients
        .filter(({ isSelected }) => !isSelected)
        .map(({ name }) => `- Sin ${name}`)
        .join(",");

      listOfIngredients =
        ingredientsExtra.length > 0
          ? listOfIngredients !== ""
            ? `${listOfIngredients} ||${ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")}`
            : ingredientsExtra.map(({ name, price }) => `- Con ${name}--${price}`).join(",")
          : listOfIngredients;

      return {
        ingredients: ingredients?.length > 0 ? listOfIngredients : "",
        name,
        price: mainProductPrice,
        ...salad,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const addShoppingCart = (shoppingCartByCategories) => {
  try {
    return shoppingCartByCategories
      ?.reduce((newShoppingCart, { category, data }) => {
        let sides, sidesShoppingCart;
        if (category === "complementos") {
          sides = addSides(data);
          sides = Array.isArray(sides) ? sides : [sides];
          sidesShoppingCart = [...newShoppingCart, ...sides];

          return sidesShoppingCart;
        }

        return category === "bocadillos"
          ? [...newShoppingCart, ...addSandwiches(data)]
          : category === "hamburguesas"
          ? [...newShoppingCart, ...addBurgers(data)]
          : category === "menus"
          ? [...newShoppingCart, ...addMenus(data)]
          : category === "ensaladas"
          ? [...newShoppingCart, ...addSalad(data)]
          : category === "bebidas" || category === "postres"
          ? [...newShoppingCart, ...addGenericItem(data, category)]
          : newShoppingCart;
      }, [])
      .flat();
  } catch (error) {
    throw new Error(error);
  }
};
