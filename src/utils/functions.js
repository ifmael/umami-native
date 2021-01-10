import Constants from "expo-constants";

export const sortDesc = (a, b) => b.order - a.order;
export const sortAsc = (a, b) => a.order - b.order;

export const guidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getObjectEnvironment = (server, token, mapsToken, placesToken) => ({ server, token, mapsToken, placesToken });

export const getEnvironment = () => {
  let releaseChannel = Constants.manifest.releaseChannel;

  if (releaseChannel === undefined)
    // since releaseChannels are undefined in dev, return your default.
    return getObjectEnvironment(
      Constants.manifest.extra.server.local,
      Constants.manifest.extra.secret.development,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken
    );
  if (releaseChannel.indexOf("development") !== -1)
    // this would pick up development-v1, development-v2 ...
    return getObjectEnvironment(
      Constants.manifest.extra.server.development,
      Constants.manifest.extra.secret.development,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken
    );
  if (releaseChannel.indexOf("production") !== -1)
    // this would pick up production-v1, production-v2 ...
    return getObjectEnvironment(
      Constants.manifest.extra.server.production,
      Constants.manifest.extra.secret.production,
      Constants.manifest.extra.mapsToken,
      Constants.manifest.extra.placesToken
    );
};
