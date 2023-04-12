const HtmlPlugin           = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlInlineCssPlugin  = require("html-inline-css-webpack-plugin").default
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin")
const TerserPlugin         = require("terser-webpack-plugin")

const production = process.env.NODE_ENV === "production"

module.exports = {
    mode:   production ? "production" : "development",
    output: {
        clean:    true,
        filename: production ? "bundle.[contenthash].js" : "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use:  [
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin(),
        new HtmlPlugin({
            template: "./src/index.html",
        }),
        new HtmlInlineCssPlugin(),
    ],
}