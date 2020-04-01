const { resolve } = require('path');
const webpack = require('webpack'),
  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'),
  merge = require('webpack-merge');

const sharedWebpackConfig = require('./webpack.config');

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    port: '3000',
    hot: true,

    contentBase: resolve(__dirname, '../dist'),
    historyApiFallback: true,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};

module.exports = merge.smart(sharedWebpackConfig, developmentConfig);
