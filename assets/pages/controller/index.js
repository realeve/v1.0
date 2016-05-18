var Index = function() {
	//隐藏相关面板
	var initDOM = function() {
		$('.theme-panel').hide();
		hideSidebarTool();
	};

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

	var handleDashBoardNums = function() {
		//api:
		//SELECT a.当月质量, a.上传大万数, b.实时质量, a.异常产品 FROM ( SELECT SUM ( CASE WHEN 好品率 < 70 THEN 1 ELSE 0 END ) AS 当月质量, COUNT (*) 上传大万数, SUM ( CASE WHEN ( 正面1缺陷数 = 0 OR 正2 = 0 OR 正3 = 0 OR 正4 = 0 OR 正5 = 0 OR 背精1缺陷数 = 0 OR 精2 = 0 OR 精3 = 0 OR 精4 = 0 ) THEN 1 ELSE 0 END ) AS 异常产品 FROM dbo.view_print_hecha WHERE 生产日期 / 100 = convert(varchar(6),GETDATE(),112) ) a, ( SELECT COUNT (*) AS 实时质量 FROM dbo.view_print_online_quality WHERE 好品率 < 80 AND CONVERT (VARCHAR, 上传时间, 112) = convert(varchar,GETDATE(),112) ) b
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=168&M=3";
		var Data = ReadData(str);
		Data.data[0].map(function(statData, idx) {
			$('.dashboard-stat .number:nth(' + idx + ')').attr('data-value', data2ThousandSeparator(statData)).text(data2ThousandSeparator(statData));
		})
		handleCounterup($(".top-info .number"), 800);
	}();

	//处理历史质量信息
	var handleHisQuality = function() {
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

		function loadHisQuaData(apiID) {
			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=" + apiID + "&M=3";
			var Data = ReadData(str);
			var prodHtml = '';

			Data.data.map(function(data) {
				var prodName = data[0];
				prodHtml += '\n<div class="col-md-2 col-sm-2 col-xs-6"><div class="' + banknoteClass[prodName] + ' font-sm">' + prodName + '</div>';
				prodHtml += '			<div class="uppercase font-hg ' + banknoteClass[prodName] + '"><span class="number" data-counter="counterup" data-value=' + data[1] + '>' + data[1];
				prodHtml += '</span><span class="font-lg font-grey-mint">%</span>';
				prodHtml += '			</div></div>';
			})
			if (Data.rows == 0) {
				prodHtml = '<h3 style="padding-left:20px;height:20px;">对应时间无质量信息</h3>';
			}

			return prodHtml;
		}

		$('[name="hisQuality"] label').on('click', function() {
			$('[name="hisQuality"] .list-separated').html(hisQuaHtml[$(this).data('id')]);
			handleCounterup($('[name="hisQuality"] .number'), 300);
		});

		//存储不同时间段质量信息
		var hisQuaHtml = [];
		for (var i = 0; i < 3; i++) {
			hisQuaHtml[i] = loadHisQuaData(i + 169);
		}

		var loadDefaultVal = function() {
			//载入初始质量信息
			$('[name="hisQuality"] .list-separated').html(hisQuaHtml[0]);
			handleCounterup($('[name="hisQuality"] .number'), 300);
		}();

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

	var handleOnlineInfo = function() {

		var olInfo;
		var previousPoint = null;

		var loadOLInfo = function() {
			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=173&M=3";
			var Data = ReadData(str);
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
		};

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

		var refreshRealQuality = function() {
			$('#real_quality_loading').hide();
			$('#real_quality_content').show();
			var chartMode = 0;

			function GetData() {
				loadOLInfo();
				return olInfo.realQuality;
			}
			var olData = GetData();
			var machineData;
			/*
			{
				data: data1,
				bars: {
					show: true,
					barWidth: 0.4,
					lineWidth: 2,
					lineColors: ["#08a3cc"],
					align: "center",
					fill: 0.5
				},
				shadowSize: 0,
				color: ['#f89f9f']
			}*/

			var getQualityByMachine = function(machineName) {
				var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=174&M=3&machine=" + machineName;
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
					min: 50,
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
		}();


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
			}
		}();


	}

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

	var processQCDashboard = function() {

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


		var initNoteAnanyCharts = function() {

			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=175&M=0";
			var Data = ReadData(str);
			/*var lineData = [];
			Data.data.map(function(anayData) {
				lineData.push({
					"品种": anayData.品种,
					"机检得分": anayData.机检得分,
					"人工得分": Number.parseFloat(anayData.人工得分) - Number.parseFloat(anayData.机检得分),
					"评价总分": Number.parseFloat(anayData.评价总分) - Number.parseFloat(anayData.机检得分)
				})
			})*/
			var lineData = {
				element: 'noteAnany_static',
				padding: 0,
				behaveLikeLine: false,
				gridEnabled: false,
				gridLineColor: false,
				axes: false,
				fillOpacity: 1,
				stacked:0,
				ymin: 70,
				data: Data.data,
				//lineColors: ['#399a8c', '#92998c', '#a62343'],
				xkey: Data.header[0].title,
				ykeys: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
				labels: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
				pointSize: 0,
				lineWidth: 0,
				hideHover: 'auto',
				resize: true
			};

			if (Morris.EventEmitter) {
				// Use Morris.Area instead of Morris.Line
				dashboardMainChart = Morris.Area(lineData);
			}
		};

		var initNoteAnanyCharts2 = function() {

			var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=176&M=0";
			var Data = ReadData(str);
			/*var lineData = [];
			Data.data.map(function(anayData) {
				lineData.push({
					"品种": anayData.品种,
					"机检得分": anayData.机检得分,
					"人工得分": Number.parseFloat(anayData.人工得分) - Number.parseFloat(anayData.机检得分),
					"评价总分": Number.parseFloat(anayData.评价总分) - Number.parseFloat(anayData.机检得分)
				})
			})*/
			var lineData = {
				element: 'statistics_2',
				padding: 0,
				behaveLikeLine: false,
				gridEnabled: false,
				gridLineColor: false,
				axes: false,
				fillOpacity: 1,
				stacked:0,
				ymin: 70,
				data: Data.data,
				//lineColors: ['#399a8c', '#92998c', '#a62343'],
				xkey: Data.header[0].title,
				ykeys: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
				labels: [Data.header[1].title, Data.header[2].title, Data.header[3].title],
				pointSize: 0,
				lineWidth: 0,
				hideHover: 'auto',
				resize: true
			};

			if (Morris.EventEmitter) {
				// Use Morris.Area instead of Morris.Line
				dashboardMainChart = Morris.Area(lineData);
			}
		};
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
					bars: {
						show: true,
						barWidth: 0.4,
						lineWidth: 2,
						lineColors: ["#08a3cc"],
						align: "center",
						fill: 0.8
					},
					color: ['#BAD9F5'],
					label: 'data2'
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
						show: true
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
				//initChart1();
				initNoteAnanyCharts();

				$('#statistics_orders_tab').on('shown.bs.tab', function(e) {
					initChart2();
					//initNoteAnanyCharts2();
				});
			}

		};

	}();

	return {
		init: function() {
			initDOM();
			handleHisQuality();
			handleOnlineInfo();
			processQCDashboard.init();
			Tasks.initDashboardWidget();
			initMiniCharts();
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