const webpack = require('webpack');
const helpers = require('../helpers');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const postcssConfig = require('../postcss.config');
const cssLocalIdentName = process.env.NODE_ENV !== 'production' ?
    '[name]__[local]_[hash:base64:5]' : '[hash:base64:5]'; 

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: [ '.ts', '.js' ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'istanbul-instrumenter-loader', 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ],
                exclude: /\.spec\.ts$/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
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
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        )
    ]
};
