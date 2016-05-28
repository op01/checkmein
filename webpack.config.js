var webpack = require('webpack');
var path = require('path');


// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'app':       './src/app.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})
  ],
  module: {
    loaders: [
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.(png|gif|jpg)$/, loader: "file?name=images/[name].[ext]" },
      // .ts files for TypeScript
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      // .css files for styles
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }

};

















// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
          path.join(__dirname, 'node_modules', '@angular'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js'],
    alias: {
      'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'core', 'testing.js'),
      '@angular/testing': path.join(__dirname, 'node_modules', '@angular', 'core', 'testing.js'),
      'angular2/core': path.join(__dirname, 'node_modules', '@angular', 'core', 'index.js'),
      'angular2/platform/browser': path.join(__dirname, 'node_modules', '@angular', 'platform-browser', 'index.js'),
      'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'testing', 'index.js'),
      'angular2/router': path.join(__dirname, 'node_modules', '@angular', 'router-deprecated', 'index.js'),
      'angular2/http': path.join(__dirname, 'node_modules', '@angular', 'http', 'index.js'),
      'angular2/http/testing': path.join(__dirname, 'node_modules', '@angular', 'http', 'testing.js')
    },
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
