module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Tape Deck - record radio streams to the cloud';
      return args;
    });
  }
};
