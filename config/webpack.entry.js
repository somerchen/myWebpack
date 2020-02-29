const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const entry = ['index', 'login', 'detail', 'approximate', 'register', 'searchResult']
const entryData = {};
entry.forEach(function (item) {
  entryData[item] = path.join(__dirname, `../src/js/${item}.js`);
})

entryData['jquery'] = 'jquery'

const HtmlWebpackPluginData = [];
entry.forEach(function (item) {
  HtmlWebpackPluginData.push(
    new htmlPlugin({
      filename: `${item}.html`,
      template: path.join(__dirname, `../src/${item}.html`),
      chunks: ['jquery', item]
    })
  );
})

module.exports = {
  entryData,
  HtmlWebpackPluginData
}