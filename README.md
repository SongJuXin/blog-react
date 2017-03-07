# blog-react
## 在线地址：http://123.57.223.74:29323
## A blog web maded by react + express + MongoDB
### 先安装依赖包，执行
```
npm install
```

### 直接执行以下代码,会自动生成build文件夹，并创建bundle.js和index.html文件
```
npm run build
```
### 打开mongodb数据库：在mongodb/bin下面，右键打开本地窗口，执行以下代码，启动数据库
```
mongodb --dbpath=../data
```
### 启动服务器：在根目录，打开命令窗口，执行以下命令

```
node app
```

### 打开浏览器，输入`localhost:29323`,即可预览

### 目前实现的功能有：注册、登录、发表文章、退出、评论、跨域获取实时天气、删除自己的文章、超级管理员的删除评论。超级管理员账户为：simba，密码为：simba。

### 其他问题：比如界面、响应式、文章编辑器、按需加载、完全舍弃jq、bootstrap等功能以及其他的一些优化，正在考虑进一步的完善，会不断修改、更新，直到上线发布。

### 2017.3.7更新

1.优化后端接口，更靠近`restful`接口风格了
2.解决上次的req.session找不到的问题，原因是当采用fetch传输数据，默认不会发送`cooke`，因此导致后台的`req.session`获取到的和用`ajax`获取到的`req.session`不一致
3.所有ajax请求替换为fetch请求
4.个别的form表单提交改为json数据提交
#### 待要解决的问题
- fetch上传文件
- 管理员后台操作
- 界面相关问题
- 丰富站点内容
- 面包屑导航
- 兼容性问题

### 有任何问题或者建议，联系我的邮箱：1016346103@qq.com

## 觉得对你有点儿帮助的，点个"star"再走呗~~~





