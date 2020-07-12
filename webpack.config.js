const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const babelOptions = preset => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
     if(preset) {
        options.presets.push(preset)
     }
    return options
}

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 3005,
        hot: isDev
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/images', to: 'images'},
                {from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts'}
            ]
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node-modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.vue$/,
                loader: {loader: 'vue-loader'}
            },
            {
                test: /\.(svg|jpg|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }],
            },
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, {loader: 'css-loader', options: {url: false, sourceMap: true}}],
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, {loader: 'css-loader', options: {url: false, sourceMap: true}}, 'less-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'path/to/imported/file/dir'), //<== This solved the issue
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {url: false, sourceMap: true}
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
}