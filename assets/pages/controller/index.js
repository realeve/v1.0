var Index = function() {
	//隐藏相关面板
	var initDOM = function() {
		$('.theme-panel').hide();
		hideSidebarTool();
	};

	// Handles counterup plugin wrapper
	var handleCounterup = function() {
		if (!$().counterUp) {
			return;
		}

		$("[data-counter='counterup']").counterUp({
			delay: 10,
			time: 800
		});
	};

	var handleDashBoardNums = function() {
		//api:
		//SELECT a.当月质量, a.上传大万数, b.实时质量, a.异常产品 FROM ( SELECT SUM ( CASE WHEN 好品率 < 70 THEN 1 ELSE 0 END ) AS 当月质量, COUNT (*) 上传大万数, SUM ( CASE WHEN ( 正面1缺陷数 = 0 OR 正2 = 0 OR 正3 = 0 OR 正4 = 0 OR 正5 = 0 OR 背精1缺陷数 = 0 OR 精2 = 0 OR 精3 = 0 OR 精4 = 0 ) THEN 1 ELSE 0 END ) AS 异常产品 FROM dbo.view_print_hecha WHERE 生产日期 / 100 = convert(varchar(6),GETDATE(),112) ) a, ( SELECT COUNT (*) AS 实时质量 FROM dbo.view_print_online_quality WHERE 好品率 < 80 AND CONVERT (VARCHAR, 上传时间, 112) = convert(varchar,GETDATE(),112) ) b
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=168&M=3";
		var Data = ReadData(str);
		Data.data[0].map(function(statData, idx) {
			$('.dashboard-stat .number:nth(' + idx + ')').attr('data-value', data2ThousandSeparator(statData)).text(data2ThousandSeparator(statData));
		})
		handleCounterup();
	}();

	//处理历史质量信息
	var handleHisQuality = function() {
		//对应CSS样式类
		var banknoteClass = {
			"9602A": "font-red-flamingo",
			"103-G-2A": "font-red-flamingo",
			"9603A": "font-blue-chambray",
			"103-G-3A": "font-blue-chambray",
			"9604A": "font-blue",
			"103-G-4A": "font-blue",
			"9606A": "font-purple",
			"103-G-6A": "font-purple",
			"9607T": "font-green-seagreen",
			"103-G-7T": "font-green-seagreen"
		};

		function loadHisQuaData(apiID) {
			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=" + apiID + "&M=3";
			var Data = ReadData(str);
			var prodHtml = '';

			Data.data.map(function(data) {
				var prodName = data[0];
				prodHtml += '\n<div class="col-md-2 col-sm-2 col-xs-6"><div class="font-grey-mint font-sm">' + prodName + '</div>';
				prodHtml += '			<div class="uppercase font-hg ' + banknoteClass[prodName] + '">' + data[1];
				prodHtml += '				  <span class="font-lg font-grey-mint">%</span>';
				prodHtml += '			</div></div>';
			})
			if (Data.rows == 0) {
				prodHtml = '<h3 style="padding-left:20px;height:20px;">对应时间无质量信息</h3>';
			}

			return prodHtml;
		}

		$('[name="hisQuality"] label').on('click', function() {
			$('[name="hisQuality"] .list-separated').html(hisQuaHtml[$(this).data('id')]);
		});

		//存储不同时间段质量信息
		var hisQuaHtml = [];
		for (var i = 0; i < 3; i++) {
			hisQuaHtml[i] = loadHisQuaData(i + 169);
		}

		//载入初始质量信息
		$('[name="hisQuality"] .list-separated').html(hisQuaHtml[0]);

		var initQualityCharts = function() {

			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=172&M=0";
			var Data = ReadData(str);

			var lineData = {
				element: 'passed_a_year_quality_static',
				padding: 0,
				behaveLikeLine: false,
				gridEnabled: false,
				gridLineColor: false,
				axes: false,
				fillOpacity: 1,
				ymin: 70,
				data: Data.data,
				lineColors: ['#399a8c'], //, '#92e9dc'
				xkey: Data.header[0].title,
				ykeys: [Data.header[1].title],
				labels: [Data.header[1].title],
				pointSize: 0,
				lineWidth: 0,
				hideHover: 'auto',
				resize: true
			};

			if (Morris.EventEmitter) {
				// Use Morris.Area instead of Morris.Line
				dashboardMainChart = Morris.Area(lineData);
			}
		}();
	};

	var Tasks = function() {
		return {
			initDashboardWidget: function() {
				$('.task-list input[type="checkbox"]').change(function() {
					if ($(this).is(':checked')) {
						$(this).parents('li').addClass("task-done");
					} else {
						$(this).parents('li').removeClass("task-done");
					}
				});

				//任务完成
				$('.task-list').on('click', '.complete,.task-checkbox,.liChild,.task-title', function() {
					/*var obj = $(this).parents('li');
					if (!obj.find('input[type="checkbox"]').is(':checked')) {
						obj.addClass("task-done");
					}*/

					var item = $(this).parent().find('.liChild');
					var itemPrnt = $(this).parents('li');
					var item_val = item.val();
					if (item.parent().hasClass('checked')) { //勾选状态-增加数据
						itemPrnt.removeClass("task-done");
						item.parent().removeClass("checked");
						bsTips('任务标记为未完成，请在后台更新数据', 2);
					} else {
						itemPrnt.addClass("task-done");
						item.parent().addClass("checked");
						bsTips('任务标记为已完成，请在后台更新数据', 2);
					}
				});

				//任务删除
				$('.task-list').on('click', '.del', function() {
					var obj = $(this).parents('li').remove();
					bsTips('任务成功删除，请在后台更新数据', 2);
				});

			}
		};
	}();

	function refreshRealQuality() {
		$('#real_quality_loading').hide();
		$('#real_quality_content').show();
		var dataReal = [];
		var totalPoints = 500;

		function GetData() {
			dataReal.shift();
			while (dataReal.length < totalPoints) {
				var prev = dataReal.length > 0 ? dataReal[dataReal.length - 1] : 50;
				var y = prev + Math.random() * 10 - 5;
				y = y < 0 ? 0 : (y > 100 ? 100 : y);
				dataReal.push(y);
			}
			var result = [];
			for (var i = 0; i < dataReal.length; ++i) {
				result.push([i, dataReal[i]])
			}
			return result;
		}
		var updateInterval = 100;
		var plot = $.plot($("#real_quality_statistics"), [
			GetData()
		], {
			series: {
				lines: {
					show: true,
					fill: true
				},
				shadowSize: 0
			},
			yaxis: {
				min: 0,
				max: 100,
				ticks: 10
			},
			xaxis: {
				show: false
			},
			grid: {
				hoverable: true,
				clickable: true,
				tickColor: "#f9f9f9",
				borderWidth: 1,
				borderColor: "#eeeeee"
			},
			colors: ["#f89f9f"],
			tooltip: true,
			tooltipOpts: {
				defaultTheme: false
			}
		});

		function update() {
			plot.setData([GetData()]);
			plot.draw();
			setTimeout(update, updateInterval);
		}
		update();
	}

	var initFlotCharts = function() {
		if (!jQuery.plot) {
			return;
		}

		function showChartTooltip(x, y, xValue, yValue) {
			$('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
				position: 'absolute',
				display: 'none',
				top: y - 40,
				left: x - 40,
				border: '0px solid #ccc',
				padding: '2px 6px',
				'background-color': '#fff'
			}).appendTo("body").fadeIn(200);
		}

		function handleTooltip(pos, item, strUnit) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2),
						xCat = item.series.data[item.datapoint[0]][0];
					showChartTooltip(item.pageX, item.pageY, item.datapoint[0], xCat + " : " + item.datapoint[1].toFixed(2) + ' ' + strUnit);
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		}

		var hardDisk, sqlSvr;

		hardDisk = randomData.flot(15, 0, 100);
		sqlSvr = randomData.flot(15, 0, 100);

		function getFlotData(hardDisk, sqlSvr) {
			return [{
				data: sqlSvr,
				lines: {
					fill: 0.6,
					lineWidth: 0
				},
				color: ['#f89f9f'],
				label: '&nbsp;数据库&nbsp;'
			}, {
				data: sqlSvr,
				points: {
					show: true,
					fill: true,
					radius: 5,
					fillColor: "#f89f9f",
					lineWidth: 3
				},
				color: '#fff',
				shadowSize: 0
			}, {
				data: hardDisk,
				lines: {
					fill: 0.6,
					lineWidth: 0
				},
				color: ['#92e9dc'],
				label: '&nbsp;硬盘&nbsp;'
			}, {
				data: hardDisk,
				points: {
					show: true,
					fill: true,
					radius: 5,
					fillColor: "#92e9dc",
					lineWidth: 3
				},
				color: '#fff',
				shadowSize: 0
			}];
		}

		if ($('#site_statistics').size() !== 0) {

			$('#site_statistics_loading').hide();
			$('#site_statistics_content').show();

			var plot_statistics = $.plot($("#site_statistics"), getFlotData(hardDisk, sqlSvr), {
				xaxis: {
					tickLength: 0,
					tickDecimals: 0,
					mode: "categories",
					min: 0,
					font: {
						lineHeight: 14,
						style: "normal",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				yaxis: {
					ticks: 5,
					tickDecimals: 0,
					tickColor: "#eee",
					//min:0,
					//max:100,
					font: {
						lineHeight: 14,
						style: "normal",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				grid: {
					hoverable: true,
					clickable: true,
					tickColor: "#eee",
					borderColor: "#eee",
					borderWidth: 1
				},
				legend: {
					show: true,
					//noColumns: 0,
					//container: "#site_legend"
				}
			});

			var previousPoint = null;
			$("#site_statistics").bind("plothover", function(event, pos, item) {
				handleTooltip(pos, item, "GB");
			});

			$('a[name="station_refresh"]').on('click', function() {
				hardDisk = randomData.flot(15, 0, 100);
				sqlSvr = randomData.flot(15, 0, 100);
				plot_statistics.setData(getFlotData(hardDisk, sqlSvr));
				plot_statistics.draw();
			});
		}

		if ($('#data_upload').size() !== 0) {
			//site activities
			var previousPoint2 = null;
			$('#data_upload_loading').hide();
			$('#data_upload_content').show();

			var data1 = randomData.flot(15, 0, 20);

			function getFlotData2(data1) {
				return [{
					data: data1,
					lines: {
						fill: 0.3,
						lineWidth: 0,
					},
					color: ['#BAD9F5']
				}, {
					data: data1,
					points: {
						show: true,
						fill: true,
						radius: 4,
						fillColor: "#9ACAE6",
						lineWidth: 2
					},
					color: '#9ACAE6',
					shadowSize: 1
				}, {
					data: data1,
					lines: {
						show: true,
						fill: false,
						lineWidth: 3
					},
					color: '#9ACAE6',
					shadowSize: 0
				}];
			}
			var plot_statistics2 = $.plot($("#data_upload"), getFlotData2(data1), {
				xaxis: {
					tickLength: 0,
					tickDecimals: 0,
					mode: "categories",
					min: 0,
					font: {
						lineHeight: 18,
						style: "normal",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				yaxis: {
					ticks: 5,
					tickDecimals: 0,
					tickColor: "#eee",
					font: {
						lineHeight: 14,
						style: "normal",
						variant: "small-caps",
						color: "#6F7B8A"
					}
				},
				grid: {
					hoverable: true,
					clickable: true,
					tickColor: "#eee",
					borderColor: "#eee",
					borderWidth: 1
				}
			});

			$("#data_upload").bind("plothover", function(event, pos, item) {
				handleTooltip(pos, item, "车");
			});

			$('#data_upload').bind("mouseleave", function() {
				$("#tooltip").remove();
			});

			$('a[name="upload_refresh"]').on('click', function() {
				data1 = randomData.flot(15, 0, 20);
				plot_statistics2.setData(getFlotData2(data1));
				plot_statistics2.draw();
			});
		}
	};

	var dashboardMainChart = null;

	redrawCharts = function() {
		dashboardMainChart.resizeHandler();
	};

	initMiniCharts = function() {
		// IE8 Fix: function.bind polyfill
		if (App.isIE8() && !Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
				if (typeof this !== "function") {
					// closest thing possible to the ECMAScript 5 internal IsCallable function
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}

				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function() {},
					fBound = function() {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};

				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();

				return fBound;
			};
		}

		$("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
			type: 'bar',
			width: '100',
			barWidth: 6,
			height: '45',
			barColor: '#F36A5B',
			negBarColor: '#e02222'
		});

		$("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
			type: 'bar',
			width: '100',
			barWidth: 6,
			height: '45',
			barColor: '#5C9BD1',
			negBarColor: '#e02222'
		});
	};

	var EcommerceDashboard = function() {

		function showTooltip(x, y, labelX, labelY) {
			$('<div id="tooltip" class="chart-tooltip">' + (labelY.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) + 'USD<\/div>').css({
				position: 'absolute',
				display: 'none',
				top: y - 40,
				left: x - 60,
				border: '0px solid #ccc',
				padding: '2px 6px',
				'background-color': '#fff'
			}).appendTo("body").fadeIn(200);
		}

		var initChart1 = function() {

			var data = [
				['01/2013', 4],
				['02/2013', 8],
				['03/2013', 10],
				['04/2013', 12],
				['05/2013', 2125],
				['06/2013', 324],
				['07/2013', 1223],
				['08/2013', 1365],
				['09/2013', 250],
				['10/2013', 999],
				['11/2013', 390]
			];

			var plot_statistics = $.plot(
				$("#statistics_1"), [{
					data: data,
					lines: {
						fill: 0.6,
						lineWidth: 0
					},
					color: ['#f89f9f']
				}, {
					data: data,
					points: {
						show: true,
						fill: true,
						radius: 5,
						fillColor: "#f89f9f",
						lineWidth: 3
					},
					color: '#fff',
					shadowSize: 0
				}], {

					xaxis: {
						tickLength: 0,
						tickDecimals: 0,
						mode: "categories",
						min: 2,
						font: {
							lineHeight: 15,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					},
					yaxis: {
						ticks: 3,
						tickDecimals: 0,
						tickColor: "#f0f0f0",
						font: {
							lineHeight: 15,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					},
					grid: {
						backgroundColor: {
							colors: ["#fff", "#fff"]
						},
						borderWidth: 1,
						borderColor: "#f0f0f0",
						margin: 0,
						minBorderMargin: 0,
						labelMargin: 20,
						hoverable: true,
						clickable: true,
						mouseActiveRadius: 6
					},
					legend: {
						show: false
					}
				}
			);

			var previousPoint = null;

			$("#statistics_1").bind("plothover", function(event, pos, item) {
				$("#x").text(pos.x.toFixed(2));
				$("#y").text(pos.y.toFixed(2));
				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
					}
				} else {
					$("#tooltip").remove();
					previousPoint = null;
				}
			});

		}

		var initChart2 = function() {

			var data = [
				['01/2013', 10],
				['02/2013', 0],
				['03/2013', 10],
				['04/2013', 12],
				['05/2013', 212],
				['06/2013', 324],
				['07/2013', 122],
				['08/2013', 136],
				['09/2013', 250],
				['10/2013', 99],
				['11/2013', 190]
			];

			var plot_statistics = $.plot(
				$("#statistics_2"), [{
					data: data,
					lines: {
						fill: 0.6,
						lineWidth: 0
					},
					color: ['#BAD9F5']
				}, {
					data: data,
					points: {
						show: true,
						fill: true,
						radius: 5,
						fillColor: "#BAD9F5",
						lineWidth: 3
					},
					color: '#fff',
					shadowSize: 0
				}], {

					xaxis: {
						tickLength: 0,
						tickDecimals: 0,
						mode: "categories",
						min: 2,
						font: {
							lineHeight: 14,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					},
					yaxis: {
						ticks: 3,
						tickDecimals: 0,
						tickColor: "#f0f0f0",
						font: {
							lineHeight: 14,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					},
					grid: {
						backgroundColor: {
							colors: ["#fff", "#fff"]
						},
						borderWidth: 1,
						borderColor: "#f0f0f0",
						margin: 0,
						minBorderMargin: 0,
						labelMargin: 20,
						hoverable: true,
						clickable: true,
						mouseActiveRadius: 6
					},
					legend: {
						show: false
					}
				}
			);

			var previousPoint = null;

			$("#statistics_2").bind("plothover", function(event, pos, item) {
				$("#x").text(pos.x.toFixed(2));
				$("#y").text(pos.y.toFixed(2));
				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
					}
				} else {
					$("#tooltip").remove();
					previousPoint = null;
				}
			});

		}

		return {

			//main function
			init: function() {
				initChart1();

				$('#statistics_orders_tab').on('shown.bs.tab', function(e) {
					initChart2();
				});
			}

		};

	}();

	return {
		init: function() {
			initDOM();
			Tasks.initDashboardWidget();
			initFlotCharts();
			handleHisQuality();
			initMiniCharts();
			refreshRealQuality();
			EcommerceDashboard.init();
			bsTips('本页功能尚未添加', 1);
		}
	};
}();

jQuery(document).ready(function() {
	UIIdleTimeout.init();
	initDom();
	//initDashboardDaterange('YYYY-MM-DD');
	Index.init();
});
jQuery(window).resize(function() {
	HeadFix();
});
//插入工作日志