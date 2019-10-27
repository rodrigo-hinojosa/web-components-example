const WebpackMerge = require('webpack-merge');
const WebpackConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = WebpackMerge(WebpackConfig, {
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [{
				test: /\.s[ac]ss$/i,
				use: [{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
						}
					}
				],
			},
			{
				test: /\.ts?$/,
				use: [
					'babel-loader',
					'ts-loader'
				],
				exclude: /node_modules/
			},
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						// we want terser to parse ecma 8 code. However, we don't want it
						// to apply any minfication steps that turns valid ecma 5 code
						// into invalid ecma 5 code. This is why the 'compress' and 'output'
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						inline: 2,
					},
					mangle: {
						// Find work around for Safari 10+
						// Bug: https://bugs.webkit.org/show_bug.cgi?id=171041
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true
					},
				},
				// Use multi-process parallel running to improve the build speed
				parallel: true,
				// Enable file caching
				cache: true,
				extractComments: false,
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						}
					}],
				}
			})
		],
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new CompressionPlugin({
			cache: true,
			exclude:  /\.html$/,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
	],
});