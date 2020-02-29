const path = require('path');
const webpack = require('webpack')
// const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const entry = require('./config/webpack.entry')

module.exports = {
  // mode: 'development',
  //入口文件的配置项
  entry: {
    ...entry.entryData
  },
  //出口文件的配置项
  output: {
    //输出的路径，用了Node语法
    path: path.resolve(__dirname, 'dist'),
    //输出的文件名称
    filename: 'js/[name].js',
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [{
      test: /\.css$/,
      use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              importLoader: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 15 versions']
                })
              ]
            }
          }
        ],
        publicPath: '../'
      })
    }, {
      test: /\.less$/,
      use: extractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')({
                browsers: ['last 15 versions']
              })
            ]
          }
        }, {
          loader: 'less-loader'
        }],
        // use style-loader in development
        fallback: 'style-loader',
        publicPath: '../'
      })
    }, {
      test: /\.(png|jpg|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          esModule: false, // 这里设置为false
          name: '[name].[ext]',
          limit: 1024,
          outputPath: 'img/', //图片打包到images目录下
          // publicPath: 'images'
        }
      }]
    }, {
      test: /\.(htm|html)$/,
      use: ['html-withimg-loader']
    }]
  },
  //插件，用于生产模版和各项功能
  plugins: [
    // new uglify(),
    ...entry.HtmlWebpackPluginData,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      //name对应入口文件中的名字，我们起的是jquery
      name: 'jquery',
      //把文件打包到哪里，是一个路径
      filename: "js/plugins/jquery.min.js",
      //最小打包的文件模块数，这里直接写2就好
      minChunks: 2
    }),
    new extractTextPlugin('css/[name].css'),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ],
  //配置webpack开发服务功能
  devServer: {
    //设置基本目录结构
    contentBase: path.resolve(__dirname, 'dist'), //本地服务器所加载的页面所在的目录
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //服务端压缩是否开启
    compress: true,
    //配置服务端口号
    port: 1818,
    contentBase: '.'
  }
}