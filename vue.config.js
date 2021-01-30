module.exports = {
  pages: {
    index: {
      entry: './src/pages/index/main.js',
      title: 'Tape Deck - record radio streams to the cloud'
    },
    archives: {
      entry: './src/pages/archives/main.js',
      title: 'Tape Deck - Your Archives',
      filename: 'archives.html'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
