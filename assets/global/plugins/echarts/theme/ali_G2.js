define(function() {

    var theme = {
        backgroundColor: '#ffffff', 
        // 默认色板
        color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"],
        animationDuration: 1500,
        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'bold',
                color: '#666',
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
            boundaryGap: true, //此处设为TRUE,柱形图会溢出边界）
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
                    width: 1
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
                show: true,
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