import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    // All values in extra will be passed to your app.
    extra: {
      server: process.env.EXPO_DEVELOPMENT_SERVER,
    },
  };
};
