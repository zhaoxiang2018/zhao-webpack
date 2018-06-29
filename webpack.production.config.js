const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpackMerge = require("webpack-merge");
const webpackBase = require('./webpack.config.js')
const config = require('./config/config.js')
const path = require('path')

module.exports = webpackMerge(webpackBase,{
	devtool: 'null',
	module: {
		rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                	fallback: 'style-loader',
                	publicPath: config.cssPublicPath,
                	use: [
	                    {
	                        loader: "css-loader",
	                        options: {
						      sourceMap: false
						    }
	                    },
	                    {
	                        loader: "postcss-loader",
	                        options: {
						      sourceMap: false
						    }
	                    }
	                ]
                }) 
            },
            {
            	test: /\.(htm|html)$/i,
            	loader: "html-withimg-loader"
            },
            {
		        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('img/[name].[hash:7].[ext]')
		        }
		      },
		      {
		        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
		        }
		      },
		      {
		        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
		        }
		      },
		      {
		      	test: /\.art$/,
		      	loader: 'art-template-loader'
		      }
        ]
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("css/[name].[hash].css"),
        new CleanWebpackPlugin('build/js/*.*', {
        	index: __dirname,//包的根
        	verbose:true,//写日志到控制台
        	dry: false// 不要删除任何东西，主要用于测试.
        }),
        new CleanWebpackPlugin('build/css/*.*', {
        	index: __dirname,//包的根
        	verbose:true,//写日志到控制台
        	dry: false// 不要删除任何东西，主要用于测试.
        }),
        new CleanWebpackPlugin('build/*.*', {
        	index: __dirname,//包的根
        	verbose:true,//写日志到控制台
        	dry: false// 不要删除任何东西，主要用于测试.
        }),
        new OptimizeCSSPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('./config/prod.env')
        }),
     //    new CopyWebpackPlugin([
	    //   {
	    //     from: path.resolve(__dirname, './static/img'),
	    //     to: path.resolve(__dirname, './build/img'),
	    //     ignore: ['.*']
	    //   }
	    // ])
	]
})