const path = require('path');
const fs = require('fs');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    mode: isProduction ? 'production' : 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: '[name]',
        clean: true,
    },

    resolve: {
        alias: {
            '@src': path.join(__dirname, 'src'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader']
            },
            {
                test: /[\\/]image[\\/].+(png|jpe?g|svg|webp|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/image/[name].[hash:8][ext]',
                }
            },
            {
                test: /favicon.ico/,
                type: "asset/resource",
                generator: {
                    filename: 'favicon.ico'
                },
            },
        ],
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: 'src/pages/',
            loaderOptions: {
                sources: [
                  {
                    tag: 'div',
                    attributes: ['style'],
                  },
                ],
              },
            js: {
                filename: 'assets/js/[name].[contenthash:8].js'
            },
            css: {
                filename: 'assets/css/[name].[contenthash:8].css'
            },
            preprocessor: (content, {resource}) => {
                console.log(resource);
                
                return content.replace(/{{(.*?)}}/g, (match) => {
                    let filename = match.split(/{{|}}/).filter(Boolean)[0];
                    return fs.readFileSync(path.resolve(__dirname, 'src', 'template', `${filename}.html`));
                })
            },
            minify: isProduction ? true : false,
        })
    ],
    watchOptions: {
        ignored: ['**/node_modules'],
    },
    devServer: {
        // open browser
        open: true,
        compress: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },

        // enable live reload
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },

        // rewrite rules
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /./, to: '/404.html' },
            ],
        },
        
    },
};