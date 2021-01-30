module.exports = {
  pages: {
    index: {
      entry: './src/pages/index/main.js',
      title: 'Tape Deck - record radio streams to the cloud'
    },
    authLogin: {
      entry: './src/pages/auth-login/main.js',
      title: 'Tape Deck - login to your account',
      filename: 'auth-login.html'
    },
    authCreate: {
      entry: './src/pages/auth-create/main.js',
      title: 'Tape Deck - create an account',
      filename: 'auth-create.html'
    },
    authConfirm: {
      entry: './src/pages/auth-confirm/main.js',
      title: 'Tape Deck - confirm your new account',
      filename: 'auth-confirm.html'
    },
    archive: {
      entry: './src/pages/archives/main.js',
      title: 'Tape Deck - Your Archives',
      filename: 'archives.html'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
