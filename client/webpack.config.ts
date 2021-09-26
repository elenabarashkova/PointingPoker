import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
import history = require('connect-history-api-fallback');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          contentBase: path.join(__dirname, 'public'),
          historyApiFallback: true,
          publicPath: '/'
        }
      };

const webpackConfig = ({ development }): Configuration => ({
  entry: './src/index.tsx',
  mode: development ? 'development' : 'production',
  devtool: !development ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'build.js',
    assetModuleFilename: 'assets/[hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.[tj]sx?$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|mp3)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-url-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
          noErrorOnMissing: true
        }
      ]
    }),
    new ESLintPlugin({ extensions: ['ts', 'js', 'tsx', 'jsx'] })
  ],
  ...devServer(development)
});

export default webpackConfig;
