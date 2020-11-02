export const destructComponentOptions = (configurations) => {
  if (!configurations) return [];

  return configurations.reduce((acc, configuration) => {
    const { __typename } = configuration;

    if (/ComponentOptions*/gm.test(__typename)) {
      const { options } = configuration;

      if (options) {
        const { elements } = options;

        if (elements && elements.length > 0) {
          return [...acc, ...elements];
        } else return acc;
      } else return acc;
    } else {
      return [...acc, configuration];
    }
  }, []);
};
