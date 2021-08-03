module.exports = {
  outputDir: '../server/dist/app',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/theme.scss";',
      },
    },
  },
};
