const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/carbonldp.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
        library: "MovieSearch"
  }
};
