import "dotenv/config";

export default {
  // All values in extra will be passed to your app.
  extra: {
    server: process.env.EXPO_LOCAL_SERVER,
  },
};
