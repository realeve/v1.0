var feedback = function() {
	//保存本地设置
	var searchFeedBack = {};
	var isInited = false;
	var initSelectData = function() {

		// var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=35&M=3";
		// var Data = ReadData(str);
		// InitSelect("prodType", Data);
		// $('[name=prodType] option').first().text('所有品种');

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=36&M=3&p=2";
		$.ajax({
				url: str
			})
			.done(function(data) {
				data = handleAjaxData(data);
				InitSelect("machineID", data);
				$('[name=machineID] option').first().text('所有机台');
			});

		for (var i = 100; i > 0; i -= 10) {
			$('#limit').append('<option value=' + i + '>' + i + '</option>');
		}
		var searchFeedBack = {
			machineID: -1,
			limit: 70
		};
		if (typeof localStorage.searchFeedBack != 'undefined') {
			//保存搜索反馈设置项
			searchFeedBack = $.parseJSON(localStorage.searchFeedBack);
			//$('[name=prodType]').val(searchFeedBack.prodType);
			$('[name=machineID]').val(searchFeedBack.machineID);
			//$('#dataType').val(searchFeedBack.dataType);
			$('#limit').val(searchFeedBack.limit);
			//$('#fakeType').val(searchFeedBack.fakeType);
		} else {
			localStorage.searchFeedBack = JSON.stringify(searchFeedBack);
			$('#limit').val(70);
			$('[name=machineID]').val(-1);
		}

		getImgList(searchFeedBack);
	};

	var getSearchSettings = function() {
		return {
			//prodType: $('[name=prodType]').val(),
			machineID: $('[name=machineID]').val(),
			//dataType: $('#dataType').val(),
			limit: $('#limit').val(),
			//fakeType: $('#fakeType').val()
		};
	};

	var saveSettings = function() {

		searchFeedBack = getSearchSettings();

		localStorage.searchFeedBack = JSON.stringify(searchFeedBack);
	};

	$('#saveSettings').on('click', function() {
		saveSettings();
		$('.page-quick-sidebar-toggler').click();
	});



	//缺陷图像查询
	// select a.id,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3
	// from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID
	// where ProduceDate between 20160901 and 20160930 and GoodRate<=80

	//apiID 279 limit
	//select a.id,nocheckcount,errpiccount,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3  from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID  where ProduceDate between ? and ? and GoodRate<=?
	//apiID 280  limit mid
	//select a.id,nocheckcount,errpiccount,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3  from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID  where ProduceDate between ? and ? and GoodRate<=? and b.MachineID = ?
	var getQueryUrl = function(settings) {
		var params = '&ID=';
		if (settings.machineID == -1) {
			//所有机台
			params += 279;
		} else {
			//指定机台
			params += '280&mid=' + settings.machineID;
		}
		return params;
	};

	var getImgList = function(searchFeedBack) {

		searchFeedBack = searchFeedBack || getSearchSettings();

		var date = getDateRange();
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&M=0&tstart=" + date.start + "&tend=" + date.end + '&limit=' + searchFeedBack.limit; // + '&faketype=' + searchFeedBack.fakeType; // + "&t=" + Math.random();
		strUrl += getQueryUrl(searchFeedBack);
		var data = ReadData(strUrl);
		renderImgList(data);
	};

	var renderImgList = function(fakeList) {
		var fakeType = [{
			class: '',
			filter: 'none'
		}, {
			class: 'badge-info',
			filter: 'notfake'
		}, {
			class: 'badge-danger',
			filter: 'fake'
		}];

		//254 缺陷图像读取
		//	SELECT ErrImage1,ErrImage2,ErrImage3 FROM ImageData where MahouID=?
		//	 图像缓存10天
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&cache=14400&M=3&t=";
		$('#js-grid-juicy-projects').html('');
		var strTemp = '';

		function listener() {
			if (sum == fakeList.rows) {
				bsTips('图像数据载入完毕,共载入数据' + fakeList.rows + '车', 1);
				$('#js-grid-juicy-projects').html(strCache);
				initImg();
			}
		}

		if (fakeList.rows > 0) {
			var sum = 0;
			var strCache = '';
			fakeList.data.map(function(data, curPos) {
				var url = strUrl + data.id;
				$.ajax({
						url: url
					})
					.done(function(obj) {
						obj = handleAjaxData(obj);

						var img = obj.data[0];

						for (var i = 1; i <= 3; i++) {
							if (img[i - 1] == 'AA==') {
								continue;
							}
							var imgType = parseInt(data['ImgVerify' + i], 10);
							imgType = imgType > 2 ? 2 : imgType;
							var domData = {
								ProductName: data.ProductName,
								filter: fakeType[imgType].filter,
								img: 'data:image/jpg;base64,' + img[i - 1],
								CartNumber: data.CartNumber,
								MachineName: data.MachineName,
								GoodRate: data.GoodRate,
								FormatPos: data["FormatPos" + i],
								imgType: fakeType[imgType].class,
								ErrCount: data["ErrCount" + i]
							};

							strCache += tpl.getHTML('feedback/imgitem.etpl', domData);
						}
						sum++;
						listener();
					});
			});

		} else {
			$('#js-grid-juicy-projects').addClass('cbp-ready').append('<div class="cbp-search-nothing">当前时间内无相关信息</div>');
			//bsTips('当前时间无数据', 1);
		}

	};

	var singlePage = (function() {


		// function updateImgInfo(id) {
		// 	var url = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&cache=14400&M=3&t=" + id;
		// 	$.ajax({
		// 			url: url
		// 		})
		// 		.done(function(data) {
		// 			data = jQuery.parseJSON(data);
		// 			data.data[0].map(function(elem, i) {
		// 				var img = elem == ('AA==') ? '../assets/global/img/none.png' : 'data:image/jpg;base64,' + elem;
		// 				$('.cbp-popup-wrap [name="img' + i + '"]').attr('src', img);
		// 			});
		// 		});
		// }

		function renderDetail(cart) {
			//291
			//车号详情
			//cart
			//SELECT a.id, nocheckcount, errpiccount, CartNumber, b.MachineName, c.ProductName, ProduceDate, GoodRate, FormatPos1, ErrCount1, ImgVerify1, FormatPos2, ErrCount2, ImgVerify2, FormatPos3, ErrCount3, ImgVerify3 FROM MaHouData a INNER JOIN MachineData b ON a.MachineID = b.MachineID INNER JOIN ProductData c ON a.ProductTypeID = c.ProductID WHERE a.CartNumber = ?
			//
			url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=291&M=0&cart=" + cart;
			var data = ReadData(url);
			var fakeType = ['', 'badge-info', 'badge-danger'];
			var renderData = data.data[0];
			renderData.imglist = [];

			for (var i = 1; i <= 3; i++) {
				var imgType = parseInt(renderData['ImgVerify' + i], 10);
				imgType = imgType > 2 ? 2 : imgType;
				renderData.imglist.push({
					formatPos: renderData['FormatPos' + i],
					errCount: renderData['ErrCount' + i],
					verify: fakeType[imgType]
				});
			}

			return {
				id: data.data[0].id,
				html: tpl.getHTML('feedback/detail.etpl', renderData)
			};
		}

		function renderProdInfo(id) {
			//mid
			//281
			//SELECT procName,MachineName,CaptainName,convert(varchar,StartDate,120) as startDate,WorkInfo FROM  CartInfoData where MahouID =
			url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=281&M=3&mid=" + id;
			$.ajax(url).done(function(data) {
				data = handleAjaxData(data);
				tpl.render('feedback/prodinfo.etpl', data, $('[name="prodInfo"]'));
			});
		}

		function updateSinglePage(html, t) {
			t.content.html(html);
			t.content.addClass('cbp-popup-content').removeClass('cbp-popup-content-basic');
			t.wrap.addClass('cbp-popup-ready');
			t.wrap.removeClass('cbp-popup-loading');
		}

		function renderHisQua(cart) {
			var chartData = {
				xAxis: [],
				yAxis: []
			};

			//当天生产的其它产品
			//282
			//select a.id,a.CartNumber,GoodRate,FormatPos1,ErrCount1,ImgVerify1 from MaHouData a INNER JOIN (SELECT ProduceDate,MachineID FROM MaHouData where CartNumber = '1620C217') b on a.MachineID = b.MachineID and a.ProduceDate = b.ProduceDate order by a.id
			var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=282&M=3&cart=" + cart;
			$.ajax({
					url: url
				})
				.done(function(data) {
					var cartList = handleAjaxData(data);

					tpl.render('feedback/hislist.etpl', cartList, $('[name="hislist"]'));

					cartList.data.map(function(elem) {

						renderHisImg(elem[0], elem[1] == cart);

						chartData.xAxis.push(elem[1]);
						chartData.yAxis.push(elem[2]);
						chartData.type = 'line';
					});

					var ec = echarts.init(document.getElementById("chart"));
					var option = getSimpleEChart(chartData);
					ec.setOption(option);

				});
		}

		function getImg(i, data) {
			var img = data.data[0][i];

			if (img == 'AA==') {
				img = '../assets/global/img/none.png';
			} else {
				img = 'data:image/jpg;base64,' + img;
			}
			return img;
		}

		function renderHisImg(id, isCurCart) {
			//图像缓存10天
			var imgUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&cache=14400&M=3&t=" + id;
			$.ajax({
					url: imgUrl
				})
				.done(function(data) {
					data = $.parseJSON(data);

					var img = getImg(0, data);

					$('.cbp-popup-wrap [name="hisImg' + id + '"]').attr('src', img);

					if (isCurCart) {
						$('.cbp-popup-wrap [name="img' + id + '_0"]').attr('src', img);
						$('.cbp-popup-wrap [name="img' + id + '_1"]').attr('src', getImg(1, data));
						$('.cbp-popup-wrap [name="img' + id + '_2"]').attr('src', getImg(2, data));
					}

				});
		}

		return {
			//updateImgInfo: updateImgInfo,
			renderProdInfo: renderProdInfo,
			renderDetail: renderDetail,
			renderHisQua: renderHisQua,
			render: updateSinglePage
		};
	})();

	var initImg = function() {
		// init cubeportfolio
		var initCubeportfolio = function() {

			$('#js-grid-juicy-projects').cubeportfolio({
					filters: '#js-filters-juicy-projects,#js-filters-juicy-projects2',
					//loadMore: '#js-loadMore-juicy-projects',
					search: '#js-search-blog-posts',
					//loadMoreAction: 'click',
					layoutMode: 'grid',
					defaultFilter: '*',
					animationType: 'quicksand',
					gapHorizontal: 35,
					gapVertical: 30,
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
					caption: 'overlayBottomReveal', //'overlayBottomReveal',
					displayType: 'sequentially',
					displayTypeSpeed: 20,
					//sortToPreventGaps: true,

					// lightbox
					lightboxDelegate: '.cbp-lightbox',
					lightboxGallery: true,
					lightboxTitleSrc: 'data-title',
					lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

					//singlePage popup
					singlePageDelegate: '.cbp-singlePage',
					singlePageDeeplinking: true,
					singlePageStickyNavigation: true,
					singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
					singlePageCallback: function(url, element) {
						// to update singlePage content use the following method: this.updateSinglePage(yourContent)
						var t = this;
						var detail = singlePage.renderDetail(url);

						//t.updateSinglePage(detail.html);

						singlePage.render(detail.html, t);

						singlePage.renderProdInfo(detail.id);

						singlePage.renderHisQua(url);
					}
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

			var tplList = [
				'feedback/imgitem.etpl',
				'feedback/detail.etpl',
				"feedback/prodinfo.etpl",
				"feedback/hislist.etpl"
			];

			tpl.init(tplList, initSelectData);

			//$('.theme-panel').addClass('hidden');
			$(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
				getImgList();
			});
		}

	};
}();
//记录选择状态
jQuery(document).ready(function() {
	whiteBackground();
	//RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	feedback.init();
});
jQuery(window).resize(function() {
	HeadFix();
});