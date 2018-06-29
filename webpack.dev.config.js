const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const webpackBase = require('./webpack.config.js')
const path = require('path')

module.exports = webpackMerge(webpackBase,{
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		inline: true,
		hot: true,//热更新
		open: true,//自动打开页面
		host: 'localhost',
		port: 8080,
		publicPath: "/",
		proxy:{
			'/api': {
	            target: 'https://x.aiyingshi.com', //设置调用接口域名和端口号别忘了加http
	            // target: 'http://172.30.2.9:8007',
	            changeOrigin: true,
	            pathRewrite: {
	                '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
	                    // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
	            }
	        }
		},
		watchOptions:{
			poll: false
		},
		overlay:{
            errors:true,
            warnings:true
        }
		
	},
	module: {
		rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
            	test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
					      sourceMap: false,
					    }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
					      sourceMap: false
					    }
                    }
                    
                ]
            },
             {
		        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
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
		        test: require.resolve('jquery'),
		        use: [{
		            loader: 'expose-loader',
		            options: 'jQuery'
		        },{
		            loader: 'expose-loader',
		            options: '$'
		        }]
		      },
		      {
		      	test: /\.art$/,
		      	loader: 'art-template-loader'
		      }
        ]
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.DefinePlugin({
            'process.env': require('./config/dev.env')
        })
	]
})