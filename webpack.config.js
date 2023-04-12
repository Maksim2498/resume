const HtmlPlugin           = require("html-webpack-plugin")
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin")
const TerserPlugin         = require("terser-webpack-plugin")

const production = process.env.NODE_ENV === "production"

module.exports = {
    mode:   production ? "production" : "development",
    output: {
        clean:    true,
        filename: production ? "bundle.[contenthash].js" : "bundle.js",
    },
    devtool: production ? undefined : "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use:  [
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.html$/i,
                use:  [
                    "html-loader",
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: "./dist",
        port:   8000,
        hot:    true,
    },
}