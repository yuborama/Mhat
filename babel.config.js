module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^~(.+)': './src/\\1',
            assets: './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
