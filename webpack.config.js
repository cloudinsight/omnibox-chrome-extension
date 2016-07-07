module.exports = {
  entry: {
    background: './src/background.js'
  },
  output: {
    path: './lib',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
}
