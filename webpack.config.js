const path = require('path');

module.exports = {
  entry: './lib/Validator.js',
  output: {
    filename: 'validator.js',
    path: path.resolve(__dirname, 'built')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};
