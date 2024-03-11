const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'public'), // Serve static files from the 'public' directory
        },
        compress: true, // Enable gzip compression
        port: 9000, // Port to serve the application on (default is 8080)
        open: true, // Automatically open the application in the browser
      }

}