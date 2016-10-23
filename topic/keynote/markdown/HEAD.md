# 简介

一份关于任何可以写入到你的文档中 `<head>` 部分的清单。

## 目录

- [最小推荐](#最小推荐)
- [网页元素](#网页元素)
- [Meta 标签](#meta-标签)
  - [不推荐的 Meta 标签](#不推荐的-meta-标签)
- [链接](#链接)
  - [不推荐的链接](#不推荐的链接)
  - [网站图标](#网站图标)
- [社交](#社交)
  - [Facebook / Open Graph](#facebook--open-graph)
  - [Facebook / Instant Articles](#facebook--instant-articles)
  - [Twitter](#twitter)
  - [Google+ / Schema.org](#google--schemaorg)
  - [OEmbed](#oembed)
- [浏览器 / 平台](#浏览器--平台)
  - [Apple iOS](#apple-ios)
  - [Apple Safari](#apple-safari)
  - [Google Android](#google-android)
  - [Google Chrome](#google-chrome)
  - [Google Chrome Mobile (只针对 Android)](#google-chrome-mobile只针对-android)
  - [Microsoft Internet Explorer](#microsoft-internet-explorer)
  - [Microsoft Internet Explorer: 传统，不要使用！](#microsoft-internet-explorer-传统不要使用)
- [国内的浏览器](#国内的浏览器)
  - [360 浏览器](#360-浏览器)
  - [QQ 移动浏览器](#qq-移动浏览器)
  - [UC 移动浏览器](#uc-移动浏览器)
- [应用链接](#应用链接)
- [注意](#注意)
  - [性能](#性能)
- [其他资源](#其他资源)
- [相关项目](#相关项目)
- [其他格式](#其他格式)
- [翻译](#翻译)
- [贡献](#贡献)
- [作者](#作者)
- [翻译者](#翻译者)
- [许可](#许可)

## 最小推荐

下面是基本的、最低限度的网站基本标签：

```html
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 以上 3 个 meta 标签 *必须* 放在 head 的最前面；其他任何的 head 内容必须在这些标签的 *后面* -->
<title>页面标题</title>
```

## 网页元素

``` html
<!-- 文档标题 -->
<title>页面标题</title>

<!-- 基本 URL 作用于文档中所包含的所有相对 URL -->
<base href="https://example.com/page.html">

<!-- 外部的 CSS -->
<link rel="stylesheet" href="styles.css">

<!-- 文档内的 CSS -->
<style>
  /* ... */
</style>

<!-- JavaScript -->
<script src="script.js"></script>
<noscript><!--无 JS 时的替代--></noscript>
```

## Meta 标签

``` html
<!-- 设置文档的字符编码 -->
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- 以上 3 个 meta 标签 *必须* 放在 head 的最前面；其他任何的 head 内容必须在这些标签的 *后面* -->

<!-- 允许控制资源的过度加载 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<!-- 尽早地放置在文档中 -->
<!-- 仅应用于该标签下的内容 -->

<!-- Web 应用的名称（仅当网站被用作为一个应用时才使用）-->
<meta name="application-name" content="应用名称">

<!-- 针对页面的简短描述（限制 150 字符）-->
<!-- 在*某些*情况下，该描述是被用作搜索结果展示片段的一部分 -->
<meta name="description" content="一个页面描述">

<!-- 控制搜索引擎的抓取和索引行为 -->
<meta name="robots" content="index,follow,noodp"><!-- 所有的搜索引擎 -->
<meta name="googlebot" content="index,follow"><!-- 仅对 Google 有效 -->

<!-- 告诉 Google 不显示网站链接的搜索框 -->
<meta name="google" content="nositelinkssearchbox">

<!-- 告诉 Google 不提供此页面的翻译 -->
<meta name="google" content="notranslate">

<!-- 验证 Google 搜索控制台的所有权 -->
<meta name="google-site-verification" content="verification_token">

<!-- 用来命名软件或用于构建网页（如 - WordPress、Dreamweaver）-->
<meta name="generator" content="program">

<!-- 关于你的网站主题的简短描述 -->
<meta name="subject" content="你的网站主题">

<!-- 非常简短（少于 10 个字）的描述。主要用于学术论文。-->
<meta name="abstract" content="">

<!-- 完整的域名或网址 -->
<meta name="url" content="https://example.com/">

<meta name="directory" content="submission">

<!-- 基于网站内容给出一般的年龄分级 -->
<meta name="rating" content="General">

<!-- 允许控制 referrer 信息如何传递 -->
<meta name="referrer" content="never">

<!-- 禁用自动检测和格式化可能的电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 通过设置为 “off” 完全退出 DNS 预取 -->
<meta http-equiv="x-dns-prefetch-control" content="off">

<!-- 在客户端存储 cookie，web 浏览器的客户端识别 -->
<meta http-equiv="set-cookie" content="name=value; expires=date; path=url">

<!-- 指定要显示在一个特定框架中的页面 -->
<meta http-equiv="Window-Target" content="_value">

<!-- 地理标签 -->
<meta name="ICBM" content="latitude, longitude">
<meta name="geo.position" content="latitude;longitude">
<meta name="geo.region" content="country[-state]"><!-- 国家代码 (ISO 3166-1): 强制性, 州代码 (ISO 3166-2): 可选; 如 content="US" / content="US-NY" -->
<meta name="geo.placename" content="city/town"><!-- 如 content="New York City" -->
```

- [Google 可以识别的 Meta 标签](https://support.google.com/webmasters/answer/79812?hl=zh-Hans)
- [WHATWG Wiki: Meta 拓展](https://wiki.whatwg.org/wiki/MetaExtensions)
- [ICBM - 维基百科](https://en.wikipedia.org/wiki/ICBM_address#Modern_use)
- [地理标记 - 维基百科](https://en.wikipedia.org/wiki/Geotagging#HTML_pages)

### 不推荐的 Meta 标签
以下是不推荐使用的 Meta 属性，因为它们采用率低，或已弃用：

```html
<!-- 用于声明文档语言，但支持得不是很好。最好使用 <html lang=""> -->
<meta name="language" content="en">

<!-- Google 无视 & Bing 认为垃圾的指示器 -->
<meta name="keywords" content="你,关键字,在这里,不使用空格,而用逗号进行分隔">
<!-- 目前没有在任何搜索引擎中使用过的声明 -->
<meta name="revised" content="Sunday, July 18th, 2010, 5:15 pm">

<!-- 为垃圾邮件机器人收获 email 地址提供了一种简单的方式 -->
<meta name="reply-to" content="email@example.com">

<!-- 最好使用 <link rel="author"> 或 humans.txt 文件 -->
<meta name="author" content="name, email@example.com">
<meta name="designer" content="">
<meta name="owner" content="">

<!-- 告诉搜索机器人一段时间后重新访问该网页。这不支持，因为大多数搜索引擎使用随机时间间隔来重新抓取网页 -->
<meta name="revisit-after" content="7 days">

<!-- 在一段时间后将用户重定向到新的 URL -->
<!-- W3C 建议不要使用该标签。Google 建议使用服务器端的 301 重定向。-->
<meta http-equiv="refresh" content="300; url=https://example.com/">

<!-- 描述网站的主题 -->
<meta name="topic" content="">

<!-- 公司概要或网站目的 -->
<meta name="summary" content="">

<!-- 一个已废弃的标签，和关键词 meta 标签的作用相同 -->
<meta name="classification" content="business">

<!-- 是否是相同的 URL，年代久远且不支持 -->
<meta name="identifier-URL" content="https://example.com/">

<!-- 和关键词标签类似的功能 -->
<meta name="category" content="">

<!-- 确保你的网站在所有国家和语言中都能显示 -->
<meta name="coverage" content="Worldwide">

<!-- 和 coverage 标签相同 -->
<meta name="distribution" content="Global">

<!-- 控制在互联网上哪些用户可以访问 -->
<meta http-equiv="Pics-label" content="value"> 

<!-- 缓存控制 -->
<!-- 最好在服务器端配置缓存控制 -->
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
```

## 链接

``` html
<!-- 有助于防止出现内容重复的问题 -->
<link rel="canonical" href="https://example.com/2010/06/9-things-to-do-before-entering-social-media.html">

<!-- 之前用于包含 icon 链接，但已被废弃并不再使用 -->
<link rel="shortlink" href="https://example.com/?p=42">

<!-- 链接到当前文档的一个 AMP HTML 版本 -->
<link rel="amphtml" href="https://example.com/path/to/amp-version.html">

<!-- 表明一个 CSS 样式表 -->
<link rel="stylesheet" href="https://example.com/styles.css">

<!-- 链接到一个指定 Web 应用程序“安装”证书的 JSON 文件 -->
<link rel="manifest" href="manifest.json">

<!-- 链接到文档的作者 -->
<link rel="author" href="humans.txt">

<!-- 指向一个适用于链接内容的版权申明 -->
<link rel="copyright" href="copyright.html">

<!-- 给出可能的你的另一种语言的文档位置参考 -->
<link rel="alternate" href="https://es.example.com/" hreflang="es">

<!-- 提供了关于作者或其他人的信息 -->
<link rel="me" href="https://google.com/profiles/thenextweb" type="text/html">
<link rel="me" href="mailto:name@example.com">
<link rel="me" href="sms:+15035550125">

<!-- 链接到一个文档，包含当前文档的一个归档链接 -->
<link rel="archives" href="https://example.com/2003/05/" title="May 2003">

<!-- 链接到层次结构中的顶级资源 -->
<link rel="index" href="https://example.com/" title="DeWitt Clinton">

<!-- 给出该文档的起点 -->
<link rel="start" href="https://example.com/photos/pattern_recognition_1_about/" title="Pattern Recognition 1">

<!-- 引导当前文档的前述资源序列 -->
<link rel="prev" href="https://example.com/opensearch/opensearch-and-openid-a-sure-way-to-get-my-attention/" title="OpenSearch and OpenID? A sure way to get my attention.">

<!-- 给出一个自我参考 - 当文档有多个可能的参考时非常有用 -->
<link rel="self" type="application/atom+xml" href="https://example.com/atomFeed.php?page=3">

<!-- 分别是在一系列文件中的第一个、下一个、上一个和最后一个 -->
<link rel="first" href="https://example.com/atomFeed.php">
<link rel="next" href="https://example.com/atomFeed.php?page=4">
<link rel="previous" href="https://example.com/atomFeed.php?page=2">
<link rel="last" href="https://example.com/atomFeed.php?page=147">

<!-- 当使用第三方服务来维护 blog 时使用 -->
<link rel="EditURI" href="https://example.com/xmlrpc.php?rsd" type="application/rsd+xml" title="RSD">

<!-- 当另一个 WordPress 博客链接到你的 WordPress 博客或文章时形成一个自动化的评论 -->
<link rel="pingback" href="https://example.com/xmlrpc.php">

<!-- 当你在自己的页面上链接到一个 url 时通知它 -->
<link rel="webmention" href="https://example.com/webmention">

<!-- 加载一个外部的 HTML 文件到当前 HTML 文件中 -->
<link rel="import" href="component.html">

<!-- 打开搜索 -->
<link rel="search" href="/open-search.xml" type="application/opensearchdescription+xml" title="Search Title">

<!-- Feeds -->
<link rel="alternate" href="https://feeds.feedburner.com/example" type="application/rss+xml" title="RSS">
<link rel="alternate" href="https://example.com/feed.atom" type="application/atom+xml" title="Atom 0.3">

<!-- 预取，预载，预浏览 -->
<link rel="dns-prefetch" href="//example.com/">
<link rel="preconnect" href="https://www.example.com/">
<link rel="prefetch" href="https://www.example.com/">
<link rel="prerender" href="https://example.com/">
<link rel="preload" href="image.png" as="image">
<!-- 更多信息：https://css-tricks.com/prefetching-preloading-prebrowsing/ -->
```

### 不推荐的链接
以下是不推荐使用的链接关系：

```html
<link rel="shortcut icon" href="path/to/favicon.ico">

<!-- 没有用的, 专有的和错误的, 详见 https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Y_2eFRh9BOs/gULYapoRBwAJ -->
<link rel="subresource" href="styles.css">
```

### 网站图标

``` html
<!-- 对于 IE10 及以下 -->
<!-- 无链接，只需在根目录下放置名为 favicon.ico 的文件 -->

<!-- 对于 IE 11、Chrome、Firefox、Safari 和 Opera -->
<link rel="icon" href="path/to/favicon-16.png" sizes="16x16" type="image/png">
<link rel="icon" href="path/to/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="path/to/favicon-48.png" sizes="48x48" type="image/png">
<link rel="icon" href="path/to/favicon-62.png" sizes="62x62" type="image/png">
<link rel="icon" href="path/to/favicon-192.png" sizes="192x192" type="image/png">
<!-- 更多信息: https://bitsofco.de/all-about-favicons-and-touch-icons/ -->
```

- [所有关于网站图标（和触摸图标）的信息](https://bitsofco.de/all-about-favicons-and-touch-icons/)
- [网站图标对照表](https://github.com/audreyr/favicon-cheat-sheet)

## 社交

### Facebook / Open Graph

``` html
<meta property="fb:app_id" content="123456789">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:type" content="website">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<meta property="article:author" content="">
<!-- Facebook: https://developers.facebook.com/docs/sharing/webmasters#markup -->
<!-- Open Graph: http://ogp.me/ -->
```

- [Facebook 的 Open Graph 的标记](https://developers.facebook.com/docs/sharing/webmasters#markup)
- [Open Graph 协议](http://ogp.me/)

### Facebook / Instant Articles

``` html
<meta charset="utf-8">
<meta property="op:markup_version" content="v1.0">

<!-- 你的文章的 Web 版网址 -->
<link rel="canonical" href="http://example.com/article.html">

<!-- 用于该文章的样式 -->
<meta property="fb:article_style" content="myarticlestyle">
```

- [Facebook Instant Articles: 创建文章](https://developers.facebook.com/docs/instant-articles/guides/articlecreate)
- [Instant Articles: 格式参考](https://developers.facebook.com/docs/instant-articles/reference)

### Twitter

``` html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="https://example.com/page.html">
<meta name="twitter:title" content="Content Title">
<meta name="twitter:description" content="Content description less than 200 characters">
<meta name="twitter:image" content="https://example.com/image.jpg">
<!-- 更多信息: https://dev.twitter.com/cards/getting-started -->
<!-- 验证: https://dev.twitter.com/docs/cards/validation/validator -->
```

- [Twitter 名片：入门指南](https://dev.twitter.com/cards/getting-started)
- [Twitter 名片验证](https://dev.twitter.com/docs/cards/validation/validator)

### Google+ / Schema.org

``` html
<link href="https://plus.google.com/+YourPage" rel="publisher">
<meta itemprop="name" content="内容标题">
<meta itemprop="description" content="内容描述少于 200 个字符">
<meta itemprop="image" content="https://example.com/image.jpg">
```

### OEmbed

``` html
<link rel="alternate" type="application/json+oembed"
  href="http://example.com/services/oembed?url=http%3A%2F%2Fexample.com%2Ffoo%2F&amp;format=json"
  title="oEmbed Profile: JSON">
<link rel="alternate" type="text/xml+oembed"
  href="http://example.com/services/oembed?url=http%3A%2F%2Fexample.com%2Ffoo%2F&amp;format=xml"
  title="oEmbed Profile: XML">
```

- [oEmbed 格式](http://oembed.com/)

## 浏览器 / 平台

### Apple iOS

``` html
<!-- 智能应用 Banner -->
<meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">

<!-- 禁用自动检测和格式化可能的电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 添加到主屏幕 -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="应用标题">

<!-- 触摸图标 -->
<link rel="apple-touch-icon" href="path/to/apple-touch-icon.png">
<link rel="apple-touch-icon-precomposed" href="path/to/apple-touch-icon-precomposed.png">
<!-- iOS 8+ 不再支持预组合，你应该只使用 apple-touch-icon。-->
<!-- 在大多数情况下，在 `<head>` 中，一个 180×180px 触摸图标就已经足够了 -->
<!-- 如果你想采用自适应的图标，可以设置多个尺寸的图标 -->
<link rel="apple-touch-icon" sizes="57x57" href="/path/to/icon@57.png">
<link rel="apple-touch-icon" sizes="72x72" href="/path/to/icon@72.png">
<link rel="apple-touch-icon" sizes="114x114" href="/path/to/icon@114.png">
<link rel="apple-touch-icon" sizes="144x144" href="//path/to/icon@144.png">

<!-- 启动画面（已无效） -->
<link rel="apple-touch-startup-image" href="path/to/startup.png">

<!-- iOS 应用深层链接 -->
<meta name="apple-itunes-app" content="app-id=APP-ID, app-argument=http/url-sample.com">
<link rel="alternate" href="ios-app://APP-ID/http/url-sample.com">
```

- [Apple Meta 标签](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

### Apple Safari

```html
<!-- 固定网站 -->
<link rel="mask-icon" href="path/to/icon.svg" color="red">
```

### Google Android

``` html
<meta name="theme-color" content="#E64545">

<!-- 添加到主屏幕 -->
<meta name="mobile-web-app-capable" content="yes">
<!-- 更多信息：https://developer.chrome.com/multidevice/android/installtohomescreen -->
```

### Google Chrome

``` html
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/APP_ID">

<!-- 禁用翻译提示 -->
<meta name="google" value="notranslate">
```

### Google Chrome Mobile (只针对 Android)

从 Chrome 31 开始，你可以设置你的 Web 应用为“app mode”，如 Safari。

``` html
<!-- 链接到一个 manifest 并定义 manifest 的元数据。-->
<!-- manifest.json 中的例子也可以通过以下链接找到。-->
<link rel="manifest" href="manifest.json">

<!-- 定义你的网页为 Web 应用 -->
<meta name="mobile-web-app-capable" content="yes">

<!-- 第一个是官方推荐格式。-->
<link rel="icon" sizes="192x192" href="nice-highres.png">
<link rel="icon" sizes="128x128" href="niceicon.png">
<!-- 所有带 apple 前缀的格式已废弃，所以不要使用它们。-->
<link rel="apple-touch-icon" sizes="128x128" href="niceicon.png">
<link rel="apple-touch-icon-precomposed" sizes="128x128" href="niceicon.png">
```

- [Google 开发者](https://developer.chrome.com/multidevice/android/installtohomescreen)

### Microsoft Internet Explorer

``` html
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta http-equiv="cleartype" content="on">
<meta name="skype_toolbar" content="skype_toolbar_parser_compatible">

<!-- 在 Windows Phone 中的 IE 10 上禁用链接高亮 (https://blogs.windows.com/buildingapps/2012/11/15/adapting-your-webkit-optimized-site-for-internet-explorer-10/) -->
<meta name="msapplication-tap-highlight" content="no">

<!-- 固定网站 (https://msdn.microsoft.com/en-us/library/dn255024(v=vs.85).aspx) -->
<meta name="application-name" content="Contoso Pinned Site Caption">
<meta name="msapplication-tooltip" content="Example Tooltip Text">
<meta name="msapplication-starturl" content="/">

<meta name="msapplication-config" content="http://example.com/browserconfig.xml">

<meta name="msapplication-allowDomainApiCalls" content="true">
<meta name="msapplication-allowDomainMetaTags" content="true">
<meta name="msapplication-badge" content="frequency=30; polling-uri=http://example.com/id45453245/polling.xml">
<meta name="msapplication-navbutton-color" content="#FF3300">
<meta name="msapplication-notification" content="frequency=60;polling-uri=http://example.com/livetile">
<meta name="msapplication-square150x150logo" content="path/to/logo.png">
<meta name="msapplication-square310x310logo" content="path/to/largelogo.png">
<meta name="msapplication-square70x70logo" content="path/to/tinylogo.png">
<meta name="msapplication-wide310x150logo" content="path/to/widelogo.png">
<meta name="msapplication-task" content="name=Check Order Status;action-uri=./orderStatus.aspx?src=IE9;icon-uri=./favicon.ico">
<meta name="msapplication-task-separator" content="1">
<meta name="msapplication-TileColor" content="#FF3300">
<meta name="msapplication-TileImage" content="path/to/tileimage.jpg">
<meta name="msapplication-window" content="width=1024;height=768">
```

### Microsoft Internet Explorer: 传统，不要使用！

``` html
<!-- 在 IE 6 中，鼠标悬停在图片上时禁用图像工具栏 (https://msdn.microsoft.com/en-us/library/ms532986(v=vs.85).aspx) -->
<meta http-equiv="imagetoolbar" content="no">

<!-- 禁用 Windows 主题化的输入框/按钮 (https://support.microsoft.com/en-us/kb/322240) -->
<meta name="MSThemeCompatible" content="no">

<!-- 禁用只在 IE 6 测试版中出现的一个功能 (https://stackoverflow.com/q/2167301) -->
<meta name="MSSmartTagsPreventParsing" content="true">

<!-- 页间切换 (https://msdn.microsoft.com/en-us/library/ms532847(v=vs.85).aspx) -->
<meta http-equiv="Page-Enter" content="revealtrans(duration=2,transition=2)">
<meta http-equiv="Page-Exit" content="revealtrans(duration=3,transition=12)">
<meta http-equiv="Site-Enter" content="revealtrans(duration=2,transition=2)">
<meta http-equiv="Site-Exit" content="revealtrans(duration=3,transition=12)">
```

## 应用链接

``` html
<!-- iOS -->
<meta property="al:ios:url" content="applinks://docs">
<meta property="al:ios:app_store_id" content="12345">
<meta property="al:ios:app_name" content="App Links">
<!-- Android -->
<meta property="al:android:url" content="applinks://docs">
<meta property="al:android:app_name" content="App Links">
<meta property="al:android:package" content="org.applinks">
<!-- Web 回退 -->
<meta property="al:web:url" content="http://applinks.org/documentation">
<!-- 更多信息：http://applinks.org/documentation/ -->
```

- [应用链接文档](http://applinks.org/documentation/)

## 国内的浏览器

### 360 浏览器

``` html
<!-- 选择渲染引擎 -->
<meta name="renderer" content="webkit|ie-comp|ie-stand">
```

### QQ 移动浏览器

``` html
<!-- 在指定方向上锁定屏幕（锁定横/竖屏） -->
<meta name="x5-orientation" content="landscape/portrait">
<!-- 全屏显示此页面 -->
<meta name="x5-fullscreen" content="true">
<!-- 页面将以“应用模式”显示（全屏等）-->
<meta name="x5-page-mode" content="app">
```

### UC 移动浏览器

``` html
<!-- 在指定方向上锁定屏幕（锁定横/竖屏） -->
<meta name="screen-orientation" content="landscape/portrait">
<!-- 全屏显示此页面 -->
<meta name="full-screen" content="yes">
<!-- 即使在“文本模式”下，UC 浏览器也会显示图片 -->
<meta name="imagemode" content="force">
<!-- 页面将以“应用模式”显示（全屏、禁止手势等） -->
<meta name="browsermode" content="application">
<!-- 在此页面禁用 UC 浏览器的“夜间模式” -->
<meta name="nightmode" content="disable">
<!-- 简化页面，减少数据传输 -->
<meta name="layoutmode" content="fitscreen">
<!-- 禁用的 UC 浏览器的功能，“当此页面中有较多文本时缩放字体” -->
<meta name="wap-font-scale" content="no">
```

- [UC 浏览器文档](http://www.uc.cn/download/UCBrowser_U3_API.doc)

## 注意

### 性能
当启用 GZIP 时，移动 `href` 属性到该元素的开头以提高压缩，因为 `href` 属性被用于 `a`、`base` 和 `link` 标签。

示例:

``` html
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
```

## 其他资源

- [HTML5 样板文档：HTML 标签](https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/html.md)
- [HTML5 样板文档：扩展和定制](https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/extend.md)

## 相关项目

- [Atom HTML Head 片段](https://github.com/joshbuchea/atom-html-head-snippets) - Atom `HEAD` 片段包
- [Sublime Text HTML Head 片段](https://github.com/marcobiedermann/sublime-head-snippets) - Sublime Text `HEAD` 片段包
- [head-it](https://github.com/hemanth/head-it) - `HEAD` 片段的 CLI 接口
- [vue-head](https://github.com/ktquez/vue-head) - 在 Vue.js 中操作 `HEAD` 标签的 meta 信息

## 其他格式

- [PDF](https://gitprint.com/joshbuchea/HEAD/blob/master/README.md)

## 翻译

- [英语](https://github.com/joshbuchea/HEAD)
- [巴西葡萄牙语](https://github.com/Webschool-io/HEAD)
- [日语](http://coliss.com/articles/build-websites/operation/work/collection-of-html-head-elements.html)
- [俄罗斯语](https://github.com/Konfuze/HEAD)

## 贡献

开启一个 issue 或一个 pull 请求来提出修改或补充。

请按照下列步骤 pull 请求：

- 只修改一个标签，或一次一组相关的标签
- 对属性使用双引号
- 请不要在自我闭合的元素中使用斜线 —— 即便 HTML5 规范中说，他们是可选的
- 考虑在文档中加入链接以支持你所提到的变化

### 贡献者

列出所有超级棒的 [贡献者们](https://github.com/joshbuchea/HEAD/graphs/contributors).

## 作者

**[Josh Buchea](http://joshbuchea.com/)**

## 翻译者

**[子丶言](http://xiangfa.org/)**

## 协议

[CC0 协议](LICENSE)

![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")