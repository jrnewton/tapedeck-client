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
