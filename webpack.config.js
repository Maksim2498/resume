import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import TerserPlugin from "terser-webpack-plugin"

export default env => {
    const production = env.production ?? false
    const envSuffix = production ? ".[contenthash]" : ""

    return {
        mode: production ? "production" : "development",
        devtool: production ? undefined : "source-map",

        output: {
            clean: true,
            filename: `bundle${envSuffix}.js`,
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: `index${envSuffix}.css`,
            }),

            new HtmlPlugin({
                template: "./src/index.html",
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },

                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },

                {
                    test: /\.(svg|jpeg)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: `images/[name]${envSuffix}[ext]`,
                    },
                },
            ],
        },

        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ],
        },

        devServer: {
            port: 8000,
            hot: true,
        },
    }
}
