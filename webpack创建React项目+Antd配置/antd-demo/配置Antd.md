## React+ant-design实现文件上传、下载、预览##  
start-time:2020-7-5   
**使用脚手架工具Create-react-app创建react项目，使用antd的样式不生效的 处理方式见“React脚手架+Antd配置”这一节**
1、webpack搭建react开发环境，见 summary.md  
2、引入ant-design,搭建面板  ``` npm install antd --save```，后续见文档  
   引入组件，```npm run start:dev```
3、报错：说你没有loader,解析不了css。因为之前的webpack只配置了html,没有配置css的loader,再去配置。 见 summary.md    
4、按需加载组件样式，```npm install babel-plugin-import --save-dev```  .babelrc中配置 ```  "plugins":[["import", {"libraryName": "antd", "style": "css"}]]```,讲道理应该可以了,但是不行，继续配置。 
5、为自己写的css文件和antd里的css 进行分开配置
```javascript
        {
          test: /\.css$/,         //  打包 .css文件
          exclude: /node_modules/,   //  除了node_modules的文件
          use: [
            { loader: 'style-loader' },   //  将style插入到模板里
            {
              loader: 'css-loader',    //   解析css
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test:/\.css$/,            //antd样式处理
          exclude:/src/,
          use:[
              { loader: "style-loader",},
              {
                  loader: "css-loader",
                  options:{
                      importLoaders:1
                  }
              }
          ]
        }
```  
并且配置下 babel-loader 
```javascript
loader: "babel-loader",    //  使用 babel-loader
options:{
   plugins: [
      [
         "import",{
            libraryName: "antd",
            libraryDirectory: "lib",
            style: "css" // `style: true` 会加载 less 文件
         }
      ]
   ]
} 
```  
至此，antd的样式终于正常了。  
6、你是否发现自己写的样式，比如 className = "header"这个不起作用呢？F12然后发现你写的样式被转换成这样子了 ._1ec0a3vGmXkgATKsKjsnXa？
是的话，继续下看且搜索  ```css module```      
```javascript  
import style from './index.css';

className={style.header}  
```  
OK!样式正常了。     
7、是否有你使用一个大组件，大组件内部包裹元素时，想修改元素的样式时，不知所措？  
F12 找出想要修改的元素，复制样式名 ,使用global能够避免被编译
 ```css 
 .fileinput :global(.ant-upload.ant-upload-drag){
    width: 50%;
    height: 100%;
    margin: 0 auto;
}```