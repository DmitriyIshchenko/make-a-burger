const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/controller.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      // STYLES
      {
        test: /.s[ac]ss$/i,
        use: [
          // creates 'style' nodes from js strings
          'style-loader',
          // translates css into CommonJS
          'css-loader',
          // compiles sass to css
          'sass-loader',
          //
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: ['src/sass/main.scss'],
          //   },
          // },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    compress: true,
    port: 3000,
  },
};
