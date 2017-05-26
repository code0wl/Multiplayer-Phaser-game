const webpack = require('webpack');

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['main.spec.ts'],
        preprocessors: {
            'spec/main.spec.ts': ['webpack'],
        },
        mime: { 'text/x-typescript': ['ts','tsx'] },
        webpack: {
            resolve: {
                extensions: ['', '.js', '.ts', '.tsx']
            },
            module: {
                loaders: [
                    {test: /\.tsx?$/, loader: 'ts-loader'}
                ]
            },
            stats: {
                colors: true,
                modules: true,
                reasons: true,
                errorDetails: true
            },
            devtool: 'inline-source-map',
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}
