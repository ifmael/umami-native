const menusCategory = "menus";

export const groupByCategory = (shoppingCart, categories) => {
  try {
    const sortCategoriesWithData = categories.reduce(
      (allCategories, { slug, order }) => {
        return [...allCategories, { category: slug.toLowerCase(), data: [], order }];
      },
      [{ category: menusCategory, data: [], order: 0 }]
    );

    return shoppingCart
      .reduce((elementsGrouped, cartElement) => {
        const {
          beverage,
          category,
          ingredients,
          ingredientsExtra,
          id,
          isChildrenMenu,
          isCustom,
          isMenu,
          meatPoint,
          name,
          price,
          side,
          typeOfBread,
          typeOfMeat,
        } = cartElement;
        const newCategory = isMenu ? menusCategory : category;
        const categoryElement = elementsGrouped?.find(({ category: categoryGrouped }) => {
          return categoryGrouped === newCategory;
        });
        categoryElement?.data.push({
          beverage,
          category,
          id,
          ingredients,
          ingredientsExtra,
          isChildrenMenu,
          isCustom,
          isMenu,
          meatPoint,
          name,
          price,
          side,
          typeOfBread,
          typeOfMeat,
        });

        return elementsGrouped;
      }, sortCategoriesWithData)
      .filter(({ data }) => data.length > 0);
  } catch (error) {
    console.log(error);
  }
};

export const getPrice = (shoppingCart) => {
  return shoppingCart?.reduce((totalPrice, { price = 0 }) => {
    return totalPrice + price;
  }, 0);
};
