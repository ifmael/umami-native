module.exports = function (api) {
  api.cache(true);
  api.cache(true);
  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          "": "./src",
        },
      },
    ],
  ];

  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};
