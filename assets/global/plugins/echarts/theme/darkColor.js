define(function() {
    //var contrastColor = '#fafafa';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: colors.white
                }
            },
            axisTick: {
                lineStyle: {
                    color: colors.white
                }
            },
            axisLabel: {
                textStyle: {
                    color: colors.white
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: colors.whiteLighter
                }
            },
            splitArea: {
                areaStyle: {
                    color: colors.white
                }
            }
        };
    };

    //var colorPalette = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
    var colors= {
            white: "#FFF",
            whiteDark:"rgba(255,255,255,0.6)",
            whiteMedium:"rgba(255,255,255,0.4)",
            whiteLight: "rgba(255, 255, 255, 0.2)",
            whiteLighter: "rgba(255, 255, 255, 0.1)",
            primary: "#556fb5",
            primaryLight: "#889acb",
            background:'#141833'
        };
    //var colorPalette = [colors.whiteDark,colors.whiteMedium,colors.whiteLight];
    var colorPalette = ['#ef443a','#2aa682','#eb6526','#faaf18','#8c70a1','#e892ad','#86c8be'];
    var theme = {
        animationDuration: 1500,
        color: colorPalette,
        backgroundColor: colors.background,
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: colors.white
                },
                crossStyle: {
                    color: colors.white
                }
            }
        },
        legend: {
            textStyle: {
                color: colors.white
            }
        },
        textStyle: {
            color: colors.white
        },
        title: {
            textStyle: {
                color: colors.white
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: colors.white
                }
            }
        },
        timeline: {
            lineStyle: {
                color: colors.white
            },
            itemStyle: {
                normal: {
                    color: colorPalette[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: colors.white
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: colors.white,
                    borderColor: colors.white
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),

        line: {
            symbol: 'circle'
        },
        graph: {
            color: colorPalette
        },
        gauge: {
            title: {
                textStyle: {
                    color: colors.white
                }
            }
        }
    };
    theme.categoryAxis.splitLine.show = false;
    return theme;
});