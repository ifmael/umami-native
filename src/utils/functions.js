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

export const getServerURL = () => {
  let releaseChannel = Constants.manifest.releaseChannel;

  if (releaseChannel === undefined) return Constants.manifest.extra.server.local; // since releaseChannels are undefined in dev, return your default.
  if (releaseChannel.indexOf("development") !== -1) return Constants.manifest.extra.server.development; // this would pick up development-v1, development-v2 ...
  if (releaseChannel.indexOf("production") !== -1) return Constants.manifest.extra.server.production; // this would pick up production-v1, production-v2 ...
};
