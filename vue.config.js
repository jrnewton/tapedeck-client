module.exports = {
  pages: {
    index: {
      entry: './src/pages/index/main.js',
      title: 'Tape Deck - record radio streams to the cloud'
    },
    auth: {
      entry: './src/pages/auth/main.js',
      title: 'Tape Deck - Please authenticate',
      filename: 'auth.html'
    },
    archive: {
      entry: './src/pages/archives/main.js',
      title: 'Tape Deck - Your Archives',
      filename: 'archives.html'
    }
  }
};
