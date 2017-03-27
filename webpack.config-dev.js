var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
		devServer:{
        port:8800,
        contentBase:'./build',
		hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true,
        host: "0.0.0.0"
    },
	entry: ["babel-polyfill", path.resolve(__dirname, "app/app.js")],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
	},
    devtool: 'eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react", "stage-3"]
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		],
	},
	resolve: {
    extensions: ['', '.js', '.jsx'],
    // 提高webpack搜索的速度
    alias: { }
  },
  devtool: 'source-map',
  'display-error-details': true,
  // 使用externals可以将react分离，然后用<script>单独将react引入
  externals: [],
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title:'react动态简历',
            template:'./index.html',
            filename:'index.html'
        }),
    ],
}