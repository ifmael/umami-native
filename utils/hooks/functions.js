export const getProductsByCategory = (products) => {
  if (!products) return;

  return products.reduce((acc, product) => {
    const {
      category: { slug },
      ...rest
    } = product;

    acc[slug] = acc[slug] || [];
    acc[slug].push({ ...rest, category: slug });

    return acc;
  }, {});
};
