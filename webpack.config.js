const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("./package.json").dependencies;

module.exports = {
    mode: 'development',
    devServer: {
        port: 8083,
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: "bundle-loader",
                options: {
                    lazy: true,
                },
            },
            {
                /* The following line to ask babel
                     to compile any file with extension
                     .js */
                test: /\.js?$/,
                /* exclude node_modules directory from babel.
                    Babel will not compile any files in this directory*/
                exclude: /node_modules/,
                // To Use babel Loader
                loader:
                    'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                        '@babel/preset-react',
                    ], // to compile react to ES5
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'firstModule',
                filename:
                    'remoteEntry.js',
                exposes: {
                    "./App": "./src/App",
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};