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
                use: ['css-loader', 'postcss-loader']
            }
        ],
    },
    plugins: [
        new HtmlBundlerPlugin({

            entry: {
                // define templates here
                index: 'src/views/pages/home/index.hbs', // => dist/index.html
                // index: {
                //   import: 'src/views/pages/home/index.hbs',
                //   data: { title: 'Home' },
                // },
                about: 'src/views/pages/about/index.hbs', // => dist/about.html
                author: 'src/views/pages/author.hbs', // => dist/about.html
            },
            js: {
                filename: 'js/[name].[contenthash:8].js'
            },
            css: {
                filename: 'css/[name].[contenthash:8].css'
            },
            beforePreprocessor: (content, { resourcePath, data }) => {
                console.log(content);
                console.log(resourcePath);
                return content;
            },
            preprocessor: 'handlebars',
            preprocessorOptions: {
                partials: ['src/views/pages/', 'src/views/partials/'],
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