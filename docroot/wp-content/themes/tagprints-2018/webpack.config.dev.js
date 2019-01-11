const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

function getConfig(isDev) {
	let browserConfig = {
		devtool: isDev ? 'eval' : false,
		cache: true,
		stats: {
			errors: true,
			errorDetails: true
		},
		entry: {
			vendor: [
				'babel-polyfill',
				'array-from-polyfill',
				'axios',
				'immutable',
				'react',
				'react-dom',
				'redux',
				'redux-immutable',
				'redux-saga',
				'reselect',
				'react-redux',
				'react-router',
				'react-router-redux',
				'react-addons-css-transition-group',
				'react-immutable-proptypes',
				'react-motion',
				'lodash-decorators'
			],
			ourWork: [
				'./app/work/index.js'
			],
			pbl: [
				'./app/pbl/index.js'
			],
			main: [
				'./assets/scripts/main.js'
			],
			smugmug: [
				'./assets/scripts/components/smugmug/index.js'
			]
		},
		output: {
			path: path.resolve(__dirname, './dist/scripts'),
			filename: isDev ? '[name].js' : '[name].js',
			publicPath: '/'
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					include: path.join(__dirname, './src'),
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: !isDev,
								removeComments: !isDev,
								collapseWhitespace: !isDev
							}
						}
					]
				},
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
					loader: 'babel-loader'
				},
				{
					test: /\.(css$)/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									sourceMap: isDev,
									camelCase: true,
									minimize: !isDev,
									importLoaders: 1,
									localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
									discardComments: {
										removeAll: true
									}
								}
							},
							{
								loader: 'postcss-loader'
							}
						]
					})
				},
				{
					test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: isDev ? 'fonts/[name].[ext]?[hash:8]' : 'fonts/[hash:8].[ext]'
							}
						}
					],
					include: path.resolve(__dirname, './src'),
					exclude: /img/
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: isDev ? 'images/[name].[ext]?[hash:8]' : 'images/[hash:8].[ext]'
							}
						}
					],
					include: path.resolve(__dirname, './src'),
					exclude: /css/
				}
			]
		},
		externals: {
			jquery: 'jQuery'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
				},
				API_URL: JSON.stringify((isDev ? '' : '')),
				COOKIE_DOMAIN: JSON.stringify((isDev ? null : ''))
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				async: true,
				minChunks: Infinity
			}),
			new ExtractTextPlugin({
				filename: isDev ? 'styles.css' : 'styles.[contenthash].css',
				allChunks: true,
				ignoreOrder: true
			})
		]
	};

	if (isDev) {
		browserConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	return browserConfig;
}

module.exports = getConfig;
