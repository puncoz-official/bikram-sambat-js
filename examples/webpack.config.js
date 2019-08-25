const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

console.log(__dirname)

module.exports = {
    entry: path.join(__dirname, "src/index.js"),

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            filename: "./index.html"
        }),
    ],

    resolve: {
        extensions: [".js"],
    },

    devServer: {
        port: 3003,
    },
}
