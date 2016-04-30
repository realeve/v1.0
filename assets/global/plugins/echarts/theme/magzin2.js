define(function() {
    //var contrastColor = '#fafafa';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: colors.dark
                }
            },
            axisTick: {
                lineStyle: {
                    color: colors.dark
                }
            },
            axisLabel: {
                textStyle: {
                    color: colors.dark
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: colors.lightdark
                }
            },
            splitArea: {
                areaStyle: {
                    color: colors.dark
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
            background:'#fbfbfb',
            dark:"#444",
            lightdark:"#999"
        };
    //var colorPalette = [colors.whiteDark,colors.whiteMedium,colors.whiteLight];
    var colorPalette = ['#4a5164','#4d8c55','#b82760','#747b8b','#bb5725','#a3cddd'];
    var theme = {
        animationDuration: 1500,
        color: colorPalette,
        backgroundColor: colors.background,
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: colors.dark
                },
                crossStyle: {
                    color: colors.dark
                }
            }
        },
        legend: {
            textStyle: {
                color: colors.dark
            }
        },
        textStyle: {
            color: colors.dark
        },
        title: {
            textStyle: {
                color: colors.dark
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: colors.dark
                }
            }
        },
        timeline: {
            lineStyle: {
                color: colors.dark
            },
            itemStyle: {
                normal: {
                    color: colorPalette[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: colors.dark
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: colors.dark,
                    borderColor: colors.dark
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),
        label: {
            normal: {
                textStyle: {
                    color: colors.white
                }
            }
        },
        line: {
            symbol: 'circle'
        },
        graph: {
            color: colorPalette
        },
        gauge: {
            title: {
                textStyle: {
                    color: colors.dark
                }
            }
        }
    };
    theme.categoryAxis.splitLine.show = false;
    return theme;
});