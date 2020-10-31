const extractProducts = (products) => {
  return products?.map((product) => {
    if (!product) return;
    const {
      product: { name },
      ...rest
    } = product;
    return { ...rest, name };
  });
};

export default extractProducts;
