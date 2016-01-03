var gb = {
	chart: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5: null,
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
	function getAQIData() {
		var timestamp = new Date().getTime();
		$.ajax({
			url: "assets/aqi.php?t=" + timestamp,
			type: "get",
			dataType: "json",
			async: true,
			success: function(data) {
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
				chengduAQIHeatMap();
				chengduAQIMap();
			}
		});
	}

	function chengduAQIHeatMap() {
		gb.chart = echarts.init(document.getElementById('mainHeatMap'));
		gb.chart3 = echarts.init(document.getElementById('mainHeatMap2'));
		$.get('assets/data/chengdu.json', function(geoJson) {
			echarts.registerMap('CD', geoJson);
			/*var str = '';
			geoJson.features.map(function(elem) {
				str+= ',"'+elem.properties.name +'":[' + elem.properties.cp+']';
			})
			var geoCoordMap = $.parseJSON('{'+str.substring(1)+'}');
			console.log(geoCoordMap);*/
			gb.chart.setOption(option = {
				title: {
					text: '成都市环境空气质量热力图',
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
					color: ['orangered', 'yellow', 'lightskyblue'],
					textStyle: {
						color: '#445'
					},
					x: 'right',
					y: 50
				},
				geo: {
					map: 'CD',
					label: {
						emphasis: {
							show: true,
							textStyle: {
								color: '#445',
								fontSize: 15
							},
						}
					},
					//roam: true,
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: '#111'
						},
						emphasis: {
							areaColor: '#2a333d'
						}
					}
				},
				roamController: {
					show: true,
					x: 'right',
					mapTypeControl: {
						'CD': true
					}
				},
				series: [{
					name: 'AQI',
					type: 'heatmap',
					coordinateSystem: 'geo',
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
					data: convertData(gb.AQI),
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM2.5',
					type: 'heatmap',
					coordinateSystem: 'geo',
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
					data: convertData(gb.PM25),
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM10',
					type: 'heatmap',
					coordinateSystem: 'geo',
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
					data: convertData(gb.PM10),
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM2.5 Top 5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(gb.PM25.sort(function(a, b) {
						return b.value - a.value;
					}).slice(0, 6)),
					symbol: 'pin',
					symbolSize: function(val) {
						return val[2] / 4;
					},
					showEffectOn: 'render',
					hoverAnimation: true,
					zlevel: 1
				}]
			});

			gb.chart3.setOption(option = {
				title: {
					text: '成都市环境空气质量热力图',
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
					data: ['CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#445'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'CO': true,
						'NO2': false,
						'O3': false,
						'SO2': false
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
					min: 0,
					max: 30,
					text: ['严重污染', '优'],
					realtime: true,
					calculable: true,
					color: ['orangered', 'yellow', 'lightskyblue'],
					textStyle: {
						color: '#445'
					},
					x: 'right',
					y: 50
				},
				geo: {
					map: 'CD',
					label: {
						emphasis: {
							show: true,
							textStyle: {
								color: '#445',
								fontSize: 15
							},
						}
					},
					//roam: true,
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: '#111'
						},
						emphasis: {
							areaColor: '#2a333d'
						}
					}
				},
				series: [{
						name: 'CO',
						type: 'heatmap',
						coordinateSystem: 'geo',
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
						data: convertData(gb.CO),
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'NO2',
						type: 'heatmap',
						coordinateSystem: 'geo',
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
						data: convertData(gb.NO2),
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'O3',
						type: 'heatmap',
						coordinateSystem: 'geo',
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
						data: convertData(gb.O3),
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'SO2',
						type: 'heatmap',
						coordinateSystem: 'geo',
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
						data: convertData(gb.SO2),
						nameMap: {
							'都江堰市': '都江堰'
						}
					},

				]
			});
		});
	}

	function chengduAQIMap() {
		gb.chart2 = echarts.init(document.getElementById('mainMap'));
		gb.chart4 = echarts.init(document.getElementById('mainMap2'));
		gb.chart5 = echarts.init(document.getElementById('mainMap3'));
		$.get('assets/data/chengdu.json', function(geoJson) {
			echarts.registerMap('CD', geoJson);
			/*var str = '';
			geoJson.features.map(function(elem) {
				str+= ',"'+elem.properties.name +'":[' + elem.properties.cp+']';
			})
			var geoCoordMap = $.parseJSON('{'+str.substring(1)+'}');
			console.log(geoCoordMap);*/
			gb.chart2.setOption(option = {
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
					color: ['orangered', 'yellow', 'lightskyblue'],
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
			gb.chart5.setOption(option = {
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
					//formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10', ],
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
				geo: {
					map: 'CD',
					label: {
						emphasis: {
							show: false
						}
					},
					//roam: true,
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: '#111'
						},
						emphasis: {
							areaColor: '#2a333d'
						}
					}
				},
				dataRange: {
					min: 50,
					max: 300,
					text: ['严重污染', '优'],
					realtime: true,
					calculable: true,
					color: ['orangered', 'yellow', 'lightskyblue'],
					textStyle: {
						color: '#445'
					},
					x: 'right',
					y: 50
				},
				series: [{
					name: 'AQI',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertScatterData(gb.AQI),
					symbolSize: function(val) {
						return val[2] / 5;
					},
					mapType: 'CD',
					//roam: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: true
						}
					},
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM2.5 Top 5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(gb.PM25.sort(function(a, b) {
						return b.value - a.value;
					}).slice(0, 6)),
					symbolSize: function(val) {
						return val[2] / 5;
					},
					showEffectOn: 'render',
					hoverAnimation: true,
					zlevel: 1
				}, {
					name: 'PM2.5',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertScatterData(gb.PM25),
					symbolSize: function(val) {
						return val[2] / 5;
					},
					mapType: 'CD',
					//roam: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: true
						}
					},
					nameMap: {
						'都江堰市': '都江堰'
					}
				}, {
					name: 'PM10',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertScatterData(gb.PM10),
					symbolSize: function(val) {
						return val[2] / 5;
					},
					type: 'map',
					mapType: 'CD',
					//roam: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: true
						}
					},
					nameMap: {
						'都江堰市': '都江堰'
					}
				}]
			});
			gb.chart4.setOption(option = {
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
					data: ['CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#445'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'CO': true,
						'NO2': false,
						'O3': false,
						'SO2': false
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
					min: 0,
					max: 30,
					text: ['严重污染', '优'],
					realtime: true,
					calculable: true,
					color: ['orangered', 'yellow', 'lightskyblue'],
					textStyle: {
						color: '#445'
					},
					x: 'right',
					y: 50
				},
				series: [{
						name: 'CO',
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
						data: gb.CO,
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'NO2',
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
						data: gb.NO2,
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'O3',
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
						data: gb.O3,
						nameMap: {
							'都江堰市': '都江堰'
						}
					}, {
						name: 'SO2',
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
						data: gb.SO2,
						nameMap: {
							'都江堰市': '都江堰'
						}
					},

				]
			});
		});
	}

	return {
		init: function() {
			getAQIData();
		}
	};
}();
$(window).resize(function() {
	gb.chart.resize();
	gb.chart2.resize();
});
$(document).ready(function() {

	$('#fullpage').fullpage({
		'verticalCentered': false,
		'css3': true,
		'sectionsColor': ['#fff', '#f9fafc', '#fff', '#f9fafc', '#fff'],
		'navigation': true,
		'navigationPosition': 'right',
		//'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
		//'continuousVertical': true,
		'anchors': ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage'],
		'menu': '.menu',
		'loopTop': true,
		'loopBottom': true
	});
	handleAQIData.init();

});