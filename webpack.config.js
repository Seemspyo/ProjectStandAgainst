const
path = require('path'),
HTMLPlugin = require('html-webpack-plugin'),
VueLoaderPlugin = require('vue-loader/lib/plugin'),
CopyPlugin = require('copy-webpack-plugin'),
CleanupPlugin = require('webpack-cleanup-plugin');

const prodId = ( Date.now() - new Date('2019-12-16:14:56:00').getTime() ).toString(16);

module.exports = env => ({
    entry: {
        main: './src/main.ts',
    },
    mode: env || 'development',
    output: {
        filename: `[name].${ prodId }.js`,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.vue', '.ts', '.js' ],
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 7200
    },
    plugins: [
        new HTMLPlugin({ template: env === 'production' ? './src/index.prod.html' : './src/index.html', filename: './app.html' }),
        new VueLoaderPlugin(),
        new CopyPlugin([ { from: 'src/assets', to: 'assets' } ], { copyUnmodified: true }),
        new CleanupPlugin()
    ]
});