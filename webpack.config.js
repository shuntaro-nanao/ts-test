const webpack = require('webpack');
const path = require('path');
// module.exports = {
//   mode: 'production',
//   entry: './_src/assets/js/main.js',//このファイルにinportを記述する
//   output: {
//     path: path.join(__dirname, '_src/assets/js'), //出力先ディレクトリ
//     filename: 'script.js', //出力ファイル名
//   },
//   module: {
//     rules: [{
//       test: /\.js$/, // ローダーの処理対象ファイル
//       exclude: /node_modules/,  // ローダーの処理対象から外すディレクトリ
//       use: [{ // 利用するローダー
//         loader: 'babel-loader',
//         options: {
//           presets: [['@babel/preset-env', { modules: false }]]
//         }
//       }],
//     }],
//   },
//   // plugins: [
//   //   new webpack.ProvidePlugin({
//   //     jQuery: 'jquery',
//   //     $: 'jquery'
//   //   })
//   // ]
// };

module.exports = {
  mode: 'production',
  entry: './_src/assets/ts/main.ts', //このファイルにinportを記述する
  output: {
    path: path.join(__dirname, '_src/assets/js'), //出力先ディレクトリ
    filename: 'script.js', //出力ファイル名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 拡張子 .ts の場合
        use: 'ts-loader' // TypeScript をコンパイルする
      }
    ]
  },
  resolve: {
    extensions: ['.ts'] // import 文で .ts ファイルを解決するため
  }
};