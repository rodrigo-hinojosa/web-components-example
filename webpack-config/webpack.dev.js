const path = require('path');
const WebpackMerge = require('webpack-merge');
const WebpackConfig = require('./webpack.config.js');
const Webpack = require('webpack');

module.exports = WebpackMerge(WebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                        }
                    }
                ],
            },
            {
                test: /\.ts?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, '../', 'dist'),
        compress: true,
        port: 9000,
        writeToDisk: true,
        open: true,
        clientLogLevel: 'silent'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
});