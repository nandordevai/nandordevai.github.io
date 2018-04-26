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
                use: ['style-loader', 'css-loader', 'sass-loader' ],
            },
        ],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            '~@scss': path.resolve(__dirname, 'src/scss'),
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname),
    },
};
