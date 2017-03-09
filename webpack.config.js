const path = require('path')

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader?importLoaders=1']
      }
    ]
  }
}

if(process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map'
}

module.exports = config