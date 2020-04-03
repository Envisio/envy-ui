var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  externals: [nodeExternals()],
  entry: './src/javascripts/ui.js',
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "ui.js",
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  mode: 'development',
};