var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'app.jsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};