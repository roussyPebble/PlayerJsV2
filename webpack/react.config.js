const path = require('path');

var latestPath = '/build/dev/latest/react/dist';
var devPath = '/examples/react/js/dist';
var entryPath ='./webpack/version.config.js';
var entries = {};

entries[latestPath] = entryPath;
entries[devPath] = entryPath;
module.exports = {
    entry: entries,
    output: {
        path: path.resolve(""),
        filename: `[name].js`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            }
        ]
    }
};