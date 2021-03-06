const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

if (process.env.NODE_ENV === undefined) {
  console.log("\n'NODE_ENV' is undefined - falling back to 'development'.\n");
  process.env.NODE_ENV = 'development';
}

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    main: './index.tsx',
  },
  output: {
    filename: '[hash].js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: '[contenthash].js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      assets: resolve(__dirname, '../src/assets/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/public/index.html'),
      title: '-^^,--,~',
      filename: resolve(__dirname, '../dist/index.html'),
    }),

    new webpack.DefinePlugin(require('./env')),
    new CheckerPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true,
              babelOptions: {
                presets: ['@babel/preset-react'],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/plugin-transform-modules-commonjs',
                  'react-hot-loader/babel',
                ],
              },
              babelCore: '@babel/core',
            },
          },
        ],
        exclude: [resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(png|webp|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(png|webp|jpe?g|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
