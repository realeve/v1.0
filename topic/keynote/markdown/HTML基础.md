#HTML基础<i class="fa fa-html5"></i>
>第一周

----
##<i class="fa fa-cog"></i>工具
* DreamWare
* FrontPage

===
##<i class="fa fa-edit"></i>纯文本编辑器
* **Notepad++**
* **Sublime**
* 微软VSCode

----
<!-- .slide: data-background="#41b883" -->
##<i class="fa fa-link"></i>资源网站

* [W3CSchool](http://www.runoob.com/)
* [幕课网](http://www.imooc.com/)

----
##<i class="fa fa-html5"></i>背景知识
1.静态站点：信息静态展示

2.动态站点：信息动态读取（ASP、JSP、PHP）

===
##从Html信息展示到Web App

===
##SPA(Single Page Application)
>Single Page Application指一种基于web的应用或者网站, 这种single page在和用户交互的时候当用户点击某个物件或者按键的时候不会跳转到其他的页面. 举个例子, 在知乎里, 如果你点击一个问题或者一个人名的时候, 网页会自动跳转到该页面. 反之, 比如说我们现在有一个基于网页版的计算器应用, 不管你点数字还是运算符号, 都不会跳转到其他页面, 仅仅是在网页的某处(计算器显示数字的地方)进行更新, 显示你刚刚所按的键或者计算的结果.(引自[知乎](http://www.zhihu.com/question/27005645))

===
##**AJAX**动态加载
>AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。

* sync(同步)
* async(异步)

===
##浏览器
* <i class="fa fa-internet-explorer">IE</i> 
* <i class="fa fa-edge">EDGE</i> 
* <i class="fa fa-chrome">CHROME</i>

===
##BS/CS
* Browser-Server
* Client-Server

===
##html5+css3+javascript
###<i class="fa fa-html5" style="font-size:4em;margin-top:20px;"></i> 
###<i class="fa fa-css3" style="font-size:4em;margin-top:20px;"></i> 

----
<!-- .slide: data-background="#41b883" -->
##关于本系列交流（画饼）
#<i class="fa fa-pie-chart" style="font-size:5em;margin-top:20px;"></i> 

===
##主要内容
* WebApp应用开发相关技术
* 服务端应用开发
* 数据可视化
* 数据库
* 微信公众号开发
* 机检系统
* 其它新技术的应用

>以上内容大多数不包含在大学学堂以内。

===
##整体目标
* 对行业外互联网相关技术的系统掌握
* 了解公司机检系统、整体网络架构
* 立足于解决生产实际应用问题

===
##WebApp
* 各类型答题活动的设计和实现
* 基于Html5的PPT制作

>当前所展示的网页是由一个[MarkDown文件](./markdown/HTML基础.md)生成，针对插件做了大量优化提升，在今后的例子中将展开讲述。

===
##数据可视化
1. 数据大屏(精灵杯比赛现场、两学一做、质量月)
2. PBC反假货币宣传([链接1](http://cbpm.sinaapp.com/topic/201609/province.html)、[链接2](http://cbpm.sinaapp.com/topic/201609/)、[链接3](http://cbpm.sinaapp.com/topic/201609/dot.html))

===
##微信公众号开发
1. 相关基础知识
2. 云服务器的使用
3. 微信插件开发，微信活动策划

===
##机检系统/数据库
1. 各机检系统数据库结构与数据应用
2. 中心数据库结构及数据应用
3. 公司其它数据库及数据应用
4. 机检系统相关数据格式

===
##其它技术
1. github/svn
2. markdown
3. gitbook
4. gulp/grunt/webpack
5. API
6. NO-SQL(自学中)
7. VUE(自学中)
8. NodeJS(周工)
9. SASS(李凌)

----
##HTML基础
按 <span class="label label-small label-info">ctrl+u</span> 查看本网页代码

===
##最小化结构
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>Hello World</h1>
</body>
</html>
```

===
##通常的HTML结构
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>这里是文档标题</title>
    <link href="detail-317f48fb53b8c0472999.min.css" rel="stylesheet">
</head>
<body>
    <h1>Hello World</h1>
    <script src="//cdn.bootcss.com/jquery/3.1.0/core.js"></script>
    <script src="detail-317f48fb53b8c0472999.min.js"></script>
</body>
</html>
```

===
##HEAD
* [一份关于任何可以写入到你的文档中 &lt;head &gt; 部分的清单](https://github.com/Amery2010/HEAD)
* [也可以点击这里](./markdown/HEAD.html)

===
##BODY——网页主体

===
##写一个Hello World

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

===
##[HTML常用标签](http://www.w3school.com.cn/tags/)

===
##链接
<a href="#" target="_blank">链接显示文字</a>
```html
<a href="#" target="_blank">链接显示文字</a>
```

===
##引用
>引用文字

```html
<blockquote>引用文字<、blockquote>
```

===
##按钮
<button type="button" class="btn btn-success">点击这里</button>

```html
<button type="button" class="btn btn-success">点击这里</button>
```

===
##div标签

<div style="color:#F00;margin-top:30px;">
  <h3>This is a header</h3>
  <p>This is a paragraph.</p>
</div>

```html
<div style="color:#F00">
  <h3>This is a header</h3>
  <p>This is a paragraph.</p>
</div>
```

===
##下面来看一个[例子](./markdown/HEAD.html)

===
##再写一个**[例子](./markdown/example.html)**

----
<!-- .slide: data-background="#41b883" -->
#Q&A

----
#下节预告：*给HTML添加样式*