import "dotenv/config";

export default ({ config }) => {
  console.log(config);
  return {
    ...config,
    // All values in extra will be passed to your app.
    extra: {
      // server: process.env.EXPO_PRODUCTION_SERVER,
      server: {
        local: process.env.EXPO_LOCAL_SERVER,
        development: process.env.EXPO_DEVELOPMENT_SERVER,
        production: process.env.EXPO_PRODUCTION_SERVER,
      },
    },
  };
};
