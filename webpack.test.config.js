const path = require('path');
const webpack = require('webpack');
module.exports = {
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: [
                    path.resolve(__dirname, "typings"),
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    }
};
