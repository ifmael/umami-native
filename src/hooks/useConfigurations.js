import { useEffect, useState } from "react";

const componentBaseName = "ComponentConfigurations";

const useConfigurations = (dataFromServer) => {
  const [configuration, setConfiguration] = useState(null);

  const setProperty = (propertyToUpdate, value) => {
    setConfiguration((currentConfiguration) => {
      if (currentConfiguration && !currentConfiguration[propertyToUpdate]) return currentConfiguration;

      return { ...currentConfiguration, [propertyToUpdate]: value };
    });
  };

  useEffect(() => {
    try {
      if (!dataFromServer) return;

      const { configurations } = dataFromServer;
      const newConfiguration = configurations[0]?.configuration?.reduce((acc, { __typename, ...rest }) => {
        const typename = __typename.includes(componentBaseName)
          ? `${__typename.slice(componentBaseName.length).charAt(0).toLowerCase()}${__typename.slice(
              componentBaseName.length + 1
            )}`
          : __typename;

        const propertyExist = Object.keys(acc).includes(typename);

        if (!propertyExist) {
          return { ...acc, [typename]: rest };
        } else {
          const oldProperty = acc[typename];

          return Array.isArray(acc[typename])
            ? { ...acc, [typename]: [...oldProperty, rest] }
            : { ...acc, [typename]: [oldProperty, rest] };
        }
      }, {});

      setConfiguration(newConfiguration);
    } catch (error) {
      console.log(error);
    }
  }, [dataFromServer]);

  return [{ configuration }, { setConfiguration, setProperty }];
};

export default useConfigurations;
