module.exports = {
  outputDir: '../server/public',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@use "~@/scss/theme.scss" as *;',
      },
    },
  },
};
