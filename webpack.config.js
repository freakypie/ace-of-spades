module.exports = {
  context: __dirname + "/client/src",
  entry: "./main",
  module: {
    loaders: [
      {
        test: /\.es6?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  output: {
      path: __dirname + "/server/public/client/",
      filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".es6"]
  }
};
