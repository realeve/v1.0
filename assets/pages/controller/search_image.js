var imageSearch = function() {

	var isInited = false;
	var cart;
	//modern browsers
	$(window).bind('hashchange', function() {
		initData();
	});

	function initData() {
		cart = window.location.hash.replace('#', '');
		var type = judgeSearchType(cart);
		if (cart == '') {
			$('#js-grid-juicy-projects').addClass('cbp-ready').append('<div class="cbp-search-nothing"><h3>请在顶栏搜索框输入车号信息</h3></div>');
			return;
		}
		switch (type) {
			case config.search.REEL:
				window.location.href = '/search/paper#' + cart;
				break;
			case config.search.CART:
				handleImgList(cart);
				break;
			default:
				bsTips('请输入有效的车号信息');
				showPanel = true;
				break;
		}
	}

	var loadNums = {};

	var handleImgList = function() {

		loadNums = {
			cur: 0,
			total: 2,
			noData: true
		};

		$('#js-grid-juicy-projects').html('');

		//票面
		setImgDom(309, "banknote");

		//丝印
		if (cart.substring(3, 2) == '8') {
			setImgDom(310, "screen");
			loadNums.total = 3;
		}

		//号码
		setImgDom(311, "code");
	};


	//号码接口312需调整为 相机、开位、印码号、图像
	var setImgDom = function(id, type) {

		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&M=3&blob=3;&ID=" + id + "&cache=14400&cart=" + cart;

		// if (id == 309) {
		// 	url = '../topic/testData/hecha.json';
		// } else if (id == 310) {
		// 	url = '../topic/testData/siyin.json';
		// } else {
		// 	url = '../topic/testData/code.json';
		// }

		var str = '';

		$.ajax({
				url: url
			})
			.done(function(data) {
				data = $.parseJSON(data);
				loadNums.cur++;
				if (data.rows > 0) {
					loadNums.noData = false;
					data.type = type;
					str = tpl.getHTML('image/fakeimg.etpl', data);
					$('#js-grid-juicy-projects').append(str);
				}

				if (loadNums.cur == loadNums.total) {
					if (loadNums.noData) {
						$('#js-grid-juicy-projects').addClass('cbp-ready').append('<div class="cbp-search-nothing"><h3>当前时间内无相关信息</h3></div>');
					} else {
						initImg();
					}
				}

			});
	};

	var initImg = function() {
		// init cubeportfolio
		var initCubeportfolio = function() {
			$('#js-grid-juicy-projects').cubeportfolio({
					filters: '#js-filters-juicy-projects,#js-filters-juicy-projects2',
					//loadMore: '#js-loadMore-juicy-projects',
					search: '#js-search-blog-posts',
					//loadMoreAction: 'click',
					layoutMode: 'grid',
					defaultFilter: '*', //'.banknote',
					animationType: 'quicksand',
					gapHorizontal: 35,
					gapVertical: 30,

					// animationType: 'slideDelay',
					// gapHorizontal: 20,
					// gapVertical: 20,

					gridAdjustment: 'responsive',
					mediaQueries: [{
						width: 1500,
						cols: 7
					}, {
						width: 1100,
						cols: 6
					}, {
						width: 800,
						cols: 5
					}, {
						width: 480,
						cols: 3
					}, {
						width: 320,
						cols: 2
					}],
					caption: 'overlayBottomAlong', //'overlayBottomReveal',
					displayType: 'default', //'bottomToTop',
					//displayTypeSpeed: 0,
					//sortToPreventGaps: true,

					// lightbox
					lightboxDelegate: '.cbp-lightbox',
					lightboxGallery: true,
					lightboxTitleSrc: 'data-title',
					lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
					singlePageDelegate: null
				},
				function() {
					bsTips('数据渲染完毕', 1);
				});
		};

		if (isInited) {
			$('#js-grid-juicy-projects').cubeportfolio('destroy', initCubeportfolio);
		} else {
			initCubeportfolio();
		}

		isInited = true;
	};

	function downZipFile(zipName) {
		var zip = new JSZip();
		zip.file("README.txt", "这是一个由质量信息系统自动生成的图像压缩包");
		var $imgList = $('a.cbp-lightbox');
		$imgList.map(function(i, img) {
			var $img = $(img);
			var title = $img.data('title').split('<br>');
			var name = [];
			name.push(title[1].replace(/\W/g, '') + 'K');
			name.push(title[0].replace(/\W/g, ''));
			name.push('cam' + title[2].replace(/\W/g, ''));
			var filename = name.join('_') + '.jpg';
			var imgData = $img.attr('href').split('data:image/jpg;base64,')[1];
			zip.file(filename, imgData, {
				base64: true
			});
		});

		zip.generateAsync({
			type: "blob"
		}).then(function(content) {
			// see FileSaver.js
			saveAs(content, zipName + ".zip");
		});
	}

	$('#download').on('click', function() {
		downZipFile(cart);
	});

	return {
		//main function to initiate the module
		init: function() {
			hideSidebarTool();
			var tplList = [
				"image/fakeimg.etpl"
			];
			tpl.init(tplList, initData);
		}

	};
}();
//记录选择状态
$(document).ready(function() {
	whiteBackground();
	//RoundedTheme(0);
	UIIdleTimeout.init();
	initDom(0);
	imageSearch.init();
});