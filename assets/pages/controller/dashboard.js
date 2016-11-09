var dashboardApp = function() {
	var isInited = false;
	var olData;
	var ec = [];
	var initImg = function() {
		// init cubeportfolio
		var initCubeportfolio = function() {

			function updateSinglePageInline(html, t, callback) {
				t.content.html(html);
				// trigger public event
				t.cubeportfolio.$obj.trigger('updateSinglePageInlineStart.cbp');

				if (typeof callback == 'function') {
					callback();
				}

				t.singlePageInlineIsOpen.call(t);
			}

			$('#js-grid-lightbox-gallery').cubeportfolio({
					filters: '#js-filters-lightbox-gallery1',
					//loadMore: '#js-loadMore-juicy-projects',
					loadMore: '#js-loadMore-lightbox-gallery',
					loadMoreAction: 'click',
					layoutMode: 'grid', //'mosaic',
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
					defaultFilter: '*',
					animationType: 'scaleDown', //'rotateSides',
					gapHorizontal: 10,
					gapVertical: 10,
					gridAdjustment: 'responsive',
					caption: '', //'minimal', //'zoom',
					displayType: 'default',
					//displayTypeSpeed: 100,

					// lightbox
					lightboxDelegate: '.cbp-lightbox',
					lightboxGallery: true,
					lightboxTitleSrc: 'data-title',
					lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

					// singlePageInline
					singlePageInlineDelegate: '.cbp-singlePageInline',
					singlePageInlinePosition: 'below',
					singlePageInlineInFocus: true,
					singlePageInlineCallback: function(id, element) {
						id = id.replace('#img', '');
						var t = this,
							result;
						data = {
							item: olData.data[id],
							header: olData.header
						};
						if (olData.rows) {
							data.item[24] = data.item[24].replace(' ', 'T');
							result = tpl.getHTML('dashboard/code/detail.etpl', data);
						} else {
							result = '<h3>当前时间内无相关信息</h3></div>';
						}

						updateSinglePageInline(result, t);

						refreshProdInfo(id);
						renderHisQua(id);
						/*var url = "../assets/pages/controller/data/tpl/dashboard/code/project.html";

						$.ajax({
								url: url,
								type: 'GET',
								dataType: 'html',
								timeout: 10000
							})
							.done(function(result) {
								t.updateSinglePageInline(result);
							})
							.fail(function() {
								t.updateSinglePageInline('AJAX Error! Please refresh the page!');
							});*/
					}
				},
				function() {
					//bsTips('数据渲染完毕', 1);
				});
		};

		if (isInited) {
			$('#js-grid-lightbox-gallery').cubeportfolio('destroy', initCubeportfolio);
		} else {
			initCubeportfolio();
		}
		isInited = true;
	};

	var refreshOlInfo = function() {
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=316&M=3&blob=25;26;27&cache=0.25";
		//url = './topic/testData/online/online.json';
		$.ajax({
				url: url
			})
			.done(function(data) {
				data = $.parseJSON(data);
				olData = {
					rows: 0
				};
				var $gallery = $('#js-grid-lightbox-gallery');
				if (data.rows > 0) {

					data.data = _.sortBy(data.data, function(item) {
						return item[11];
					});

					var str = tpl.getHTML('dashboard/code/imglist.etpl', data);
					$gallery.html(str);
					initImg();
					olData = data;
				} else {
					$gallery.addClass('cbp-ready').html('<div class="cbp-search-nothing"><h3>当前时间内无相关信息</h3></div>');
				}
			})
			.fail(function(e) {
				console.log("read data error:<br>");
				console.log(e.responseText);
			});
	};

	var refreshProdInfo = function(id) {
		var url = getRootPath(1) + '/DataInterface/Api?Token=' + config.TOKEN + '&ID=283&M=0&cart=' + olData.data[id][0] + '&cache=1440';
		//url = getRootPath(1) + '/DataInterface/Api?Token=' + config.TOKEN + '&ID=283&M=0&cart=1620A285&cache=1440';
		$.ajax({
				url: url
			})
			.done(function(data) {
				data = handleAjaxData(data);

				//追加星期信息
				data.data.map(function(item, i) {
					data.data[i].WeekDay = getWeekdayByDate(item.StartDate);
					data.data[i].DateTitle = item.StartDate.replace(' ', 'T') + '+08';
				});

				var $prodinfo = $('#prodinfo');
				if (data.rows > 0) {
					var str = tpl.getHTML('dashboard/code/prodinfo.etpl', data);
					$prodinfo.html(str);
					$("[name=isodate]").prettyDate({
						interval: 10000
					});
				} else {
					$prodinfo.addClass('cbp-ready').html('<div class="cbp-search-nothing"><h3>当前时间内无相关生产信息</h3></div>');
				}
			})
			.fail(function(e) {
				console.log("read data error:<br>");
				console.log(e);
				console.log(e.responseText);
			});
	};

	var renderHisQua = function(id) {

		function getImg(i, data) {
			var img = data.data[0][i];

			if (img == 'AA==') {
				img = '../assets/global/img/none.png';
			} else {
				img = 'data:image/jpg;base64,' + img;
			}
			return img;
		}

		var renderHisImg = function(id) {
			//图像缓存10天
			var imgUrl = getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&blob=1&ID=254&cache=14400&M=3&t=" + id;
			$.ajax({
					url: imgUrl
				})
				.done(function(data) {
					data = $.parseJSON(data);

					var img = getImg(0, data);

					$('[name="hisImg' + id + '"]').attr('src', img);

				});
		};

		var handleNocheckDetail = (function() {
			//SELECT top 10 a.ProduceDate, sum(NoCheckCount) as num FROM MaHouData a INNER JOIN ( SELECT  ProduceDate,  MachineID FROM  MaHouData WHERE  CartNumber = ? ) b ON a.MachineID = b.MachineID AND a.ProduceDate <= b.ProduceDate group by a.ProduceDate ORDER BY a.ProduceDate desc
			//近期未检情况
			//cart
			var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=318&M=3&cart=" + olData.data[id][0];
			//url = getRootPath(1) + '/DataInterface/Api?Token=' + config.TOKEN + '&ID=317&M=3&cart=1620A285';
			var chartData = {
				xAxis: [],
				yAxis: []
			};
			$.ajax({
					url: url
				})
				.done(function(data) {
					var cartList = handleAjaxData(data);
					if (cartList.rows > 0) {
						cartList.data.reverse()
							.map(function(elem) {
								var xVal = elem[0].substr(4, 2) + '/' + elem[0].substr(6);
								chartData.xAxis.push(xVal);
								chartData.yAxis.push(elem[1]);
							});
					}

					chartData.type = 'line';

					ec[1] = echarts.init(document.getElementById("nocheckDetail"));
					type = true;
					var option = {
						tooltip: {
							trigger: 'axis',
							formatter: '{b}<br>{c}大张'
						},
						color: ['#659be0'],
						xAxis: {
							type: 'category',
							data: chartData.xAxis,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							show: type
						},
						grid: {
							x: type ? 50 : 30,
							y: 10,
							x2: 10,
							y2: 20
						},
						yAxis: {
							type: 'value',
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							min: 0
						},
						series: [{
							type: 'line',
							smooth: true,
							barMaxWidth: 25,
							data: chartData.yAxis
						}]
					};

					ec[1].setOption(option);

				});

		})();

		var initHisData = (function() {
			var chartData = {
				xAxis: [],
				yAxis: []
			};

			//当天生产的其它产品
			//282
			//select a.id,a.CartNumber,GoodRate,FormatPos1,ErrCount1,ImgVerify1 from MaHouData a INNER JOIN (SELECT ProduceDate,MachineID FROM MaHouData where CartNumber = '1620C217') b on a.MachineID = b.MachineID and a.ProduceDate = b.ProduceDate order by a.id
			var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=282&M=3&cart=" + olData.data[id][0];
			//url = getRootPath(1) + '/DataInterface/Api?Token=' + config.TOKEN + '&ID=282&M=3&cart=1620A285';
			$.ajax({
					url: url
				})
				.done(function(data) {
					var cartList = handleAjaxData(data);
					tpl.render('feedback/hislist.etpl', cartList, $('#hislist'));
					if (cartList.rows > 0) {
						cartList.data.map(function(elem) {
							chartData.xAxis.push(elem[1]);
							chartData.yAxis.push(elem[2]);
							renderHisImg(elem[0]);
						});
					}

					chartData.type = 'line';

					ec[0] = echarts.init(document.getElementById("goodrateDetail"));
					var option = getSimpleEChart(chartData);
					ec[0].setOption(option);
				});
		})();
	};

	return {
		//main function to initiate the module
		init: function() {
			var tplList = [
				"dashboard/code/imglist.etpl",
				"dashboard/code/detail.etpl",
				"dashboard/code/prodinfo.etpl",
				"feedback/hislist.etpl"
			];

			tpl.init(tplList);

			refreshOlInfo();
		},
		reload: function() {
			setInterval(function() {
				refreshOlInfo();
			}, 30 * 1000);
		}
	};
}();
//记录选择状态
$(document).ready(function() {
	toggleSidebar();
	whiteBackground();
	hideSidebarTool();
	UIIdleTimeout.init();
	initDom(0);

	dashboardApp.init();

	//dashboardApp.reload();

});

/*
//animationType
3dflip
bounceBottom
bounceLeft
bounceTop
fadeOut
fadeOutTop
flipBottom
flipOut
flipOutDelay
foldLeft
frontRow
moveLeft
quicksand
rotateSides
rotateRoom
scaleDown
scaleSides
slideLeft
sequentially
slideDelay
skew
unfold

//gridAdjustment
default
alignCenter
responsive

//caption
pushTop
pushDown
revealBottom
revealTop
revealLeft
moveRight
overlayBottom
overlayBottom
overlayBottomR
overlayBottomA
overlayRightAlo
minimal
fadeIn
zoom
opacity

//singlePageInlinePosition
top
bottom
above
below

//displayType
default
fadeInToTop
sequentially
bottomToTop

 */