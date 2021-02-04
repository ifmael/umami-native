import { useEffect, useState } from "react";

const componentBaseName = "ComponentConfigurations";

const useConfigurations = (dataFromServer) => {
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    try {
      if (!dataFromServer) return;

      const { configurations } = dataFromServer;
      const newConfiguration = configurations?.reduce((acc, { configuration: configurationItem }) => {
        const { __typename, ...rest } = configurationItem[0];
        const typename = __typename.includes(componentBaseName)
          ? __typename.slice(componentBaseName.length)
          : __typename;

        return { ...acc, [typename]: rest };
      }, {});

      setConfiguration(newConfiguration);
    } catch (error) {
      console.log(error);
    }
  }, [dataFromServer]);

  return configuration;
};

export default useConfigurations;
