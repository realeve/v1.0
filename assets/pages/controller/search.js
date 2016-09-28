var feedback = function() {
	//保存本地设置
	var searchFeedBack = {};
	var isInited = false;
	var initSelectData = function() {

		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=35&M=3";
		var Data = ReadData(str);
		InitSelect("prodType", Data);
		$('[name=prodType] option').first().text('所有品种');

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=36&M=3&p=2";
		Data = ReadData(str);
		InitSelect("machineID", Data);
		$('[name=machineID] option').first().text('所有机台');

		for (var i = 100; i > 0; i -= 10) {
			$('#limit').append('<option value=' + i + '>' + i + '</option>');
		}

		if (typeof localStorage.searchFeedBack != 'undefined') {
			//保存搜索反馈设置项
			searchFeedBack = $.parseJSON(localStorage.searchFeedBack);
			//$('[name=prodType]').val(searchFeedBack.prodType);
			$('[name=machineID]').val(searchFeedBack.machineID);
			//$('#dataType').val(searchFeedBack.dataType);
			$('#limit').val(searchFeedBack.limit);
			//$('#fakeType').val(searchFeedBack.fakeType);
		} else {
			$('#limit').val(70);
			$('[name=machineID]').val(-1);
		}

		getImgList();
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
	//select a.id,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3  from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID  where ProduceDate between ? and ? and GoodRate<=?

	//apiID 280  limit mid
	//select a.id,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3  from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID  where ProduceDate between ? and ? and GoodRate<=? and b.MachineID = ?
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

	var getImgList = function() {
		var date = getDateRange();
		searchFeedBack = getSearchSettings();
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&M=0&tstart=" + date.start + "&tend=" + date.end + '&limit=' + searchFeedBack.limit + '&faketype=' + searchFeedBack.fakeType + "&t=" + Math.random();
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
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&M=3&t=";
		$('#js-grid-juicy-projects').html('');
		var strTemp = '';
		if (fakeList.rows > 0) {
			fakeList.data.map(function(data, curPos) {
				var url = strUrl + data.id;
				var obj = ReadData(url);
				var img = obj.data[0];
				for (var i = 1; i <= 3; i++) {
					var imgType = parseInt(data['ImgVerify' + i], 10);
					imgType = imgType > 2 ? 2 : imgType;
					var str = '<div class="cbp-item ' + data.ProductName + ' ' + fakeType[imgType].filter + '">' +
						'  <div class="cbp-caption">' +
						'      <div class="cbp-caption-defaultWrap">' +
						'          <img src="data:image/jpg;base64,' + img[i - 1] + '" alt=""> </div>' +
						'      <div class="cbp-caption-activeWrap">' +
						'          <div class="cbp-l-caption-alignCenter">' +
						'              <div class="cbp-l-caption-body">' + //class="cbp-singlePage cbp-s-caption-buttonLeft btn red uppercase" class="cbp-caption cbp-singlePageInline"
						'                  <a href="../assets/global/plugins/cubeportfolio/ajax/project3.html" class="cbp-singlePage cbp-s-caption-buttonLeft btn red uppercase"  rel="nofollow">查看详情</a>' +
						'                  <a href="data:image/jpg;base64,' + img[i - 1] + '" class="cbp-lightbox cbp-s-caption-buttonRight btn red uppercase" data-title="' + data.CartNumber + '<br>' + data.MachineName + '<br>好品率：' + data.GoodRate + '%">查看大图</a>' +
						'              </div>' +
						'          </div>' +
						'      </div>' +
						'  </div>' +
						'  <div class="cbp-l-grid-agency-title uppercase text-center">' + data.CartNumber + '</div>' +
						'  <div class="cbp-l-grid-agency-desc uppercase text-center">第' + data["FormatPos" + i] + '开 / <span class="badge ' + fakeType[imgType].class + '">' + data["ErrCount" + i] + '条 </span></div>' +
						'</div>';
					// var str = '<div class="cbp-item ' + data.ProductName + ' ' + fakeType[imgType].filter + '">' +
					// 	'<a href="ajax-awesome-work/project1.html" class="cbp-caption cbp-singlePage" rel="nofollow">' +
					// 	'<div class="cbp-caption-defaultWrap">' +
					// 	'   <img src="data:image/jpg;base64,' + img[i - 1] + '" alt="">' +
					// 	'</div>' +
					// 	'<div class="cbp-caption-activeWrap"></div>' +
					// 	'</a>' +
					// 	'<a href="../assets/global/plugins/cubeportfolio/ajax/project2.html" class="cbp-l-grid-work-title cbp-singlePage" rel="nofollow">' + data.CartNumber + '</a>' +
					// 	'<div class="cbp-l-grid-work-desc uppercase text-center">第' + data["FormatPos" + i] + '开 / <span class="badge ' + fakeType[imgType].class + '">' + data["ErrCount" + i] + '条 </span></div>';

					//去除无效图片
					if (img[i - 1] != 'AA==') {
						$('#js-grid-juicy-projects').append(str);
					}
					//strTemp += str;
				}
			});

			bsTips('图像数据载入完毕,共载入数据' + fakeList.rows + '车', 1);

			initImg();
		}

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
				defaultFilter: '*',
				animationType: 'quicksand',
				gapHorizontal: 35,
				gapVertical: 30,
				gridAdjustment: 'responsive',
				mediaQueries: [{
					width: 1500,
					cols: 6
				}, {
					width: 1100,
					cols: 5
				}, {
					width: 800,
					cols: 4
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

					$.ajax({
							url: url,
							type: 'GET',
							dataType: 'html',
							timeout: 10000
						})
						.done(function(result) {
							t.updateSinglePage(result);
						})
						.fail(function() {
							t.updateSinglePage('AJAX Error! Please refresh the page!');
						});
				}

				// singlePageInline
				// singlePageInlineDelegate: '.cbp-singlePageInline',
				// singlePageInlinePosition: 'below',
				// singlePageInlineInFocus: true,
				// singlePageInlineCallback: function(url, element) {
				// 	// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
				// 	var t = this;

				// 	$.ajax({
				// 			url: url,
				// 			type: 'GET',
				// 			dataType: 'html',
				// 			timeout: 10000
				// 		})
				// 		.done(function(result) {

				// 			t.updateSinglePageInline(result);

				// 		})
				// 		.fail(function() {
				// 			t.updateSinglePageInline('AJAX Error! Please refresh the page!');
				// 		});
				// }
			}, function() {
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
			//$('.theme-panel').addClass('hidden');
			$(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
				getImgList();
			});
			initSelectData();
		}

	};
}();
//记录选择状态
jQuery(document).ready(function() {
	$('body').addClass('page-content-white').removeClass('page-container-bg-solid');
	RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	feedback.init();
});
jQuery(window).resize(function() {
	HeadFix();
});