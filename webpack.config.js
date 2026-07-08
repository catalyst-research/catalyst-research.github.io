const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ['*.html', '*.css', '*.js', 'assets/**/*', 'journals/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.pdf$/i,
        type: 'asset/resource',
        generator: {
          filename: 'journals/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './apply.html',
      filename: 'apply.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './board.html',
      filename: 'board.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './journals.html',
      filename: 'journals.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './events.html',
      filename: 'events.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './contact.html',
      filename: 'contact.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'assets', 
          to: 'assets',
          noErrorOnMissing: true,
        },
        { 
          from: 'journals', 
          to: 'journals',
          noErrorOnMissing: true,
        },
        {
          from: 'style.css',
          to: 'style.css',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
};