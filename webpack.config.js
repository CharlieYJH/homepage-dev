const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
  entry: 'src/index.tsx',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/static' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  devtool: argv.mode == 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader', 'prettier-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'prettier-loader'],
      },
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localsConvention: 'dashes',
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
          'prettier-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif|ttf|pdf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
});
