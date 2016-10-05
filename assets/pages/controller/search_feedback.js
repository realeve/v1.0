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

	var getImgList = function() {
		var date = getDateRange();
		searchFeedBack = getSearchSettings();
		var strUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&M=0&tstart=" + date.start + "&tend=" + date.end + '&limit=' + searchFeedBack.limit + '&faketype=' + searchFeedBack.fakeType; // + "&t=" + Math.random();
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
				var parseCart = JSON.stringify(data),
					parseImg = JSON.stringify(img);
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
						'                  <a href="../assets/pages/controller/data/ajax/feedback.html?cart=' + data.CartNumber + '" class="cbp-singlePage cbp-s-caption-buttonLeft btn red uppercase"  rel="nofollow" data-cartnumber="' + data.CartNumber + '"  data-cart=\'' + parseCart + "' data-img = '" + parseImg + "' >查看详情</a>" +
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
		} else {
			$('#js-grid-juicy-projects').addClass('cbp-ready').append('<div class="cbp-search-nothing">当前时间内无 <i>' + $('[name=machineID]').find('option:selected').text() + '</i> 的信息</div>');
			//bsTips('当前时间无数据', 1);
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
						var fakeType = ['<span class="badge">', '<span class="badge badge-info">', '<span class="badge badge-danger">'];
						$.ajax({
								url: url,
								type: 'GET',
								dataType: 'html',
								timeout: 10000
							})
							.done(function(result) {

								var cart = location.href.split('?cart=')[1].substring(0, 8);
								var link = $('[data-cartnumber="' + cart + '"]').first();
								var data = link.data('cart');
								var img = link.data('img');
								result = result.replace('{cartnumber}', data.CartNumber);
								result = result.replace(/{machine}/g, data.MachineName);
								result = result.replace('{goodrate}', data.GoodRate);
								result = result.replace(/{date}/g, data.ProduceDate);
								result = result.replace(/{errcount}/g, data.errpiccount);
								result = result.replace(/{nocheck}/g, data.nocheckcount);

								for (var i = 0; i < 3; i++) {
									if (img[i] != 'AA==') {
										result = result.replace('a href=""', 'a href="data:image/jpg;base64,' + img[i] + '"');
										result = result.replace('img src=""', 'img src="data:image/jpg;base64,' + img[i] + '"');
										var imgType = parseInt(data['ImgVerify' + (i + 1)], 10);
										imgType = imgType > 2 ? 2 : imgType;
										result = result.replace('{img' + i + '}', '第' + data['FormatPos' + (i + 1)] + '开');
										result = result.replace('{errcount' + i + '}', fakeType[imgType] + data['ErrCount' + (i + 1)] + '条</span>');
									} else {
										result = result.replace('{img' + i + '}', '');
									}
								}

								var chartData = {
									xAxis: [],
									yAxis: []
								};
								//mid
								//281
								//SELECT procName,MachineName,CaptainName,convert(varchar,StartDate,120) as startDate,WorkInfo FROM  CartInfoData where MahouID =
								var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=281&M=3&mid=" + data.id;
								$.ajax(url).done(function(prodInfo) {
									prodInfo = prodInfo.replace(/\r\n/g, '<br>').replace(/\t/g, ' ');
									var prodList = $.parseJSON(prodInfo);
									var str = '';
									prodList.data.map(function(elem, i) {
										str += '<div class="cbp-l-project-desc-title ' + (i > 0 ? 'margin-top-40' : '') + '">' +
											'	<span>' + (i + 1) + '.' + elem[0] + '工序：  ' + elem[1] + '</span>' +
											'<h5 class="pull-right" style="margin-top:15px;">' + elem[3].substring(0, 16) + '</h5>' +
											'</div>' +
											'<div class="cbp-l-project-desc-text"><p style="margin-bottom:5px;">' + elem[4] + '</p><h5 class="pull-right">——— <i>' + elem[2] + '</i></h5></div>';
									});

									result = result.replace('{prodInfo}', str);

									//当天生产的其它产品
									//282
									//select a.id,a.CartNumber,GoodRate,FormatPos1,ErrCount1,ImgVerify1 from MaHouData a INNER JOIN (SELECT ProduceDate,MachineID FROM MaHouData where CartNumber = '1620C217') b on a.MachineID = b.MachineID and a.ProduceDate = b.ProduceDate order by a.id
									var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=282&M=3&cart=" + data.CartNumber;
									var cartList = ReadData(url);
									var strList = '';
									cartList.data.map(function(elem, curPos) {
										curPos++;
										var imgUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&M=3&t=" + elem[0];
										var imgData = ReadData(imgUrl);
										var img = imgData.data[0];
										var imgType = parseInt(elem[5], 10);
										imgType = imgType > 2 ? 2 : imgType;

										// str = '<div class="col-sm-3 portfolio-tile">' +
										// 	'    <a href="#" class="cbp-singlePage cbp-l-project-related-link" rel="nofollow">';
										// if (img[0] !== 'AA==') {
										// 	str += '        <img src="data:image/jpg;base64,' + img[0] + '" alt="">';
										// } else {
										// 	str += '        <img src="../assets/global/img/none.png" alt="">';
										// }
										// str += '        <div class="text-center margin-top-10">' + elem[1] + ' / ' + elem[2] + '% <br>第' + elem[3] + '开 / ' + fakeType[imgType] + elem[4] + '条</span></div>' +
										// 	'    </a>' +
										// 	'</div>';

										var imgStr;
										if (img[0] !== 'AA==') {
											imgStr = '        <img src="data:image/jpg;base64,' + img[0] + '" alt="">';
										} else {
											imgStr = '        <img src="../assets/global/img/none.png" alt="">';
										}

										str = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
											'	<div class="portlet light portlet-fit bordered">' +
											'		<div class="portlet-title">' +
											'			<div class="caption">' +
											'				<i class="icon-layers font-green"></i>' +
											'				<span class="caption-subject font-green bold uppercase">' + elem[1] + '</span>' +
											'				<div class="caption-desc font-grey-cascade"> 好品率 : ' + elem[2] + '%</div>' +
											'			</div>' +
											'		</div>' +
											'		<div class="portlet-body">' +
											'			<div class="mt-element-overlay">' +
											'				<div class="row">' +
											'					<div class="col-md-12">' +
											'						<div class="mt-overlay-2">' + imgStr +
											'							<div class="mt-overlay">' +
											'								<h2>第' + elem[3] + '开 / ' + fakeType[imgType] + elem[4] + '条</span></h2>' +
											'								<a class="mt-info btn red btn-outline" href="#">查看详情</a>' +
											'							</div>' +
											'						</div>' +
											'					</div>' +
											'				</div>' +
											'			</div>' +
											'		</div>' +
											'	</div>' +
											'</div>';


										strList += str;
										chartData.xAxis.push(elem[1]);
										chartData.yAxis.push(elem[2]);
										chartData.type = 'line';
									});

									result = result.replace('{relate}', strList);
									t.updateSinglePage(result);

									setTimeout(function() {
										var ec = echarts.init(document.getElementById("chart"));
										var option = getSimpleEChart(chartData);
										//console.log(JSON.stringify(option));
										ec.setOption(option);
									}, 500);
								});

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
	whiteBackground();
	RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	feedback.init();
	infoTips('详情页面需增加相应车号链接及实废图像链接');
});
jQuery(window).resize(function() {
	HeadFix();
});