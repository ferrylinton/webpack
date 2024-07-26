const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    mode: isProduction ? 'production' : 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: '[name]'
    },

    resolve: {
        alias: {
            '@scripts': path.join(__dirname, 'src/js'),
            '@styles': path.join(__dirname, 'src/css'),
            '@images': path.join(__dirname, 'src/assets/images/'),
            '@fonts': path.join(__dirname, 'src/assets/fonts/'),
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
            // load fonts from `fonts` or `node_modules` directory only
            {
                test: /[\\/]fonts|node_modules[\\/].+(woff(2)?|ttf|otf|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[hash:8][ext]'
                },
            },

            // load images from `images` directory only
            {
                test: /[\\/]images[\\/].+(png|jpe?g|svg|webp|ico)$/,
                oneOf: [
                    // inline image using `?inline` query
                    {
                        resourceQuery: /inline/,
                        type: 'asset/inline',
                    },
                    // auto inline by image size
                    {
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 1024,
                            },
                        },
                        generator: {
                            filename: 'assets/images/[name].[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: 'src/views/pages/',
            js: {
                filename: 'js/[name].[contenthash:8].js'
            },
            css: {
                filename: 'css/[name].[contenthash:8].css'
            },
            preprocessor: 'handlebars',
            preprocessorOptions: {
                helpers: ['src/views/helpers'],
                partials: ['src/views/pages/', 'src/views/partials/'],

            },
            minify: isProduction ? true : false,
        })
    ],
    watchOptions: {
        ignored: [path.resolve(__dirname, 'variable.json'), '**/node_modules'],
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