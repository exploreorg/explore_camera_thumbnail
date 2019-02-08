const path = require('path');


module.exports = {
  mode: 'production',
  watch: true,
  entry: path.join(__dirname, 'javascripts'),
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, 'assets', 'js')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
};
