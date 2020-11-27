const extractProducts = (products) => {
  return products?.map((product) => {
    if (!product) return;

    // If the name or the product was forgotten
    const { product: productItem, ...rest } = product;
    const { name } = productItem || "";

    return { ...rest, name };
  });
};

export default extractProducts;
