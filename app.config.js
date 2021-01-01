import "dotenv/config";

const getDescription = (releaseChannel) => {
  if (releaseChannel === undefined) return "Description for local";
  if (releaseChannel.indexOf("development") !== -1) return "Description for development";
  if (releaseChannel.indexOf("production") !== -1) return "Description for production";
};

export default ({ config }) => {
  console.log(config);
  const { releaseChannel } = config;

  return {
    ...config,
    description: getDescription(releaseChannel),
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
