var webpack = require('webpack');

module.exports = {
	devtool: 'inline-sourcemap',
	context: __dirname,
	entry: "./main",
	output: {
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};