const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './main',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader"]
            },
            {
                test: /\.spec.ts$/,
                use: "ignore-loader"
            }
        ]
    }
};