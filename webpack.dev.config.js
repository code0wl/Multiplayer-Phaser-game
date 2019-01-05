const path = require("path");
const tsconfig = require("./tsconfig.json");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
    entry: "./main",
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "bundle.js",
    },
    mode: "development",
    resolve: {
        extensions: [".ts", ".js"],
        plugins: [new TsConfigPathsPlugin()],
    },
    plugins: [
        new LiveReloadPlugin({
            port: 9000,
            hostname: "localhost",
            protocol: "http",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    path.resolve(__dirname, "typings"),
                    path.resolve(__dirname, "node_modules"),
                ],
                options: tsconfig,
            },
            {
                test: /\.spec.ts$/,
                use: "ignore-loader",
            },
        ],
    },
};
