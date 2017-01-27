module.exports = {
  entry: ['whatwg-fetch', './main'],
  output: {filename: 'bundle.min.js'},
  resolve: {
    extensions: ['.js', '.ts', '']
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
