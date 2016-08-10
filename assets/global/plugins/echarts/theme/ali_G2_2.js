define(function() {

    var theme = {
        //backgroundColor:'rgba(242,242,242,0.6)',
        //backgroundColor:'rgb(229,239,241)',
        backgroundColor: '#ffffff', //ebebeb
        // 默认色板
        color: [
            /*'#553366','#bb3355','#998899','#ff5555','#ffdd99',
        '#58423F','#888069','#C1BF95',//'#382230','#070A1E',
        '#889999','#dd9988',//'#223333',,'#bbcccc'	'#ddeedd',
		'#aa5555','#668899','#dd8855','#443344'//,'#cccccc'*/

            /*'#99CC33','#FF9900','#FFCC00','#FF9933','#99CC33','#CC6699',
            '#FF9933','#FFFF00','#3366CC','#FF9933','#FFFFCC','#009966',
            '#FF6600','#FFFF66','#009966','#990033','#CCFF66','#FF9900',

            '#99CC99','#996633','#99CC66',
            '#006600','#66CC66','#CCCC66',
            '#669933','#CCCC33','#663300','#666633','#999933','#CC9966'*/

            /*'#66CCCC','#FFCC66','#FF99CC','#FF9999','#FF6666',
            '#FFFF66','#99CC66','#666699','#99CC33','#FFCC00','#FF0033',
            '#FF9966','#FF9900','#CCFF00','#666699',
            '#CC3399','#99CC33','#FF6600','#993366','#CCCC33','#666633','#66CCCC'*/

            /*'rgb(0,150,255)', 'rgb(248,159,159)','rgb(0,200,100)', 'rgb(38,185,139)', '#998899', 'rgb(255,127,104)', 'rgb(148,205,97)', 'rgb(138,148,184)',
            'rgb(45,164,168)', 'rgb(141,74,143)', 'rgb(67,87,114)', 'rgb(254,167,67)', 'rgb(106,117,141)', 'rgb(207,34,87)',
            'rgb(207,97,80)', 'rgb(143,167,133)', 'rgb(71,74,83)', 'rgb(138,143,146)', 'rgb(218,61,61)',
            'rgb(113,37,86)', 'rgb(228,108,96)', 'rgb(185,61,95)', 'rgb(92,151,180)',
            'rgb(52,184,170)', 'rgb(252,192,104)', 'rgb(60,207,227)', 'rgb(235,56,38)', 'rgb(98,201,145)'*/
            "#4E7CCC", "#36B3C3", "#4ECDA5", "#94E08A", "#E2F194", "#EDCC72", "#F8AB60", "#F9815C", "#EB4456", "#C82B3D"
        ],
        animationDuration: 1500,
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#4A4A4A',
                fontSize: 28,
            },
            subtextStyle: {
                color: '#666'
            }
        },

        // 值域
        /* dataRange: {
             color:['rgb(26,114,151)','rgb(38,185,139)','rgb(148,205,97)']//颜色
         },*/

        // 工具箱
        toolbox: {
            color: ['rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)'],
        },
        tooltip: {
            "trigger": "item"
        },
        // 提示框
        /*tooltip: {
        //backgroundColor: 'rgba(61,61,61,0.8)',
		//borderColor: 'rgb(121,183,230)',
		backgroundColor: '#009688',
		//borderRadius: 4,
		//borderWidth: 0,
		//padding: 10,
		trigger: 'axis',
		//showDelay : 0,
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
           // type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
			type : 'cross',
            lineStyle : {          // 直线指示器样式设置
                color: 'rgb(38,185,139)',
                type: 'dashed',
				width: 1,
            },
            crossStyle: {
                color: 'rgb(38,185,139)',
            },
            shadowStyle : {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.3)'
            }
        },
		textStyle: { color: '#eee',
                     fontSize:12}
    },*/

        // 区域缩放控制器
        /*dataZoom: {
            dataBackgroundColor: 'rgb(98,201,145)',            // 数据背景颜色
            fillerColor: 'rgba(98,201,145,0.4)',   // 填充颜色
            handleColor: 'rgb(38,185,139)'     // 手柄颜色
        },*/

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
            boundaryGap: true, //此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
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
                    width: 1,
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
        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: 'rgb(255,107,104)', // 阳线填充颜色
                    color0: 'rgb(38,185,139)', // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: 'rgb(255,107,104)', // 阳线边框颜色
                        color0: 'rgb(38,185,139)' // 阴线边框颜色
                    }
                }
            }
        },

        map: {
            itemStyle: {
                normal: {
                    areaStyle: {
                        color: '#ddd'
                    },
                    label: {
                        textStyle: {
                            color: '#c12e34'
                        }
                    }
                },
                emphasis: { // 也是选中样式
                    areaStyle: {
                        color: '#99d2dd'
                    },
                    label: {
                        textStyle: {
                            color: '#c12e34'
                        }
                    }
                }
            }
        },

        force: {
            itemStyle: {
                normal: {
                    linkStyle: {
                        strokeColor: 'rgb(38,185,139)'
                    }
                }
            }
        },

        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    },
                    chordStyle: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },

        gauge: {
            startAngle: 225,
            endAngle: -45,
            axisLine: { // 坐标轴线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                        [0.2, 'rgb(148,205,97)'],
                        [0.8, 'rgb(38,185,139)'],
                        [1, 'rgb(255,107,104)']
                    ],
                    width: 8
                }
            },
            axisTick: { // 坐标轴小标记
                splitNumber: 10, // 每份split细分多少段
                length: 12, // 属性length控制线长
                lineStyle: { // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: { // 分隔线
                length: 18, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                color: 'auto'
            },
            title: {
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },

        textStyle: {
            fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
        }
    }

    return theme;
});