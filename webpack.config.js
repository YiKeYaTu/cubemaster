var path = require("path");
var webpack = require('webpack');
module.exports = {
    entry: {
        index: ["./src/entry/index.jsx"],
        data: ["./src/entry/data.jsx"],
        combination: ["./src/entry/combination.jsx"],
        alg: ["./src/entry/alg.jsx"],
        alg_class: ["./src/entry/alg_class.jsx"],
        vendor: ['react', 'react-dom', 'redux', 'redux-thunk']
    },
    module: {
        loaders: [
            {
                test: /\.css$/, 
                loader: "style!css!less" 
            },
            {
                test: /\.jsx?$/, 
                loader: "babel", 
                exclude: /node_modules/, 
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "[name].min.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'react.min.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ]
};