var myselect = {
	template: '#my-select-tpl',
	props: ['info']
};
var axisOffset = 2;
var data = [dataStatic, dataFake];
var ananyList = [
	[{
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
	}],
	[{
		name: '层级',
		id: 2
	}, {
		name: '流通时间',
		id: 3
	}, {
		name: '荧光亮度',
		id: 4
	}, {
		name: 'W信号',
		id: 5
	}, {
		name: 'SM信号',
		id: 6
	}]
];

var vm = new Vue({
	el: '#panel',
	components: {
		'my-select': myselect
	},
	data: {
		dataType: {
			name: '数据类型',
			options: [{
				name: '所有数据',
				id: 0,
			}, {
				name: '防伪指标',
				id: 1
			}],
			value: 0
		},
		dataIdx: {
			name: '观测指标',
			options: ananyList[0],
			value: 3
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
			}],
			value: 3
		},
		legendData: [],
		chart: ''
	},
	watch: {
		"legendList.value": function(val) {
			this.updateChart();
		},
		"dataType.value": function(val) {
			this.dataIdx.options = ananyList[val];
			this.dataIdx.value = 3;
			this.updateChart();
		},
		"dataIdx.value": function() {
			this.updateChart();
		}
	},
	methods: {
		getData: function(i) {
			var legend = [];
			var arr = [],
				series = [];
			var self = this;

			if (self.legendList.value === 0) {

				this.legendData = [];

				arr = data[self.dataType.value].map(function(item) {
					return [item[self.dataIdx.value], item[i + axisOffset]];
				});

				series = [{
					xAxisIndex: i,
					yAxisIndex: i,
					type: 'scatter',
					data: arr,
				}];

			} else {

				data[self.dataType.value].forEach(function(item) {
					legend.push(item[self.legendList.value - 1]);
				});

				legend = _.uniq(legend).sort();

				this.legendData = legend;

				legend.forEach(function(item) {
					arr[item] = [];
				});

				data[self.dataType.value].forEach(function(item) {
					arr[item[self.legendList.value - 1]].push([item[self.dataIdx.value], item[i + axisOffset]]);
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

			var len = ananyList[this.dataType.value].length;

			for (var i = 0; i < len; i++) {
				var j, k, itemX, itemY;
				if (this.dataType.value === 0) {
					j = i % 3,
						k = Math.floor(i / 3);

					grid.push({
						x: (j * 32 + 5) + '%',
						y: (k * 24 + 8) + '%',
						height: '20%',
						width: '24%',
						containLabel: true
					});

					itemX = this.getAxisData(ananyList[this.dataType.value][this.dataIdx.value - axisOffset].name, k == 2, i);
					itemY = this.getAxisData(ananyList[this.dataType.value][i].name, j === 0, i);
				} else {
					j = i % 2,
						k = Math.floor(i / 2);

					grid.push({
						x: (j * 45 + 5) + '%',
						y: (k * 30 + 8) + '%',
						height: '25%',
						width: '35%',
						containLabel: true
					});

					itemX = this.getAxisData(ananyList[this.dataType.value][this.dataIdx.value - axisOffset].name, k == 1, i);
					itemY = this.getAxisData(ananyList[this.dataType.value][i].name, j === 0, i);
				}

				//层级
				if (this.dataIdx.value == 2) {
					itemX.type = 'category';
					itemX.data = ['A类', 'B类', 'C类', 'D类'];
				}

				xAxis.push(itemX);
				yAxis.push(itemY);

				var seriesItem = this.getData(i);
				seriesItem = _.sortBy(seriesItem, 'name');

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
				color: ["#E16757", "#7ECF51", "#61A5E8", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"],
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
					data: this.legendData.sort(),
					x2: 20,
					y: 35,
					selectedMode: this.dataType.value
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