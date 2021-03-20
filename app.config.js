import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            setCommits: true,
          },
        },
      ],
    },
    // All values in extra will be passed to your app.

    extra: {
      // server: process.env.EXPO_PRODUCTION_SERVER,
      server: {
        local: process.env.EXPO_LOCAL_SERVER,
        development: process.env.EXPO_DEVELOPMENT_SERVER,
        production: process.env.EXPO_PRODUCTION_SERVER,
      },
      secret: {
        development: process.env.EXPO_JWT_SECRET_DEVELOPMENT,
        production: process.env.EXPO_JWT_SECRET_DEVELOPMENT,
      },
      mapsToken: process.env.GOOGLE_MAPS_KEY,
      placesToken: process.env.PLACES_API,
    },
  };
};
