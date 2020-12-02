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
