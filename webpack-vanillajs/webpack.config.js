const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = fs.readdirSync(path.resolve(__dirname, 'src'));

const htmlWebpackPlugins = pages
    .filter(item => item.endsWith('.html'))
    .map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            minify: false,
            filename: `${name}.html`,
            template: path.resolve(__dirname, `src/${name}.${extension}`)
        });
    })


module.exports = {
    mode: "none",
    entry: "./src/js/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "js/[name].js"
    },
    devServer: {
        static: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].css' })
    ].concat(htmlWebpackPlugins),
};