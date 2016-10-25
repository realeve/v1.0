var app = (function() {
	var defaultTheme = 'moon';
	var queryObj;
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = encodeURI(window.location.search).substr(1).match(reg);
		if (r !== null) return decodeURI(r[2]);
		return null;
	};
	var initDom = function() {
		const getQueryObj = () => {
			var obj = {
				file: getUrlParam('file'),
				title: decodeURI(getUrlParam('title')),
				theme: getUrlParam('theme')
			};
			if (obj.theme === null) {
				obj.theme = defaultTheme;
			}
			obj.theme = './css/theme.' + obj.theme + '.css';
			if (obj.title == 'null') {
				obj.title = decodeURI(obj.file);
			}
			obj.file = './markdown/' + obj.file + '.md';
			obj.print = window.location.search.match(/print-pdf/gi) ? '/css/print/pdf.css' : 'tools/css/print/paper.css';
			return obj;
		};

		// let node = document.getElementById('stage');
		let node = document.getElementsByTagName('section')[0];
		queryObj = getQueryObj();
		document.title = queryObj.title;
		document.getElementById('theme').setAttribute('href', queryObj.theme);
		//打印PDF
		//document.getElementById('print').setAttribute('href', queryObj.print);
		node.dataset.markdown = queryObj.file;
	};

	var appendThemeList = function() {

		var getDate = function() {
			var jsRight = function(sr, rightn) {
				return sr.substring(sr.length - rightn, sr.length);
			};
			var date = new Date();
			var a = date.getFullYear();
			var b = jsRight(('0' + (date.getMonth() + 1)), 2);
			var c = jsRight(('0' + date.getDate()), 2);
			return a + '-' + b + '-' + c;
		};

		var date = '<h3 style="margin-top:40px;">' + getDate() + '</h3>';
		if (location.href.indexOf('theme') == -1) {
			var styleList = ['dark', 'moon', 'blue', 'green', 'light'];
			styleList = styleList.map(function(item) {
				return '<a href="#" name="theme" onclick="document.getElementById(\'theme\').setAttribute(\'href\',\'./css/theme.' + item + '.css\'); return false;">' + item + '</a>';
			});
			var str = `
		    <div style="margin-top:40px; font-Size:14pt;">请选择主题: <br>
		      ${styleList.join(' - ')}
		    </div>`;
			$('section').first().append(date + str);
		} else {
			$('section').first().append(date);
		}
	};

	var slideStarted = 0;
	var isFullScreen = false;
	var clock = function() {
		var iMinute, iSecond;
		slideStarted++;
		slideStarted = slideStarted % 3600;
		iMinute = parseInt(slideStarted / 60);
		iSecond = slideStarted % 60;
		var strTime = ("0" + iMinute).substring(("0" + iMinute).length - 2) + ":" + ("0" + iSecond).substring(("0" + iSecond).length - 2);
		$("#clock").text(strTime);
	};

	var enterFullscreen = function() {

		var element = document.body;
		// Check which implementation is available
		var requestMethod = element.requestFullScreen ||
			element.webkitRequestFullscreen ||
			element.webkitRequestFullScreen ||
			element.mozRequestFullScreen ||
			element.msRequestFullscreen;
		if (requestMethod) {
			requestMethod.apply(element);
		}
	};

	var startTimer = function() {
		// if (slideStarted === 0) {
		// 	setInterval(clock, 1000);
		// }
		if (!isFullScreen) {
			enterFullscreen();
			isFullScreen = true;
		}
	};

	function openNotes() {

		// if( !notesFilePath ) {
		// 	var jsFileLocation = document.querySelector('script[src$="notes.js"]').src;  // this js file path
		// 	jsFileLocation = jsFileLocation.replace(/notes\.js(\?.*)?$/, '');   // the js folder path
		// 	notesFilePath = jsFileLocation + 'notes.html';
		// }
		var params = getUrlParam('_multiscreen');
		var notesFilePath;
		if (params === null) {
			notesFilePath = window.location.href.replace('?', '?_multiscreen=1&');
			window.location = notesFilePath; //(notesFilePath, 'Notes', 'width=1100,height=700');
			//window.open(notesFilePath, 'Notes', 'width=1100,height=600');
		} else if (params == '1') {
			notesFilePath = window.location.href.replace('_multiscreen=1', '_multiscreen=control&');
			window.open(notesFilePath, 'Notes', 'width=1100,height=600');
		}
	}

	$('body').on('keydown', function(event) {
		var keyName = event.key;
		var key = event.keyCode;
		//console.log(key + ':' + keyName);
		startTimer();
		if (key == 27) {
			isFullScreen = false;
		} else if (key == 83) {
			openNotes();
			// } else if (keyName != 'Control' &&
			// 	keyName != 'F12' &&
			// 	keyName != 'F5' &&
			// 	keyName != 'Alt') {
			// 	enterFullscreen();
		}
	});


	var fixImgFolder = function() {
		//MD文件默认图片目录
		var DEFAULT_SLIDE_IMG_CONTENT = $('section').first().attr('data-img-content') || 'markdown';
		var obj = $('section img');

		if (obj.length) {
			var imgSrc = obj.attr('src').replace('./', './' + DEFAULT_SLIDE_IMG_CONTENT + '/');
			obj.attr('src', imgSrc);
		}
	};

	var initSlide = function() {
		Slide.init({
			containerID: 'container',
			drawBoardID: 'drawBoard',
			slideClass: '.slide',
			buildClass: '.build',
			progressID: 'progress',
			transition: 'slide3',
			width: 1100,
			dir: './',
			//打开下面的注释就开启postMessage方式
			//访问网址127.0.0.1:8080/ppt/demo#client
			control: {
				type: 'postMessage',
				args: {
					isControl: true
				}
			},
			tipID: 'tip'
		});

		$('.slide.fill').append('<div style="background-color:rgba(55,68,84,.82);position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:-1;"></div>');
	};

	var initMd = function() {
		var url = $('section').first().data('markdown');
		$.get(url, function(data) {
			var json = parser(data);
			console.log(json);
			$('#container').html(json.content);
			fixImgFolder();

			hljs.tabReplace = '  ';
			hljs.initHighlightingOnLoad();

			initSlide();
		});
	};

	var init = (function() {
		initDom();
		initMd();
		//appendThemeList();
	})();

})();