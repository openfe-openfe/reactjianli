var path = require("path");

module.exports = {
	entry: ["babel-polyfill", path.resolve(__dirname, "app/app.js")],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
	},
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
	}
}