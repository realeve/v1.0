define(function() {

    var theme = {
        backgroundColor: 'rgb(229,239,241)',
        // 默认色板
        color: [
            'rgb(60,72,92)', 'rgb(243,111,91)', 'rgb(38,185,139)', 'rgb(68,68,68)',
            '#998899', 'rgb(255,127,104)', 'rgb(148,205,97)', 'rgb(138,148,184)',
            'rgb(45,164,168)', 'rgb(141,74,143)', 'rgb(67,87,114)', 'rgb(254,167,67)', 'rgb(106,117,141)', 'rgb(207,34,87)',
            'rgb(207,97,80)', 'rgb(143,167,133)', 'rgb(71,74,83)', 'rgb(138,143,146)', 'rgb(218,61,61)',
            'rgb(113,37,86)', 'rgb(228,108,96)', 'rgb(185,61,95)', 'rgb(92,151,180)',
            'rgb(52,184,170)', 'rgb(252,192,104)', 'rgb(60,207,227)', 'rgb(235,56,38)', 'rgb(98,201,145)'
        ],

        // 图表标题
        title: {
            itemGap: 8,
            textStyle: {
                fontWeight: 'normal',
                color: '#4A4A4A',
                fontSize: 28,
            },
            subtextStyle: {
                color: '#666',
                fontSize: 16,
            },
            copyright: {
                text: '©成都印钞有限公司 技术质量部',
                textStyle: {
                    fontSize: 14,
                    color: '#333'
                },
            }
        },

        // 值域
        /*dataRange: {
            color: ['rgb(38,185,139)', 'rgb(148,205,97)'], //颜色 
            textStyle: {
                color: '#333'
            }
        },*/

        // 工具箱
        toolbox: {
            color: ['rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)'],
        },

        // 提示框
        tooltip: {
            backgroundColor: 'rgba(61,61,61,0.8)',
            borderColor: 'rgb(121,183,230)',
            borderRadius: 4,
            borderWidth: 0,
            padding: 10,
            trigger: 'axis',
            showDelay: 0,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                // type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                type: 'cross',
                lineStyle: { // 直线指示器样式设置
                    color: 'rgb(38,185,139)',
                    type: 'dashed',
                    width: 1,
                },
                crossStyle: {
                    color: 'rgb(38,185,139)',
                },
                shadowStyle: { // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            textStyle: {
                color: '#eee',
                fontSize: 12
            },
        },

        // 区域缩放控制器
        /*dataZoom: {
            dataBackgroundColor: 'rgb(98,201,145)', // 数据背景颜色
            fillerColor: 'rgba(98,201,145,0.4)', // 填充颜色
            handleColor: 'rgb(38,185,139)' // 手柄颜色
        },*/

        grid: {
            borderWidth: 0,
            y: 90,
        },

        // 类目轴
        categoryAxis: {
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: '#aaa',
                    width: 4,
                }
            },
            //boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#ddd'],
                    width: 1,
                    //type: 'solid'
                }
            },
            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#222',
                    fontSize: 16,
                }
            },
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
                    fontSize: 16,
                }
            },
            splitLine: { // 分隔线
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ddd']
                },
                show: false,
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
            smooth: true,
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
                },
                emphasis: {
                    label: {
                        show: false
                    }
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

                    borderColor: '#fff',
                    borderWidth: 1,
                    label: {
                        show: true,
                        position: 'outer',
                        textStyle: {
                            color: '#1b1b1b'
                        },
                        lineStyle: {
                            color: '#1b1b1b'
                        }

                    },
                    labelLine: {
                        show: true,
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
                    borderColor: '#fff',
                    borderWidth: 1,
                    areaStyle: {
                        color: '#ccc'
                    },
                    label: {
                        show: false,
                        textStyle: {
                            color: 'rgba(139,69,19,1)'
                        }
                    }
                },
                emphasis: {

                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    areaStyle: {
                        color: '#f3d999'
                    },
                    label: {
                        show: false,
                        textStyle: {
                            color: 'rgba(139,69,19,1)'
                        }
                    }
                }
            }
        },

        force: {
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    nodeStyle: {
                        brushType: 'both',
                        strokeColor: '#5182ab'
                    },
                    linkStyle: {
                        strokeColor: '#5182ab'
                    }
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    nodeStyle: {},
                    linkStyle: {}
                }
            }
        },

        gauge: {
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
    };

    return theme;
});