const webpack = require('webpack');


if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
}

config.set(configuration);

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './src/**/*.spec.js',
        ],
        webpackPreprocessor: {
            configPath: './webpack.dev.config.js'
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
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
