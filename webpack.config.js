const path = require('path');

module.exports = {
    entry: './client/src/hooks/http.hook.js', // Entry point of your hook - 
    output: {
        filename: 'http.hook.bundle.js', // Output filename
        path: path.resolve(__dirname, 'dist'), // Output directory
        library: 'httpHook', // Name of the library (optional)
        libraryTarget: 'umd', // Universal Module Definition
        globalObject: 'this', // Important for UMD compatibility
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    mode: 'production', // Use 'development' for development builds
};