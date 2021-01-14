const path = require('path');
module.exports = {
  entry: {
    bundle: './_src/ts/index.ts'
  },
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: "index.js"
  },
  resolve: {
    extensions:['.ts','.js']
  },
  devServer: {
    contentBase: `${__dirname}/`,
    open: true // サーバー起動時にブラウザを開く
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}