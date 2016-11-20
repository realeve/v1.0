var myselect = {
	template: '#my-select-tpl',
	props: ['info']
};
var axisOffset = 2;
var ananyList = [{
	name: '层级',
	id: 2
}, {
	name: '整洁度',
	id: 3
}, {
	name: '白度',
	id: 4
}, {
	name: '挺度',
	id: 5
}, {
	name: '撕裂度',
	id: 6
}, {
	name: '耐折度',
	id: 7
}, {
	name: '干拉力',
	id: 8
}, {
	name: '耐破度',
	id: 9
}, {
	name: '荧光亮度',
	id: 10
}, {
	name: 'W信号',
	id: 11
}, {
	name: 'SM信号',
	id: 12
}];

var vm = new Vue({
	el: '#panel',
	data: {
		xAxis: {
			name: '观测指标',
			options: ananyList
		},
		legendList: {
			name: '数据序列',
			options: [{
				name: '所有数据',
				id: 0,
			}, {
				name: '地区',
				id: 1
			}, {
				name: '券别',
				id: 2
			}, {
				name: '层级',
				id: 3
			}]
		},
		legendData: ['所有数据'],
		typeID: 3,
		xID: 3,
		yID: 4,
		chart: ''
	},
	watch: {
		xID: function() {
			this.updateChart();
		},
		typeID: function() {
			this.updateChart();
		}
	},
	methods: {
		getData: function(i) {
			var legend = [];
			var arr = [],
				series = [];
			var self = this;

			if (self.typeID === 0) {

				this.legendData = [];

				arr = data.map(function(item) {
					return [item[self.xID], item[i + axisOffset]];
				});

				series = [{
					xAxisIndex: i,
					yAxisIndex: i,
					type: 'scatter',
					data: arr,
				}];

			} else {

				data.forEach(function(item) {
					legend.push(item[self.typeID - 1]);
				});

				legend = _.uniq(legend);

				this.legendData = legend;

				legend.forEach(function(item) {
					arr[item] = [];
				});

				data.forEach(function(item) {
					arr[item[self.typeID - 1]].push([item[self.xID], item[i + axisOffset]]);
				});

				for (var key in arr) {
					series.push({
						name: key,
						type: 'scatter',
						xAxisIndex: i,
						yAxisIndex: i,
						data: arr[key]
					});
				}
			}
			return series;
		},
		getAxisData: function(name, isShow, index) {
			return {
				name: name,
				scale: true,
				gridIndex: index,
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: '#bbb',
						width: 1,
					}
				},
				axisLabel: {
					textStyle: {
						color: '#222',
					}
				},
				nameTextStyle: {
					fontSize: 16,
					color: '#555'
				}
			};
		},
		updateChart: function() {

			var series = [],
				grid = [],
				xAxis = [],
				yAxis = [];

			var len = ananyList.length;

			for (var i = 0; i < len; i++) {
				var j = i % 3,
					k = Math.floor(i / 3);

				grid.push({
					x: (j * 32 + 5) + '%',
					y: (k * 24 + 8) + '%',
					height: '20%',
					width: '24%',
					containLabel: true
				});
				var itemX = this.getAxisData(ananyList[this.xID - axisOffset].name, k == 2, i);
				var itemY = this.getAxisData(ananyList[i].name, j === 0, i);

				//层级
				if (this.xID == 2) {
					itemX.type = 'category';
					itemX.data = ['A类', 'B类', 'C类', 'D类'];
				}

				xAxis.push(itemX);
				yAxis.push(itemY);

				var seriesItem = this.getData(i);
				seriesItem.forEach(function(item) {
					series.push(item);
				});
			}

			yAxis[0].type = 'category';
			yAxis[0].data = ['A类', 'B类', 'C类', 'D类'];


			var option = {
				title: {
					text: '流通人民币整洁度调查',
					subtext: '抽样调查来自成都市区、资阳市区、资阳地区流通人民币数据',
					left: 'center',
					textStyle: {
						fontSize: 25,
						color: '#444',
						fontWeight: 100
					},
					subtextStyle: {
						fontSize: 15,
						color: '#777',
						fontWeight: 100
					}
				},
				color: ["#61A5E8", "#7ECF51", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"],
				grid: grid,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						show: true,
						type: 'cross',
						lineStyle: {
							type: 'dashed',
							width: 1
						}
					},
					show: true
				},
				toolbox: {
					show: true,
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						dataView: {
							readOnly: false
						},
						restore: {},
						saveAsImage: {}
					},
					left: 'left'
				},
				legend: {
					data: this.legendData,
					x2: 20,
					y: 35,
					//orient: 'vertical'
				},
				xAxis: xAxis,
				yAxis: yAxis,
				series: series
			};
			this.chart.clear();
			this.chart.setOption(option);
		}
	},
	mounted: function() {
		this.chart = echarts.init(document.getElementById('chart'));
		this.updateChart();
	}
});

window.addEventListener('resize', function() {
	vm.chart.resize();
}, false);


// area: {
// 	name: '地区',
// 	options: [{
// 		name: '成都市',
// 		id: 0
// 	}, {
// 		name: '资阳市',
// 		id: 1
// 	}, {
// 		name: '资阳县',
// 		id: 2
// 	}],
// 	value: '-1',
// 	addAll: true
// },
// noteType: {
// 	name: '券别',
// 	options: [{
// 		name: '佰圆券',
// 		id: 0
// 	}, {
// 		name: '拾圆券',
// 		id: 1
// 	}, {
// 		name: '壹圆券',
// 		id: 2
// 	}],
// 	value: '-1',
// 	addAll: true
// },
// noteClass: {
// 	name: '层级',
// 	options: [{
// 		name: 'A类',
// 		id: 0,
// 		desc: '票面整洁、完整、较新，无破损，无涂鸦文字。'
// 	}, {
// 		name: 'B类',
// 		id: 1,
// 		desc: '大部分较整洁，无破损，水印区有蹭脏。'
// 	}, {
// 		name: 'C类',
// 		id: 2,
// 		desc: '票面较脏，无破损，有折痕，有涂鸦文字。'
// 	}, {
// 		name: 'D类',
// 		id: 3,
// 		desc: '票面脏污严重，有裂口、折痕、涂鸦文字，有补的痕迹。'
// 	}],
// 	value: '-1',
// 	addAll: true
// },
// year: {
// 	name: '年份',
// 	options: [{
// 		name: '2008年',
// 		id: 0
// 	}, {
// 		name: '2009年',
// 		id: 1
// 	}, {
// 		name: '2010年',
// 		id: 2
// 	}, {
// 		name: '2011年',
// 		id: 3
// 	}, {
// 		name: '2012年',
// 		id: 4
// 	}, {
// 		name: '2013年',
// 		id: 5
// 	}, {
// 		name: '2014年',
// 		id: 6
// 	}, {
// 		name: '2015年',
// 		id: 7
// 	}, {
// 		name: '2016年',
// 		id: 8
// 	}],
// 	value: '-1',
// 	addAll: true
// },
// yAxis: {
// 	name: '因变量',
// 	options: ananyList
// },