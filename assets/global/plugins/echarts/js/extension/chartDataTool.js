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
define(['../plugins/echarts/js/extension/dataTool.min', '../plugins/echarts/js/extension/statisticsTool.min'], function(dataTool, statTool) {

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
    //处理品种 参数 p
    if (strUrl.indexOf('p=') != -1) {
      var pdtName = strUrl.split('&p=')[1].split('&')[0];
      Data.title = pdtName.toUpperCase() + Data.title;
    }

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
    "9607T": "rgb(255,127,104)",
    "103-G-7T": "rgb(255,127,104)"
  };

  var convertData = function(objRes) {
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
      //单个图表中，某项参数有多个值时用分号隔开
      var mkVal = objRequest.markAreaValue.split(';');
      var mkName = objRequest.markArea.split(';');

      if (objRequest.markAreaValue == '0') {
        return series;
      }
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

      Data = getJsonFromUrl(objRequest.url);
      NewData['title'] = Data.title;
      NewData['subTitle'] = Data.source;
      NewData['rows'] = Data.rows;
      var itemStyle = {
        normal: {
          label: {
            show: true,
            position: (objRequest.reverse) ? 'insideRight' : 'insideTop', //top//'insideRight' : 'insideTop'
            formatter: '{c}'
          },
          barBorderRadius: (objRequest.reverse) ? [0, 2, 2, 0] : [2, 2, 0, 0],
          borderColor: "rgba(255,255,255,0.85)",
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
            "barMinHeight": 15,
            "data": haveLegend ? elem.slice(1, elem.length) : elem,
            //"markPoint": MPtStyle,
            //"markLine": MLnStyle_avg,
            "itemStyle": itemStyle,
            "symbolSize": objRequest.symbolSize,
            symbol: 'circle',
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

            //单个图表中，某项参数有多个值时用分号隔开
            mkVal = objRequest.markLineValue.split(';');
            mkName = objRequest.markLine.split(';');
            mkNameLen = mkName.length;

            if (objRequest.markLine != '0') {

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
            "barMinHeight": 15,
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

            //单个图表中，某项参数有多个值时用分号隔开
            mkVal = objRequest.markLineValue.split(';');
            mkName = objRequest.markLine.split(';');
            mkNameLen = mkName.length;

            if (objRequest.markLine != '0') {

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
          "barMinHeight": 15,
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

          //单个图表中，某项参数有多个值时用分号隔开
          mkVal = objRequest.markLineValue.split(';');
          mkName = objRequest.markLine.split(';');
          mkNameLen = mkName.length;

          if (objRequest.markLine != '0') {

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
          "barMinHeight": 15,
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

          //单个图表中，某项参数有多个值时用分号隔开
          mkVal = objRequest.markLineValue.split(';');
          mkName = objRequest.markLine.split(';');
          mkNameLen = mkName.length;
          if (objRequest.markLine != '0') {

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
      var Data = getJsonFromUrl(objRequest.url);
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
          NewData['series'][index] = {
            "name": elem,
            "type": objRequest.type,
            "data": iConvData.boxData,
            "tooltip": {
              backgroundColor: 'rgba(255,255,255,0.85)',
              textStyle: {
                color: '#333'
              },
              extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
              formatter: (objRequest.minMax) ? boxMinMaxFormatter : boxFormatter
            }
          };

          NewData['series'][index + 3] = {
            name: elem,
            type: 'scatter',
            data: iConvData.outliers
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
            backgroundColor: 'rgba(255,255,255,0.85)',
            extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
            backgroundColor: 'rgba(255,255,255,0.85)',
            extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
      var Data = getJsonFromUrl(objRequest.url);
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
      var Data = getJsonFromUrl(objRequest.url);
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
          "radius": [0, '30%'],
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
          NewData['series'][0].radius = [0, "60%"];
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
      var Data = getJsonFromUrl(objRequest.url);
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
      var Data = getJsonFromUrl(objRequest.url);
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
      var Data = getJsonFromUrl(objRequest.url);
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
            data: []
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

      var Data = getJsonFromUrl(objRequest.url);

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
      if (haveLegendCol) {
        NewData.legend = {
          data: getUniData(Data.data, 0),
          left: 'left'
        };
        var objMinMax = getMinMax(Data.data, 2);
        var scale = objRequest.scatterSize / objMinMax.max;
        NewData.series = getScatterSeriesData(Data, scale);

      } else {
        var objMinMax = getMinMax(Data.data, 1);
        var scale = objRequest.scatterSize / objMinMax.max;
        NewData.series = {
          type: 'scatter',
          symbolSize: function(val) {
            var scSize = scale * val[1];
            return scSize.toFixed(0);
          },
          data: Data.data
        };
      }
      NewData.series = handleMarkArea(objRequest, NewData.series);
      NewData.series = handleLineStepMode(objRequest, NewData.series);
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

      var Data = getJsonFromUrl(objRequest.url);
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

      var Data = getJsonFromUrl(objRequest.url);
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

      var Data = getJsonFromUrl(objRequest.url);
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
      var Data, arrTem;
      var iTemp, i, j;
      var NewData = [];

      Data = getJsonFromUrl(objRequest.url);
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
    switch (objRes.type) {
      case 'bar':
      case 'line':
        returnData = convertBarData(objRes);
        break;
      case 'spc':
        returnData = convertSPCData(objRes);
        break;
      case 'boxplot':
        returnData = convertBoxPlotData(objRes);
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
        y2: 3
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
            show: true
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
          height: 20,
          y2: 25
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
          right: 5
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
          }
        }, //隐藏标记线,
        axisLabel: {
          textStyle: {
            fontSize: 16,
          }
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
        }
      }],
      series: Data.series
    };

    if (objRequest.max != '0') {
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
        y2: 3
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
            show: true
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        height: 20,
        y2: 25
      }, {
        show: (objRequest.dataZoom == 'v' || objRequest.dataZoom == 'vh') ? true : false,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        right: 5
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
          show: false
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
        y2: 3
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        y2: 3
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        y2: 3
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
            show: true
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
        showDelay: 0,

        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        height: 20,
        y2: 25
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
        right: 5
      }],
      xAxis: [{
        name: Data.xAxisName,
        type: 'value',
        axisTick: {
          show: false
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
        y2: 3
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

        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        y2: 3
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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
        y2: 3
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        extraCssText: 'box-shadow: 0 0 3px #e6e6e6;border-radius:4px;border:1px solid #d4d4d4;padding:10px;',
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

  var Data;
  var staticDateRange;
  var getOption = function(objRequest) {
    Data = convertData(objRequest);

    //处理起始时间
    var dateStr = objRequest.url.split('tstart=')[1];
    var pds = getUrlParam('tstart');
    var dateStart = (pds != null) ? pds : jsLeft(dateStr, 8);
    var dateEnd = jsLeft(dateStr.split('tend=')[1], 8);
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
      case 'spc':
        outData = getSPCOption(objRequest);
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
    }
    //处理钞券颜色
    if (objRequest.banknoteColor == 1 && typeof outData.legend != 'undefined') {
      outData.color = handleBankNoteColors(outData.legend.data, objRequest.color);
    }
    //处理legend过长
    if ( /*objRequest.type != 'themeRiver' && */ typeof outData.legend != 'undefined' && outData.legend.data.length > 4) {
      if (typeof outData.grid != 'undefined') {
        outData.grid.right = '15%';
      }
      outData.legend.orient = 'vertical';
      outData.legend.x = 'right';
    }


    return outData;
  };

  return {
    getOption: getOption
  };
});