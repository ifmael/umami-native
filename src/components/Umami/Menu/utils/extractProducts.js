export const extractProducts = (products) => {
  try {
    return products?.reduce((acc, product) => {
      if (!product) return acc;

      // If the name or the product was forgotten
      const { product: productItem, options } = product;
      const { name } = productItem || "";
      if (Array.isArray(options) && options?.length > 0) {
        const listProductNameWithItsOptions = options?.map(({ name: nameOption, id }) => ({
          name: `${name} ${nameOption.toLowerCase()}`,
          id,
        }));
        const newListOfProducts = listProductNameWithItsOptions?.map(({ name, id }) => ({ ...productItem, name, id }));
        return [...acc, ...newListOfProducts];
      } else {
        return [...acc, { ...productItem, name }];
      }
    }, []);
  } catch (error) {
    console.log(error);
  }
};

export const extractProductsSides = (sides, allSides) => {
  try {
    const newSides = sides.reduce((acc, side) => {
      if (!side) return acc;

      const { product: productItemMenu, isRadioButtonIngredients, isRadioButtonConfigurations } = side;
      const { name } = productItemMenu || "";

      const productItem = allSides.find((sideItem) => {
        return sideItem.id === productItemMenu.id;
      });

      return productItem
        ? [
            ...acc,
            {
              id: productItem.id,
              name,
              customiseSideIngredients: productItem.customiseSideIngredients,
              price: productItem.price,
              isRadioButtonConfigurations,
              configuration:
                productItem.configuration &&
                Array.isArray(productItem.configuration) &&
                productItem.configuration.length === 1
                  ? productItem.configuration[0].options.elements[0].ingredients
                  : undefined,
              isRadioButtonIngredients,
              ingredients: productItem.ingredients,
            },
          ]
        : acc;
    }, []);

    return newSides;
  } catch (error) {
    console.log(error);
  }
};
