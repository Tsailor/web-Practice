const path = require('path');  //引入路径
const HtmlWebpackPlugin = require('html-webpack-plugin')   //引入html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    //  css抽离
module.exports = {      //  导出
    mode: 'development',
    entry: './src/index.js',    //    项目入口
    output: {                  //    输出 
      filename: 'bundle.js',    //    打包后的名字
      path: path.resolve(__dirname, './dist')   //  当前路径下
    },
    module: {
      rules: [
        {
          test: /\.js$/,         //  打包 .js文件
          exclude: /node_modules/,   //  除了node_modules的文件
          use: {
            loader: "babel-loader",    //  使用 babel-loader
            options:{
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    libraryDirectory: "lib",
                    style: "css" // `style: true` 会加载 less 文件
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/,         //  打包 .css文件
          exclude: /node_modules/,   //  除了node_modules的文件
          use: [
            {  
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },   //  将style插入到模板里
            {
              loader: 'css-loader?modules',    //   解析css
              options: {
                modules: true
              }
            }
          ]
        },
        {//antd样式处理
          test:/\.css$/,
          exclude:/src/,
          use:[
              {  
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: true,
                },
              },
              {
                  loader: "css-loader",
                  options:{
                      importLoaders:1
                  }
              }
          ]
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'load-files',
          template: './src/index.html'   //  模板
        }),
        new MiniCssExtractPlugin()
    ]
  };