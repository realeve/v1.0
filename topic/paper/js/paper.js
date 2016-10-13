    require.config({
      baseUrl: "../../assets/global/plugins/",
      paths: {
        "echarts": "echarts/js/echarts.min",
        "chartDataTool": "echarts/js/extension/chartDataTool.min"
      }
    });

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

      // 工具箱
      toolbox: {
        color: ['rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)', 'rgb(38,185,139)'],
      },
      tooltip: {
        "trigger": "item"
      },
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
          show: false,
          areaStyle: {
            color: ['rgba(144,238,144,0.2)', 'rgba(255,255,255,0.05)']
          }
        },
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
      textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
      }
    };
    var paper = (function() {

      initDashboardDaterange('YYYYMMDD');

      function getUrl(id, date) {
        return getRootPath() + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&tstart=" + date.start + "&tend=" + date.end;
      }

      var myChart;
      var echarts, chartDataTool;
      var option;

      //配置图表库
      var mECharts = function(date) {
        require(["echarts", "chartDataTool"], function(ec, dt) {
          var defaultTheme;
          echarts = ec;
          chartDataTool = dt;
          handleChart(getUrl(308, date), 'chart', theme);
        });
      };

      var handleChart = function(url, objId, curTheme) {

        if (!echarts) {
          return;
        }

        $.ajax({
            url: url
          })
          .done(function(data) {

            data = $.parseJSON(data);
            if (data.rows === 0) {
              $('#' + objId).parent().hide();
              return;
            }
            $('#' + objId).parent().show();
            var objRequest = {
              url: url,
              type: 'sunrise',
              data: data
            };

            if (typeof curTheme.color != 'undefined') {
              objRequest.color = curTheme.color;
            }

            var option = chartDataTool.getOption(objRequest, echarts);
            if (option !== false) {
              delete option.title;
              delete option.toolbox;
              delete option.dataZoom;
              delete option.grid;
              option.legend.y = 0;
              option.legend.x = 'left';
              option.series[0].radius = ['5%', '45%'];
              option.series[1].radius = ['45%', '90%'];
              option.series[1].label = {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#444'
                  }
                }
              };
              option.series[1].labelLine = {
                normal: {
                  length: 5,
                  length2: 5
                }
              };
            }

            myChart = echarts.init(document.getElementById(objId), curTheme);

            myChart.setOption(option);
          });
      };

      var handleData = function() {
        var date = getDateRange();
        $('#date').html(jsRight(date.start, 4) + ' ~ ' + jsRight(date.end, 4));
        mECharts(date);
        handleTable(getUrl(306, date), $('#goodrate'));
        handleTable(getUrl(307, date), $('#check'));

      };


      jQuery(window).resize(function() {
        myChart.resize();
      });

      return {
        init: function() {
          $('.page-container').css('margin-top', '16px');
          handleData();
          $(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
            handleData();
          });
        }
      };
    })();

    jQuery(document).ready(function() {
      UIIdleTimeout.init();
      initDom();
      HeadFix();
      paper.init();
    });