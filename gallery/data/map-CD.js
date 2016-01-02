myChart.showLoading();
var gb = {
	chart: null,
	chart2: null,
	chart3: null,
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

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
    return res;
};

		var timestamp = new Date().getTime();
		$.ajax({
			url: "../aqi/assets/aqi.php?t=" + timestamp,
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
					gb.PM25[i].value = parseInt(aqi[i].PM25_1H, 10);
					gb.AQI[i].value = parseInt(aqi[i].AQI_1H, 10);
					gb.PM10[i].value = parseInt(aqi[i].PM10_1H, 10);
					gb.CO[i].value = parseInt(aqi[i].CO_1H, 10) * 100;
					gb.NO2[i].value = parseInt(aqi[i].NO2_1H, 10);
					gb.O3[i].value = parseInt(aqi[i].O3_1H, 10);
					gb.SO2[i].value = parseInt(aqi[i].SO2_1H, 10);
				}
				gb.rec_time = aqi[0].Rec_Time;
				//alert(JSON.stringify(convertData(gb.AQI)));
				
						
$.get('http://localhost/aqi/assets/data/chengdu.json', function (geoJson) {

    myChart.hideLoading();

    echarts.registerMap('CD', geoJson);

    myChart.setOption(option = {
				title: {
					text: '成都市环境空气质量',
					subtext: '数据来源: 成都市环境保护局\n更新时间:' + gb.rec_time.substring(0, 16),
					sublink: 'http://www.cdepb.gov.cn',
					textStyle: {
						color: '#233',
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
						'AQI': false,
						'PM10': false,
						'CO': false,
						'NO2': false,
						'O3': false,
						'SO2': false,
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
				dataRange: {
					min: 100,
					max: 300,
					text: ['高', '低'],
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
						type: 'heatmap',
						coordinateSystem: 'geo',
						mapType: 'CD', // 自定义扩展图表类型
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
						mapType: 'CD', // 自定义扩展图表类型
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
						mapType: 'CD', // 自定义扩展图表类型
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
					}, {
						name: 'CO',
						type: 'heatmap',
						coordinateSystem: 'geo',
						mapType: 'CD', // 自定义扩展图表类型
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
						mapType: 'CD', // 自定义扩展图表类型
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
						mapType: 'CD', // 自定义扩展图表类型
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
						mapType: 'CD', // 自定义扩展图表类型
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
});
