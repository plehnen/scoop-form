const appConfig = require('./src/app.config');

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/trinityspace/ui/',
  outputDir: 'build',
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  chainWebpack: config => {
    // We need this so the relative fonts in brand-design scss can be found!
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('resolve-url-loader')
      .loader('resolve-url-loader')
      .options({
        keepQuery: true,
      })
      .before('sass-loader');

    // config.plugins.delete('prefetch');
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
};
