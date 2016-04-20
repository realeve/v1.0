//堆叠柱形图中显示隐藏部分如93%中需要隐藏7%
var placeHoledStyle = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	},
	emphasis: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	}
};

//柱形图中显示相关数字的位置
var dataStyle_iL = {
	normal: {
		label: {
			show: true,
			position: 'insideLeft',
			formatter: '{c}%'
		}
	}
};
var dataStyle_iT = {
	normal: {
		label: {
			show: true,
			position: 'insideTop',
			formatter: '{c}'
		},
		//areaStyle: {type: 'default'},
	}
};
var dataStyle_iR = {
	normal: {
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}'
		}
	}
};

var BarStyle7 = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}%'
		}
	},
};

var BarStyle4 = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}%'
		}
	},
};
var BarStyle3 = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}%'
		}
	},
};

var BarStyle2 = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default',
		},
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}%'
		}
	},
};

var BarStyleFake = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideRight',
			formatter: '{c}'
		}
	},
};

var BarStyleTGreen = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideTop',
			formatter: '{c}'
		}
	},
};

var BarStyleTBlue = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		areaStyle: {
			type: 'default'
		},
		label: {
			show: true,
			position: 'insideTop',
			formatter: '{c}'
		}
	},
};

//渐变线颜色
var LineStyleArea = {
	normal: {
		areaStyle: {}
	}
};
var LineStyle = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		lineStyle: {
			width: 5,
			shadowColor: 'rgba(255,255,255,0.7)'
		}
	}
};
var LineStyleBlue = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		lineStyle: {
			width: 5,
			//type://'solid' | 'dotted' | 'dashed'//
			shadowColor: 'rgba(255,255,255,0.7)'
		}
	}
};

//多信息显示时饼图格式定义
var labelTop = {
	normal: {
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'bottom'
			}
		},
		labelLine: {
			show: false
		}
	}
};

function xround(x, num) {

	return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);

}
var labelFromatter = {
	normal: {
		color: '#ccc',
		label: {
			formatter: function(a, b, c) {
				return xround(100 - c, 2) + '%';
			}, //用四舍五入解决浮点的问题
			textStyle: {
				baseline: 'top',
				fontsize: '30',
			}
		}
	},
};
var labelBottom = {
	normal: {
		color: '#ccc',
		label: {
			show: true,
			position: 'center',
		},
		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
var radius = [70, 90];
var radius2 = [55, 70];
//标注点、标注线样式
var MPtStyle = {
	data: [{
			type: 'min',
			name: '最小值',
			//symbol: 'circle', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
			symbolSize:60,
			effect: {
				show: true,
				loop: true,
				period: 15,
				scaleSize: 1.5, //缩放倍数 
				color: null,
				shadowColor: null,
				shadowBlur: 1
			}
		}, {
			type: 'max',
			name: '最大值'
		} //'heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'
	]
};
var MPtStyleMax = {
	data: [{
			type: 'max',
			name: '最大值',
			symbol: 'circle', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
			effect: {
				show: true,
				loop: true,
				period: 15,
				scaleSize: 1.5, //缩放倍数 
				color: null,
				shadowColor: null,
				shadowBlur: 1
			},

		}, {
			type: 'min',
			name: '最小值'
		} //'heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'
	]
};
var MPtStyleMin = {
	data: [{
		type: 'min',
		name: '最小值',
		symbol: 'pin', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
		effect: {
			show: false,
			loop: true,
			period: 15,
			scaleSize: 1.5, //缩放倍数 
			color: null,
			shadowColor: null,
			shadowBlur: 1
		},
	}]
};
var MPtStyleBoth = {
	data: [{
			type: 'max',
			name: '最大值'
			//symbol:'circle',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'
		}, {
			type: 'min',
			name: '最小值'
		} //'heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'
	]
};
var MLnStyle = {
	data: [{
		type: 'average',
		name: '平均值',
		symbol: 'pin', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'
		effect: {
			show: true,
			period: 10, //越大越慢
			//shadowColor: '#77e3ff',
			shadowColor: '#FFF',
			shadowBlur: 10
		},
		itemStyle: {
			normal: {
				borderWidth: 1,
				label: {
					show: true,
					formatter: '平均值:\n{c}'
				},
				/*lineStyle: {
						type: 'solid',
						shadowBlur: 10
					}*/
			}
		},
	}, {
		type: 'max',
		name: '最大值',
		symbol: 'pin', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
		effect: {
			show: true,
			period: 10, //越大越慢
			//shadowColor: '#77e3ff',
			shadowColor: '#FFF',
			shadowBlur: 10
		},
		itemStyle: {
			normal: {
				borderWidth: 1,
				label: {
					show: true,
					formatter: '最大值:\n{c}'
				},
				/*lineStyle: {
						type: 'solid',
						shadowBlur: 10
					}*/
			}
		},
	}, {
		type: 'min',
		name: '最小值',
		symbol: 'pin', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
		effect: {
			show: true,
			period: 10, //越大越慢
			//shadowColor: '#77e3ff',
			shadowColor: '#FFF',
			shadowBlur: 10
		},
		itemStyle: {
			normal: {
				borderWidth: 1,
				label: {
					show: true,
					formatter: '最小值:\n{c}'
				},
				/*lineStyle: {
						type: 'solid',
						shadowBlur: 10
					}*/
			}
		},
	}]
};

var MLnStyle_avg = {
	data: [{
		type: 'average',
		name: '平均值',
		symbol: 'pin', //'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'
		/*effect: {
			show: true,
			period: 10, //越大越慢
			//shadowColor: '#77e3ff',
			shadowColor: '#FFF',
			shadowBlur: 10
		},*/
		itemStyle: {
			normal: {
				borderWidth: 1,
				label: {
					show: true,
					formatter: '平均值:\n{c}'
				},
				/*lineStyle: {
						type: 'solid',
						shadowBlur: 10
					}*/
			}
		},
	}]
};
var LnStyle_Normal = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		label: {
			show: false
		},
		lineStyle: {
			width: 3,
			type: 'solid',
			shadowColor: 'rgba(0,0,0,0.3)',
			shadowBlur: 1,
			shadowOffsetX: 1,
			shadowOffsetY: 1
		},
	},
	emphasis: {
		label: {
			show: false
		}
	}
};

function createRandomItemStyle() {
	return {
		normal: {
			color: 'rgb(' + [
				Math.round(Math.random() * 200 + 30),
				Math.round(Math.random() * 90 + 30),
				Math.round(Math.random() * 60 + 30)
			].join(',') + ')'
		}
	};
}