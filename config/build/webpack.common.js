const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const postcssConfig = require('../postcss.config.js');

const cssLocalIdentName = process.env.NODE_ENV !== 'production' ?
    '[name]__[local]_[hash:base64:5]' : '[hash:base64:5]'; 

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
        'styles': './src/global.css'
    },

    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.resolve('.tmp/cache-loader')
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                modules: true,
                                localIdentName: cssLocalIdentName,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.css/,
            options: {
                postcss: postcssConfig,
                context: helpers.root('config')
            }
        }), 
//        new webpack.optimize.CommonsChunkPlugin({
//            name: [ 'app', 'vendor', 'polyfills' ]
//        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/, 
            /en-gb|ru/
        ),
        new CopyWebpackPlugin([
            {
                from: 'assets',
                to: 'assets'
            }
        ])
    ]
};
