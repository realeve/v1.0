/**
 * 模块说明：将"SELECT Legend,xAxisData,yAxisData FROM TABLE"类型的SQL查询结果数据转换成eCharts常用图表对应的配置项
 *
 * 数据暂时支持到1、2、3列，顺序默认为Legend,xAxisData,yAxisData，
 * 3列数据，第一列自动为LEGEND，2列数据，默认输出X/Y轴数据
 * 预计增加第4列，由时间线播放以支持图形最大到4维，
 * 更高维度的数据预计输出为平行坐标轴
 * @author [宾不厌诈]
 * @date [20160420]
 *
 * @输入参数:obj类型
 * obj={
 *   url:   字符串    数据接口的URL地址
 *   type:  字符串    line/bar/boxplot/pie/funnel/sunrise 线形图/柱状图/条状图/箱形图/饼图/漏斗图/旭日图
 *   旭日图数据除最后一列外，其余各列必须严格按各查询列排列顺序
 *   后期将增加TreeMap/热力图/雷达图/平行坐标....等相应数据结构的自动转换
 *   rose:字符串  pie图中设为此模式时表示为玫瑰图，默认为0关闭，area/radius  面积模式或半径模式
 *   minmax:整形      箱形图中是否将上边缘由Q3+1.5IRQ置为最大值，下边缘同理，默认 0
 *   linearea:整形    曲线图是否显示为面积图
 *   circle:整形      饼图是否显示为环形图
 *   smooth:整形      是否需要平滑显示线形图
 *   markline：标注线 线形图/柱状图中是否需要显示标注线
 *   markpoint: 标注点 同上，打开则标注最大最小值
 *   barwidth:柱状图最大宽度
 *   splitarea:是否需要显示值域背景分割条
 *   zoom:是否显示缩放控件（横纵向) v(vertical) h(horizontal) vh(both of them)
 *   reverse:是否需要反转X/Y轴 例如柱状图反转后将变为条形图
 * }
 * @输出参数：对应echarts 相关图形所需配置项
 */
define(['../plugins/echarts/js/extension/dataTool.min', '../plugins/echarts/js/extension/ecStat.min', '../plugins/echarts/js/extension/statisticsTool.min', '../plugins/echarts/js/extension/echarts-wordcloud.min'], function(dataTool, ecStat, statTool) {

  //读取指定URL的JSON数据
  function getJsonFromUrl(strUrl, Type) {
    var Data = {};
    Type = (Type) ? 'GET' : 'POST';
    $.ajax({
      type: Type,
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        var obj = jQuery.parseJSON(data);
        Data = obj;
      },
      error: function(e) {
        console.log("read data error:<br>");
        console.log(e.responseText);
      }
    });

    return Data;
  }

  var banknoteColorSheet = {
    "9602A": "#7ECF51",
    "103-G-2A": "#7ECF51",
    "9603A": "rgb(189,66,175)",
    "103-G-3A": "rgb(189,66,175)",
    "9604A": "#61A5E8",
    "103-G-4A": "#61A5E8",
    "9605A": "rgb(200,200,30)",
    "103-G-5A": "rgb(200,200,30)",
    "9606A": "#3D7F18",
    "103-G-6A": "#3D7F18",
    "9607A": "rgb(255,127,104)",
    "103-G-7A": "rgb(255,127,104)",
    "9607T": "rgb(255,127,104)",
    "103-G-7T": "rgb(255,127,104)"
  };

  var convertData = function(objRes, echarts) {
    //数组去重
    function sortNumber(a, b) {
      return a - b;
    }

    function UniqueData(arr) {
      /*arr.sort();
      var re = [arr[0]];
      var i = 0;
      arr.map(function(elem) {
        if (elem != re[i]) {
          re.push(elem);
          i++;
        }
      });
      return re;*/
      //更新数据唯一值判定算法
      if (isNaN(arr[0])) {
        arr.sort();
      } else {
        arr.sort(sortNumber);
      }
      var re = [];
      var status = [];
      arr.map(function(elem) {
        if (status[elem] != 1) {
          re.push(elem);
          status[elem] = 1;
        }
      });
      return re;
    }

    //返回boxplot箱形图tooltip提示信息

    function boxFormatter(param) {
      return [
        '序列 ' + param.seriesName + ': ',
        '分组 ' + param.name + ': ',
        '上须: ' + param.data[4].toFixed(3),
        '较高四分位点(Q1): ' + param.data[3].toFixed(3),
        '中位数: ' + param.data[2].toFixed(3),
        '较低四分位点(Q3): ' + param.data[1].toFixed(3),
        '下须: ' + param.data[0].toFixed(3)
      ].join('<br/>');
    }

    function boxMinMaxFormatter(param) {
      return [
        '序列 ' + param.seriesName + ': ',
        '分组 ' + param.name + ': ',
        '最大值: ' + param.data[4].toFixed(3),
        '较高四分位点(Q1): ' + param.data[3].toFixed(3),
        '中位数: ' + param.data[2].toFixed(3),
        '较低四分位点(Q3): ' + param.data[1].toFixed(3),
        '最小值: ' + param.data[0].toFixed(3)
      ].join('<br/>');
    }
    /**
     * [getUniData 返回arr多维数组中指定列index中不重复的数据]
     * @param  {[type]} data   [多维数组]
     * @param  {[type]} id [判断第几列的非重复数据]
     * @param  {[type]} legendData [有此参数时，只排列指定行等于该值的非重复项]
     * @param  {[type]} legendIdx [指定第几行]
     * @return {[type]}       [不重复数据]
     */

    function getUniData(data, id, legendData, legendIdx) {
      var res = [];
      if (typeof legendData == 'undefined') {
        data.map(function(elem, index) {
          res[index] = elem[id];
        });
      } else {
        data.map(function(elem, index) {
          if (elem[legendIdx] == legendData) {
            res[index] = elem[id];
          }
        });
      }
      return UniqueData(res);
    }

    //多维矩阵行列转换
    function convertMatrixRowCol(data, id) {
      var res = [];
      data.map(function(elem, index) {
        res[index] = elem[id];
      });
      return res;

    }
    /**
     * [getMinMax 获取多维数组指定列最小值/最大值(四舍五入至整数)]
     * @param  {[type]} data [多维数组]
     * @param  {[type]} id   [第几列]
     * @return {[type]} obj     [最小值最大值]
     */
    //采用排序算法，需要对所有数据排序，仅取极值
    function getMinMax(data, id) {
      var min = data[0][id],
        max = data[0][id];
      var curData;
      data.map(function(elem, index) {
        curData = Number.parseFloat(elem[id]);
        if (curData < min) {
          min = curData;
        } else if (curData > max) {
          max = curData;
        }
      });
      return {
        "min": Math.floor(min).toFixed(0),
        "max": Math.ceil(max).toFixed(0)
      };
    }

    /**
     * [ananyDataCategory 分析一维数组中哪些列是类目轴/非数值型]
     * @param  {[type]} arr [description]
     * @return {[type]}      [description]
     */

    function ananyDataCategory(arr) {
      var res = [];
      arr.map(function(elem, index) {
        if (isNaN(elem)) { //如果是类目轴
          res.push(index);
        }
      });
      return res;
    }

    /**
     * [convertCol2Row 矩阵列转换为行]
     * @param  {[type]} data [多维数组]
     * @param  {[type]} id   [第几列]
     * @return {[type]}      [行数组]
     */

    function convertCol2Row(data, id) {
      var res = [];
      data.map(function(elem, index) {
        res[index] = Number.parseFloat(elem[id]);
      });
      return res;
    }

    function handleLineStepMode(objRequest, series) {
      if (objRequest.step != '0') {
        series.map(function(data, i) {
          series[i].step = objRequest.step;
        });
      }
      return series;
    }

    function handleMarkArea(objRequest, series) {
      if (objRequest.markAreaValue == '0') {
        return series;
      }
      //单个图表中，某项参数有多个值时用分号隔开
      var mkVal = objRequest.markAreaValue.split(';');
      var mkName = objRequest.markArea.split(';');

      //var color = ["#F33","#61A5E8", "#7ECF51", "#EECB5F", "#E4925D"];
      //单个MarkArea的设置
      var singleMarkArea = {
        label: {
          normal: {
            textStyle: {
              color: '#333',
              fontSize: 16,
            },
            position: 'right'
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.25 / series.length
          }
        },
        data: []
      };

      mkVal.map(function(val, i) {
        var range = val.split('-');
        singleMarkArea.data.push([{
          name: (typeof mkName[i] != 'undefined') ? decodeURI(mkName[i]) : '',
          yAxis: range[0],
          itemStyle: {
            normal: {
              color: objRequest.color[i]
            }
          }
        }, {
          yAxis: range[1]
        }]);
      });

      /*series.map(function(data, i) {
        series[i].markArea = singleMarkArea;
      });*/
      series[0].markArea = singleMarkArea;
      return series;
    }



    /**
     * [convert 格式化图表用数据(曲线图，柱形图)]
     * @param {[request]} request.url [数据接口地址.数据要求:3列 legend/X轴/主轴，2列：X轴/Y轴,1列：Y轴]
     */

    function convertBarData(objRequest) {
      var Data, arrTem;
      var iTemp, i, j;
      var NewData = [];

      Data = objRequest.data;

      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      var itemStyle = {
        normal: {
          label: {
            show: true,
            position: (objRequest.reverse) ? 'insideRight' : 'insideTop', //top//'insideRight' : 'insideTop'
            "formatter": function(param) {
              return param.value == 0 ? '' : param.value;
            }
          },
          barBorderRadius: (objRequest.reverse) ? [0, 2, 2, 0] : [2, 2, 0, 0],
          borderColor: "rgba(255,255,255,0.95)",
          borderWidth: objRequest.type == 'line' ? 4 : 0,
          lineStyle: {
            width: 1
          }
          //areaStyle: {type: 'default'},
        }
      };

      if (0 === Data.rows) {
        return NewData;
      }

      var lineStyleName = {
        average: '平均值',
        min: '最小值',
        max: '最大值'
      };

      var mkVal, mkName, mkNameLen;

      //大于3列，横向模式
      //testAPI:  SELECT b.MachineName AS 机台,ROUND(AVG(a.F1Count), 2) AS 正1, ROUND(AVG(a.F2Count), 2) AS 正2, ROUND(AVG(a.F3Count), 2) AS 正3, ROUND(AVG(a.F4Count), 2) AS 正4, ROUND(AVG(a.F5Count), 2) AS 正5, ROUND(AVG(a.B1Count), 2) AS 背1, ROUND(AVG(a.B2Count), 2) AS 背2, ROUND(AVG(a.BS1Count), 2) AS 背精1, ROUND(AVG(a.BS2Count), 2) AS 背精2, ROUND(AVG(a.BS3Count), 2) AS 背精3, ROUND(AVG(a.BS4Count), 2) AS 背精4 FROM MaHouData a INNER JOIN MachineData b ON a.MachineID = b.MachineID WHERE a.produceDate BETWEEN ? AND ? GROUP BY b.MachineName ORDER BY b.MachineName
      if (Data.cols > 3) {

        NewData['xAxisTitle'] = " ";
        NewData['yAxisTitle'] = " ";

        //根据catelegory中的类目轴
        var category = ananyDataCategory(Data.data[0]);
        var haveLegend = 0;
        if (category.length > 0 && category[0] == 0) {
          NewData['legend'] = getUniData(Data.data, 0);
          haveLegend = 1;
        } else {
          NewData['legend'] = [];
          NewData['legend'][0] = NewData['yAxisTitle'];
        }

        NewData['xAxis'] = [];
        for (var i = haveLegend; i < Data.header.length; i++) {
          NewData['xAxis'].push(Data.header[i].title);
        }

        NewData['yAxis'] = [];

        NewData['series'] = [];
        Data.data.map(function(elem) {
          var obj = {
            "name": haveLegend ? elem[0] : ' ',
            "type": objRequest.type,
            "smooth": objRequest.smooth,
            "barMaxWidth": objRequest.barMaxWidth,
            // "barMinHeight": 15,
            "data": haveLegend ? elem.slice(1, elem.length) : elem,
            //"markPoint": MPtStyle,
            //"markLine": MLnStyle_avg,
            "itemStyle": itemStyle,
            "symbolSize": objRequest.symbolSize,
            symbol: 'circle'
          };
          //是否为面积图
          if (objRequest.lineAreaStyle) {
            obj.areaStyle = {
              "normal": {
                "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.4
              }
            };
            //NewData['series'][i].symbolSize = 0;
            objRequest.lineShadow = false;
          }
          if (objRequest.step != '0') {
            objRequest.lineShadow = false;
          }
          if (!objRequest.lineShadow) {
            obj.lineStyle = {
              normal: {
                width: objRequest.lineAreaStyle ? 0 : 3,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            };
          }


          if (!objRequest.reverse) {

            if (objRequest.markLine != '0') {

              //单个图表中，某项参数有多个值时用分号隔开
              mkVal = objRequest.markLineValue.split(';');
              mkName = objRequest.markLine.split(';');
              mkNameLen = mkName.length;
              obj.markLine = {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                symbolSize: 0,
                label: {
                  normal: {
                    position: 'end',
                    formatter: '{b}:\n{c}'
                  }
                },
                data: []
              };

              //用户自定义类型
              if (mkName[0] != 'min' && mkName[0] != 'max' && mkName[0] != 'average') {
                mkVal.map(function(markLineValue, idx) {
                  obj.markLine.data.push({
                    name: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                    yAxis: Number.parseFloat(markLineValue)
                  });
                });

              } else {
                mkName.map(function(markLineValue, idx) {
                  obj.markLine.data.push({
                    type: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                    name: lineStyleName[mkNameLen == 1 ? objRequest.markLine : mkName[idx]]
                  });
                });
              }
            }

            if (objRequest.markPoint) {
              obj.markPoint = MPtStyleBoth;
            }
          }
          //线型图隐藏文本标签
          if (objRequest.type == 'line') {
            obj.label = {
              normal: {
                show: false,
                position: 'top'
              }
            };
          }

          NewData['series'].push(obj);
        });
      } else if (Data.cols == 3) {
        NewData['xAxisTitle'] = Data.header[1].title;
        NewData['yAxisTitle'] = Data.header[2].title;

        NewData['legend'] = getUniData(Data.data, 0);
        //NewData['xAxis'] = convertMatrixRowCol(Data.data, 1);
        NewData['xAxis'] = getUniData(Data.data, 1);
        //NewData['yAxis'] = convertMatrixRowCol(Data.data, 2);
        NewData['yAxis'] = [];

        //yAxis数据清零
        for (i = 0; i < NewData.legend.length; i++) {
          NewData['yAxis'][NewData.legend[i]] = [];
          for (j = 0; j < NewData.xAxis.length; j++) {
            NewData['yAxis'][NewData.legend[i]][j] = '-';
          }
        }
        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (Data.data[i][1] == NewData.xAxis[j]) {
              NewData['yAxis'][iTemp][j] = Number.parseFloat(Data.data[i][2]); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        NewData['series'] = [];
        for (i = 0; i < NewData.legend.length; i++) {
          NewData['series'][i] = {
            "name": NewData.legend[i],
            "type": objRequest.type,
            "smooth": objRequest.smooth,
            "barMaxWidth": objRequest.barMaxWidth,
            // "barMinHeight": 15,
            "data": NewData.yAxis[NewData.legend[i]],
            //"markPoint": MPtStyle,
            //"markLine": MLnStyle_avg,
            "itemStyle": itemStyle,
            "symbolSize": objRequest.symbolSize,
            sampling: 'average',
            symbol: 'circle'
          };
          //是否为面积图
          if (objRequest.lineAreaStyle) {
            NewData['series'][i].areaStyle = {
              "normal": {
                "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.4
              }
            };
            //NewData['series'][i].symbolSize = 0;
            objRequest.lineShadow = false;
          }
          if (objRequest.step != '0') {
            objRequest.lineShadow = false;
          }
          if (!objRequest.lineShadow) {
            NewData['series'][i].lineStyle = {
              normal: {
                width: objRequest.lineAreaStyle ? 0 : 3,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            };
          }

          if (!objRequest.reverse) {


            if (objRequest.markLine != '0') {

              //单个图表中，某项参数有多个值时用分号隔开
              mkVal = objRequest.markLineValue.split(';');
              mkName = objRequest.markLine.split(';');
              mkNameLen = mkName.length;

              NewData['series'][i].markLine = {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                symbolSize: 0,
                label: {
                  normal: {
                    position: 'end',
                    formatter: '{b}:\n{c}'
                  }
                },
                data: []
              };


              //用户自定义类型
              if (mkName[0] != 'min' && mkName[0] != 'max' && mkName[0] != 'average') {
                mkVal.map(function(markLineValue, idx) {
                  NewData['series'][i].markLine.data.push({
                    name: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                    yAxis: Number.parseFloat(markLineValue)
                  });
                });

              } else {
                mkName.map(function(markLineValue, idx) {
                  NewData['series'][i].markLine.data.push({
                    type: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                    name: lineStyleName[mkNameLen == 1 ? objRequest.markLine : mkName[idx]]
                  });
                });
              }

            }

            if (objRequest.markPoint) {
              NewData['series'][i].markPoint = MPtStyleBoth;
            }
          }
          //线型图隐藏文本标签
          if (objRequest.type == 'line') {
            NewData['series'][i].label = {
              normal: {
                show: false,
                position: 'top'
              }
            };
          }
        }
      } else if (Data.cols == 2) {
        NewData['xAxisTitle'] = Data.header[0].title;
        NewData['yAxisTitle'] = Data.header[1].title;

        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];


        NewData['xAxis'] = convertMatrixRowCol(Data.data, 0);
        NewData['yAxis'] = convertMatrixRowCol(Data.data, 1);

        NewData['series'] = [];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "smooth": objRequest.smooth,
          "barMaxWidth": objRequest.barMaxWidth,
          // "barMinHeight": 15,
          "data": NewData.yAxis,
          //"markPoint": MPtStyle,
          //"markLine": MLnStyle_avg,
          "itemStyle": itemStyle,
          "symbolSize": objRequest.symbolSize,
          sampling: 'average',
          symbol: 'circle'
        };
        //是否为面积图
        if (objRequest.lineAreaStyle) {
          NewData['series'][0].areaStyle = {
            "normal": {
              "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.4
            }
          };
          //NewData['series'][0].symbolSize = 0;
          objRequest.lineShadow = false;
        }
        if (objRequest.step != '0') {
          objRequest.lineShadow = false;
        }
        if (!objRequest.lineShadow) {
          NewData['series'][0].lineStyle = {
            normal: {
              width: objRequest.lineAreaStyle ? 0 : 3,
              type: 'solid',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          };
        }

        if (!objRequest.reverse) {

          if (objRequest.markLine != '0') {

            //单个图表中，某项参数有多个值时用分号隔开
            mkVal = objRequest.markLineValue.split(';');
            mkName = objRequest.markLine.split(';');
            mkNameLen = mkName.length;

            NewData['series'][0].markLine = {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              symbolSize: 0,
              label: {
                normal: {
                  position: 'end',
                  formatter: '{b}:\n{c}'
                }
              },
              data: []
            };

            //用户自定义类型
            if (mkName[0] != 'min' && mkName[0] != 'max' && mkName[0] != 'average') {

              mkVal.map(function(markLineValue, idx) {
                NewData['series'][0].markLine.data.push({
                  name: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                  yAxis: Number.parseFloat(markLineValue)
                });
              });

            } else {
              mkName.map(function(markLineValue, idx) {
                NewData['series'][0].markLine.data.push({
                  type: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                  name: lineStyleName[mkNameLen == 1 ? objRequest.markLine : mkName[idx]]
                });
              });
            }
          }

          if (objRequest.markPoint) {
            NewData['series'][0].markPoint = MPtStyleBoth;
          }
        }
        //线型图隐藏文本标签
        if (objRequest.type == 'line') {
          NewData['series'][0].label = {
            normal: {
              show: false,
              position: 'top'
            }
          };
        }

      } else if (Data.cols == 1) {
        NewData['xAxisTitle'] = "数据编号";
        NewData['yAxisTitle'] = Data.header[0].title;
        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        arrTemp = [];
        for (i = 0; i < Data.rows; i++) {
          arrTemp[i] = i + 1;
        }
        NewData['xAxis'] = arrTemp;
        NewData['yAxis'] = [];
        for (i = 0; i < Data.rows; i++) {
          NewData['yAxis'][i] = Number.parseFloat(Data.data[i][0]);
        }

        //NewData['yAxis'] = convertMatrixRowCol(Data.data, 0);
        NewData['series'] = [];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "smooth": objRequest.smooth,
          "barMaxWidth": objRequest.barMaxWidth,
          // "barMinHeight": 15,
          "data": NewData.yAxis,
          //"markPoint": MPtStyle,
          //"markLine": MLnStyle_avg,
          "itemStyle": itemStyle,
          "symbolSize": objRequest.symbolSize,
          sampling: 'average',
          symbol: 'circle'
        };
        //是否为面积图
        if (objRequest.lineAreaStyle) {
          NewData['series'][0].areaStyle = {
            "normal": {
              "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.4
            }
          };
          objRequest.lineShadow = false;
        }
        if (objRequest.step != '0') {
          objRequest.lineShadow = false;
        }
        if (!objRequest.lineShadow) {
          NewData['series'][0].lineStyle = {
            normal: {
              width: objRequest.lineAreaStyle ? 0 : 3,
              type: 'solid',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          };
        }

        if (!objRequest.reverse) {

          if (objRequest.markLine != '0') {

            //单个图表中，某项参数有多个值时用分号隔开
            mkVal = objRequest.markLineValue.split(';');
            mkName = objRequest.markLine.split(';');
            mkNameLen = mkName.length;

            NewData['series'][0].markLine = {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              symbolSize: 0,
              label: {
                normal: {
                  position: 'end',
                  formatter: '{b}:\n{c}'
                }
              },
              data: []
            };

            //用户自定义类型
            if (mkName[0] != 'min' && mkName[0] != 'max' && mkName[0] != 'average') {

              mkVal.map(function(markLineValue, idx) {
                NewData['series'][0].markLine.data.push({
                  name: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                  yAxis: Number.parseFloat(markLineValue)
                });
              });

            } else {
              mkName.map(function(markLineValue, idx) {
                NewData['series'][0].markLine.data.push({
                  type: decodeURI(mkNameLen == 1 ? objRequest.markLine : mkName[idx]),
                  name: lineStyleName[mkNameLen == 1 ? objRequest.markLine : mkName[idx]]
                });
              });
            }
          }
          if (objRequest.markPoint) {
            NewData['series'][0].markPoint = MPtStyleBoth;
          }
        }

        //线型图隐藏文本标签
        if (objRequest.type == 'line') {
          NewData['series'][0].label = {
            normal: {
              show: false,
              position: 'top'
            }
          };
        }
      }

      //数据堆叠
      if (objRequest.stack) {
        for (i = 0; i < NewData.legend.length; i++) {
          NewData.series[i].stack = '总量';
          NewData.series[i].itemStyle.normal.barBorderRadius = 0;
          NewData.series[i].symbolSize = 0;

          var str = JSON.stringify(NewData.series[i].data);
          str = str.replace(/"-"/g, 0);
          NewData.series[i].data = $.parseJSON(str);
        }
        //NewData.series[0].itemStyle.normal.barBorderRadius =  (objRequest.reverse) ? [0, 4, 4, 0] : [4, 4, 0, 0];
      }

      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);
      return NewData;
    }

    //将箱形图数据中上下边缘由Q1-1.5IRQ转换为MinMax

    function handleBoxPlotDataMinMax(plotData, arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].sort(sortNumber); //升序排序
        plotData.boxData[i][0] = arr[i][0]; //最小值
        plotData.boxData[i][4] = arr[i][arr[i].length - 1]; //最大值
      }
      return plotData;
    }

    /**
     * [convert 格式化图表用数据(箱形图)]
     * @param {[request]} request.url [数据接口地址.数据要求:3列 legend/X轴/主轴，2列：X轴/Y轴,1列：Y轴]
     */

    function convertBoxPlotData(objRequest) {
      var Data = objRequest.data;
      var NewData = [];
      var iConvData;
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      NewData['series'] = [];

      if (0 === Data.rows) {
        return NewData;
      }
      //3列格式，第一列为legend
      if (Data.cols == 3) {
        NewData['xAxisTitle'] = Data.header[1].title;
        NewData['yAxisTitle'] = Data.header[2].title;

        NewData['legend'] = getUniData(Data.data, 0);
        NewData['xAxis'] = getUniData(Data.data, 1);

        var arrTemp = [];
        //yAxis数据清零
        for (i = 0; i < NewData.legend.length; i++) {
          arrTemp[NewData.legend[i]] = [];
          for (j = 0; j < NewData.xAxis.length; j++) {
            arrTemp[NewData.legend[i]][j] = [];
          }
        }
        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (Data.data[i][1] == NewData.xAxis[j]) {
              arrTemp[iTemp][j].push(Number.parseFloat(Data.data[i][2])); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        NewData['legend'].map(function(elem, index) {
          iConvData = dataTool.prepareBoxplotData(arrTemp[elem], {
            layout: objRequest.reverse ? 'vertical' : 'horizontal'
          });
          //如果需要处理箱形图数据
          if (objRequest.minMax) {
            iConvData = handleBoxPlotDataMinMax(iConvData, arrTemp[elem]);
          }
          NewData['series'][index * 2] = {
            "name": elem,
            "type": objRequest.type,
            "data": iConvData.boxData,
            "tooltip": {
              backgroundColor: 'rgba(255,255,255,0.95)',
              textStyle: {
                color: '#333'
              },
              //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
              extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
              formatter: (objRequest.minMax) ? boxMinMaxFormatter : boxFormatter
            }
          };

          NewData['series'][index * 2 + 1] = {
            name: elem,
            type: 'scatter',
            data: iConvData.outliers,
            tooltip: {
              formatter: function(param) {
                var coord = param.data;
                var str = NewData.xAxisTitle + ': ' + param.name + '<br>' + NewData.yAxisTitle + ': ' + coord[1];
                return param.seriesName + ' 异常值<br>' + str;
              }
            }
          };
        });

      } else if (Data.cols == 2) {
        NewData['xAxisTitle'] = Data.header[0].title;
        NewData['yAxisTitle'] = Data.header[1].title;

        NewData['xAxis'] = getUniData(Data.data, 0);

        NewData['yAxis'] = [];
        //yAxis数据清零
        for (i = 0; i < NewData.xAxis.length; i++) {
          NewData['yAxis'][i] = [];
        }

        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (iTemp == NewData.xAxis[j]) {
              NewData['yAxis'][j].push(Number.parseFloat(Data.data[i][1])); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        iConvData = dataTool.prepareBoxplotData(NewData['yAxis']);
        //如果需要处理箱形图数据
        if (objRequest.minMax) {
          iConvData = handleBoxPlotDataMinMax(iConvData, NewData['yAxis']);
        }

        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "data": iConvData.boxData,
          "tooltip": {
            backgroundColor: 'rgba(255,255,255,0.95)',
            //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
            extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
            textStyle: {
              color: '#333'
            },
            formatter: (objRequest.minMax) ? boxMinMaxFormatter : boxFormatter
          }
        };

        NewData['series'][1] = {
          "name": NewData['yAxisTitle'],
          type: 'scatter',
          data: iConvData.outliers,
          tooltip: {
            formatter: function(param) {
              var coord = param.data;
              var str = NewData.xAxisTitle + ': ' + param.name + '<br>' + NewData.yAxisTitle + ': ' + coord[1];
              return param.seriesName + ' 异常值<br>' + str;
            }
          }
        };

      } else if (Data.cols == 1) {
        NewData['xAxisTitle'] = "数据编号";
        NewData['yAxisTitle'] = Data.header[0].title;
        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        NewData['xAxis'] = ['数据1'];

        NewData['yAxis'] = [];
        NewData['yAxis'][0] = [];
        for (i = 0; i < Data.rows; i++) {
          NewData['yAxis'][0][i] = Number.parseFloat(Data.data[i][0]);
        }
        iConvData = dataTool.prepareBoxplotData(NewData['yAxis']);
        //如果需要处理箱形图数据
        if (objRequest.minMax) {
          iConvData = handleBoxPlotDataMinMax(iConvData, NewData['yAxis']);
        }

        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "data": iConvData.boxData,
          "tooltip": {
            backgroundColor: 'rgba(255,255,255,0.95)',
            //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
            extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
            //extraCssText: 'background:#fff;padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
            textStyle: {
              color: '#333'
            },
            formatter: (objRequest.minMax) ? boxMinMaxFormatter : boxFormatter
          }
        };

        NewData['series'][1] = {
          "name": NewData['yAxisTitle'],
          type: 'scatter',
          data: iConvData.outliers
        };

      }
      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);
      return NewData;
    }

    function handleCandleStickData(data) {
      var arrCandle = [];
      var avg = [];
      var len;
      data.map(function(item, i) {
        arrCandle[i] = [];
        len = item.length;
        arrCandle[i].push(item[0]);
        arrCandle[i].push(item[len - 1]);
        var min = item[0],
          max = item[0],
          sum = 0;
        item.map(function(arr) {
          min = Math.min(min, arr);
          max = Math.max(max, arr);
          sum += arr;
        })
        arrCandle[i].push(min);
        arrCandle[i].push(max);
        avg.push((sum / len).toFixed(3));
      })
      return {
        candle: arrCandle,
        avg: avg
      };
    }

    function convertCandleStickData(objRequest) {
      var Data = objRequest.data;
      var lineStyle = {
        normal: {
          width: 2,
          type: 'solid',
          shadowColor: 'rgba(0,0,0,0)',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      };
      var itemStyle = {
        normal: {
          color: '#F7715F', // 阳线
          color0: '#85ca36', // 阴线
          borderColor: '#F7715F', // 阳线边框
          borderColor0: '#85ca36' // 阴线边框
        }
      };
      var markPoint = {
        label: {
          normal: {
            formatter: function(param) {
              return param != null ? Math.round(param.value) : '';
            }
          }
        },
        data: [{
          name: '最高值',
          type: 'max',
          valueDim: 'highest'
        }, {
          name: '最低值 ',
          type: 'min',
          valueDim: 'lowest'
        }],
        tooltip: {
          formatter: function(param) {
            var coord = param.data.coord;
            var str = NewData.xAxisTitle + ': ' + NewData.xAxis[coord[0]] + '<br>' + NewData.yAxisTitle + ': ' + coord[1];
            return param.name + '<br>' + str;
          }
        }
      };
      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: [],
        legend: []
      };

      var iConvData;

      if (0 === Data.rows) {
        return NewData;
      }

      //3列格式，第一列为legend
      if (Data.cols == 3) {
        NewData.xAxisTitle = Data.header[1].title;
        NewData.yAxisTitle = Data.header[2].title;
        NewData.xAxis = getUniData(Data.data, 1);
        NewData.legend = getUniData(Data.data, 0);

        var arrTemp = [];
        //yAxis数据清零
        for (i = 0; i < NewData.legend.length; i++) {
          arrTemp[NewData.legend[i]] = [];
          for (j = 0; j < NewData.xAxis.length; j++) {
            arrTemp[NewData.legend[i]][j] = [];
          }
        }
        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (Data.data[i][1] == NewData.xAxis[j]) {
              arrTemp[iTemp][j].push(Number.parseFloat(Data.data[i][2])); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        NewData['legend'].map(function(elem, index) {

          iConvData = handleCandleStickData(arrTemp[elem]);

          NewData['series'][2 * index] = {
            "name": elem,
            "type": objRequest.type,
            "data": iConvData.candle,
            markPoint: markPoint,
            itemStyle: itemStyle
          };

          NewData['series'][2 * index + 1] = {
            name: elem,
            type: 'line',
            data: iConvData.avg,
            smooth: true,
            lineStyle: lineStyle,
            symbolSize: 2
          };

        });

      } else if (Data.cols == 2) {
        NewData.xAxisTitle = Data.header[0].title;
        NewData.yAxisTitle = Data.header[1].title;
        NewData.xAxis = getUniData(Data.data, 0);

        NewData.yAxis = [];

        //yAxis数据清零
        for (i = 0; i < NewData.xAxis.length; i++) {
          NewData.yAxis[i] = [];
        }

        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (iTemp == NewData.xAxis[j]) {
              NewData.yAxis[j].push(Number.parseFloat(Data.data[i][1])); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        iConvData = handleCandleStickData(NewData.yAxis);

        NewData.legend = ['K线', '均线'];
        NewData.series[0] = {
          "name": 'K线',
          "type": objRequest.type,
          "data": iConvData.candle,
          markPoint: markPoint,
          itemStyle: itemStyle
        };

        NewData.series[1] = {
          "name": '均线',
          type: 'line',
          data: iConvData.avg,
          smooth: true,
          lineStyle: lineStyle,
          symbolSize: 2
        };

      }

      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);

      return NewData;
    }

    /**
     * [getRadiusSeries 将多维数组转换为Pie图的数据结构]
     * @param  {[type]} arr    [数据接口对应的数组]
     * @param  {[type]} nameID [系列名称在arr数组中的编号]
     * @param  {[type]} dataID [系列值在arr数组中的编号]
     * @return {[type]} seriesArr [Pie图所用的数据结构]
     */

    function getRadiusSeries(arr, nameID, dataID) {
      var obj = {};
      var seriesArr = [];
      arr.map(function(elem) {
        if (typeof obj[elem[nameID]] == 'undefined') {
          obj[elem[nameID]] = Number.parseFloat(elem[dataID]);
        } else {
          obj[elem[nameID]] += Number.parseFloat(elem[dataID]);
        }
      });
      //遍历obj的KEY
      for (var k in obj) {
        seriesArr.push({
          "value": obj[k].toFixed(2),
          "name": k
        });
      }
      return seriesArr;
    }

    /**
     * [getRadiusSeries 将多维数组转换为旭日图的数据结构]
     * @param  {[type]} arr    [数据接口对应的数组]
     * @param  {[type]} nameID [系列名称在arr数组中的编号]
     * @param  {[type]} dataID [系列值在arr数组中的编号]
     * @return {[type]} seriesArr [Pie图所用的数据结构]
     */

    function getSunRiseSeries(arr, nameID, dataID, seriesColor) {
      var seriesArr = [];
      var i = 0;
      arr.map(function(elem) {
        if (i === 0) {
          seriesArr.push({
            "value": Number.parseFloat(elem[dataID]).toFixed(2),
            "name": elem[nameID],
            "itemStyle": {
              "normal": {
                "color": seriesColor[elem[0]]
              }
            }
          });
          i++;
        } else {
          if (seriesArr[i - 1].name == elem[nameID]) {
            seriesArr[i - 1].value = Number.parseFloat(seriesArr[i - 1].value) + Number.parseFloat(elem[dataID]);
            seriesArr[i - 1].value = seriesArr[i - 1].value.toFixed(2);
          } else {
            seriesArr.push({
              "value": Number.parseFloat(elem[dataID]).toFixed(2),
              "name": elem[nameID],
              "itemStyle": {
                "normal": {
                  "color": seriesColor[elem[0]],
                  //"opacity":opacity//透明度
                }
              }
            });
            i++;
          }
        }
      });
      return seriesArr;
    }

    /**
     * [getSunRiseSeriesColor 获取旭日图外圈各数据的对应颜色]
     * @param  {[type]} Data  [原始数据，用于获取第一列最内圈非重复系列]
     * @param  {[type]} color [主题颜色表]
     * @return {[type]}  res  [各系列对应的颜色]
     */

    function getSunRiseSeriesColor(Data, color) {
      var obj = getUniData(Data.data, 0);
      var res = {};
      var len = color.length;
      obj.map(function(elem, index) {
        res[elem] = color[index % len];
      });
      return res;
    }

    //旭日图
    function convertSunRiseData(objRequest) {
      var Data = objRequest.data;
      var NewData = [];
      var iConvData;
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      NewData['series'] = [];

      if (0 === Data.rows) {
        return NewData;
      }
      //旭日图，支持N列格式，第一列为legend
      if (Data.cols > 2) {

        //除了最后一列外，全部集合至legend中
        var legend = [];
        for (var i = 0; i < Data.header.length - 1; i++) {
          legend.push(Data.header[i].title);
        }

        NewData['legend'] = {
          "orient": 'vertical',
          "x2": '5%',
          "data": legend
        };

        var seriesColor = getSunRiseSeriesColor(Data, objRequest.color);

        //每列宽度
        var dataIndex = Data.cols - 1;
        var radiusWidth = 80 / dataIndex;
        for (i = 0; i < dataIndex; i++) {
          NewData['series'].push({
            "name": Data.header[i].title,
            "type": 'pie',
            "selectedMode": 'single',
            "radius": [i * radiusWidth + (i > 0 ? 0 : 5) + '%', (i + 1) * radiusWidth + '%'],
            "data": getSunRiseSeries(Data.data, i, dataIndex, seriesColor),
            "label": {
              "normal": {
                "show": dataIndex < 3 ? true : false,
                "position": 'inner'
              }
            },
            "itemStyle": {
              "normal": {
                "borderColor": '#fbfbfb',
                "borderWidth": 1,
                "opacity": 1 - 0.2 * (i / dataIndex)
              },
              "emphasis": {
                "shadowBlur": 10,
                "shadowOffsetX": 0,
                "shadowColor": 'rgba(0, 0, 0, 0.5)'
              }
            }
          });
        }

      } else if (Data.cols == 2) {
        //系列的名称
        NewData['legend'] = {
          "orient": 'vertical',
          "x2": '5%',
          "data": getUniData(Data.data, 0)
        };
        NewData['series'] = [{
          "name": Data.header[0].title,
          "type": objRequest.type,
          "selectedMode": 'single',
          "radius": [0, '30%'],
          "data": getRadiusSeries(Data.data, 0, 2),
          "itemStyle": {
            "emphasis": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": 'rgba(0, 0, 0, 0.5)'
            }
          }
        }];

        //扇形图
        if (!objRequest.circle) {
          NewData['series'][0].radius = [0, "60%"];
          NewData['series'][0].center = ['50%', '50%'];
        }
      } else if (Data.cols == 1) {
        NewData['legend'] = {
          "show": false,
          "orient": 'vertical',
          "x2": '5%',
          "data": Data.header[0].title
        };
        var obj;
        Data.data.map(function(elem, index) {
          obj.push({
            "value": Number.parseFloat(elem).toFixed(2),
            "name": "数据" + (index + 1)
          });
        });

        NewData['series'] = [{
          "name": Data.header[0].title,
          "type": objRequest.type,
          "selectedMode": 'single',
          "radius": [0, '30%'],
          "data": obj,
          "itemStyle": {
            "emphasis": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": 'rgba(0, 0, 0, 0.5)'
            }
          }
        }];
        //扇形图
        if (!objRequest.circle) {
          NewData['series'][0].radius = [0, "60%"];
          NewData['series'][0].center = ['50%', '50%'];
        }
      }
      if (Data.cols < 3) {
        //数据在6个以内，自动将标签放在内部
        if (elem.data.length <= 6) {
          NewData['series'][0].label = {
            "normal": {
              "position": 'inner'
            }
          };
          NewData['series'][0].labelLine = {
            "normal": {
              "show": false
            }
          };
        } else {
          NewData['series'][0].labelLine = {
            "normal": {
              "show": true,
              "length2": 10,
              "length": 15
            }
          };
        }
      }
      return NewData;
    }

    function convertRadiusData(objRequest) {
      var Data = objRequest.data;
      var NewData = [];
      var iConvData;
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      NewData['series'] = [];

      if (0 === Data.rows) {
        return NewData;
      }
      //3列格式，第一列为legend
      if (Data.cols == 3) {
        //系列1、系列2的名称
        NewData['legend'] = {
          "orient": 'vertical',
          "x2": '5%',
          "data": getUniData(Data.data, 0).concat(getUniData(Data.data, 1))
        };
        NewData['series'] = [{
          "name": Data.header[0].title,
          "type": objRequest.type,
          "selectedMode": 'single',
          "radius": [0, '35%'],
          "data": getRadiusSeries(Data.data, 0, 2),
          "itemStyle": {
            "emphasis": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": 'rgba(0, 0, 0, 0.5)'
            }
          }
        }, {
          "name": Data.header[1].title,
          "type": objRequest.type,
          "radius": ['50%', '70%'],
          "data": getRadiusSeries(Data.data, 1, 2),
          "itemStyle": {
            "emphasis": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": 'rgba(0, 0, 0, 0.5)'
            }
          }
        }];

        //扇形图
        if (!objRequest.circle) {
          NewData['series'][0].radius = [0, "50%"];
          NewData['series'][1].radius = [0, "50%"];
          NewData['series'][0].center = ['25%', '50%'];
          NewData['series'][1].center = ['75%', '50%'];
        }
        if (objRequest.roseType != '0') {
          NewData['series'][0].roseType = objRequest.roseType;
          NewData['series'][0].radius = ['10%', "50%"];
          NewData['series'][0].center = ['25%', '50%'];
          NewData['series'][1].roseType = objRequest.roseType;
          NewData['series'][1].radius = ['10%', "50%"];
          NewData['series'][1].center = ['75%', '50%'];
        }

      } else if (Data.cols == 2) {
        //系列的名称
        NewData['legend'] = {
          "orient": 'vertical',
          "x2": '5%',
          "data": getUniData(Data.data, 0)
        };
        NewData['series'] = [{
          "name": Data.header[0].title,
          "type": objRequest.type,
          "selectedMode": 'single',
          "radius": ['40%', '80%'],
          "data": getRadiusSeries(Data.data, 0, 1),
          "itemStyle": {
            "emphasis": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": 'rgba(0, 0, 0, 0.5)'
            }
          }
        }];

        //扇形图
        if (!objRequest.circle) {
          NewData['series'][0].radius = [0, "80%"];
          NewData['series'][0].center = ['50%', '50%'];
        }

        //玫瑰图
        if (objRequest.roseType != '0') {
          if (NewData.series.length == 1) {
            NewData['series'][0].roseType = objRequest.roseType;
          } else {
            NewData['series'][0].roseType = objRequest.roseType;
            NewData['series'][0].radius = ['10%', "50%"];
            NewData['series'][0].center = ['25%', '50%'];
            NewData['series'][1].roseType = objRequest.roseType;
            NewData['series'][1].radius = ['10%', "50%"];
            NewData['series'][1].center = ['75%', '50%'];
          }
        }
      } else if (Data.cols == 1) {
        NewData['legend'] = {
          "show": false,
          "orient": 'vertical',
          "x2": '5%',
          "data": Data.header[0].title
        };
        var obj;
        Data.data.map(function(elem, index) {
          obj.push({
            "value": Number.parseFloat(elem).toFixed(2),
            "name": "数据" + (index + 1)
          });
        });

        NewData['series'] = [{
          "name": Data.header[0].title,
          "type": objRequest.type,
          "selectedMode": 'single',
          "radius": [0, '30%'],
          "data": obj
        }];
        //扇形图
        if (!objRequest.circle) {
          NewData['series'][0].radius = [0, "60%"];
          NewData['series'][0].center = ['50%', '50%'];
        }
        if (objRequest.roseType != '0') {
          NewData['series'][0].roseType = objRequest.roseType;
        }
      }

      //自动处理标签位置
      NewData['series'].map(function(elem, index) {
        //数据在6个以内，自动将标签放在内部
        if (elem.data.length <= 6) {
          NewData['series'][index].label = {
            "normal": {
              "position": 'inner'
            }
          };
          NewData['series'][index].labelLine = {
            "normal": {
              "show": false
            }
          };
        } else {
          NewData['series'][index].labelLine = {
            "normal": {
              "show": true,
              "length2": 10,
              "length": 15
            }
          };
        }
      });

      return NewData;
    }

    function getParallelSeries(arr, legend, objRequest) {
      var seriesType = objRequest.type
      var seriesArr = [];
      var i = 0;

      var lineStyle = {
        normal: {
          width: 0.8,
          opacity: 0.4
        }
      };
      var obj = {};
      if (typeof legend.data != 'undefined') {
        legend.data.map(function(elem) {
          obj[elem] = [];
        });
        arr.map(function(elem) {
          obj[elem[0]].push(elem.slice(1, elem.length));
        });
        legend.data.map(function(elem, index) {
          seriesArr.push({
            name: elem,
            type: seriesType,
            smooth: objRequest.smooth,
            lineStyle: lineStyle,
            data: obj[elem]
          });
        });
      } else {
        seriesArr.push({
          name: '平行坐标',
          type: seriesType,
          smooth: objRequest.smooth,
          lineStyle: lineStyle,
          data: arr,
          blendMode: 'lighter'
        });
      }
      return seriesArr;
    }

    /**
     * [isExistLeaf 横向搜索树枝中某一枝叶所在的ID]
     * @param  {[type]} objTree [树枝]
     * @param  {[type]} _name   [枝叶]
     * @return {[type]}         [ID索引]
     * (默认数据按每列序号排序，直接从尾部向前搜索以提高效率)
     */
    function isExistLeaf(objTree, _name) {
      var nID = -1;
      var lastTreeNode = objTree.length - 1;
      for (var i = lastTreeNode; !(objTree[i] == null) && nID == -1; i--) {
        if (objTree[i].name == _name) {
          nID = i;
          return nID;
        }
      }
      return nID;
    }

    /**
     * [getTreeLeafData  将数组类型的数据转换为TreeNode数据
     *                   获取指定树结构是否存在某树枝，如果存在则处理数据，不存在则新建]
     * @param  {[type]} objTree [判断的树结构]
     * @param  {[type]} parentArr     [待处理的数据的父结构]
     * @param  {[type]} obj     [待处理的数据]
     * @return {[type]}         [处理之后的树结构]
     */
    function getTreeLeafData(objTree, parentArr, obj) {
      if (parentArr.length - 1 == obj.deepLevel) {
        return objTree;
      }
      var _name = parentArr[obj.deepLevel];
      var leafID = isExistLeaf(objTree, _name);
      //如果以该值为名字的树枝不存在
      if (leafID == -1) {
        objTree.push({
          name: _name,
          value: obj.value
        });
        leafID = objTree.length - 1;
        if (parentArr.length - 2 > obj.deepLevel) { //还没到最后一层
          objTree[leafID].children = [];
        }
      } else {
        //树枝存在，需要累加该结点原有数据。原NAME值不变
        objTree[leafID].value += obj.value;

        //子结点不存在为首次添加
        if (objTree[leafID].children == null) {
          //不存在子结点
          if (parentArr.length - 2 > obj.deepLevel) { //还没到最后一层
            objTree[leafID].children = [];
          }
        }
      }

      obj.deepLevel++; //搜索深度+1
      if (parentArr.length - 1 > obj.deepLevel) { //还没到最后一层
        objTree[leafID].children = getTreeLeafData(objTree[leafID].children, parentArr, obj); //对子结点进行搜索并更新
      }
      return objTree;
    }

    /**
     * [convertArr2TreeMapObj 将N*M维数组转换为树形数据结构]
     * @param  {[type]} arr [待转换数组]
     * @return {[type]}     [树形图数据结构]
     */
    function convertArr2TreeMapObj(arr) {
      var arrTree = [];
      var lastNode = arr[0].length - 1;
      var obj;
      //遍历数组,转换为对应的TreeNode数据结构
      arr.map(function(elem) {
        //每结数据从根结点开始搜索
        obj = {
          value: Number.parseFloat(elem[lastNode]),
          deepLevel: 0
        }
        arrTree = getTreeLeafData(arrTree, elem, obj);
      })
      return arrTree;
    }

    /**
     * [getRadarSeriesData 将arr转为radarMap的Series数据]
     * @param  {[type]} arr [arr]
     * @return {[obj]}
     */
    function getRadarSeriesData(arr) {
      var res = {};
      arr.map(function(elem) {
        //如果不存在，先置为空数组
        if (isNaN(res[elem[0]])) {
          res[elem[0]] = [];
        }
        //res[elem[0]].push(elem.slice(1, elem.length));
        var arrData = [];
        for (var i = 1; i < elem.length; i++) {
          arrData.push(Number.parseFloat(elem[i]).toFixed(2));
        };
        res[elem[0]].push(arrData);
      })
      return res;
    }

    /**
     * [convertArr2RadarMapObj 数组转雷达图数据结构]
     * @param  {[obj]} arr [数组结构]
     * @return {[type]}     [description]
     */
    function convertArr2RadarMapObj(objData, objRequest) {
      var radarObj = {
        radarIndicator: [],
        series: [],
        legend: {}
      };
      var bShowLegend = 0;
      //legend;
      var arrCategory = ananyDataCategory(objData.data[0]);
      if (arrCategory.length > 0 && 0 === arrCategory[0]) {
        radarObj.legend = {
          data: getUniData(objData.data, 0),
          orient: 'vertical',
          left: 'left',
        };
        bShowLegend = 1;
      }

      //indicator
      for (var i = bShowLegend; i < objData.cols; i++) {
        //获取第i列的min/max值
        var dataRange = getMinMax(objData.data, i);
        dataRange.max = dataRange.max * 1.1; //最大值范围比当前值要大
        radarObj.radarIndicator.push({
          name: objData.header[i].title,
          max: dataRange.max.toFixed(0)
        })
      }

      //series
      if (bShowLegend) {
        var radarSeries = getRadarSeriesData(objData.data);
        //var j = 0;
        for (var key in radarSeries) {
          //radarObj.series[j] = objSeries;
          //radarObj.series[j].name = key;
          //radarObj.series[j].data = radarSeries[key];
          radarObj.series.push({
            name: key,
            type: 'radar',
            symbol: 'none',
            areaStyle: {
              normal: {
                "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.3
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.5
              }
            },
            data: radarSeries[key]
          });
        }
      } else {
        radarObj.series.push({
          name: objData.title,
          type: 'radar',
          symbol: 'none',
          areaStyle: {
            normal: {
              "opacity": objRequest.opacity != '0' ? objRequest.opacity : 0.3
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5
            }
          },
          data: objData.data
        });
      }
      return radarObj;
    }

    function convertParallelData(objRequest) {
      var Data = objRequest.data;
      var NewData = [];
      var iConvData;
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      NewData['series'] = [];
      NewData['legend'] = [];
      NewData['visualMap'] = [];
      NewData['parallelAxis'] = [];

      if (1 === Data.cols || 0 === Data.rows) {
        return NewData;
      }

      //分析哪些列是类目轴数组
      var arrCategory = ananyDataCategory(Data.data[0]);
      var bShowLegend = 0;

      //如果没有类目轴是数组或者第0个类目轴不是数组,
      //则不显示Legend,同时对应的parallelAxis的定义也需要处理
      if (arrCategory.length > 0 && 0 === arrCategory[0]) {
        var legendData = getUniData(Data.data, 0);
        NewData['legend'] = {
          top: 20,
          data: legendData,
          itemGap: 20,
          x: '10',
          top: '20',
          width: '500',
          textStyle: {
            color: '#aaa',
            fontSize: 14
          }
        };
        bShowLegend = 1;
        if (legendData.length < 2) {
          NewData['legend'].show = false;
        }
      }

      if (0 === bShowLegend) {
        NewData['legend'].show = false;
      }

      //第0列为Legend
      for (var i = bShowLegend; i < Data.cols; i++) {
        var dimMinMax = getMinMax(Data.data, i);
        NewData['parallelAxis'].push({
          dim: i - bShowLegend,
          name: Data.header[i].title,
          max: dimMinMax.max,
          min: dimMinMax.min
        });
      }

      //第0列为legend
      for (i = bShowLegend; i < arrCategory.length; i++) {
        NewData['parallelAxis'][arrCategory[i] - bShowLegend].type = "category";
        NewData['parallelAxis'][arrCategory[i] - bShowLegend].data = getUniData(Data.data, arrCategory[i]);
      }

      //NewData['parallelAxis'][objRequest.dimension - bShowLegend].max = dimMinMax.max;
      //NewData['parallelAxis'][objRequest.dimension - bShowLegend].min = dimMinMax.min;

      dimMinMax = getMinMax(Data.data, objRequest.dimension);
      NewData['visualMap'] = {
        show: false,
        min: dimMinMax.min,
        max: dimMinMax.max,
        dimension: objRequest.dimension - bShowLegend,
        calculable: true,
        inRange: {
          color: ['#e92312', '#a2ca36', '#50a3ba'].reverse()
        }
      };
      NewData['series'] = getParallelSeries(Data.data, NewData['legend'], objRequest);

      return NewData;
    }

    //树形图
    function convertTreeMapData(objRequest) {
      var Data = objRequest.data;
      if (0 === Data.rows) {
        return false;
      }

      function getLevelOption() {
        return [{
          itemStyle: {
            normal: {
              borderWidth: 0,
              gapWidth: 1
            }
          }
        }, {
          itemStyle: {
            normal: {
              gapWidth: 1
            }
          }
        }, {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            normal: {
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        }];
      }
      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: [{
          name: Data.header[Data.cols - 1].title,
          type: objRequest.type,
          label: {
            show: true,
            formatter: '{b}'
          },
          squareRatio: objRequest.squareRatio,
          //leafDepth: objRequest.leafDepth, //数据下钻
          width: '100%',
          height: '90%',
          top: 55,
          label: {
            show: true,
            normal: {
              /*textStyle:{
                  fontSize:30
              },*/
              //position: [1, -5],
              formatter: '{b}: {c}'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'white'
            }
          },
          levels: getLevelOption(),
          data: convertArr2TreeMapObj(Data.data)
        }]
      };
      if (objRequest.leafDepth > 0) {
        NewData.series[0].leafDepth = objRequest.leafDepth;
      }
      return NewData;
    }

    //雷达图
    function convertRadarMapData(objRequest) {
      var Data = objRequest.data;
      if (0 === Data.rows || Data.cols < 3) {
        return false;
      }
      var radarObj = convertArr2RadarMapObj(Data, objRequest);
      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        radarIndicator: radarObj.radarIndicator,
        series: radarObj.series,
        legend: radarObj.legend
      };

      return NewData;
    }

    /**
     * [getScatterSeriesData 数据接口数据转散点图数据结构]
     * @param  {[type]} arr [输入多维数组]
     * @return {[type]}     [description]
     */
    function getScatterSeriesData(arr, scale) {
      var res = {};
      var itemStyle = {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          /*color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,
            color: 'rgb(129, 227, 238)'
          }, {
            offset: 1,
            color: 'rgb(25, 183, 207)'
          }])*/
        }
      };
      arr.data.map(function(elem) {
        //如果不存在，先置为空数组
        if (typeof res[elem[0]] == 'undefined') {
          res[elem[0]] = {
            name: elem[0],
            type: 'scatter',
            symbolSize: function(val) {
              var scSize = scale * val[1];
              return scSize.toFixed(0);
            },
            data: [],
            itemStyle: itemStyle,
            label: {
              emphasis: {
                show: true,
                position: 'top'
              }
            }
          };
        }
        var arrData = [];
        for (var i = 1; i < elem.length; i++) {
          arrData.push(Number.parseFloat(elem[i]).toFixed(2));
        }
        res[elem[0]].data.push(arrData);
      });

      var arrSeries = [];
      for (var k in res) {
        arrSeries.push(res[k]);
      }
      return arrSeries;
    }

    //散点图
    function convertScatterData(objRequest) {

      var Data = objRequest.data;

      if (0 === Data.rows || 1 === Data.cols || (Data.cols <= 2 && isNaN(Data.data[0][0]))) {
        return false;
      }
      var haveLegendCol = isNaN(Data.data[0][0]);

      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        xAxisName: haveLegendCol ? Data.header[1].title : Data.header[0].title,
        yAxisName: haveLegendCol ? Data.header[2].title : Data.header[1].title
      };
      /*var itemStyle = {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,
            color: 'rgb(129, 227, 238)'
          }, {
            offset: 1,
            color: 'rgb(25, 183, 207)'
          }])
        }
      };*/
      if (haveLegendCol) {
        NewData.legend = {
          data: getUniData(Data.data, 0),
          x: 'center',
          y: 70,
          itemGap: 20,
          textStyle: {
            fontSize: 16,
          }
        };
        var objMinMax = getMinMax(Data.data, 2);
        var scale = objRequest.scatterSize / objMinMax.max;
        NewData.series = getScatterSeriesData(Data, scale);
      } else {
        var objMinMax = getMinMax(Data.data, 1);
        var scale = objRequest.scatterSize / objMinMax.max;
        NewData.legend = {
          data: [Data.header[1].title],
          x: 'center',
          y: 70,
          itemGap: 20,
          textStyle: {
            fontSize: 16,
          }
        };
        NewData.series = [{
          type: 'scatter',
          name: Data.header[1].title,
          symbolSize: function(val) {
            var scSize = scale * val[1];
            return scSize.toFixed(0);
          },
          data: Data.data,
          //itemStyle: itemStyle,
          label: {
            emphasis: {
              show: true,
              position: 'top'
            }
          }
        }];
      }
      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);
      return NewData;
    }

    function getWordCloudSeriesData(obj) {

      var wordCloudData = [];

      var series = {
        nodes: [],
        data: []
      };

      var len = obj.header.length;
      //获取除最后一列之外所有列的Nodes，默认均为Category,此处不做数据类型校验
      for (var i = 0; i < len - 1; i++) {
        series.nodes = series.nodes.concat(getUniData(obj.data, i));
      }

      series.nodes.map(function(data) {
        series.data[data] = 0;
      });

      //处理数据为通用数组格式
      obj.data.map(function(elem) {
        for (var i = 0; i < len - 1; i++) {
          series.data[elem[i]] += Number.parseFloat(elem[len - 1]);
        }
      });

      series.nodes.map(function(data) {
        wordCloudData.push({
          name: data,
          value: series.data[data]
        })
      });

      return wordCloudData;
    }

    //桑基图
    function convertWordCloudData(objRequest) {

      var Data = objRequest.data;
      //必须3列以上
      if (0 === Data.rows || Data.cols < 2) {
        return false;
      }
      var series = getWordCloudSeriesData(Data);

      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: series
      };

      return NewData;
    }

    /**
     * [getSankeySeriesData 数据接口数据转桑基图数据结构]
     * @param  {[type]} arr [输入多维数组]
     * @return {[type]}     [description]
     */
    function getSankeySeriesData(obj) {

      var series = {
        nodes: [],
        links: [],
        linkName: []
      };
      var sankeyData = {
        nodes: [],
        links: []
      };

      var len = obj.header.length;
      //获取除最后一列之外所有列的Nodes，默认均为Category,此处不做数据类型校验
      for (var i = 0; i < len - 1; i++) {
        if (i == len - 2) {
          series.linkName = series.nodes;
        }
        series.nodes = series.nodes.concat(getUniData(obj.data, i));
      }
      //构造links 的 obj
      series.linkName.map(function(elem) {
        series.links[elem] = {};
      });

      //处理数据为通用数组格式
      obj.data.map(function(elem) {
        for (var i = 0; i < len - 2; i++) {
          if (isNaN(series.links[elem[i]][elem[i + 1]])) {
            series.links[elem[i]][elem[i + 1]] = Number.parseFloat(elem[len - 1]);
          } else {
            series.links[elem[i]][elem[i + 1]] += Number.parseFloat(elem[len - 1]);
          }
        }
      });

      series.nodes.map(function(elem) {
        sankeyData.nodes.push({
          name: elem
        });
      });

      for (var source in series.links) {
        for (var target in series.links[source]) {
          sankeyData.links.push({
            source: source,
            target: target,
            value: series.links[source][target]
          });
        }
      }

      return sankeyData;
    }

    //桑基图
    function convertSankeyData(objRequest) {

      var Data = objRequest.data;
      //必须3列以上
      if (0 === Data.rows || Data.cols <= 2) {
        return false;
      }

      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: getSankeySeriesData(Data)
      };

      return NewData;
    }

    /**
     * [uniqueForceArr ForceGraph数组去重]
     * @param  {[type]} source [待比较的对象]
     * @param  {[type]} target [目标数组]
     * @return {[type]}           [目标数组]
     */
    function uniqueForceArr(source, target) {
      //字符串比较是否相等
      var strSource = JSON.stringify(source);
      var haveSameData = false;
      var len = target.length;
      for (var i = 0;
        (i < len) && !haveSameData; i++) {
        if (strSource == JSON.stringify(target[i])) {
          haveSameData = true;
        }
      }
      if (!haveSameData) {
        target.push(source);
      }
      return target;
    }

    function getForceGraphSeriesData(obj) {

      var series = {
        nodes: [],
        nodesName: [],
        links: []
      };
      var forceData = {
        categories: [],
        nodes: [],
        links: [],
        legend: []
      };
      //类目编号
      var categoryIdx = [];

      var len = obj.header.length;
      var nodeID = 0;

      //计算不同列的数据大小
      var scale = 90 / len;
      var symbolSize = [];
      for (var i = 0; i < len - 1; i++) {
        var size = scale * (len - i);
        symbolSize[i] = size.toFixed(0);
      }

      forceData.legend = getUniData(obj.data, 0);
      forceData.legend.map(function(elem, catIdx) {
        forceData.categories.push({
          name: elem
        });
        categoryIdx[elem] = catIdx;

        series.nodesName[catIdx] = [];
        series.nodes[catIdx] = [];

        //获取各类目轴对应的Nodes
        for (var i = 0; i < len - 1; i++) {
          var catData = getUniData(obj.data, i, elem, 0);
          catData.map(function(nodeName, nodeIdx) {
            series.nodes[catIdx][nodeName] = {
              name: nodeName,
              value: 0,
              category: catIdx,
              id: nodeID,
              symbolSize: symbolSize[i]
            };
            nodeID++;
          });
        }

      });

      //处理数据为通用数组格式
      obj.data.map(function(elem) {
        for (var i = 0; i < len - 2; i++) {
          var lgdIdx = categoryIdx[elem[0]];
          var sourceName = elem[i];
          var targetName = elem[i + 1];
          //数据由 SQL Group By 查询所得，无重复数据，直接生成LINKS数据即可
          series.links.push({
            source: series.nodes[lgdIdx][sourceName].id,
            target: series.nodes[lgdIdx][targetName].id
          });
          series.nodes[lgdIdx][sourceName].value += Number.parseFloat(elem[len - 1]);
        }
        //处理最后一列数据
        series.nodes[categoryIdx[elem[0]]][elem[i]].value += Number.parseFloat(elem[len - 1]);
      });

      series.nodes.map(function(nodes) {
        for (var key in nodes) {
          forceData.nodes.push(
            nodes[key]
          );
        }
      });

      //links 去重
      forceData.links[0] = series.links[0];

      series.links.map(function(elem) {
        forceData.links = uniqueForceArr(elem, forceData.links);
      });
      return forceData;
    }

    //力导向布局图
    function convertForceGraphData(objRequest) {

      var Data = objRequest.data;
      //必须3列以上
      if (0 === Data.rows || Data.cols <= 2) {
        return false;
      }

      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: getForceGraphSeriesData(Data)
      };

      return NewData;
    }

    //事件河流图
    function convertThemeRiverData(objRequest) {

      var Data = objRequest.data;
      //必须3列以上
      if (0 === Data.rows || Data.cols != 3) {
        return false;
      }

      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        series: [{
          type: 'themeRiver', //objRequest.type,
          itemStyle: {
            emphasis: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          data: Data.data
        }],
        legend: {
          data: getUniData(Data.data, 2),
          x: 'center',
          y: 70,
          itemGap: 20,
          textStyle: {
            fontSize: 16,
          }
        }
      };

      return NewData;
    }

    //控制图
    function convertSPCData(objRequest) {
      var arrTem;
      var iTemp, i, j;
      var NewData = [];

      var Data = objRequest.data;
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;

      if (0 === Data.rows) {
        return NewData;
      }

      if (Data.cols == 3) {
        NewData['xAxisTitle'] = Data.header[1].title;
        NewData['yAxisTitle'] = Data.header[2].title;

        NewData['legend'] = getUniData(Data.data, 0);
        NewData['xAxis'] = getUniData(Data.data, 1);
        NewData['yAxis'] = [];

        //yAxis数据清零
        for (i = 0; i < NewData.legend.length; i++) {
          NewData['yAxis'][NewData.legend[i]] = [];
          for (j = 0; j < NewData.xAxis.length; j++) {
            NewData['yAxis'][NewData.legend[i]][j] = '-';
          }
        }
        for (i = 0; i < Data.rows; i++) {
          iTemp = Data.data[i][0]; //Legend
          for (j = 0; j < NewData.xAxis.length; j++) {
            if (Data.data[i][1] == NewData.xAxis[j]) {
              NewData['yAxis'][iTemp][j] = Number.parseFloat(Data.data[i][2]); //字符——————>浮点型(否则数据无法做average等比较)
              break;
            }
          }
        }

        NewData['series'] = [];
        for (i = 0; i < NewData.legend.length; i++) {
          NewData['series'][i] = {
            "name": NewData.legend[i],
            "type": "line",
            "smooth": objRequest.smooth,
            "data": NewData.yAxis[NewData.legend[i]],
            "label": {
              normal: {
                show: false
              }
            }
          };
          if (!objRequest.lineShadow) {
            NewData['series'][i].lineStyle = {
              normal: {
                width: objRequest.lineAreaStyle ? 0 : 3,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            };
          }
        }


      } else if (Data.cols == 2) {
        NewData['xAxisTitle'] = Data.header[0].title;
        NewData['yAxisTitle'] = Data.header[1].title;

        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];


        NewData['xAxis'] = convertMatrixRowCol(Data.data, 0);
        NewData['yAxis'] = convertMatrixRowCol(Data.data, 1);

        NewData['series'] = [];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": "line",
          "smooth": objRequest.smooth,
          "data": NewData.yAxis,
          "label": {
            normal: {
              show: false
            }
          }
        };

        if (!objRequest.lineShadow) {
          NewData['series'][0].lineStyle = {
            normal: {
              width: objRequest.lineAreaStyle ? 0 : 3,
              type: 'solid',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          };
        }
      } else if (Data.cols == 1) {
        NewData['xAxisTitle'] = "数据编号";
        NewData['yAxisTitle'] = Data.header[0].title;
        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        arrTemp = [];
        for (i = 0; i < Data.rows; i++) {
          arrTemp[i] = i + 1;
        }
        NewData['xAxis'] = arrTemp;
        NewData['yAxis'] = [];
        for (i = 0; i < Data.rows; i++) {
          NewData['yAxis'][i] = Number.parseFloat(Data.data[i][0]);
        }
        NewData['series'] = [];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": "line",
          "smooth": objRequest.smooth,
          "data": NewData.yAxis,
          "label": {
            normal: {
              show: false
            }
          }
        };

        if (!objRequest.lineShadow) {
          NewData['series'][0].lineStyle = {
            normal: {
              width: objRequest.lineAreaStyle ? 0 : 3,
              type: 'solid',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          };
        }
      }

      if (Data.cols <= 3) {
        for (i = 0; i < NewData.legend.length; i++) {
          var markLineData = statTool.pChart(NewData['series'][i]['data']);

          NewData['series'][i].markLine = {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            symbolSize: 0,
            label: {
              normal: {
                position: 'end',
                formatter: '{b}:\n{c}'
              }
            },
            data: [{
              name: 'UCL',
              yAxis: markLineData.UCL
            }, {
              name: 'CL',
              yAxis: markLineData.CL
            }, {
              name: 'LCL',
              yAxis: markLineData.LCL,
              lineStyle: {
                normal: {
                  color: '#ea2333'
                }
              }
            }]
          };
        }
      }
      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);
      return NewData;
    }

    var returnData;
    if (typeof objRes.data !== 'undefined') {
      objRes.data = objRes.data;
    } else {
      objRes.data = getJsonFromUrl(objRes.url);
    }
    //处理品种 参数 p
    if (objRes.url.indexOf('p=') != -1) {
      var pdtName = decodeURI(objRes.url.split('&p=')[1].split('&')[0]);
      objRes.data.title = pdtName.toUpperCase() + objRes.data.title;
    }

    switch (objRes.type) {
      case 'bar':
      case 'line':
        returnData = convertBarData(objRes);
        break;
      case 'histogram':
        returnData = objRes.data;
        break;
      case 'spc':
        returnData = convertSPCData(objRes);
        break;
      case 'boxplot':
        returnData = convertBoxPlotData(objRes);
        break;
      case 'candlestick':
        returnData = convertCandleStickData(objRes);
        break;
      case 'pie':
      case 'funnel':
        returnData = convertRadiusData(objRes);
        break;
      case 'sunrise':
        returnData = convertSunRiseData(objRes);
        break;
      case 'parallel':
        returnData = convertParallelData(objRes);
        break;
      case 'treemap':
        returnData = convertTreeMapData(objRes);
        break;
      case 'radar':
        returnData = convertRadarMapData(objRes);
        break;
      case 'scatter':
        returnData = convertScatterData(objRes);
        break;
      case 'sankey':
        returnData = convertSankeyData(objRes);
        break;
      case 'graph':
        returnData = convertForceGraphData(objRes);
        break;
      case 'themeriver':
        returnData = convertThemeRiverData(objRes);
        break;
      case 'wordcloud':
        returnData = convertWordCloudData(objRes);
        break;
    }
    return returnData;
  };

  var getGridAxisOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],
      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      connectNulls: true,
      toolbox: {
        left: "left",
        show: objRequest.toolbox,
        feature: {
          mark: {
            show: true
          },
          //dataZoom : {show: true},
          dataView: {
            show: true,
            readOnly: false
          },
          dataZoom: {
            show: true,
            yAxisIndex: 'none'
          },
          magicType: {
            show: true,
            type: ['line', 'bar', 'stack', 'tiled']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        trigger: (objRequest.type == 'boxplot') ? 'item' : 'axis',
        axisPointer: {
          type: (objRequest.type == 'line') ? 'line' : 'shadow',
          lineStyle: {
            color: '#aaa'
          },
          crossStyle: {
            color: '#aaa'
          },
          shadowStyle: {
            color: 'rgba(128,200,128,0.1)'
          }
        }
      },
      dataZoom: [{
          type: 'inside',
          realtime: true,
          start: 0,
          end: 100
        }, {
          show: (objRequest.dataZoom == 'h' || objRequest.dataZoom == 'vh') ? true : false,
          realtime: true,
          start: 0,
          end: 100,
          height: 30,
          y2: 25,
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          //handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        /*{
               type: 'inside',
               yAxisIndex: 0,
               realtime: true,
               start: 0,
               end: 100
             },*/
        {
          show: (objRequest.dataZoom == 'v' || objRequest.dataZoom == 'vh') ? true : false,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 12,
          height: '70%',
          handleSize: 8,
          showDataShadow: false,
          right: 5,
          //height: 30,
          //y2: 25,
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          //handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ],
      legend: {
        data: Data.legend,
        x2: '5%',
        y: 40,
        itemGap: 20,
        textStyle: {
          fontSize: 16,
        },
        show: (Data.legend.length <= 1) ? false : true
      },
      xAxis: [{
        name: Data.xAxisTitle,
        nameTextStyle: {
          fontSize: 16
        },
        axisTick: {
          show: true,
          length: 8,
          lineStyle: { // 属性lineStyle控制线条样式
            color: '#aaa',
            width: 2
          },
          alignWithLabel: true
        }, //隐藏标记线,
        axisLabel: {
          textStyle: {
            fontSize: 16,
          }
        },
        splitArea: {
          show: objRequest.splitArea
        },
        type: 'category',
        boundaryGap: (objRequest.type == 'line') ? false : true,
        data: Data.xAxis,
      }],
      yAxis: [{
        name: Data.yAxisTitle,
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          fontSize: 16
        },
        type: 'value',
        position: 'left',
        scale: true, //自动缩放最大最小值
        axisLabel: {
          show: true,
          interval: 'auto',
          margin: 10,
          textStyle: {
            fontSize: 16,
          }
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: objRequest.splitArea
        }
      }],
      series: Data.series
    };

    if (objRequest.max != 'undefined') {
      outData.yAxis[0].max = Number.parseFloat(objRequest.max);
    }
    if (objRequest.min != 'undefined') {
      outData.yAxis[0].min = Number.parseFloat(objRequest.min);
    }

    if (objRequest.type == 'boxplot') {
      outData.title[2] = {
        text: '上须: Q3 + 1.5 * IRQ \n下须: Q1 - 1.5 * IRQ\nIRQ: Q3-Q1',
        borderColor: '#999',
        borderWidth: 1,
        textStyle: {
          fontSize: 14
        },
        x2: '5%'
      };
      if (Data.legend.length < 5) {
        outData.title[2].y = 70;
      } else {
        outData.title[2].y2 = 110;
      }
      if (objRequest.minMax) {
        outData.title[2].text = '上须: 最大值 \n下须: 最小值';
      }
    }
    if (objRequest.reverse) { //是否需要调换X/Y轴
      var objTemp;
      objTemp = outData.xAxis;
      outData.xAxis = outData.yAxis;
      outData.yAxis = objTemp;
    }
    return outData;
  };


  var getSPCOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x: 10,
        y2: 3
      }],

      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      connectNulls: true,
      toolbox: {
        left: "left",
        show: objRequest.toolbox,
        feature: {
          mark: {
            show: true
          },
          //dataZoom : {show: true},
          dataView: {
            show: true,
            readOnly: false
          },
          dataZoom: {
            show: true,
            yAxisIndex: 'none'
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        trigger: 'axis',
        axisPointer: {
          type: (objRequest.type == 'line') ? 'line' : 'shadow',
          lineStyle: {
            color: '#aaa'
          },
          crossStyle: {
            color: '#aaa'
          },
          shadowStyle: {
            color: 'rgba(128,200,128,0.1)'
          }
        }
      },
      dataZoom: [{
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100
      }, {
        show: (objRequest.dataZoom == 'h' || objRequest.dataZoom == 'vh') ? true : false,
        realtime: true,
        start: 0,
        end: 100,
        height: 30,
        y2: 25,

        //height: 30,
        //y2: 25,
        textStyle: {
          color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //handleSize: '80%',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }, {
        show: (objRequest.dataZoom == 'v' || objRequest.dataZoom == 'vh') ? true : false,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: '90%',
        showDataShadow: false,
        right: 5,

        //height: 30,
        //y2: 25,
        textStyle: {
          color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //handleSize: '80%',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      legend: {
        data: Data.legend,
        x2: '5%',
        y: 40,
        itemGap: 20,
        textStyle: {
          fontSize: 16,
        },
        selectedMode: 'single',
        show: (Data.legend.length <= 1) ? false : true
      },
      xAxis: [{
        name: Data.xAxisTitle,
        nameTextStyle: {
          fontSize: 16
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        }, //隐藏标记线,
        type: 'category',
        boundaryGap: (objRequest.type == 'line') ? false : true,
        data: Data.xAxis,
      }],
      yAxis: [{
        name: Data.yAxisTitle,
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          fontSize: 16
        },
        type: 'value',
        position: 'left',
        scale: true, //自动缩放最大最小值
        axisLabel: {
          show: true,
          interval: 'auto',
          margin: 8,
        },
        axisTick: {
          show: false
        }
      }],
      series: Data.series
    };
    return outData;
  };


  var getRadiusOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 10,
        y2: 3
      }],
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        left: "left",
        show: objRequest.toolbox,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      legend: Data.legend,
      series: Data.series
    };

    if (objRequest.type == 'funnel') {

      if (outData.series.length > 1) {

        outData.series[0].width = '60%';
        outData.series[0].height = '40%';
        outData.series[0].left = '20%';
        outData.series[0].top = '10%';
        outData.series[0].label = {
          "normal": {
            "position": "inner"
          }
        };
        outData.series[0].labelLine = {
          "normal": {
            "show": false
          }
        };
        outData.series[1].width = '60%';
        outData.series[1].height = '40%';
        outData.series[1].left = '20%';
        outData.series[1].top = '50%';
        outData.series[1].sort = 'ascending';
        outData.series[1].label = {
          "normal": {
            "position": "inner"
          }
        };
        outData.series[1].labelLine = {
          "normal": {
            "show": false
          }
        };

      } else {
        outData.series[0].width = '60%';
        outData.series[0].height = '60%';
        outData.series[0].left = '20%';
        outData.series[0].top = '20%';
        outData.series[0].sort = 'ascending';
        outData.series[0].label = {
          "normal": {
            "position": "inner"
          }
        };
        outData.series[0].labelLine = {
          "normal": {
            "show": false
          }
        };
      }
    }
    return outData;
  };

  var getParallelOption = function(objRequest) {
    var outData = {
      backgroundColor: '#445',
      title: [{
        text: Data.title,
        subtext: Data.subTitle + staticDateRange,
        x: 'center',
        "textStyle": {
          color: '#bbb',
        }
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          "color": '#aaa'
        },
        x2: 10,
        y2: 3
      }],
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          restore: {},
          saveAsImage: {}
        }
      },
      parallel: {
        left: objRequest.reverse ? 120 : 50,
        right: 50,
        top: 120,
        layout: objRequest.reverse ? 'vertical' : 'horizontal',
        /*axisExpandable: true,
        axisExpandCenter: 0,
        axisExpandCount: 5,
        axisExpandWidth: 50,*/
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'start',
          nameGap: 20,
          //nameTruncateLength: 8, //名字缩写显示字符长度，中文除2
          silent: false,
          nameTextStyle: {
            color: '#aaa',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#aaa'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#aaa'
            }
          }
        }
      },
      parallelAxis: Data.parallelAxis,
      visualMap: Data.visualMap,
      legend: Data.legend,
      series: Data.series
    };

    return outData;
  };

  var getTreeMapOption = function(objRequest) {

    var echartsFormat = function() {
      this.encodeHTML = function(source) {
        return String(source)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      };

      /**
       * 每三位默认加,格式化
       * @type {string|number} x
       */
      this.addCommas = function(x) {
        if (isNaN(x)) {
          return '-';
        }
        x = (x + '').split('.');
        return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (x.length > 1 ? ('.' + x[1]) : '');
      };
    };

    var formatUtil = new echartsFormat();

    var outData = {
      title: [{
        text: Data.title,
        subtext: Data.subTitle + staticDateRange,
        x: 'center'
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 10,
        y2: 2
      }],
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          restore: {},
          saveAsImage: {}
        }
      },
      /*visualMap: {
            show: false,
            //min: 1,
            //max: 400,
            dimension: 0,
            inRange: {
                color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757"]
            }
      },*/
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        formatter: function(info) {
          var value = info.value;
          var treePathInfo = info.treePathInfo;
          var treePath = [];

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          //return [
          //  '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
          //  treePathInfo[0].name + ': ' + formatUtil.addCommas(value),
          //].join('');
          return treePath.join('/') + '<br>' + treePathInfo[0].name + ': ' + value;
        }
      },
      series: Data.series
    };

    return outData;
  };

  var getRadarMapOption = function(objRequest) {

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          restore: {},
          saveAsImage: {}
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
      },
      legend: Data.legend,
      radar: {
        indicator: Data.radarIndicator,
        shape: objRequest.shape,
        name: {
          textStyle: {
            color: '#555'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#bbb'
          }
        },
        center: ['50%', '58%'],
        radius: '75%',
        splitArea: {
          show: false
        }
      },
      series: Data.series
    };
    return outData;
  };


  var getScatterOption = function(objRequest) {

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],

      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          dataZoom: {
            show: true,
            //yAxisIndex: 'none'
          },
          restore: {
            show: true
          },
          magicType: {
            type: ['line', 'bar']
          },
          saveAsImage: {
            show: true
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 0,

        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        formatter: function(params) {
          if (params.value.length > 1) {
            return params.seriesName + ' :<br/>' + params.value[0] + ' , ' + params.value[1] + ' ';
          } else {
            return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value;
          }
        },
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      dataZoom: [{
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100
      }, {
        show: false,
        realtime: true,
        start: 0,
        end: 100,
        height: 30,
        y2: 25,
        //height: 30,
        //y2: 25,
        textStyle: {
          color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //handleSize: '80%',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }, {
        type: 'inside',
        yAxisIndex: 0,
        realtime: true,
        start: 0,
        end: 100
      }, {
        show: false,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        right: 5,
        //height: 30,
        //y2: 25,
        textStyle: {
          color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //handleSize: '80%',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      xAxis: [{
        name: Data.xAxisName,
        type: 'value',
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        boundaryGap: false,
        scale: true,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: true
        }
      }],
      yAxis: [{
        name: Data.yAxisName,
        type: 'value',
        scale: true,
        position: 'left',
        axisLabel: {
          show: true,
          interval: 'auto',
          margin: 8
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        }
      }],
      legend: Data.legend,
      series: Data.series
    };
    return outData;
  };


  var getSankeyOption = function(objRequest) {

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],

      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',

        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },

      },
      series: {
        type: objRequest.type,
        data: Data.series.nodes,
        links: Data.series.links,
        layout: 'none',
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#aaa'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.5,
            opacity: 0.5
          }
        }
      }
    };
    return outData;
  };



  var getForceGraphOption = function(objRequest) {

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],
      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      legend: {
        data: Data.series.legend,
        x: 'center',
        y: 70,
        itemGap: 20,
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        }
      },
      series: {
        name: "关系图",
        type: objRequest.type,
        layout: objRequest.force == '1' ? 'force' : 'circular',
        label: {
          normal: {
            position: 'right',
            formatter: '{b}'
          }
        },
        draggable: true,
        nodes: Data.series.nodes,
        categories: Data.series.categories,
        force: {
          // initLayout: 'circular',
          gravity: 0.07,
          edgeLength: 100,
          repulsion: 150
        },
        links: Data.series.links
      }
    };
    return outData;
  };


  var getWordCloudOption = function(objRequest) {

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],
      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: {
        type: 'wordCloud',
        sizeRange: [20, 120],
        rotationRange: [-90, 90],
        rotationStep: 1,
        //'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        shape: 'circle',
        textStyle: {
          normal: {
            //color: objRequest.color
            color: function(param) {
              // console.log(param.dataIndex);
              // return 'rgb(' + [
              //   Math.round(Math.random() * 180),
              //   Math.round(Math.random() * 120),
              //   Math.round(Math.random() * 180)
              // ].join(',') + ')';
              var len = objRequest.color.length % param.dataIndex;
              return objRequest.color[len];
            }
          }
        },
        //data: Data.series
      }
    };
    if (typeof Data.series != 'undefined') {
      outData.series.data = Data.series;
    }
    return outData;
  };

  var getThemeRiverOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.subTitle,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],

      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        },
        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        }
      },
      singleAxis: {
        axisTick: {},
        axisLabel: {},
        bottom: '10%',
        type: objRequest.singleAxis, //'time', //暂时支持value及category,其中category需要指定data序列,value需要指定MIN MAX
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      left: '5%',
      legend: Data.legend,
      series: Data.series
    };



    switch (objRequest.singleAxis) {
      case 'value':
        var extremum = getMinMax(Data.data, 1);
        outData.singleAxis.min = extremum.min;
        outData.singleAxis.max = extremum.max;
        break;
      case 'category':
        outData.data = getUniData(Data.data, 1);
        break;
    }

    return outData;
  };

  function getCandleStickOption(obj) {


    var outData = getGridAxisOption(obj);

    if (outData.series.length > 2) {
      outData.legend.selectedMode = 'single';
    }
    outData.tooltip.trigger = 'axis';

    // outData.toolbox.feature.brush = {
    //   type: ['lineX', 'clear']
    // }
    // outData.brush = {
    //   xAxisIndex: 'all',
    //   brushLink: 'all',
    //   outOfBrush: {
    //     colorAlpha: 0.1
    //   }
    // };

    return outData;
  }


  // 直方图
  var getHistogramOption = function(objRequest) {
    var seriesData = Data.data.map(function(item) {
      return item;
    });
    var bins = ecStat.histogram(seriesData);

    var outData = {
      title: [{
        text: Data.title,
        x: 'center',
      }, {
        text: Data.source,
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 0
      }, {
        text: staticDateRange.trim(),
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 5,
        y2: 18
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        },
        x: 'right',
        y2: 3
      }],

      grid: {
        left: '5%',
        right: '5%',
        top: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          dataZoom: {
            show: true,
            //yAxisIndex: 'none'
          },
          restore: {
            show: true
          },
          magicType: {
            type: ['line', 'bar']
          },
          saveAsImage: {
            show: true
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 0,

        backgroundColor: 'rgba(255,255,255,0.95)',
        //extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
        extraCssText: 'padding:20px;color:#999;border-radius:5px;box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
        textStyle: {
          color: '#333'
        },
        axisPointer: {
          //type: 'shadow'
          type: 'cross'
        }
      },
      xAxis: [{
        name: Data.xAxisName,
        type: 'value',
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        boundaryGap: false,
        scale: true,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: true
        }
      }],
      yAxis: [{
        type: 'value',
        scale: true,
        position: 'left',
        axisLabel: {
          show: true,
          interval: 'auto',
          margin: 8
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        }
      }],
      series: [{
        type: 'bar',
        barWidth: '99.3%',
        label: {
          normal: {
            show: true,
            position: 'insideTop',
            formatter: function(params) {
              return params.value[1];
            }
          }
        },
        data: bins.data
      }]
    };
    return outData;
  };


  function handleBankNoteColors(objLegend, color) {
    var bankNoteLegend = [];
    objLegend.map(function(legend) {
      //如果是现有品种里面的序列
      if (typeof banknoteColorSheet[legend] != 'undefined') {
        bankNoteLegend.push(banknoteColorSheet[legend]);
      }
    })
    return bankNoteLegend.concat(color);
  }

  function handleParams(option, objRequest) {
    //dataZoom
    /*if (objRequest.dataZoom == 0) {
      delete option.dataZoom;
    }*/

    if (typeof option.legend != 'undefined' && option.legend.data.length < 2) {
      delete option.legend;
    }
    return option;
  }

  function setDefaultValue(obj, keys, defaultValue) {
    if (typeof obj[keys] == 'undefined') {
      obj[keys] = defaultValue;
    }
    return obj;
  }

  function handleObjRequest(obj) {

    var defaultList = {
      symbolSize: 12,
      step: 0,
      toolbox: true,
      max: 'undefined',
      min: 'undefined',
      background: 'default',
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      smooth: true,
      markAreaValue: 0,
      markLine: 0,
      splitArea: 0,
      lineAreaStyle: 0,
      barMaxWidth: 100,
      circle: 0
    }

    //遍历obj的KEY
    for (var key in defaultList) {
      obj = setDefaultValue(obj, key, defaultList[key]);
    }

    return obj;
  }

  function handleLegendStyle(option, objRequest) {
    if (typeof option.legend == 'undefined' || objRequest.type == 'line') {
      return option;
    }
    var legendData = [];
    option.legend.data.map(function(data) {
      legendData.push({
        name: data,
        icon: 'pin'
      });
    });
    option.legend.data = legendData;
    return option
  }

  var Data;
  var staticDateRange = '';

  var getOption = function(objRequest, echarts) {
    //处理默认数据
    objRequest = handleObjRequest(objRequest);

    Data = convertData(objRequest, echarts);
    //处理起始时间
    var dateStr = objRequest.url.split('tstart=')[1];
    var pds = getUrlParam('tstart');
    var dateStart = (pds != null) ? pds : jsLeft(dateStr, 8);
    var dateEnd = dateStr.split('tend=')[1];
    if (typeof dateEnd != 'undefined') {
      dateEnd = jsLeft(dateEnd, 8);
    }

    staticDateRange = "     统计时间：" + dateStart + " - " + dateEnd;
    //console.log(staticDateRange);

    if (Data.rows == 0) {
      return false;
    }
    var outData;
    switch (objRequest.type) {
      case 'bar':
      case 'line':
      case 'boxplot':
        outData = getGridAxisOption(objRequest);
        break;
      case 'candlestick':
        outData = getCandleStickOption(objRequest);
        break;
      case 'spc':
        outData = getSPCOption(objRequest);
        break;
      case 'histogram':
        outData = getHistogramOption(objRequest);
        break;
      case 'pie':
      case 'funnel':
      case 'sunrise':
        outData = getRadiusOption(objRequest);
        break;
      case 'parallel': //平行坐标系
        outData = getParallelOption(objRequest);
        break;
      case 'treemap': //树形图
        outData = getTreeMapOption(objRequest);
        break;
      case 'radar': //雷达图
        outData = getRadarMapOption(objRequest);
        break;
      case 'scatter': //散点图
        outData = getScatterOption(objRequest);
        break;
      case 'sankey': //桑基图
        outData = getSankeyOption(objRequest);
        break;
      case 'graph': //力导向布局图
        outData = getForceGraphOption(objRequest);
        break;
      case 'themeriver': //事件河流图
        outData = getThemeRiverOption(objRequest);
        break;
      case 'wordcloud':
        outData = getWordCloudOption(objRequest);
        break;
    }

    function isBankNote(objLegend) {
      var legendName = objLegend.data[0];
      if (typeof banknoteColorSheet[legendName] != 'undefined') {
        return true;
      }
      return false;
    }
    //处理钞券颜色
    if (objRequest.banknoteColor == 1 && typeof outData.legend != 'undefined') {
      if (objRequest.type == 'scatter') {
        var colorList = [];
        if (typeof outData.legend != 'undefined' && isBankNote(outData.legend)) {
          for (var i = 0; i < outData.series.length; i++) {
            var legendName = outData.series[i].name;
            colorList.push(banknoteColorSheet[legendName]);
          }
        }
        outData.color = colorList.concat(objRequest.color);
      } else {
        outData.color = handleBankNoteColors(outData.legend.data, objRequest.color);
      }
    }

    //处理legend过长
    if ( /*objRequest.type != 'themeRiver' && */ typeof outData.legend != 'undefined' && outData.legend.data.length > 4) {
      if (typeof outData.grid != 'undefined') {
        outData.grid.right = '15%';
      }
      outData.legend.orient = 'vertical';
      outData.legend.x = 'right';
      outData.legend.left = 'right';
      outData.legend.y = 40;
    }

    //gradiant/value /img
    switch (objRequest.background) {
      case 'img':
        var bgPatternSrc = 'data:image/png;charset=utf-8;base64,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';
        var bgPatternImg = new Image();
        bgPatternImg.src = bgPatternSrc;
        outData.backgroundColor = {
          image: bgPatternImg,
          repeat: 'repeat'
        };
        break;
      case 'gradiant':
        outData.backgroundColor = new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
          offset: 0,
          color: '#f7f8fa'
        }, {
          offset: 1,
          color: '#cdd0d5'
        }]);
        break;
      case 'default':
        break;
      default:
        outData.backgroundColor = '#' + objRequest.background;
        break;
    }

    //全局padding
    outData.title[0].top = 10;
    outData.toolbox.top = 10;

    //处理参数
    //outData = handleParams(outData, objRequest);
    //处理Legend样式
    outData = handleLegendStyle(outData, objRequest);
    return outData;
  };

  return {
    getOption: getOption
  };
});
