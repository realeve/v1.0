var bubbleOption = function() {
	var hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var days = ['星期一', '星期二', '星期三',
		'星期四', '星期五', '星期六', '星期日'
	];

	var data = [
		[3, 6, 90.04],
		[8, 5, 86.53],
		[8, 3, 85.07],
		[7, 4, 85.16],
		[7, 2, 85.93],
		[8, 6, 81.32],
		[3, 3, 86.41],
		[2, 4, 87.03],
		[10, 5, 86.58],
		[12, 2, 85.24],
		[5, 1, 86.31],
		[1, 3, 81.94],
		[7, 1, 84.79],
		[10, 3, 86.88],
		[3, 5, 86.14],
		[1, 6, 86.82],
		[12, 4, 84.5],
		[2, 2, 86.86],
		[12, 1, 83.41],
		[4, 4, 86.48],
		[5, 5, 86.38],
		[4, 2, 86.4],
		[12, 3, 88.37],
		[2, 1, 85.34],
		[5, 6, 84.08],
		[9, 2, 87.42],
		[11, 4, 85.49],
		[5, 7, 87.59],
		[7, 5, 84.67],
		[11, 2, 84.69],
		[10, 6, 87.18],
		[9, 1, 87.14],
		[9, 4, 86.91],
		[12, 5, 83.03],
		[5, 3, 86.08],
		[1, 4, 86.85],
		[11, 1, 84.16],
		[9, 7, 87.46],
		[1, 2, 82.68],
		[9, 3, 87.9],
		[2, 5, 86.52],
		[6, 2, 86.96],
		[8, 2, 84.37],
		[4, 1, 85.66],
		[7, 3, 84.65],
		[4, 5, 86.57],
		[8, 4, 85.19],
		[6, 4, 86.23],
		[6, 1, 86.01],
		[2, 3, 86.2],
		[9, 6, 80.01],
		[9, 5, 85.79],
		[8, 1, 82.54],
		[11, 3, 84.56],
		[11, 5, 86.19],
		[3, 2, 86.77],
		[6, 3, 86.87],
		[10, 4, 86.59],
		[1, 1, 82.96],
		[4, 3, 86.69],
		[5, 2, 87.04],
		[5, 4, 85.81],
		[1, 5, 82.81],
		[10, 1, 86.31],
		[3, 1, 86.71],
		[10, 2, 86.57],
		[3, 4, 87.08],
		[6, 5, 86.46]
	];

	min = data.map(function(item) {
		return item[2];
	});
	min.sort();
	data = data.map(function(item) {
		return [item[0] - 1, item[1] - 1, item[2] || '-'];
	});

	option = {
		backgroundColor: '#445',
		title: {
			text: '机检好品率分布情况',
			subtext: '2014 码后核查系统',
			sublink: 'http://localhost',
			x: 'center',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			position: 'top'
		},
		animation: false,
		grid: {
			height: '90%',
			y: 20,
			x: 20,
			x2: 20,
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: hours,
			splitLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#fee'
				}
			},
			axisLine: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			data: days,
			splitLine: {
				lineStyle: {
					color: '#777'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#fee'
				}
			}
		},
		dataRange: {
			min: 80,
			max: 90,
			calculable: true,
			//orient: 'horizontal',
			x: 'right',
			y: 4,
			color: ['#e23', '#23e'],
			textStyle: {
				color: '#fff'
			},
			splitNumber: 5,
			// inRange: {
			//    color: ['#d94e5d','#eac736','#50a3ba'].reverse()
			//},
		},
		series: [{
			name: '好品率',
			type: 'scatter',
			data: data,
			symbolSize: function(val) {
				return (val[2] - min[0] + 1) * 6;
			},
		}]
	};
	return option;
}();

var gb = {
	chart: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5: null,
	chart6: null,
	PM25: null,
	AQI: null,
	PM10: null,
	CO: null,
	NO2: null,
	O3: null,
	SO2: null,
	rec_time: null
};

var geoCoordMap = {
	"锦江区": [104.080989, 30.657689],
	"青羊区": [104.055731, 30.667648],
	"金牛区": [104.043487, 30.692058],
	"武侯区": [104.05167, 30.630862],
	"成华区": [104.103077, 30.660275],
	"龙泉驿区": [104.269181, 30.56065],
	"青白江区": [104.25494, 30.883438],
	"新都区": [104.16022, 30.824223],
	"双流县": [103.922706, 30.573243],
	"郫县": [103.887842, 30.808752],
	"大邑县": [103.522397, 30.586602],
	"温江区": [103.836776, 30.697996],
	"蒲江县": [103.511541, 30.194359],
	"金堂县": [104.415604, 30.858417],
	"新津县": [103.812449, 30.414284],
	"都江堰市": [103.627898, 30.99114],
	"邛崃市": [103.46143, 30.413271],
	"崇州市": [103.671049, 30.631478],
	"彭州市": [103.941173, 30.985161]
};

var convertData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if (geoCoord) {
			res.push(geoCoord.concat(data[i].value));
		}
	}
	return res;
};


var convertScatterData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value)
			});
		}
	}
	return res;
};

var handleAQIData = function() {
	function initData(data) {
		gb.PM25 = [];
		gb.AQI = [];
		gb.PM10 = [];
		gb.CO = [];
		gb.NO2 = [];
		gb.O3 = [];
		gb.SO2 = [];
		var aqi = data.Head;
		//重复数据过滤标志
		var Flag = 0;
		for (var k = 0, i = 0; k < aqi.length - 1; k++) {
			Flag = 0;
			for (var j = 0; j < i; j++) {
				if (gb.AQI[j].name == aqi[k].PointArea) {
					Flag = 1;
					break;
				}
			}
			if (Flag) {
				k++;
				continue;
			}
			gb.PM25[i] = {};
			gb.AQI[i] = {};
			gb.PM10[i] = {};
			gb.CO[i] = {};
			gb.NO2[i] = {};
			gb.O3[i] = {};
			gb.SO2[i] = {};

			gb.PM25[i].name = aqi[k].PointArea;
			gb.AQI[i].name = aqi[k].PointArea;
			gb.PM10[i].name = aqi[k].PointArea;
			gb.CO[i].name = aqi[k].PointArea;
			gb.NO2[i].name = aqi[k].PointArea;
			gb.O3[i].name = aqi[k].PointArea;
			gb.SO2[i].name = aqi[k].PointArea;

			if (aqi[i].PM25_1H === "") {
				aqi[i].PM25_1H = '-';
			}
			if (aqi[i].SO2_1H === "") {
				aqi[i].SO2_1H = '-';
			}
			if (aqi[i].NO2_1H === "") {
				aqi[i].NO2_1H = '-';
			}
			if (aqi[i].PM10_1H === "") {
				aqi[i].PM10_1H = '-';
			}
			if (aqi[i].CO_1H === "") {
				aqi[i].CO_1H = '-';
			}
			if (aqi[i].O3_1H === "") {
				aqi[i].O3_1H = '-';
			}
			if (aqi[i].AQI_1H === "") {
				aqi[i].AQI_1H = '-';
			}
			gb.PM25[i].value = parseFloat(aqi[k].PM25_1H, 10);
			gb.AQI[i].value = parseFloat(aqi[k].AQI_1H, 10);
			gb.PM10[i].value = parseFloat(aqi[k].PM10_1H, 10);
			gb.CO[i].value = parseFloat(aqi[k].CO_1H, 10) * 10;
			gb.NO2[i].value = parseFloat(aqi[k].NO2_1H, 10);
			gb.O3[i].value = parseFloat(aqi[k].O3_1H, 10);
			gb.SO2[i].value = parseFloat(aqi[k].SO2_1H, 10);
			i++;
		}
		gb.rec_time = aqi[0].Rec_Time;
		chengduAQIMap();
	}

	function getAQIData() {
		var timestamp = new Date().getTime();
		$.ajax({
			url: "assets/aqi.php?t=" + timestamp,
			type: "get",
			dataType: "json",
			async: true,
			success: function(data,status) {
				initData(data);
			},
			error:function(){
				var url = "assets/data/ChengDuWeather.json";
				$.get(url,function(json){
					initData(json);
				});
			}
		});
	}

	var boxOption = function() {
		function xround(x, num) {
			return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
		}
		// Generate data.
		data = [];
		for (var seriesIndex = 0; seriesIndex < 4; seriesIndex++) {
			var seriesData = [];
			for (var i = 0; i < 20; i++) {
				var cate = [];
				for (var j = 0; j < 100; j++) {
					cate.push(Math.random() * 50 + 50);
				}
				seriesData.push(cate);
			}
			data.push(echarts.dataTool.prepareBoxplotData(seriesData));
		}

		option = {
			title: {
				text: '箱形图',
				x: 'center',
			},
			legend: {
				y: '10%',
				data: ['系列1', '系列2', '系列3', '系列4']
			},
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				x: '10%',
				y: '20%',
				x2: '10%',
				y2: '15%'
			},
			xAxis: {
				type: 'category',
				data: data[0].axisData,
				boundaryGap: true,
				nameGap: 30,
				splitArea: {
					show: true
				},
				axisLabel: {
					formatter: 'expr {value}'
				},
				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				name: 'Value',
				min: 0,
				max: 150,
				splitArea: {
					show: false
				}
			},
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 20
			}, {
				show: true,
				height: 20,
				type: 'slider',
				y: '90%',
				xAxisIndex: [0],
				start: 0,
				end: 20
			}],
			series: [{
				name: '系列1',
				type: 'boxplot',
				data: data[0].boxData,
				tooltip: {
					formatter: formatter
				}
			}, {
				name: '系列2',
				type: 'boxplot',
				data: data[1].boxData,
				tooltip: {
					formatter: formatter
				}
			}, {
				name: '系列3',
				type: 'boxplot',
				data: data[2].boxData,
				tooltip: {
					formatter: formatter
				}
			}, {
				name: '系列4',
				type: 'boxplot',
				data: data[3].boxData,
				tooltip: {
					formatter: formatter
				}
			}]
		};

		function formatter(param) {
			return [
				'第 ' + param.name + '组: ',
				'上边缘: ' + xround(param.data[4], 2),
				'Q3: ' + xround(param.data[3], 2),
				'中位数: ' + xround(param.data[2], 2),
				'Q1: ' + xround(param.data[1], 2),
				'下边缘: ' + xround(param.data[0], 2)
			].join('<br/>');
		}
		return option;
	}();

	function chengduAQIMap() {
		gb.chart6 = echarts.init(document.getElementById('mainMap'));
		$.get('assets/data/chengdu.json', function(geoJson) {
			echarts.registerMap('CD', geoJson);
			/*var str = '';
			geoJson.features.map(function(elem) {
				str+= ',"'+elem.properties.name +'":[' + elem.properties.cp+']';
			})
			var geoCoordMap = $.parseJSON('{'+str.substring(1)+'}');
			console.log(geoCoordMap);*/
			gb.chart6.setOption(option = {
				title: {
					text: '成都市环境空气质量',
					subtext: '数据来源: 成都市环境保护局\n更新时间:' + gb.rec_time.substring(0, 16),
					sublink: 'http://www.cdepb.gov.cn',
					textStyle: {
						color: '#445',
						fontSize: 30
					},
					subtextStyle: {
						color: '#445',
						fontSize: 15,
						bold: true
					},
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10'],
					textStyle: {
						color: '#445'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'AQI': false,
						'PM10': false,
						'PM2.5': true
					}
				},
				toolbox: {
					show: true,
					orient: 'vertical',
					x: 'right',
					y: 'center',
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				dataRange: {
					min: 50,
					max: 300,
					text: ['严重污染', '优'],
					realtime: true,
					calculable: true,
					color: ['#e23','lightskyblue'],
					textStyle: {
						color: '#445'
					},
					x: 'right',
					y: 50
				},
				series: [{
					name: 'AQI',
					type: 'map',
					mapType: 'CD',
					//roam: true,
					itemStyle: {
						normal: {
							label: {
								show: true
							}
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: gb.AQI,
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM2.5',
					type: 'map',
					mapType: 'CD',
					//roam: true,
					itemStyle: {
						normal: {
							label: {
								show: true
							}
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: gb.PM25,
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM10',
					type: 'map',
					mapType: 'CD',
					//roam: true,
					itemStyle: {
						normal: {
							label: {
								show: true
							}
						},
						emphasis: {
							label: {
								show: true
							}
						}
					},
					data: gb.PM10,
					nameMap: {
						'都江堰市': '都江堰'
					}
				}]
			});

		});
	}

	var Option3 = {
		color: [
			'rgba(255, 69, 0, 0.75)',
			'rgba(255, 150, 0, 0.75)',
			'rgba(255, 200, 0, 0.75)',
			'rgba(155, 200, 50, 0.75)',
			'rgba(55, 200, 100, 0.75)'
		],
		title: {
			text: '数据统计应用的现状',
			x: 'center',
			y: 'bottom',
			textStyle: {
				fontSize: 40
			}
		},
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: function(a, b, c) {
				var strLable;
				switch (a.dataIndex) {
					case 0:
						strLable = "在公司信息资源规划项目里生产数据中心的建设中，</br>通过将现有系统数据按一定标准进行整合存储，</br>为海量数据的联合分析提供了可能";
						break;
					case 1:
						strLable = "各部门根据业务需求开发系统实现数据采集并通过数据库技术</br>实现业务报表生成。由于各系统相对独立，数据分析受采集量</br>的限制，公司数据统计分析也多在这个层次进行";
						break;
					case 2:
						strLable = "手工将原始数据汇总至Excel中并手工汇总数据。</br>效率低下且无法快速检索，也是目前通用的一种方式。";
						break;
					case 3:
						strLable = "手工填写纸质记录并手工汇总数据。</br>信息只能翻查原始记录本查看，</br>有部分工序仍采用这种方式。";
						break;
				}
				return strLable;
			}
		},
		toolbox: {
			show: true,
			feature: {
				/*mark : {show: true},
				dataView : {show: true, readOnly: false},*/
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		series: [{
			type: 'funnel',
			x: '10%',
			width: '80%',
			sort: 'ascending',
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 2,
					label: {
						formatter: '{b}',
						textStyle: {
							fontSize: '24',
							fontWeight: 'bold'
						},
					}
				},
				emphasis: {
					label: {
						formatter: '{b}',
						position: 'inside',
						textStyle: {
							color: '#fff',
							fontSize: '24',
							fontWeight: 'bold'
						},
					},
					labelLine: {
						show: false
					}
				}
			},
			data: [{
				value: 25,
				name: '4.数据中心',
				itemStyle: {
					emphasis: {
						label: {
							show: false
						}
					}
				}
			}, {
				value: 50,
				name: '3.数据库记录',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}, {
				value: 75,
				name: '2.Excel记录',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}, {
				value: 100,
				name: '1.纸质记录',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}]
		}]
	};

	var Option4 = {
		color: [
			'rgba(255, 69, 0, 0.75)',
			'rgba(255, 150, 0, 0.75)',
			'rgba(255, 200, 0, 0.75)',
			'rgba(155, 200, 50, 0.75)',
			'rgba(55, 200, 100, 0.75)'
		],
		title: {
			text: '数据采集应用的分层模型',
			x: 'center',
			y: 'bottom',
			textStyle: {
				fontSize: 40
			}
		},
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: function(a, b, c) {
				var strLable;
				switch (a.dataIndex) {
					case 0:
						strLable = "应用层：开发与用户直接交互的前台功能";
						break;
					case 1:
						strLable = "商业智能：对数据做针对性分析，并建立中间表格";
						break;
					case 2:
						strLable = "数据挖掘：对数据梳理、清洗、转换";
						break;
					case 3:
						strLable = "数据仓库：将原始数据统一存储";
						break;
					case 4:
						strLable = "数据库:本地原始数据库数据";
						break;
				}
				return strLable;
			}
		},
		toolbox: {
			show: true,
			feature: {
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		series: [{
			type: 'funnel',
			x: '10%',
			width: '80%',
			sort: 'ascending',
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 2,
					label: {
						formatter: '{b}',
						textStyle: {
							fontSize: '24',
							fontWeight: 'bold'
						},
					}
				},
				emphasis: {
					label: {
						formatter: '{b}',
						position: 'inside',
						textStyle: {
							color: '#fff',
							fontSize: '24',
							fontWeight: 'bold'
						},
					},
					labelLine: {
						show: false
					}
				}
			},
			data: [{
				value: 20,
				name: '前端应用层\n(直接面向用户)',
				itemStyle: {
					emphasis: {
						label: {
							show: false
						}
					}
				}
			}, {
				value: 40,
				name: 'BI(Business\nIntelligence)',
				itemStyle: {
					emphasis: {
						label: {
							show: false
						}
					}
				}
			}, {
				value: 60,
				name: 'DM(Data Mining)',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}, {
				value: 80,
				name: 'DW(Data Warehouse)',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}, {
				value: 100,
				name: 'DB(Database)',
				itemStyle: {
					normal: {
						label: {
							position: 'inside',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}]
		}]
	};


	function QualityData() {
		gb.chart = echarts.init(document.getElementById('main'));
		gb.chart.setOption(bubbleOption);
		gb.chart2 = echarts.init(document.getElementById('main2'));
		gb.chart2.setOption(boxOption);
		gb.chart3 = echarts.init(document.getElementById('main3'));
		gb.chart3.setOption(Option3);
		gb.chart4 = echarts.init(document.getElementById('main4'));
		gb.chart4.setOption(Option4);
	}

	return {
		init: function() {
			QualityData();
			getAQIData();
		}
	};
}();

var globalFunc = function() {
	function today() {
		var date = new Date();
		var a = date.getFullYear();
		var b = date.getMonth() + 1;
		var c = date.getDate();
		return a + '年' + b + '月' + c + '日';
	}
	return {
		today: function() {
			return today();
		}
	};
}();

$(window).resize(function() {
	gb.chart.resize();
	gb.chart2.resize();
	gb.chart3.resize();
	gb.chart4.resize();
	gb.chart5.resize();
	gb.chart6.resize();
});
$(document).ready(function() {
	//间隔背景
	for (var secColor = [], i = 0; i < $('.section').length; secColor[i++] = (i % 2) ? '#fff' : '#e6e7e8');
	$('#fullpage').fullpage({
		'verticalCentered': false,
		'css3': true,
		'sectionsColor': secColor,
		'navigation': true,
		'navigationPosition': 'right',
		//'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
		//'continuousVertical': true,
		'anchors': ['firstPage', 'firstPage','firstPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', 'secondPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '3rdPage', '4thPage', '4thPage', '4thPage', '4thPage', '4thPage', '4thPage', '4thPage', '4thPage', '4thPage', 'lastPage'],
		'menu': '.menu',
		'loopTop': true,
		'loopBottom': true
	});
	handleAQIData.init();
	$('#today').text(globalFunc.today);

});