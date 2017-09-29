const path = require('path');

module.exports = {
    entry: [
        './src/svg-envelope.js'
    ],
    output: {
        filename: './svg-envelope.js',
        path: path.resolve(__dirname, 'dist')
    }
};
