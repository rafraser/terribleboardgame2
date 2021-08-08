module.exports = {
  outputDir: '../server/public',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/theme.scss";',
      },
    },
  },
};
