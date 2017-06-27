var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  entry: {
    app: './core/bootstrap.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.environment === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // Commented due to limitation of importing font-awesome
          // limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(ttf|eot|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          // Commented due to limitation of importing font-awesome
          // limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('css/style.css'))
  ]
}
