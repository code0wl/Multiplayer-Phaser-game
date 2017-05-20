const path = require('path');
const webpack = require('webpack');

const config = {
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
                test: /\.ts?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;