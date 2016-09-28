var feedback = function() {
	//保存本地设置
	var searchFeedBack = {};

	//缺陷图像查询
	// select a.id,CartNumber,b.MachineName,c.ProductName,ProduceDate,GoodRate,FormatPos1,ErrCount1,ImgVerify1,FormatPos2,ErrCount2,ImgVerify2,FormatPos3,ErrCount3,ImgVerify3
	// from MaHouData a INNER JOIN MachineData b on a.MachineID = b.MachineID inner join ProductData c on a.ProductTypeID = c.ProductID
	// where ProduceDate between 20160901 and 20160930 and GoodRate<=80

	var getQueryUrl = function(settings) {
		var params = '&ID=';

		if (settings.prodType == -1) {
			if (settings.machineID == -1) {
				//所有品种，所有机台
			} else {
				//所有品种，指定机台
			}
		} else {
			if (settings.machineID == -1) {
				//指定品种，所有机台
			} else {
				//指定品种，指定机台
			}
		}

	};

	var getImgList = function() {
		var date = getDateRange();
		searchFeedBack = getSearchSettings();
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + token + "&M=3&tstart=" + date.start + "&tend=" + date.end + '&limit=' + searchFeedBack.limit + '&faketype=' + searchFeedBack.fakeType + "&t=" + Math.random();

	};

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
			$('[name=prodType]').val(searchFeedBack.prodType);
			$('[name=machineID]').val(searchFeedBack.machineID);
			//$('#dataType').val(searchFeedBack.dataType);
			$('#limit').val(searchFeedBack.limit);
			$('#fakeType').val(searchFeedBack.fakeType);
		}
	};

	var getSearchSettings = function() {
		return {
			prodType: $('[name=prodType]').val(),
			machineID: $('[name=machineID]').val(),
			//dataType: $('#dataType').val(),
			limit: $('#limit').val(),
			fakeType: $('#fakeType').val()
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

	var initImg = function() {
		// init cubeportfolio
		$('#js-grid-juicy-projects').cubeportfolio({
			filters: '#js-filters-juicy-projects',
			loadMore: '#js-loadMore-juicy-projects',
			loadMoreAction: 'click',
			layoutMode: 'grid',
			defaultFilter: '*',
			animationType: 'quicksand',
			gapHorizontal: 35,
			gapVertical: 30,
			gridAdjustment: 'responsive',
			mediaQueries: [{
				width: 1500,
				cols: 8
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
			caption: 'overlayBottomReveal',
			displayType: 'sequentially',
			displayTypeSpeed: 80,

			// lightbox
			lightboxDelegate: '.cbp-lightbox',
			lightboxGallery: true,
			lightboxTitleSrc: 'data-title',
			lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

			// singlePage popup
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
			},
		});
	};

	return {
		//main function to initiate the module
		init: function() {
			//$('.theme-panel').addClass('hidden');
			$(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
				getImgList();
			});
			initSelectData();
			initImg();
		}

	};
}();
//记录选择状态
jQuery(document).ready(function() {
	RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	feedback.init();
});
jQuery(window).resize(function() {
	HeadFix();
});