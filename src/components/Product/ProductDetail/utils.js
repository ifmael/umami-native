export const getImages = (listImages) =>
  listImages?.map(({ id, url }) => ({
    id,
    url,
  }));
