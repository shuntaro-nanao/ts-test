//gulp package
const gulp = require("gulp");
const plumber = require("gulp-plumber"); // Plumber（エラー時に監視を止めない）
const browserSync = require("browser-sync"); // BrowserSync
const watch = require("gulp-watch"); // Watch
const clean = require("gulp-clean"); // clean
const runSequence = require("run-sequence"); // Run Sequence
const rename = require("gulp-rename"); // Rename
const request = require("request"); // Request (リクエスト送信)
const fs = require("fs"); //Fs (ファイル操作)
const connectSSI = require('connect-ssi'); //SSI
const path = require('path');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

//css
const sass = require("gulp-sass"); // Sass
const cssnext = require("gulp-cssnext"); // Cssnext
const frontNote = require("gulp-frontnote"); // styleguide Frontnote
const cleanCSS = require("gulp-clean-css"); // clean css（css圧縮）
//js
const uglify = require("gulp-uglify"); // uglify（js圧縮）
//Jade
const jade = require("gulp-jade"); // Jade
//ejs
const ejs = require("gulp-ejs"); // Ejs
//csv
const csvtojson = require("gulp-csvtojson"); // Csv to Json (csvからjsonファイルを生成)
//image
const imagemin = require("gulp-imagemin"); //Imagemin
const pngquant = require("imagemin-pngquant"); // Pngquant
const optipng = require("imagemin-optipng"); // Optipng
const mozjpeg = require("imagemin-mozjpeg"); // mozjpeg
const gifsicle = require("imagemin-gifsicle"); // gifsicle
const svgo = require("imagemin-svgo"); ///svgo

// ディレクトリ設定
const dir = {
  src: "_src/",
  dist: "dist/"
};

// Sassディレクトリ設定
const paths = {
  scss: dir.src + "/assets/_sass/",
  css: dir.src + "/assets/css/",
  js: dir.src + "/assets/ts/"
};

// Sass設定
gulp.task("scss", function() {
  return gulp
    .src(paths.scss + "/{,**/}*.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(
      cssnext({
        browsers: ['last 3 versions'],
        features: {
          rem: false
        }
      })
    )
    .pipe(gulp.dest(paths.css));
});

// BrowserSyncの設定
gulp.task("bs", function() {
  return browserSync.init({
    server: {
      baseDir: dir.src,
      middleware: [ //SSIを使用可能にする
        connectSSI({
          baseDir: dir.src,
          ext: '.html'
        })
      ],
      index: "index.html"
    },
    ghostMode: {
      location: true
    }
  });
});

// Reload all Browsers
gulp.task("reload", function() {
  return gulp
    .src([dir.src + "/{,**/}*.html"], {
      base: dir.src
    })
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

//webpack
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function handleError() { // lintチェックでエラー吐いてもwatchが終了されないようにする
      this.emit('end');
    })
    .pipe(gulp.dest(webpackConfig.output.path));
});

// ファイル更新監視
gulp.task("watch", function() {
  // scssの監視
  gulp.watch(
    [
      dir.src + "{,**/}*.scss" // 対象ファイル
    ],
    ["scss"]
  ); // 実行タスク（css開発用）
  gulp.watch(
    [
      dir.src +
        "{,**/}*.{html,php,css,pot,txt,ico,eot,ttf,woff,gif,jpg,png,svg}" // 対象ファイル
    ],
    ["reload"]
  ); // 実行タスク（scssファイル以外が更新されたタイミングでブラウザを自動更新）
  gulp.watch(
    [
      dir.src + "{,**/}*.ts" //対象ファイル
    ],
    ["webpack"]
  ); // 実行タスク（scssファイル以外が更新されたタイミングでブラウザを自動更新）
  gulp.watch(dir.src + "{,**/}*.ts", ["reload"]);
});

// 画像を圧縮
gulp.task("imagemin", function() {
  return gulp
    .src(dir.src + "/{,**/}*.{png,jpg,gif,svg}") // 読み込みファイル
    .pipe(
      imagemin([
        pngquant({
          quality: "65-80",
          speed: 1,
          floyd: 0
        }),
        mozjpeg({
          quality: 85,
          progressive: true
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
      ])
    )
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

// JSを圧縮
gulp.task("jsmin", function() {
  return gulp
    .src(dir.src + "/{,**/js/}{,**/}*.js") // 読み込みファイル
    .pipe(plumber())
    .pipe(
      uglify({
        output: {
          comments: /^!/
        }
      })
    )
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

// CSSを圧縮
gulp.task("cssmin", function() {
  return gulp
    .src(dir.src + "/{,**/css/}{,**/}*.css") // 読み込みファイル
    .pipe(cleanCSS())
    .pipe(gulp.dest(dir.dist)); // 書き出し先
});

// ファイルのコピー
gulp.task("copy", function() {
  return gulp
    .src(
      [
        dir.src + "/{,**/}*.html",
        dir.src + "/{,**/}*.css",
        dir.src + "/{,**/}*.js",
        dir.src + "/{,**/}*.svg"
      ],
      {
        base: dir.src
      }
    )
    .pipe(gulp.dest(dir.dist));
});

// 不要なファイルを削除する
// distフォルダ内を一度全て削除する
gulp.task("clean-dist", function() {
  return gulp
    .src([dir.dist], {
      read: false
    })
    .pipe(clean());
});

// jsonデータ取得
gulp.task('get-json', function () {

  const apiUrl = "https://hogehoge"

  let requestJSON = function () {
    let headers = {
      'Content-Type': 'application/json'
    }
    let options = {
      url: apiUrl,
      method: 'GET',
      headers: headers,
      json: true
    }

    request(options, function (error, response, body) {

    })
  }

  requestJSON();
});

// 開発用タスク（各ファイル監視してビルド）
gulp.task("default", ["bs", "watch"]);

// 納品用タスク（タスク処理を指定した順番で実行）
gulp.task("dist", function(callback) {
  return runSequence(['clean-dist', 'copy', 'cssmin', 'webpack', 'jsmin', 'imagemin'], 'watch', callback);
});
