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
            background:'#262D3A'
        };
    //var colorPalette = [colors.whiteDark,colors.whiteMedium,colors.whiteLight];
    var colorPalette = ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"];
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
                color: colors.white,
                fontSize:28
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