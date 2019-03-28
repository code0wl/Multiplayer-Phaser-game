const path = require("path");
const tsconfig = require("./tsconfig.json");

module.exports = {
  entry: "./main",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        exclude: [
          path.resolve(__dirname, "typings"),
          path.resolve(__dirname, "node_modules")
        ],
        options: tsconfig
      },
      {
        test: /\.spec.ts$/,
        use: "ignore-loader"
      }
    ]
  }
};
