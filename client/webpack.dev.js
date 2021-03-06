/*eslint-env node */
var path = require( 'path' );
var webpack = require( 'webpack' );
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

var webpackDevConfig = {
    overrides: {
        devtool: 'source-map',
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
                'webpack-hud',
                './src/app/index.js'
            ]
        }
    },

    plugins: [
        new DashboardPlugin(),
        new webpack.DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( 'development' )
            }
        } ),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],

    rules: [
        {
            test: /\.jsx?$/,
            use: [ 'babel-loader', 'eslint-loader'],
            include: path.join( __dirname, 'src'),
            exclude: path.join( __dirname, 'node_modules' )
        }
    ],
    eslint: {
      emitWarning: true
    }
};

module.exports = require( './webpack.config' )( webpackDevConfig );
