const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        watchFiles: ['./src/index.html'],
        open : {
            app : {
                name : '/mnt/c/program files/google/chrome/application/chrome.exe',
            },
        },
    }
})