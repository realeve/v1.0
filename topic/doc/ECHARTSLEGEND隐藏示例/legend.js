var data = [{
	value: 335,
	name: '直达'
}, {
	value: 310,
	name: '邮件营销'
}, {
	value: 234,
	name: '联盟广告'
}, {
	value: 135,
	name: '视频广告'
}, {
	value: 1048,
	name: '百度'
}, {
	value: 251,
	name: '谷歌'
}, {
	value: 147,
	name: '必应'
}, {
	value: 102,
	name: '其他'
}];

option = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
		x: 'left',
		data: ['直达', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		selectedMode: 'single',
		radius: [0, '70%'],

		label: {
			normal: {
				position: 'inner'
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: data
	}]
};

function getLegendIdx(str) {
	var isSelected = 0;
	var len = option.legend.data.length;
	for (var i = 0; !isSelected && i < len; i++) {
		if (str == option.legend.data[i]) {
			isSelected = i;
		}
	}
	return isSelected;
}

//用全局事件记录鼠标点击状态
var clickStatus = [];
data.map(function(elem) {
	clickStatus.push(false);
});

// 图例开关的行为只会触发 legendselectchanged 事件
myChart.on('pieselectchanged', function(params) {

	// 获取点击图例的选中状态
	//var isSelected = params.selected[params.name];
	// 在控制台中打印
	//console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
	// 打印所有图例的状态
	//console.log(params.selected);
	//console.log(params);

	//获取所选序列的dataID
	var idx = getLegendIdx(params.name);
	var isSelected = clickStatus[idx];
	clickStatus[idx] = !isSelected;
	data[idx].itemStyle = {
		normal: {
			opacity: isSelected ? 1 : 0
		}
	};
	data[idx].label = {
		normal: {
			show: isSelected ? 1 : 0
		}
	};
	option.series[0].data = data;
	myChart.setOption(option);
});