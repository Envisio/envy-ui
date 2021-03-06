var path = require('path');

module.exports = {
  entry: "./src/javascripts/ui.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "ui.js"
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
  mode: 'production',
};