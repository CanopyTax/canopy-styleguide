var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	// The standard entry point and output config
	entry: {
		'canopy-styleguide': "./src/styleguide.js",
		variables: "./src/external-variables.less",
		app: "./src/app.jsx"
	},
	output: {
		path: './build',
		filename: "[name].js",
		library: 'styleguide',
		libraryTarget: 'umd',
		chunkFilename: "[id].js"
	},
	module: {
		loaders: [
			// Extract css files
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer"
			},
			// Optionally extract less files
			// or any other compile-to-css language
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!autoprefixer!less-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.woff$/,
				// loader: "file?name=fonts/[name].[ext]",
				loader: "url?limit=6500000&mimetype=application/font-woff&name=https://app.canopytax.com/v1.0.1-84-ge04941d/css/styleguide/d8c1f7c89cd85b24d4860b93b575e35c.woff"
			},
			{
				test: /\.ttf$/,
				loader: "url?limit=6500000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			},
			{
				test: /\.eot$/,
				loader: "url?limit=6500000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			},
			{
				test: /\.svg$/,
				loader: "url?limit=6500000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: true,
		})
	]
}
