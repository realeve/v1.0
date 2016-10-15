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

		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&M=3&blob=3;&ID=" + id + "&cart=" + cart;

		var testUrl;
		if (id == 309) {
			testUrl = '../topic/testData/hecha.json';
		} else if (id == 310) {
			testUrl = '../topic/testData/siyin.json';
		} else {
			testUrl = '../topic/testData/code.json';
		}

		var str = '';

		$.ajax({
				url: testUrl
			})
			.done(function(data) {
				//data = $.parseJSON(data);
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
					displayType: 'bottomToTop',
					displayTypeSpeed: 20,
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
jQuery(document).ready(function() {
	whiteBackground();
	//RoundedTheme(0);
	UIIdleTimeout.init();
	initDom();
	$(".page-sidebar-wrapper").css("margin-top", "0px");
	imageSearch.init();
});
jQuery(window).resize(function() {
	HeadFix();
});