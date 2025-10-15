// karma.conf.cjs
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/**/*.spec.js', watched: false }],
    preprocessors: { 'src/**/*.spec.js': ['webpack'] },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          // Transpilar JS/JSX
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
            }
          },
          // Cargar CSS importado desde componentes
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          // 🔹 IMÁGENES (png, jpg, gif, svg, webp, avif)
          {
            test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
            type: 'asset/resource'
          },
          // (opcional) Fuentes si llegas a importar alguna
          {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx', '.css']
      }
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher' // o 'karma-chrome-launcher' si usas ChromeHeadless
    ],
    browsers: ['ChromeHeadless'], // o ['ChromeHeadless'] si configuraste CHROME_BIN
    client: { clearContext: false },
    singleRun: true,
    reporters: ['progress'],
    logLevel: config.LOG_INFO
  });
};
