const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './app/index.js',
  output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist')
 },
 module: {
   rules: [
     {test: /\.(js|jsx)$/, use: 'babel-loader'},
     // above will look in package.json for babel presets
     {test: /\.css$/, use: ['style-loader', 'css-loader']}
   ]
 },
 plugins: [
   new HtmlWebpackPlugin({
     template: 'app/index.html'
   })
 ]
}

module.exports = config;
