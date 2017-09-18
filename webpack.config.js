const path = require('path');

module.exports = {
  entry: {
    validator: './built/js/src/Validator.js',
    validatorDOM: './built/js/src/ValidatorDOM.js',
    indexTest: './built/js/src/test.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './built/dist/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
};
