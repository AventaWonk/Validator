const path = require('path');

module.exports = {
  entry: {
    validator: './built/js/Validator.js',
    validatorDOM: './built/js/ValidatorDOM.js',
    indexTest: './built/js/indexTest.js',
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
