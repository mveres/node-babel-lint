/* eslint-disable*/
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: ['babel-polyfill', APP_DIR + '/app.js'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  externals: {
    electron: 'require("electron")',
    net: 'require("net")',
    remote: 'require("remote")',
    shell: 'require("shell")',
    app: 'require("app")',
    ipc: 'require("ipc")',
    fs: 'require("fs")',
    buffer: 'require("buffer")',
    system: '{}',
    file: '{}'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        loader: 'babel',
      }
    ]
  }
};

module.exports = config;
