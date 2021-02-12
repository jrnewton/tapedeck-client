process.env.VUE_APP_VERSION = process.env.npm_package_version;

module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Tape Deck - record radio streams to the cloud'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
