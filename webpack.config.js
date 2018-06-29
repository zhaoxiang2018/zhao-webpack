
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const config = require('./config/config.js')
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}

config.htmlDirs.forEach((page) => {
	const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `./src/html/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `./src/js/${page}.js`);
})
module.exports = {
	entry: Entries,
	output: {
		path: __dirname + "/build",
		filename: "js/[name].[hash].js"
	},
	plugins: [
		...HTMLPlugins
	]
}