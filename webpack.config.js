const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'webpack.production.js',
    path: path.join(__dirname, 'webpack-build')
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    alias: {
      '~': resolve('src'),
      'donejs-webpack-starter': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.stache$/,
        use: {
          loader: 'can-stache-loader'
        }
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      // This SVG loader technically isn't in use, since the font loader up above will match, first.
      // But if you don't need the font loader (.woff, etc), this is a great way to handle SVGs.
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  }
}
