const path = require('path');

module.exports = {
    entry: './src/svg-envelope.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'svg-envelope.js',
        library: 'svgEnvelope',
        libraryTarget: 'umd'
    }
};
