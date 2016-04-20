var Index = function() {

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
				$('.task-list').on('click', '.complete', function() {
					var obj = $(this).parents('li');
					if (!obj.find('input[type="checkbox"]').is(':checked')) {
						obj.addClass("task-done");
						bsTips('任务标记为完成，请在后台更新数据', 2);
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

		if ($('#site_activities').size() !== 0) {
			//site activities
			var previousPoint2 = null;
			$('#site_activities_loading').hide();
			$('#site_activities_content').show();

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
			var plot_statistics2 = $.plot($("#site_activities"), getFlotData2(data1), {
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

			$("#site_activities").bind("plothover", function(event, pos, item) {
				handleTooltip(pos, item, "车");
			});

			$('#site_activities').bind("mouseleave", function() {
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

	var initQualityCharts = function() {
		if (Morris.EventEmitter) {
			// Use Morris.Area instead of Morris.Line
			dashboardMainChart = Morris.Area({
				element: 'sales_statistics',
				padding: 0,
				behaveLikeLine: false,
				gridEnabled: false,
				gridLineColor: false,
				axes: false,
				fillOpacity: 1,
				data: [{
					period: '2011 Q1',
					sales: 1400,
					profit: 400
				}, {
					period: '2011 Q2',
					sales: 1100,
					profit: 600
				}, {
					period: '2011 Q3',
					sales: 1600,
					profit: 500
				}, {
					period: '2011 Q4',
					sales: 1200,
					profit: 400
				}, {
					period: '2012 Q1',
					sales: 1550,
					profit: 800
				}, {
					period: '2013 Q1',
					sales: 550,
					profit: 800
				}, {
					period: '2013 Q2',
					sales: 2150,
					profit: 1800
				}, {
					period: '2013 Q3',
					sales: 1650,
					profit: 1100
				}, {
					period: '2013 Q4',
					sales: 3250,
					profit: 1300
				}],
				lineColors: ['#399a8c', '#92e9dc'],
				xkey: 'period',
				ykeys: ['sales', 'profit'],
				labels: ['Sales', 'Profit'],
				pointSize: 0,
				lineWidth: 0,
				hideHover: 'auto',
				resize: true
			});
		}
	};

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

	return {
		init: function() {
			Tasks.initDashboardWidget();
			initFlotCharts();
			initQualityCharts();
			initMiniCharts();
			refreshRealQuality();
			bsTips('本页功能尚未添加', 1);
		}
	};
}();

jQuery(document).ready(function() {
	UIIdleTimeout.init();
	initDom();
	initDashboardDaterange('YYYY-MM-DD');
	Index.init();
});
jQuery(window).resize(function() {
	HeadFix();
});
//插入工作日志