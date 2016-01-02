var gb = {
	chart: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5:null,
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


var convertScatterData = function (data) {
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
				for (var i = 0; i < aqi.length - 1; i++) {
					gb.PM25[i] = {};
					gb.AQI[i] = {};
					gb.PM10[i] = {};
					gb.CO[i] = {};
					gb.NO2[i] = {};
					gb.O3[i] = {};
					gb.SO2[i] = {};

					gb.PM25[i].name = aqi[i].PointArea;
					gb.AQI[i].name = aqi[i].PointArea;
					gb.PM10[i].name = aqi[i].PointArea;
					gb.CO[i].name = aqi[i].PointArea;
					gb.NO2[i].name = aqi[i].PointArea;
					gb.O3[i].name = aqi[i].PointArea;
					gb.SO2[i].name = aqi[i].PointArea;

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
					gb.PM25[i].value = parseFloat(aqi[i].PM25_1H, 10);
					gb.AQI[i].value = parseFloat(aqi[i].AQI_1H, 10);
					gb.PM10[i].value = parseFloat(aqi[i].PM10_1H, 10);
					gb.CO[i].value = parseFloat(aqi[i].CO_1H, 10)*10;
					gb.NO2[i].value = parseFloat(aqi[i].NO2_1H, 10);
					gb.O3[i].value = parseFloat(aqi[i].O3_1H, 10);
					gb.SO2[i].value = parseFloat(aqi[i].SO2_1H, 10);
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
						color: '#fff',
						fontSize: 30
					},
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#ccc'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'AQI': true,
						'PM10': false,
						'PM2.5':false
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
						color: '#fff'
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
								color: '#fff',
								fontSize: 15
							},
						}
					},
					roam: true,
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
						name: 'AQI',
						type: 'heatmap',
						coordinateSystem: 'geo',
						mapType: 'CD',
						roam: true,
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
						roam: true,
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
						roam: true,
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
					},
			        {
			            name: 'PM2.5 Top 5',
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            data: convertData(gb.PM25.sort(function (a, b) {
			                return b.value - a.value;
			            }).slice(0, 6)),
			            symbol:'pin',
			            symbolSize: function (val) {
			                return val[2]/4 ;
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
						color: '#fff',
						fontSize: 30
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
						color: '#ccc'
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
						color: '#fff'
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
								color: '#fff',
								fontSize: 15
							},
						}
					},
					roam: true,
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
						roam: true,
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
						roam: true,
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
						roam: true,
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
						roam: true,
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
						color: '#fff',
						fontSize: 30
					},
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#ccc'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'AQI': true,
						'PM10': false,
						'PM2.5':false
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
						color: '#fff'
					},
					x: 'right',
					y: 50
				},
				series: [{
						name: 'AQI',
						type: 'map',
						mapType: 'CD',
						roam: true,
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
						roam: true,
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
						roam: true,
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
						color: '#fff',
						fontSize: 30
					},
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					//formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#ccc'
					},
					orient: 'vertical',
					selectedMode: 'single',
					selected: {
						'AQI': true,
						'PM10': false,
						'PM2.5':false
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
			        roam: true,
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
						color: '#fff'
					},
					x: 'right',
					y: 50
				},
				series: [{
						name: 'AQI',
						type: 'scatter',
			            coordinateSystem: 'geo',
			            data: convertScatterData(gb.AQI),
			            symbolSize: function (val) {
			                return val[2] / 6;
			            },
						mapType: 'CD',
						roam: true,
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
					},
			        {
			            name: 'PM2.5 Top 5',
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            data: convertData(gb.PM25.sort(function (a, b) {
			                return b.value - a.value;
			            }).slice(0, 6)),
			            symbolSize: function (val) {
			                return val[2] / 6;
			            },
			            showEffectOn: 'render',
			            hoverAnimation: true,
			            zlevel: 1
			        }, {
						name: 'PM2.5',
						type: 'scatter',
			            coordinateSystem: 'geo',
			            data: convertScatterData(gb.PM25),
			            symbolSize: function (val) {
			                return val[2] / 6;
			            },
						mapType: 'CD',
						roam: true,
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
			            symbolSize: function (val) {
			                return val[2] / 6;
			            },
						type: 'map',
						mapType: 'CD',
						roam: true,
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
						color: '#fff',
						fontSize: 30
					},
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>{c}'
				},
				legend: {
					x: 'left',
					data: ['AQI', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3', 'SO2'],
					textStyle: {
						color: '#ccc'
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
						color: '#fff'
					},
					x: 'right',
					y: 50
				},
				series: [{
						name: 'CO',
						type: 'map',
						mapType: 'CD',
						roam: true,
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
						roam: true,
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
						roam: true,
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
						roam: true,
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

	function echartsInit() {

		var dataBJ = [
			[1, 55, 9, 56, 0.46, 18, 6, "良"],
			[2, 25, 11, 21, 0.65, 34, 9, "优"],
			[3, 56, 7, 63, 0.3, 14, 5, "良"],
			[4, 33, 7, 29, 0.33, 16, 6, "优"],
			[5, 42, 24, 44, 0.76, 40, 16, "优"],
			[6, 82, 58, 90, 1.77, 68, 33, "良"],
			[7, 74, 49, 77, 1.46, 48, 27, "良"],
			[8, 78, 55, 80, 1.29, 59, 29, "良"],
			[9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
			[10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
			[11, 39, 19, 38, 0.57, 31, 15, "优"],
			[12, 41, 11, 40, 0.43, 21, 7, "优"],
			[13, 64, 38, 74, 1.04, 46, 22, "良"],
			[14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
			[15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
			[16, 33, 6, 29, 0.34, 13, 5, "优"],
			[17, 94, 66, 110, 1.54, 62, 31, "良"],
			[18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
			[19, 57, 31, 54, 0.96, 32, 14, "良"],
			[20, 22, 8, 17, 0.48, 23, 10, "优"],
			[21, 39, 15, 36, 0.61, 29, 13, "优"],
			[22, 94, 69, 114, 2.08, 73, 39, "良"],
			[23, 99, 73, 110, 2.43, 76, 48, "良"],
			[24, 31, 12, 30, 0.5, 32, 16, "优"],
			[25, 42, 27, 43, 1, 53, 22, "优"],
			[26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
			[27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
			[28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
			[29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
			[30, 52, 24, 60, 1.03, 50, 21, "良"],
			[31, 46, 5, 49, 0.28, 10, 6, "优"]
		];

		var dataGZ = [
			[1, 26, 37, 27, 1.163, 27, 13, "优"],
			[2, 85, 62, 71, 1.195, 60, 8, "良"],
			[3, 78, 38, 74, 1.363, 37, 7, "良"],
			[4, 21, 21, 36, 0.634, 40, 9, "优"],
			[5, 41, 42, 46, 0.915, 81, 13, "优"],
			[6, 56, 52, 69, 1.067, 92, 16, "良"],
			[7, 64, 30, 28, 0.924, 51, 2, "良"],
			[8, 55, 48, 74, 1.236, 75, 26, "良"],
			[9, 76, 85, 113, 1.237, 114, 27, "良"],
			[10, 91, 81, 104, 1.041, 56, 40, "良"],
			[11, 84, 39, 60, 0.964, 25, 11, "良"],
			[12, 64, 51, 101, 0.862, 58, 23, "良"],
			[13, 70, 69, 120, 1.198, 65, 36, "良"],
			[14, 77, 105, 178, 2.549, 64, 16, "良"],
			[15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
			[16, 73, 68, 97, 0.905, 51, 34, "良"],
			[17, 54, 27, 47, 0.592, 53, 12, "良"],
			[18, 51, 61, 97, 0.811, 65, 19, "良"],
			[19, 91, 71, 121, 1.374, 43, 18, "良"],
			[20, 73, 102, 182, 2.787, 44, 19, "良"],
			[21, 73, 50, 76, 0.717, 31, 20, "良"],
			[22, 84, 94, 140, 2.238, 68, 18, "良"],
			[23, 93, 77, 104, 1.165, 53, 7, "良"],
			[24, 99, 130, 227, 3.97, 55, 15, "良"],
			[25, 146, 84, 139, 1.094, 40, 17, "轻度污染"],
			[26, 113, 108, 137, 1.481, 48, 15, "轻度污染"],
			[27, 81, 48, 62, 1.619, 26, 3, "良"],
			[28, 56, 48, 68, 1.336, 37, 9, "良"],
			[29, 82, 92, 174, 3.29, 0, 13, "良"],
			[30, 106, 116, 188, 3.628, 101, 16, "轻度污染"],
			[31, 118, 50, 0, 1.383, 76, 11, "轻度污染"]
		];

		var dataSH = [
			[1, 91, 45, 125, 0.82, 34, 23, "良"],
			[2, 65, 27, 78, 0.86, 45, 29, "良"],
			[3, 83, 60, 84, 1.09, 73, 27, "良"],
			[4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
			[5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
			[6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
			[7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
			[8, 89, 65, 78, 0.86, 51, 26, "良"],
			[9, 53, 33, 47, 0.64, 50, 17, "良"],
			[10, 80, 55, 80, 1.01, 75, 24, "良"],
			[11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
			[12, 99, 71, 142, 1.1, 62, 42, "良"],
			[13, 95, 69, 130, 1.28, 74, 50, "良"],
			[14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
			[15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
			[16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
			[17, 79, 43, 107, 1.05, 59, 37, "良"],
			[18, 71, 46, 89, 0.86, 64, 25, "良"],
			[19, 97, 71, 113, 1.17, 88, 31, "良"],
			[20, 84, 57, 91, 0.85, 55, 31, "良"],
			[21, 87, 63, 101, 0.9, 56, 41, "良"],
			[22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
			[23, 87, 62, 100, 1, 72, 28, "良"],
			[24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
			[25, 65, 45, 51, 0.74, 39, 17, "良"],
			[26, 39, 24, 38, 0.61, 47, 17, "优"],
			[27, 39, 24, 39, 0.59, 50, 19, "优"],
			[28, 93, 68, 96, 1.05, 79, 29, "良"],
			[29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
			[30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
			[31, 187, 143, 201, 1.39, 89, 53, "中度污染"]
		];

		var schema = [{
			name: 'date',
			index: 0,
			text: '日期'
		}, {
			name: 'AQIindex',
			index: 1,
			text: 'AQI'
		}, {
			name: 'PM25',
			index: 2,
			text: 'PM2.5'
		}, {
			name: 'PM10',
			index: 3,
			text: 'PM10'
		}, {
			name: 'CO',
			index: 4,
			text: ' CO'
		}, {
			name: 'NO2',
			index: 5,
			text: 'NO2'
		}, {
			name: 'SO2',
			index: 6,
			text: 'SO2'
		}, {
			name: '等级',
			index: 7,
			text: '等级'
		}];

		var lineStyle = {
			normal: {
				width: 1,
				opacity: 0.5
			}
		};

		option = {
			title: {
				text: '全国主要城市空气质量',
				subtext: 'data from 成都市环境保护局',
				sublink: 'http://www.cdepb.gov.cn',
				x: '80',
				y: 'bottom',
				textStyle: {
					color: '#fff',
					fontSize: 20
				}
			},
			legend: {
				y2: 30,
				data: ['北京', '上海', '广州'],
				itemGap: 20,
				textStyle: {
					color: '#fff',
					fontSize: 14
				}
			},
			tooltip: {
				padding: 10,
				backgroundColor: '#222',
				borderColor: '#777',
				borderWidth: 1,
				formatter: function(obj) {
					var value = obj[0].value;
					return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' + obj[0].seriesName + ' ' + value[0] + '日期：' + value[7] + '</div>' + schema[1].text + '：' + value[1] + '<br>' + schema[2].text + '：' + value[2] + '<br>' + schema[3].text + '：' + value[3] + '<br>' + schema[4].text + '：' + value[4] + '<br>' + schema[5].text + '：' + value[5] + '<br>' + schema[6].text + '：' + value[6] + '<br>';
				}
			},
			// dataZoom: {
			//     show: true,
			//     orient: 'vertical',
			//     parallelAxisIndex: [0]
			// },
			parallelAxis: [{
				dim: 0,
				name: schema[0].text,
				inverse: true,
				max: 31,
				nameLocation: 'start'
			}, {
				dim: 1,
				name: schema[1].text
			}, {
				dim: 2,
				name: schema[2].text
			}, {
				dim: 3,
				name: schema[3].text
			}, {
				dim: 4,
				name: schema[4].text
			}, {
				dim: 5,
				name: schema[5].text
			}, {
				dim: 6,
				name: schema[6].text
			}, {
				dim: 7,
				name: schema[7].text,
				type: 'category',
				data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
			}],
			parallel: {
				x: '5%',
				x2: '18%',
				y2: 100,
				parallelAxisDefault: {
					type: 'value',
					name: 'AQI指数',
					nameLocation: 'end',
					nameGap: 20,
					nameTextStyle: {
						color: '#fff',
						fontSize: 12
					},
					axisLine: {
						lineStyle: {
							color: '#aaa'
						}
					},
					axisTick: {
						lineStyle: {
							color: '#777'
						}
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					}
				}
			},
			series: [{
				name: '北京',
				type: 'parallel',
				lineStyle: lineStyle,
				data: dataBJ
			}, {
				name: '上海',
				type: 'parallel',
				lineStyle: lineStyle,
				data: dataSH
			}, {
				name: '广州',
				type: 'parallel',
				lineStyle: lineStyle,
				data: dataGZ
			}]
		};

		gb.chart2 = echarts.init(document.getElementById('main'));
		gb.chart2.setOption(option);
	}

	return {
		init: function() {
			getAQIData();
			//echartsInit();
		}
	};
}();
$(window).resize(function() {
	gb.chart.resize();
	gb.chart2.resize();
});
$(document).ready(function() {
	$('div.col-md-12').height($(window).height());
	handleAQIData.init();
});