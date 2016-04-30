define(function() {
    //var contrastColor = '#fafafa';
    var axisCommon = function() {
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
    var colors = {
        white: "#FFF",
        white9: "rgba(255,255,255,0.9)",
        white8: "rgba(255,255,255,0.8)",
        white7: "rgba(255,255,255,0.7)",
        white6: "rgba(255,255,255,0.6)",
        white5: "rgba(255,255,255,0.5)",
        white4: "rgba(255,255,255,0.4)",
        white3: "rgba(255,255,255,0.3)",
        whiteLight: "rgba(255, 255, 255, 0.2)",
        whiteLighter: "rgba(255, 255, 255, 0.1)",
        primary: "#556fb5",
        primaryLight: "#889acb",
        background: '#556',
        dark: '#556'
    };
    var colorPalette = [colors.white7, colors.white6, colors.white5, colors.white4];
    //var colorPalette = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
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
        label: {
            normal: {
                textStyle: {
                    color: colors.dark
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
                    color: colors.white
                }
            }
        }
    };
    theme.categoryAxis.splitLine.show = false;
    return theme;
});