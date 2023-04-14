// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const generateHtmlPlugin = (title) => {
  return new htmlWebpackPlugin({
    title,
    filename: `${title.toLowerCase()}.html`,
    template: `./src/pages/${title.toLowerCase()}/${title.toLowerCase()}.html`,
    chunks: [`${title.toLowerCase()}`],
  });
};

const createPage = (pagesArray) => {
  res = [];
  pagesArray.forEach((page) => {
    res.push(generateHtmlPlugin(page));
  });
  return res;
};

const pages = createPage(['index', 'quiz', 'result']);

const config = {
  entry: {
    index: path.resolve(__dirname, './src/pages/index/index.js'),
    quiz: path.resolve(__dirname, './src/pages/quiz/quiz.js'),
    result: path.resolve(__dirname, './src/pages/result/result.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [...pages, new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|mp4|mp3)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
