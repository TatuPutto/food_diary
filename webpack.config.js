var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "/client/app"),
    devtool: debug ? "inline-sourcemap" : null,
    /*entry: {
        javascript: "./js/bundle.js",
        html: './static/index.html'
    },*/
    entry: "./js/bundle.js",
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
                query: {
                	presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-decorators-legacy'
                    ],
                },
        },
        {
    	    test: /\.html$/,
            loader: "file-loader?name=[name].[ext]"
        },
        {
        	test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    output: {
        path: path.join(__dirname, "/client/app/js"),
    	//path: __dirname + "client/app/js",
    	filename: "bundle.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
};