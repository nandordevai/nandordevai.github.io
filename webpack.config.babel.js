import path from 'path';

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'assets/js'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    },
                ],
            },
        ],
    },
    mode: 'development',
    resolve: {
        alias: {
            '~@scss': path.resolve(__dirname, 'src/scss'),
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname),
    },
};
