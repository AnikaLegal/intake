const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelRule = (isDev) => ({
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 0.25%, not dead',
            },
          ],
          '@babel/preset-react',
          '@babel/preset-flow',
        ],
        plugins: isDev
          ? [
              '@babel/plugin-proposal-class-properties',
              '@babel/transform-runtime',
              'babel-plugin-styled-components',
              'react-refresh/babel',
            ]
          : [
              '@babel/plugin-proposal-class-properties',
              '@babel/transform-runtime',
              'babel-plugin-styled-components',
            ],
      },
    },
  ],
})

const styleRule = (isDev) => ({
  test: /\.(sa|sc|c)ss$/,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
})
const fileRule = (isDev) => ({
  test: /\.(png|woff|woff2|eot|ttf|svg|pdf)$/,
  type: 'asset/resource',
  dependency: { not: ['url'] },
})

module.exports = {
  dev: [babelRule(true), styleRule(true), fileRule(true)],
  prod: [babelRule(false), styleRule(false), fileRule(false)],
}
