const path = require('path');
const APP_BASE_DIR = path.resolve(__dirname, '../').concat('/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	context: APP_BASE_DIR,
	entry: {
		main: APP_BASE_DIR.concat('src/ts/index.ts'),
		style: APP_BASE_DIR.concat('src/scss/index.scss')
	},
	output: {
		filename: 'js/[name].[hash].js',
		path: APP_BASE_DIR.concat('dist'),
	},
	resolve: {
		extensions: ['.ts', '.js'],
		plugins: [
			new TsConfigPathsWebpackPlugin(),
		]
	},
	module: {
		rules: [{
			test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2)$/i,
			loader: 'file-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			title: 'Web Componentes Example',
			favicon: APP_BASE_DIR.concat('src/favicon.png'),
			template: APP_BASE_DIR.concat('src/index.html'),
		}),
	]
};