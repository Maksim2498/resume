import HtmlPlugin         from "html-webpack-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import TerserPlugin       from "terser-webpack-plugin"

export default env => {
    const production = env.production ?? false

    return {
        mode:   production ? "production" : "development",
        output: {
            clean:    true,
            filename: production ? "bundle.[contenthash].js" : "bundle.js",
        },
        devtool: production ? undefined : "inline-source-map",
        module:  {
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
            port: 8000,
            hot:  true,
        },
    }
}