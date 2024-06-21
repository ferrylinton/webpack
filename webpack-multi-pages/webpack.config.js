const path = require('path');
const fs = require('fs');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');


module.exports = {
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    resolve: {
        alias: {
            '@scripts': path.join(__dirname, 'src/js'),
            '@styles': path.join(__dirname, 'src/css')
        },
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
                use: ['css-loader']
            }
        ],
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: 'src/pages/',
            js: {
                filename: 'js/[name].[contenthash:8].js'
            },
            css: {
                filename: 'css/[name].[contenthash:8].css'
            },
        })
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
    },
};