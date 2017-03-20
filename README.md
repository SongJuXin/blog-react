﻿# blog-react
## 在线地址：http://60.205.230.255
- 或者http://songjuxin.xyz
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

### 打开浏览器，输入`localhost`,即可预览

### 目前实现的功能有：注册、登录、发表文章、退出、评论、跨域获取实时天气、删除自己的文章、超级管理员的删除评论。超级管理员账户为：simba，密码为：simba。

### 其他问题：比如界面、响应式、文章编辑器、按需加载、完全舍弃jq、bootstrap等功能以及其他的一些优化，正在考虑进一步的完善，会不断修改、更新，直到上线发布。
***
### 2017.3.7更新

1. 优化后端接口，更靠近`restful`接口风格了
2. 解决上次的req.session找不到的问题，原因是当采用fetch传输数据，默认不会发送`cooke`，因此导致后台的`req.session`获取到的和用`ajax`获取到的`req.session`不一致
3. 所有ajax请求替换为fetch请求
4. 个别的form表单提交改为json数据提交

####  待要解决的问题
- fetch上传文件
- 管理员后台操作
- 界面相关问题
- 丰富站点内容
- 面包屑导航
- 兼容性问题
### 2017.3.19更新
1. 稍微优化了一下界面。移动端导航栏折叠，文章详情页布局由靠左变为居中，并且去掉了边框、背景颜色。
2. 由于站点内容过于少，故爬取了简书的一些文章和eastday的一些动态。文章可以直接在本站点看，动态跳到源网站上。
3. 去掉了面包屑导航，原因1：技术实现上有点难度；原因2：目前网站并不深，暂且用不着。以后有时间或机会再解决。
4. 网站部署由原来的http://123.57.223.74:29323变更到了现在的60.205.230.255，现在这个是自己的服务器，域名songjuxin.xyz,还在备案申请中，马上就能用了。
5. 增加了文章浏览次数
####  待要解决的问题
- markdown格式的编辑
- 后台管理
- fetch上传文件
- 兼容性问题
- 按需加载
### 2017.3.21更新
1. 引入了showndown插件，可以在编辑文章界面编辑简单文本、html和markdown格式的文章了
2. 发表文章的方式form表单发送改为了json发送
3. 编辑界面进行了调整，可以实时预览编辑效果
4. 后台数据库文章模型增加了html、description、createAt三种数据
####  待要解决的问题
- 后台管理
- fetch上传文件
- 兼容性问题
- 按需加载

### 有任何问题或者建议，联系我的邮箱：1016346103@qq.com

## 觉得对你有点儿帮助的，点个"star"再走呗~~~





