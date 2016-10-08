		require.config({
			baseUrl: "assets/global/plugins/",
			paths: {
				"echarts": "echarts/js/echarts.min",
				"chartDataTool": "echarts/js/extension/chartDataTool.min"
			}
		});

		var theme = {
			backgroundColor: '#ffffff',
			// 默认色板
			color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"],
			animationDuration: 1500,
			// 图表标题
			title: {
				itemGap: 8,
				textStyle: {
					fontWeight: 'bold',
					color: '#666',
					fontSize: 28,
				},
				subtextStyle: {
					color: '#666'
				}
			},

			// 工具箱
			toolbox: {
				color: ['rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)'],
			},
			tooltip: {
				"trigger": "item"
			},
			grid: {
				borderWidth: 0,
				y: 80,
			},

			// 类目轴
			categoryAxis: {
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: '#aaa',
						width: 2,
					}
				},
				boundaryGap: true, //此处设为TRUE,柱形图会溢出边界）
				splitLine: {
					show: false,
					lineStyle: {
						color: ['#ddd'],
						width: 1,
						//type: 'solid'
					}
				},
				nameTextStyle: {
					fontSize: 16,
					color: '#555'
				},
				axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: '#222',
					}
				},
				splitArea: {
					show: false,
					areaStyle: {
						color: ['rgba(144,238,144,0.2)', 'rgba(255,255,255,0.05)']
					}
				}
			},

			// 数值型坐标轴默认参数
			valueAxis: {
				axisLine: { // 坐标轴线
					show: false,
					lineStyle: { // 属性lineStyle控制线条样式
						color: '#bbb',
						width: 1
					}
				},
				axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: '#222',
					}
				},
				nameTextStyle: {
					fontSize: 16,
					color: '#555'
				},
				splitLine: { // 分隔线
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: ['#ddd'],
						width: 1,
						type: 'dashed'
					},
					show: true,
				},
				splitArea: {
					show: false,
					areaStyle: {
						color: ['rgba(144,238,144,0.2)', 'rgba(255,255,255,0.05)']
					}
				},
			},

			timeline: {
				lineStyle: {
					color: 'rgb(38,185,139)'
				},
				controlStyle: {
					normal: {
						color: 'rgb(38,185,139)'
					},
					emphasis: {
						color: 'rgb(38,185,139)'
					}
				}
			},
			// 柱形图默认参数
			bar: {
				itemStyle: {
					normal: {
						barBorderRadius: 1,
					},
					emphasis: {
						barBorderRadius: 1
					}
				}
			},

			// 折线图默认参数
			line: {
				smooth: false,
				symbol: 'emptyCircle', // 拐点图形类型
				symbolSize: 9, // 拐点图形大小
				itemStyle: {
					normal: {
						barBorderColor: 'rgba(0,0,0,0)',
						label: {
							show: true
						},
						lineStyle: {
							width: 8,
							type: 'solid',
							shadowColor: 'rgba(0,0,0,0.3)',
							shadowBlur: 5,
							shadowOffsetX: 5,
							shadowOffsetY: 5
						},
						//areaStyle: {type: 'default'}
					},
					emphasis: {
						label: {
							show: false
						}
					}
				},
				lineStyle: {
					normal: {
						width: 8,
						type: 'solid',
						shadowColor: 'rgba(0,0,0,0.3)',
						shadowBlur: 5,
						shadowOffsetX: 5,
						shadowOffsetY: 5
					}
				},
				showAllSymbol: true
			},
			radar: {
				clickable: true,
				legendHoverLink: true,
				polarIndex: 0,
				itemStyle: {
					normal: {
						label: {
							show: false
						},
						lineStyle: {
							width: 2,
							type: 'solid',
							shadowColor: 'rgba(0,0,0,0.3)',
							shadowBlur: 1,
							shadowOffsetX: 1,
							shadowOffsetY: 1
						},
						areaStyle: {
							type: 'default'
						}
					},
					emphasis: {
						label: {
							show: false
						}
					}
				},
				splitLine: { // 分隔线
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: ['#ddd']
					}
				},
				symbolSize: 5,
				symbol: 'emptyCircle',
			},
			pie: {
				clickable: true,
				legendHoverLink: true,
				center: [
					'50%',
					'50%'
				],
				radius: [
					0,
					'75%'
				],
				clockWise: true,
				startAngle: 90,
				minAngle: 0,
				selectedOffset: 10,
				itemStyle: {
					normal: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show: true,
							position: 'inner',
							//formatter: "{b}:{d}%",
							formatter: "{b}",
							textStyle: {
								fontSize: 12
							},
						},
						labelLine: {
							show: false,
							length: 20,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
					},
					emphasis: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show: false
						},
						labelLine: {
							show: false,
							length: 20,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
					}
				}
			},
			textStyle: {
				fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
			}
		};

		//配置图表库
		var mECharts = (function() {
			var myChart = []; //任意个数的图表
			var echarts, chartDataTool;
			var option = [];
			var i = 0;

			require(["echarts", "chartDataTool"], function(ec, dt) {
				var defaultTheme;
				echarts = ec;
				chartDataTool = dt;
				showChart(theme);
			});

			function getDate() {
				var date = new Date();
				var a = date.getFullYear();
				var b = jsRight(('0' + (date.getMonth() + 1)), 2);
				var c = jsRight(('0' + date.getDate()), 2);
				return a + b + c;
			}

			var date = {
				start: jsLeft(getDate(), 6) + '01',
				end: jsLeft(getDate(), 6) + '31'
			};

			function getLastYear() {
				var date = new Date();
				var a = date.getFullYear() - 1;
				var b = jsRight(('0' + (date.getMonth() + 1)), 2);
				var c = jsRight(('0' + date.getDate()), 2);
				return a + b + c;
			}

			var lastYear = {
				start: jsLeft(getLastYear(), 6) + '01',
				end: jsLeft(getLastYear(), 6) + '31'
			};

			function showChart(curTheme) {
				if (!echarts) {
					return;
				}

				function renderEchart(i) {
					if (option[i] !== false) {
						myChart[i] = echarts.init(document.getElementById("nocheck_statistics_" + i), curTheme);
						myChart[i].setOption(option[i]);
						$('#nocheck_loading_' + i).addClass('display-none');
						$('#nocheck_content_' + i).removeClass('display-none');
					}
				}

				//SELECT  '今年' as 月份, a.ProductTypeName as 品种, avg(a.OpenNum) as 开包量 FROM dbo.ManualVerifyData AS a where a.MahouID>0 and a.OpenNum>0 and CONVERT(varchar,ProduceTime,112) between ? and ? group by a.ProductTypeName,CONVERT(varchar(6),ProduceTime,112) union ALL SELECT  '去年同期' as 月份, a.ProductTypeName as 品种, avg(a.OpenNum) as 开包量 FROM dbo.ManualVerifyData AS a where a.MahouID>0 and a.OpenNum>0 and CONVERT(varchar,ProduceTime,112) between ? and ? group by a.ProductTypeName,CONVERT(varchar(6),ProduceTime,112)
				var url = [
					getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=222&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + lastYear.start + "&tend2=" + lastYear.end + "&cache=" + config.cache,
					getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=181&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&cache=" + config.cache
				];

				$.ajax({
						url: url[0]
					})
					.done(function(data) {

						i = 0;
						data = $.parseJSON(data);
						var objRequest = {
							url: url[0],
							type: 'bar',
							data: data
						};

						if (typeof curTheme.color != 'undefined') {
							objRequest.color = curTheme.color;
						}

						option[i] = chartDataTool.getOption(objRequest, echarts);

						if (option[i] !== false) {
							delete option[i].title;
							delete option[i].toolbox;
							delete option[i].dataZoom;
							option[i].grid.bottom = '3%';
							option[i].legend.y = 0;
							delete option[i].xAxis[0].name;
						}
						renderEchart(i);
					});

				$.ajax({
						url: url[1]
					})
					.done(function(data) {
						i = 1;
						data = $.parseJSON(data);

						var objRequest = {
							url: url[1],
							singleAxis: 'time',
							type: 'themeriver',
							data: data
						};
						if (typeof curTheme.color != 'undefined') {
							objRequest.color = curTheme.color;
						}

						option[i] = chartDataTool.getOption(objRequest, echarts);
						if (typeof option[i].series !== 'undefined') {
							delete option[i].toolbox;
							option[i].title[2].x = 'center';
							option[i].title[2].y = 40;
							option[i].title[2].y2 = 0;
							option[i].title[1].show = false;
							option[i].title[3].show = false;
							option[i].legend.orient = 'horizontal';
						}

						renderEchart(i);
					});

			}

			return {
				resize: function() {
					myChart[0].resize();
					myChart[1].resize();
				}
			};
		})();

		// Handles counterup plugin wrapper
		var handleCounterup = function(obj, time) {
			if (!$().counterUp) {
				return;
			}

			obj.counterUp({
				delay: 10,
				time: time
			});
		};

		var handleDashBoardNums = (function() {
			//api:
			//SELECT a.当月质量, a.上传大万数, b.实时质量, a.异常产品 FROM ( SELECT SUM ( CASE WHEN 好品率 < 70 THEN 1 ELSE 0 END ) AS 当月质量, COUNT (*) 上传大万数, SUM ( CASE WHEN ( 正面1缺陷数 = 0 OR 正2 = 0 OR 正3 = 0 OR 正4 = 0 OR 正5 = 0 OR 背精1缺陷数 = 0 OR 精2 = 0 OR 精3 = 0 OR 精4 = 0 ) THEN 1 ELSE 0 END ) AS 异常产品 FROM dbo.view_print_hecha WHERE 生产日期 / 100 = convert(varchar(6),GETDATE(),112) ) a, ( SELECT COUNT (*) AS 实时质量 FROM dbo.view_print_online_quality WHERE 好品率 < 80 AND CONVERT (VARCHAR, 上传时间, 112) = convert(varchar,GETDATE(),112) ) b
			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=168&M=3";
			$.ajax({
					url: str
				})
				.done(function(Data) {
					Data = $.parseJSON(Data);

					Data.data[0].map(function(statData, idx) {
						$('.dashboard-stat .number:nth(' + idx + ')').attr('data-value', data2ThousandSeparator(statData)).text(data2ThousandSeparator(statData));
					});

					if (Data.data[0][4]) {
						bsTips('近期有机检异常产品，请注意!');
					}
					handleCounterup($(".top-info .number"), 800);
				});
		})();

		//对应CSS样式类
		var banknoteClass = {
			"9602A": "font-green-jungle",
			"103-G-2A": "font-green-jungle",
			"9603A": "font-purple",
			"103-G-3A": "font-purple",
			"9604A": "font-blue",
			"103-G-4A": "font-blue",
			"9606A": "font-green-seagreen",
			"103-G-6A": "font-green-seagreen",
			"9607T": "font-red-flamingo",
			"103-G-7T": "font-red-flamingo"
		};

		var getHisQuaData = (function() {

			//存储不同时间段质量信息
			var hisQuaHtml = [];

			function loadHisQuaData(apiID, dontRender) {
				var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + apiID + "&M=3&cache=" + config.cache;
				var prodHtml = '';
				$.ajax({
						url: str
					})
					.done(function(Data) {
						Data = $.parseJSON(Data);

						Data.data.map(function(data) {
							var prodName = data[0];
							prodHtml += '\n<div class="col-md-2 col-sm-2 col-xs-6"><div class="' + banknoteClass[prodName] + ' font-sm">' + prodName + '</div>';
							prodHtml += '			<div class="uppercase font-hg ' + banknoteClass[prodName] + '"><span class="number" data-counter="counterup" data-value=' + data[1] + '>' + data[1];
							prodHtml += '</span><span class="font-lg font-grey-mint">%</span>';
							prodHtml += '			</div></div>';
						});
						if (Data.rows === 0) {
							prodHtml = '<h3 style="padding-left:20px;height:20px;">对应时间无质量信息</h3>';
						}
						if (!dontRender) {
							$('[name="hisQuality"] .list-separated').html(prodHtml);
							handleCounterup($('[name="hisQuality"] .number'), 300);
						}
						hisQuaHtml[apiID - 169] = prodHtml;
					});
			}

			for (var i = 0; i < 3; i++) {
				hisQuaHtml[i] = loadHisQuaData(i + 169, i);
			}

			$('[name="hisQuality"] label').on('click', function() {
				$('[name="hisQuality"] .list-separated').html(hisQuaHtml[$(this).data('id')]);
				handleCounterup($('[name="hisQuality"] .number'), 300);
			});
		})();
		//处理历史质量信息
		var initQualityCharts = (function() {
			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=172&M=0&cache=" + config.cache;
			$.ajax({
					url: str
				})
				.done(function(Data) {
					Data = $.parseJSON(Data);
					var lineData = {
						element: 'passed_a_year_quality_static',
						padding: 0,
						behaveLikeLine: false,
						gridEnabled: false,
						gridLineColor: false,
						axes: false,
						fillOpacity: 1,
						ymin: 70,
						//goals:[85,90],
						//goalLineColors:['#f89f9f','#92e9dc'],
						data: Data.data,
						lineColors: ['#399a8c'], //, '#92e9dc' //399a8c
						xkey: Data.header[0].title,
						ykeys: [Data.header[1].title],
						labels: [Data.header[1].title],
						pointSize: 0,
						lineWidth: 0,
						hideHover: 'auto',
						resize: true
					};

					if (Morris.EventEmitter && Data.rows > 0) {
						// Use Morris.Area instead of Morris.Line
						dashboardMainChart = Morris.Area(lineData);
					}
				});
		})();


		var previousPoint = null;
		var olInfo;

		function showChartTooltip(x, y, xValue, yValue) {
			$('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
				position: 'absolute',
				display: 'none',
				top: y - 40,
				left: x - 40,
				border: '0px solid #ccc',
				padding: '2px 6px',
				'background-color': '#fff',
				'background': '#fff'
			}).appendTo("body").fadeIn(200);
		}

		function handleTooltip(pos, item, strUnit, fixedLen, plotData) {
			fixedLen = fixedLen || 0;
			$("#x").text(pos.x.toFixed(fixedLen));
			$("#y").text(pos.y.toFixed(fixedLen));
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
					previousSeries = item.seriesIndex - 1;

					$("#tooltip").remove();
					var x = item.datapoint[0].toFixed(fixedLen),
						y = item.datapoint[1].toFixed(fixedLen),
						xCat = item.series.data[item.datapoint[0]][0];
					//label = item.series.label.trim() + '<br>';
					var tooltipInfo, offsetY = 0;
					if (typeof plotData == 'undefined') {
						tooltipInfo = xCat + " : " + item.datapoint[1].toFixed(fixedLen) + ' ' + strUnit;
					} else {
						tooltipInfo = '<span class="caption-subject">' + xCat + '</span><br>' + plotData[previousSeries].label.trim() + " : " + item.datapoint[1].toFixed(0) + ' ' + strUnit;
						offsetY = 22;
					}
					showChartTooltip(item.pageX + 10, item.pageY - offsetY, item.datapoint[0], tooltipInfo);
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		}

		var loadOLInfo = (function() {
			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=173&M=3&cache=1440";
			$.ajax({
					url: str
				})
				.done(function(Data) {
					Data = $.parseJSON(Data);

					olInfo = {
						hardDisk: [],
						sqlSvr: [],
						data_uploads: [],
						realQuality: []
					};

					Data.data.map(function(olData) {
						olInfo.hardDisk.push([
							olData[0], olData[2]
						]);
						olInfo.sqlSvr.push([
							olData[0], Number.parseFloat(olData[3].replace('MB', '')) / 1000
						]);
						olInfo.data_uploads.push([
							olData[0], olData[4]
						]);

						//不显示丝印产品 5表示该设备为丝印产品
						if (olData[5] != 5) {
							olInfo.realQuality.push([
								olData[0], olData[1]
							]);
						}
					});

					refreshRealQuality(olInfo.realQuality);
					initFlotCharts();
				});
		})();

		var initNoteAnanyCharts = (function() {

			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=175&M=0&cache=" + config.cache;
			$.ajax({
					url: str
				})
				.done(function(Data) {

					Data = $.parseJSON(Data);
					if (Data.rows > 0) {
						var flotData = {
							element: 'noteAnany_static',
							behaveLikeLine: false,
							fillOpacity: 1,
							stacked: 0,
							ymin: 95,
							ymax: 100,
							data: Data.data,
							xkey: Data.header[0].title,
							ykeys: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
							labels: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
							hideHover: true,
							resize: true
						};

						if (Morris.EventEmitter) {
							dashboardMainChart = Morris.Bar(flotData);
						}
					}
				});
		})();

		var refreshRealQuality = function(olData) {
			$('#real_quality_loading').hide();
			$('#real_quality_content').show();
			var chartMode = 0;

			var machineData;

			var getQualityByMachine = function(machineName) {
				var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=174&M=3&machine=" + machineName + "&cache=" + config.cache;
				var Data = ReadData(str);
				return getFlotSeries(Data.data, 1);
			};

			function getFlotSeries(data1, mode) {
				mode = mode || 0;
				var color = (mode) ? '#f89f9f' : '#893a7c';
				return [{
					data: data1,
					lines: {
						fill: 0.9,
						lineWidth: 0
					},
					color: [color] //f89f9f
				}, {
					data: data1,
					yaxis: 1,
					points: {
						show: true,
						fill: true,
						radius: 5,
						fillColor: color,
						lineWidth: 3
					},
					color: '#fff',
					shadowSize: 0
				}];
			}

			var option = {
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
					},
					show: false
				},
				yaxis: {
					ticks: 5,
					tickDecimals: 0,
					tickColor: "#eee",
					//min: 50,
					max: 100,
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
					show: false
				}
			};

			$("#real_quality_statistics").bind("plothover", function(event, pos, item) {
				handleTooltip(pos, item, "%", 2);
			});

			$("#real_quality_statistics").bind("plotclick", function(event, pos, item) {
				var nodeName;
				if (!chartMode) {
					nodeName = olData[item.dataIndex][0];
					$('[name="curQuality_title"]').text(nodeName);
					machineData = getQualityByMachine(nodeName);
					$.plot($("#real_quality_statistics"), machineData, option);
					chartMode++;
				} else {
					nodeName = machineData[0]['data'][item.dataIndex][0];
					bsTips('车号追溯功能加入后跳转至' + nodeName + '详细信息', 2);
				}
			});

			$('[name="curQuality"]').on('click', function() {
				$.plot($("#real_quality_statistics"), getFlotSeries(olData), option);
				$('[name="curQuality_title"]').text('实时质量');
				chartMode = 0;
			});
			$('[name="curQuality"]').click();
		};


		//设备运行情况
		var initFlotCharts = function() {
			if (!jQuery.plot) {
				return;
			}

			var machineStatusInfo = getFlotData(olInfo.hardDisk, olInfo.sqlSvr);
			var dataUploadInfo = getFlotData2(olInfo.data_uploads);

			function getFlotData(hardDisk, sqlSvr) {
				return [{
					data: sqlSvr,
					yaxis: 1,
					lines: {
						fill: 0.6,
						lineWidth: 0
					},
					color: ['#f89f9f'],
					label: '&nbsp;数据库大小&nbsp;'
				}, {
					data: sqlSvr,
					yaxis: 1,
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
					yaxis: 2,
					lines: {
						fill: 0.6,
						lineWidth: 0
					},
					color: ['#92e9dc'],
					label: '&nbsp;硬盘可用量&nbsp;'
				}, {
					data: hardDisk,
					yaxis: 2,
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

				var plot_statistics = $.plot($("#site_statistics"), machineStatusInfo, {
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
						},
						show: false
					},
					yaxes: [{
						ticks: 5,
						tickDecimals: 0,
						tickColor: "#eee",
						min: 0,
						//max:100,
						font: {
							lineHeight: 14,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					}, {
						ticks: 5,
						tickDecimals: 0,
						tickColor: "#eee",
						position: 'right',
						font: {
							lineHeight: 14,
							style: "normal",
							variant: "small-caps",
							color: "#6F7B8A"
						}
					}],
					grid: {
						hoverable: true,
						clickable: true,
						tickColor: "#eee",
						borderColor: "#eee",
						borderWidth: 1
					},
					legend: {
						show: true,
						noColumns: false,
						container: "#site_statistics_legend"
					}
				});

				$("#site_statistics").bind("plothover", function(event, pos, item) {
					handleTooltip(pos, item, "GB", 0, machineStatusInfo);
				});
			}

			if ($('#data_upload').size() !== 0) {
				//site activities
				var previousPoint2 = null;
				$('#data_upload_loading').hide();
				$('#data_upload_content').show();
			}

			function getFlotData2(data_uploads) {
				return [{
					data: data_uploads,
					lines: {
						fill: 0.3,
						lineWidth: 0,
					},
					color: ['#BAD9F5']
				}, {
					data: data_uploads,
					points: {
						show: true,
						fill: true,
						radius: 4,
						fillColor: "#9ACAE6",
						lineWidth: 2
					},
					color: '#9ACAE6',
					shadowSize: 1,
					label: '数据上传'
				}, {
					data: data_uploads,
					lines: {
						show: true,
						fill: false,
						lineWidth: 3
					},
					color: '#9ACAE6',
					shadowSize: 0
				}];
			}

			var plot_statistics2 = $.plot($("#data_upload"), dataUploadInfo, {
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
					},
					show: false
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
					},
					max: 20
				},
				grid: {
					hoverable: true,
					clickable: true,
					tickColor: "#eee",
					borderColor: "#eee",
					borderWidth: 1
				},
				legend: {
					show: false,
					noColumns: false,
					container: "#data_upload_legend"
				}
			});

			$("#data_upload").bind("plothover", function(event, pos, item) {
				handleTooltip(pos, item, "车");
			});

			$('#data_upload').bind("mouseleave", function() {
				$("#tooltip").remove();
			});

		};


		var processQCDashboard = (function() {

			var isChart2Inited = false;

			var initChart2 = function() {

				var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=176&M=3";
				var Data = ReadData(str);
				var data = [];
				Data.data.map(function(plotData) {
					data.push([
						plotData[0], plotData[3]
					]);
				});

				var plot_statistics = $.plot(
					$("#statistics_2"), [{
						data: data,
						lines: {
							fill: 0.9,
							lineWidth: 0
						},
						color: ["#556"], //f89f9f
						label: '过程质量评分'
					}, {
						data: data,
						yaxis: 1,
						points: {
							show: true,
							fill: true,
							radius: 5,
							fillColor: "#556",
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
							ticks: 4,
							tickDecimals: 0,
							tickColor: "#f0f0f0",
							min: 96,
							max: 100,
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
							show: true
						}
					}
				);

				$("#statistics_2").bind("plothover", function(event, pos, item) {
					handleTooltip(pos, item, "分", 2);
				});
			};

			return {
				init: function() {

					$('#process_quality_cut_tab').on('shown.bs.tab', function(e) {
						if (!isChart2Inited) {
							initChart2();
							isChart2Inited = true;
						}
					});

					$('#process_quality_offline_tab').on('shown.bs.tab', function(e) {
						bsTips('即将添加');
					});
				}

			};
		})();

		jQuery(document).ready(function() {
			UIIdleTimeout.init();
			initDom();
			processQCDashboard.init();
			$('.theme-panel').hide();
			hideSidebarTool();
		});

		jQuery(window).resize(function() {
			HeadFix();
			mECharts.resize();
		});