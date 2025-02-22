const path = require('path');

module.exports = {
  entry: './app/js/script.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js' 
  },
  mode: 'development', 
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'   
        ]
      }
    ]
  }
};