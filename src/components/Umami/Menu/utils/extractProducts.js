const extractProducts = (products) => {
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

export default extractProducts;
