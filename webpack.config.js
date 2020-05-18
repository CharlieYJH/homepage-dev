const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    entry: 'src/index.tsx',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    devtool: argv.mode == 'production' ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader', 'prettier-loader']
            },
            {
                test: /\.s?css$/,
                use: ['style-loader','css-loader', 'sass-loader', 'prettier-loader']
            },
            {
                test: /\.(jpe?g|png|svg|gif)/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    }
})
