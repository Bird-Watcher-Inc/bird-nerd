const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
    }),
  ],
  // devServer: {
  //   static: {
  //     publicPath: '/build',
  //     directory: path.resolve(__dirname, './build'),
  //   },
  // },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true, 
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    proxy: [{
      context: ['/api/**'],
      target: 'http://localhost:3000',
    },
    ],
  },
};
