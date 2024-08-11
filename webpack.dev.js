const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: ['./dist'],
        open : {
            app : {
                name : '/mnt/c/program files/google/chrome/application/chrome.exe',
            },
        },
    }
})