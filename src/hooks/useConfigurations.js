import { useEffect, useState } from "react";

const componentBaseName = "ComponentConfigurations";

const useConfigurations = (dataFromServer) => {
  const [configuration, setConfiguration] = useState(null);

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
