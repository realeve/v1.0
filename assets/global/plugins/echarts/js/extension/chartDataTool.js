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
 *   markline：标注线 线形图/柱状图中是否需要显示标注线，打开则标注平均值
 *   markpoint: 标注点 同上，打开则标注最大最小值
 *   barwidth:柱状图最大宽度
 *   splitarea:是否需要显示值域背景分割条
 *   zoom:是否显示缩放控件（横纵向) v(vertical) h(horizontal) vh(both of them)
 *   reverse:是否需要反转X/Y轴 例如柱状图反转后将变为条形图
 * }
 * @输出参数：对应echarts 相关图形所需配置项
 */
define(['./js/extension/dataTool.min'], function(dataTool) {

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

  var convertData = function(objRes) {
    //数组去重
    function sortNumber(a, b) {
      return a - b;
    }

    function UniqueData(arr) {
      arr.sort();
      var re = [arr[0]];
      var i = 0;
      arr.map(function(elem) {
        if (elem != re[i]) {
          re.push(elem);
          i++;
        }
      });
      return re;
    }

    //返回boxplot箱形图tooltip提示信息

    function boxFormatter(param) {
      return [
        '序列 ' + param.seriesName + ': ',
        '分组 ' + param.name + ': ',
        '上边缘: ' + param.data[4].toFixed(2),
        '上四分位(Q1): ' + param.data[3].toFixed(2),
        '中位数: ' + param.data[2].toFixed(2),
        '下四分位(Q3): ' + param.data[1].toFixed(2),
        '下边缘: ' + param.data[0].toFixed(2)
      ].join('<br/>');
    }

    function boxMinMaxFormatter(param) {
      return [
        '序列 ' + param.seriesName + ': ',
        '分组 ' + param.name + ': ',
        '最大值: ' + param.data[4].toFixed(2),
        '上四分位(Q1): ' + param.data[3].toFixed(2),
        '中位数: ' + param.data[2].toFixed(2),
        '下四分位(Q3): ' + param.data[1].toFixed(2),
        '最小值: ' + param.data[0].toFixed(2)
      ].join('<br/>');
    }
    /**
     * [getUniData 返回arr多维数组中指定列index中不重复的数据]
     * @param  {[type]} arr   [多维数组]
     * @param  {[type]} index [第几列]
     * @return {[type]}       [不重复数据]
     */

    function getUniData(data, id) {
      var res = [];
      data.map(function(elem, index) {
        res[index] = elem[id];
      });
      return UniqueData(res.sort(sortNumber));
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
     * [anayDataCategory 分析一维数组中哪些列是类目轴/非数值型]
     * @param  {[type]} arr [description]
     * @return {[type]}      [description]
     */

    function anayDataCategory(arr) {
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

      if (0 === Data.rows) {
        return NewData;
      }
      if (Data.cols == 3) {
        NewData['xAxisTitle'] = Data.header[1].title;
        NewData['yAxisTitle'] = Data.header[2].title;

        NewData['legend'] = getUniData(Data.data, 0);
        NewData['xAxis'] = convertMatrixRowCol(Data.data, 1);
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
            "data": NewData.yAxis[NewData.legend[i]],
            //"markPoint": MPtStyle,
            //"markLine": MLnStyle_avg,
            "itemStyle": dataStyle_iT
          };
          //是否为面积图
          if (objRequest.lineAreaStyle) {
            NewData['series'][i].areaStyle = {
              "normal": {}
            };
          }

          if (!objRequest.reverse) {
            if (objRequest.markLine) {
              NewData['series'][i].markLine = MLnStyle_avg;
            }
            if (objRequest.markPoint) {
              NewData['series'][i].markPoint = MPtStyleBoth;
            }
          }
          //线型图隐藏文本标签
          if (objRequest.type == 'line') {
            NewData['series'][i].itemStyle.normal = {
              show: false
            };
          }
        }
      } else if (Data.cols == 2) {
        NewData['xAxisTitle'] = Data.header[0].title;
        NewData['yAxisTitle'] = Data.header[1].title;


        NewData['xAxis'] = convertMatrixRowCol(Data.data, 0);
        NewData['yAxis'] = convertMatrixRowCol(Data.data, 1);

        /*NewData['yAxis'] = [];
        //yAxis数据清零
        for (i = 0; i < NewData.xAxis.length; i++) {
          NewData['yAxis'][i] = '-';
        }
        for (i = 0; i < Data.rows; i++) {
          NewData['yAxis'][i] = Number.parseFloat(Data.data[i][1]);
        }*/

        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        NewData['series'] = [];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "smooth": objRequest.smooth,
          "barMaxWidth": objRequest.barMaxWidth,
          "data": NewData.yAxis,
          //"markPoint": MPtStyle,
          //"markLine": MLnStyle_avg,
          "itemStyle": dataStyle_iT
        };
        //是否为面积图
        if (objRequest.lineAreaStyle) {
          NewData['series'][0].areaStyle = {
            "normal": {

            }
          };
        }

        if (!objRequest.reverse) {
          if (objRequest.markLine) {
            NewData['series'][0].markLine = MLnStyle_avg;
          }
          if (objRequest.markPoint) {
            NewData['series'][0].markPoint = MPtStyleBoth;
          }
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
          "data": NewData.yAxis,
          //"markPoint": MPtStyle,
          //"markLine": MLnStyle_avg,
          "itemStyle": dataStyle_iT
        };
        //是否为面积图
        if (objRequest.lineAreaStyle) {
          NewData['series'][0].areaStyle = {
            "normal": {}
          };
        }

        if (!objRequest.reverse) {
          if (objRequest.markLine) {
            NewData['series'][0].markLine = MLnStyle_avg;
          }
          if (objRequest.markPoint) {
            NewData['series'][0].markPoint = MPtStyleBoth;
          }
        }
      }

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

        NewData['legend'] = [];
        NewData['legend'][0] = NewData['yAxisTitle'];
        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "data": iConvData.boxData,
          "tooltip": {
            formatter: boxFormatter
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

        NewData['series'][0] = {
          "name": NewData['yAxisTitle'],
          "type": objRequest.type,
          "data": iConvData.boxData,
          "tooltip": {
            formatter: boxFormatter
          }
        };

        NewData['series'][1] = {
          "name": NewData['yAxisTitle'],
          type: 'scatter',
          data: iConvData.outliers
        };

      }

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
          "x": 'left',
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
          "x": 'left',
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
          "x": 'left',
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
          "x": 'left',
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
          "x": 'left',
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
      } else if (Data.cols == 1) {
        NewData['legend'] = {
          "show": false,
          "orient": 'vertical',
          "x": 'left',
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

    function getParallelSeries(arr, legend, seriesType) {
      var seriesArr = [];
      var i = 0;

      var lineStyle = {
        normal: {
          width: 1,
          opacity: 0.5
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
            lineStyle: lineStyle,
            data: obj[elem]
          });
        });
      } else {
        seriesArr.push({
          name: '平行坐标',
          type: seriesType,
          lineStyle: lineStyle,
          data: arr
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
    function convertArr2RadarMapObj(objData) {
      var radarObj = {
        radarIndicator: [],
        series: [],
        legend: {}
      };
      var bShowLegend = 0;
      //legend;
      var arrCategory = anayDataCategory(objData.data[0]);
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
                opacity: 0.3
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
              opacity: 0.3
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
      var arrCategory = anayDataCategory(Data.data[0]);
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
        NewData['parallelAxis'].push({
          dim: i - bShowLegend,
          name: Data.header[i].title
        });
      }

      //第0列为legend
      for (i = bShowLegend; i < arrCategory.length; i++) {
        NewData['parallelAxis'][arrCategory[i] - bShowLegend].type = "category";
        NewData['parallelAxis'][arrCategory[i] - bShowLegend].data = getUniData(Data.data, arrCategory[i]);
      }


      var dimMinMax = getMinMax(Data.data, objRequest.dimension);
      console.log(dimMinMax);
      NewData['parallelAxis'][objRequest.dimension - bShowLegend].max = dimMinMax.max;
      NewData['parallelAxis'][objRequest.dimension - bShowLegend].min = dimMinMax.min;

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
      NewData['series'] = getParallelSeries(Data.data, NewData['legend'], objRequest.type);

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
              gapWidth: 3
            }
          }
        }, {
          itemStyle: {
            normal: {
              gapWidth: 2
            }
          }
        }, {
          colorSaturation: [0.25, 0.4],
          itemStyle: {
            normal: {
              gapWidth: 1,
              borderColorSaturation: 1
            }
          }
        }];
      }
      var NewData = {
        title: Data.title,
        subTitle: Data.source,
        rows: Data.rows,
        lastColName: Data.header[Data.cols - 1].title,
        series: [{
          name: Data.header[Data.cols - 1].title,
          type: objRequest.type,
          label: {
            show: true,
            formatter: '{b}'
          },
          squareRatio: objRequest.squareRatio,
          width: '100%',
          height: '90%',
          top: 55,
          itemStyle: {
            normal: {
              borderColor: '#fff'
            }
          },
          levels: getLevelOption(),
          data: convertArr2TreeMapObj(Data.data)
        }]
      };
      return NewData;
    }

    //雷达图
    function convertRadarMapData(objRequest) {
      var Data = getJsonFromUrl(objRequest.url);
      if (0 === Data.rows || Data.cols < 3) {
        return false;
      }
      var radarObj = convertArr2RadarMapObj(Data);
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


    var returnData;
    switch (objRes.type) {
      case 'bar':
      case 'line':
        returnData = convertBarData(objRes);
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
    }
    return returnData;
  };

  var getGridAxisOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        subtext: Data.subTitle,
        x: 'center',
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 10,
        y2: 5
      }],
      grid: {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
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
        trigger: (objRequest.type == 'boxplot') ? 'item' : 'axis'
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
        type: 'inside',
        yAxisIndex: 0,
        realtime: true,
        start: 0,
        end: 100
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
        x: 'center',
        y: 70,
        itemGap: 20,
        textStyle: {
          fontSize: 16,
        },
        show: (Data.legend.length <= 1) ? false : true
      },
      xAxis: [{
        name: Data.xAxisTitle,
        axisTick: {
          show: false
        }, //隐藏标记线,
        type: 'category',
        boundaryGap: (objRequest.type == 'line') ? false : true,
        data: Data.xAxis,
      }],
      yAxis: [{
        name: Data.yAxisTitle,
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

    if (objRequest.type == 'boxplot') {
      outData.title[2] = {
        text: '上边缘: Q3 + 1.5 * IRQ \n下边缘: Q1 - 1.5 * IRQ\nIRQ: Q3-Q1',
        borderColor: '#999',
        borderWidth: 1,
        textStyle: {
          fontSize: 14
        },
        x2: 10,
        y: 30
      };
      if (objRequest.minMax) {
        outData.title[2].text = '上边缘: 最大值 \n下边缘: 最小值';
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

  var getRadiusOption = function(objRequest) {
    var outData = {
      title: [{
        text: Data.title,
        subtext: Data.subTitle,
        x: 'center',
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 10,
        y2: 5
      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
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
        subtext: Data.subTitle,
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
        y2: 5
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
        left: '50',
        right: '50',
        top: 120,
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'start',
          nameGap: 20,
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
        subtext: Data.subTitle,
        x: 'center'
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 5,
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
      //tooltip:{},
      tooltip: {
        formatter: function(info) {
          var value = info.value;
          var treePathInfo = info.treePathInfo;
          var treePath = [];

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          //return [
          //  '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
          //  Data.lastColName + ': ' + formatUtil.addCommas(value),
          //].join('');
          return treePath.join('/') + '<br>' + Data.lastColName + ': ' + value;
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
        subtext: Data.subTitle,
        x: 'center'
      }, {
        text: '©成都印钞有限公司 技术质量部',
        borderColor: '#999',
        borderWidth: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        x2: 5,
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
      tooltip: {},
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


  var Data;
  var getOption = function(objRequest) {
    Data = convertData(objRequest);
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
    }

    return outData;
  };

  return {
    getOption: getOption
  };
});