import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    // hooks: {
    //   postPublish: [
    //     {
    //       file: "sentry-expo/upload-sourcemaps",
    //       config: {
    //         organization: process.env.SENTRY_ORG,
    //         project: process.env.SENTRY_PROJECT,
    //         // authToken: process.env.SENTRY_AUTH_TOKEN,
    //         setCommits: true,
    //       },
    //     },
    //   ],
    // },
    // All values in extra will be passed to your app.

    extra: {
      releaseChannel: process.env.RELEASE_CHANNEL,
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
      eas: {
        projectId: "47711f24-5e27-42b8-832a-d8eea61789c3",
      },
    },
    plugins: [
      "expo-updates",
      "expo-dev-client",
      "expo-location",
      // "sentry-expo"
    ],
  };
};
