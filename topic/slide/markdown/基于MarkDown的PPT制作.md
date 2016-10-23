#基于MarkDown的SLIDE制作
>技术质量部 李宾

----
<!-- .slide: data-background="#41b883" -->
##什么是MarkDown
>Markdown 是一种用来写作的轻量级「标记语言」，它用简洁的语法代替排版，而不像一般我们用的字处理软件 Word 或 Pages 有大量的排版、字体设置。它使我们专心于码字，用「标记」语法，来代替常见的排版格式。

----
##markdown的语法
---
# #一级标题
## ##二级标题
### ###三级标题
#### ####四级标题
##### #####五级标题
###### ######六级标题

===
```md
* 无序列表
* 无序列表
* 无序列表
```
<!-- class="rollIn" -->
* 无序列表
* 无序列表
* 无序列表

===
```md
1. 有序列表
2. 有序列表
3. 有序列表

>这样表示引用
```
1. 有序列表
2. 有序列表
3. 有序列表

>\>这样表示引用

===
###图片与链接
点击图片全屏显示

![](./image/2016-09-07-00-54-54.jpg)

===
###表格
```markdown
表 头1 | 表头2 | 表头3
----|------|----
内容 | 内容  | 内容
内容 | 内容  | 内容
内容 | 内容  | 内容
```

表头1 | 表头2 | 表头3
----|------|----
内容 | 内容  | 内容
内容 | 内容  | 内容
内容 | 内容  | 内容

===
###表格2
```markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

===
###粗体与斜体
Markdown 的粗体和斜体也非常简单，用两个 \* 包含一段文本就是 **粗体** 的语法，用一个 \* 包含一段文本就是 *斜体* 的语法。
至此，关于MarkDown的主要语法就结束了，更详细的说明可以看[这里]()。

----
<!-- .slide: style="background-image:url('./img/osx.jpg')" -->
##<i class="fa fa-bookmark success"></i> 如何用MARKDOWN写SLIDE
 当前所看到的这个Slide就是用MARKDOWN所写成，你可以点击 [这里](./markdown/基于MarkDown的PPT制作.md) 下载MARKDOWN文件浏览其中的样式。

但是这个文件也仅是一个MARKDOWN文件，要转换成PPT还需要一个开源库——REVEAL.JS。

----
##<i class="glyphicon glyphicon-leaf"></i> REVEAL.JS用法

>* reveal.js是一个制作3D幻灯片效果的插件,它同时应用最新的web技术,来创建漂亮的html演示效果。
* [项目主页](http://lab.hakim.se/reveal-js/)可以参见这里，[github](https://github.com/hakimel/reveal.js)可以点这里。

===
###html渲染写法
通常来讲，有大量Html5的插件支持用html标记来渲染SLIDE，以现在这段文字为例，在REVEAL中的语法是这样的:

```html
<section class="present" style="top: 238.5px; display: block;">
	<h3 id="-html-">普通html渲染</h3>
	<p>通常来讲，有大量Html5的插件支持用html标记来渲染SLIDE，以现在这段文字为例，在REVEAL中的语法是这样的。</p>
</section>
```
####一个SLIDE通常由很多个以上的页面共同组成

>注意：在REVEAL中，每页SLIDE是以section标记来区分每一页的，其余语法与编写网页相同。

===
###MARKDOWN渲染写法
```html
<section data-markdown>
    <script type="text/template">
        ## 这里是MARKDOWN的标题

        这里是一些内容，就是这么简单
    </script>
</section>
```

===
###引用外部MARKDOWN资源
```html
<section data-markdown="example.md"  
         data-separator="^\n\n\n"  
         data-separator-vertical="^\n\n"  
         data-separator-notes="^Note:"  
         data-charset="iso-8859-15">
</section>
```
其中 data-separator表示每个横向页面的分割符，data-separator-vertical表示纵向的分割符，data-separator-notes代表备注

在这个页面就藏有备注文件，你可以打开注解窗口。（请按“S”键）

note:
data-separator表示每个横向页面的分割符，data-separator-vertical表示纵向的分割符，data-separator-notes代表备注

===
###现在看看完整的html结构
```html
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<title></title>
		<link rel="stylesheet" href="tools/css/reveal.css">
		<link rel="stylesheet" href="tools/plugin/highlight/atom-one-dark.min.css"> 
	</head>
	<body>
		<div class="reveal">
			<div class="slides">
				<section data-markdown="example.md" data-separator="^\r\n----\r\n$" 
								 data-separator-vertical="^\r\n===\r\n$" data-separator-notes="^note:">
				</section>
			</div>
		</div>
		<script src="tools/lib/js/head.min.js"></script>
		<script src="tools/js/reveal.js"></script>
		<script src="tools/js/jquery.min.js"></script>
	</body>
</html>
```
资源文件中的"tools/plugin/highlight/atom-one-dark.min.css"用于源码高亮，也就是现在所看到的这样。

===
###JS部部分:REVEAL的初始化
<!-- .slide: data-background="#41b883" -->
```js
Reveal.initialize({
    dependencies: [{
      src: 'tools/plugin/markdown/marked.js'
    }, {
      src: 'tools/plugin/markdown/markdown.js'
    }]
  });
```
初始化时还可配置其它参数，详情请参考[github官网文档](https://github.com/hakimel/reveal.js#configuration);

----
##REVEAL页面的使用
在本页面按问号(?)键调出帮助界面。

----
<!-- .slide: data-background="#41b883" -->
##REVEAL功能改造
在本页面按问号(?)键调出帮助界面。

===
###全局图标支持
增加 [font-awesome](!http://fontawesome.io/icons/) 和 [Glyphicons](!http://v3.bootcss.com/components/#glyphicons) 字体图标
```html
<i class="glyphicon glyphicon-asterisk">​</i>​
<i class="glyphicon glyphicon-plus">​</i>​
<i class="glyphicon glyphicon-euro">​</i>​
<i class="glyphicon glyphicon-minus">​</i>​
<i class="glyphicon glyphicon-cloud">​</i>​
<i class="glyphicon glyphicon-envelope">​</i>​
<i class="glyphicon glyphicon-pencil">​</i>​
<i class="glyphicon glyphicon-glass">​</i>​
<i class="glyphicon glyphicon-music">​</i>​
<i class="glyphicon glyphicon-search">​</i>​
<i class="glyphicon glyphicon-heart">​</i>​
<i class="glyphicon glyphicon-star">​</i>​
<i class="fa fa-apple"></i>
<i class="fa fa-android"></i>
<i class="fa fa-github"></i>
<i class="fa fa-google"></i>
<i class="fa fa-css3"></i>
<i class="fa fa-html5"></i>
<i class="fa fa-usd"></i>
<i class="fa fa-pie-chart"></i>
<i class="fa fa-file-video-o"></i>
<i class="fa fa-cog"></i>
```
<i class="glyphicon glyphicon-heart">​</i>​
<i class="fa fa-apple"></i>
<i class="fa fa-android"></i>
<i class="fa fa-github"></i>
<i class="fa fa-google"></i>
<i class="fa fa-css3"></i>
<i class="fa fa-html5"></i>
<i class="fa fa-usd"></i>
<i class="fa fa-pie-chart"></i>
<i class="fa fa-cog"></i>

===
###标签
```html
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>

===
###bootstrap样式
```html
<span class="alert alert-success" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</span>
```

<span class="alert alert-success" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</span>

===
###Text
```html
<span class="text-danger">.text-danger</span>
<span class="text-success">.text-sucess</span>
<span class="text-primary">.text-primary</span>
<span class="text-warning">.text-warning</span>
<span class="text-info">.text-info</span>
```

<span class="text-danger">.text-danger</span>
<span class="text-success">.text-sucess</span>
<span class="text-primary">.text-primary</span>
<span class="text-warning">.text-warning</span>
<span class="text-info">.text-info</span>

===
###PPT计时功能

===
###主题、动画配置

===
###主页自动设置日期

===
###MARKDOWN文件与列表分离

===
###更便于用户使用的WEB设置方式

===
###更多主题的引入

----
<!-- .slide: data-background="#41b883" -->
##开源与共享地址

源码下载。

===
###用法

===
###其它注意事项

----
<!-- .slide: data-background="#41b883" -->
#Q&A

