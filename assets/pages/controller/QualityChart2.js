   $("#HideTips").on('click',
     function() {
       $(".mt-element-ribbon").addClass('hide');
     });

    //获取各控制值
   function GetJsonUrl(iID) {
     var date = getDateRange();
     var strUrl = getRootPath() + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&chartType=bar&ID=" + iID + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&t=" + Math.random();
     return strUrl;
   }

   var convertData = function(objRes) {
     //数组去重
     function sortNumber(a, b) {
       return a - b;
     }

     function UniqueData(arrTemp) {
       arrTemp.sort();
       var re = [arrTemp[0]];
       for (var i = 1; i < arrTemp.length; i++) {
         if (arrTemp[i] != re[re.length - 1]) {
           re.push(arrTemp[i]);
         }
       }
       return re;
     }

     /**
      * [convert 格式化图表用数据(曲线图，柱形图)]
      * @param {[request]} request.url [数据接口地址.数据要求:3列 legend/X轴/主轴，2列：X轴/Y轴,1列：Y轴]
      */

     function convert(objRequest) {
       var Data, arrTem;
       var iTemp, i, j;
       var NewData = []; //new Array();
       Data = ReadData(objRequest.url);
       NewData['title'] = Data.title;
       NewData['subTitle'] = Data.source;
       NewData['rows'] = Data.rows;
       //infoTips(JSON.stringify(Data), 2);
       if (0 === Data.rows) {
         return NewData;
       } else {
         if (Data.cols == 3) {
           NewData['xAxisTitle'] = Data.header[1].title;
           NewData['yAxisTitle'] = Data.header[2].title;
           arrTemp = []; //new Array();
           for (i = 0; i < Data.rows; i++) {
             arrTemp[i] = Data.data[i][0];
           }
           arrTemp.sort(sortNumber);
           NewData['legend'] = UniqueData(arrTemp);
           arrTemp = []; //new Array();
           for (i = 0; i < Data.rows; i++) {
             arrTemp[i] = Data.data[i][1];
           }
           NewData['xAxis'] = UniqueData(arrTemp).sort(sortNumber);
           NewData['yAxis'] = []; //new Array();
           //yAxis数据清零
           for (i = 0; i < NewData.legend.length; i++) {
             NewData['yAxis'][NewData.legend[i]] = []; //new Array();
           }
           for (i = 0; i < NewData.legend.length; i++) {
             for (j = 0; j < NewData.xAxis.length; j++) {
               NewData['yAxis'][NewData.legend[i]][j] = '-';
             }
           }
           for (i = 0; i < Data.rows; i++) {
             iTemp = Data.data[i][0]; //Legend
             for (j = 0; j < NewData.xAxis.length; j++) {
               if (Data.data[i][1] == NewData.xAxis[j]) {
                 NewData['yAxis'][iTemp][j] = parseFloat(Data.data[i][2]); //字符——————>浮点型(否则数据无法做average等比较)
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
               "barMaxWidth": 100,
               "data": NewData.yAxis[NewData.legend[i]],
               "markPoint": MPtStyle,
               "markLine": MLnStyle_avg,
               "itemStyle": dataStyle_iT
             };
           }
         } else if (Data.cols == 2) {
           NewData['xAxisTitle'] = Data.header[0].title;
           NewData['yAxisTitle'] = Data.header[1].title;
           arrTemp = []; //new Array();
           for (i = 0; i < Data.rows; i++) {
             arrTemp[i] = Data.data[i][0];
           }
           NewData['xAxis'] = UniqueData(arrTemp);
           NewData['yAxis'] = []; //new Array();
           //yAxis数据清零
           for (i = 0; i < NewData.xAxis.length; i++) {
             NewData['yAxis'][i] = '-';
           }
           for (i = 0; i < Data.rows; i++) {
             NewData['yAxis'][i] = parseFloat(Data.data[i][1]);
           }
           NewData['legend'] = []; //new Array();
           NewData['legend'][0] = NewData['yAxisTitle'];
           NewData['series'] = [];
           NewData['series'][0] = {
             "name": NewData['yAxisTitle'],
             "type": objRequest.type,
             "smooth": objRequest.smooth,
             "barMaxWidth": 100,
             "data": NewData.yAxis,
             "markPoint": MPtStyle,
             "markLine": MLnStyle_avg,
             "itemStyle": dataStyle_iT
           };
         } else if (Data.cols == 1) {
           NewData['xAxisTitle'] = "数据编号";
           NewData['yAxisTitle'] = Data.header[0].title;
           NewData['legend'] = []; //new Array();
           NewData['legend'][0] = NewData['yAxisTitle'];
           arrTemp = []; //new Array();
           for (i = 0; i < Data.rows; i++) {
             arrTemp[i] = i + 1;
           }
           NewData['xAxis'] = arrTemp;
           NewData['yAxis'] = []; //new Array();
           for (i = 0; i < Data.rows; i++) {
             NewData['yAxis'][i] = parseFloat(Data.data[i][0]);
           }
           NewData['series'] = [];
           NewData['series'][0] = {
             "name": NewData['yAxisTitle'],
             "type": objRequest.type,
             "smooth": objRequest.smooth,
             "barMaxWidth": 100,
             "data": NewData.yAxis,
             "markPoint": MPtStyle,
             "markLine": MLnStyle_avg,
             "itemStyle": dataStyle_iT
           };
         }
       }
       return NewData;
     }

     return convert(objRes);
   };

    //配置图表库
   var mECharts = function() {
     var echarts;
     var myChart = []; //new Array(); //任意个数的图表
     var curTheme;
     var iChartNums = (getUrlParam('tid') === null) ? 0 : getUrlParam('tid').split(',').length;
     require.config({
       paths: {
         echarts: 'assets/global/plugins/echarts/js/echarts2',
         theme: 'assets/global/plugins/echarts/theme'
       }
     });

     function launchChart() {
       require(
         [
           'echarts',
           'echarts/chart/line',
           'echarts/chart/bar',
           'echarts/chart/scatter',
           'echarts/chart/pie',
           'echarts/chart/radar',
           'echarts/chart/gauge',
           'echarts/chart/treemap',
           'echarts/chart/map',
           'echarts/chart/tree',
           'echarts/chart/wordCloud'
         ],
         function(ec) {
           echarts = ec;
           var defaultTheme;
           if (typeof Cookies.get('eCharts_theme') == 'undefined') {
             defaultTheme = 'real2';
             Cookies.set('eCharts_theme', 'real2');
           } else {
             defaultTheme = Cookies.get('eCharts_theme');
           }
           require(['theme/' + defaultTheme], function(tarTheme) {
             curTheme = tarTheme;
             initEchartDom();
             showChart(curTheme);
           });
         }
       );
     }

     function initEchartDom() {
       var domParent = $('.portlet-body.form');
       for (i = 0; i < iChartNums; i++) {
         var html = '<div id="eChart-main' + i + '" optionKey="Line" class="eCharts-main margin-top-5"></div>';
         domParent.append(html);
       }
       var dom = $('.eCharts-main');
       var width = domParent.width();
       dom.css('width', width);
       dom.css('height', width / ((dom.length == 1) ? 2 : 3));
     }

     function showChart(curTheme, url) {

      if(!iChartNums){
        return;
      }

       if (!echarts) {
         console.log('echarts load failed');
         return;
       }
       //如果未加载则去掉
       var i, option;
       var objRequest = {};
       var objList = {
         "id": getUrlParam('tid').split(','),
         "type": (getUrlParam('type') === null) ? ['line'] : getUrlParam('type').split(','),
         "smooth": (getUrlParam('smooth') === null) ? ['1'] : getUrlParam('smooth').split(',')
       };
       for (i = 0; i < iChartNums; i++) {
         objRequest = {
           "url": GetJsonUrl(objList.id[i]),
           "type": handleParam(objList.type, i, "line"),
           "smooth": (handleParam(objList.smooth, i, '1') == '1') ? true : false,
           "blind": (getUrlParam('blind') === null) ? false : ((getUrlParam('blind') == "0") ? false : true),
           "toolbox": (objRequest.blind && i) ? false : true
         };

         option = getOption(objRequest);
         if (option !== false) {
           myChart[i] = echarts.init(document.getElementById("eChart-main" + i), curTheme);
           myChart[i].setOption(option);
         } else {
           infoTips('第' + (i + 1) + '张图表无数据，请重新选择查询时间', 2);
         }
       }
       if (objRequest.blind) {
         blindChart();
       }
     }

     function getOption(objRequest) {
       var Data = convertData(objRequest);
       if (Data.rows === 0) {
         return false;
       }
       var outData = {
         title: {
           text: Data.title,
           subtext: Data.subTitle,
           x: 'center',
         },
         tooltip: {
           trigger: 'axis'
         },
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
         dataZoom: {
           //12条以内不显示
           show: (Data.rows <= 12) ? false : true,
           realtime: true,
           start: 0,
           end: 100,
           //height:20,
         },
         calculable: true,
         xAxis: [{
           name: Data.xAxisTitle,
           axisTick: {
             show: false
           }, //隐藏标记线,
           type: 'category',
           boundaryGap: true,
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
         }],
         series: Data.series
       };
       return outData;
     }

     function initThemeOption() {
       if ($('.actions select opotion').length) {
         return false;
       }
       var themeSelector = $(".actions select");
       var defaultTheme, str = "";
       var themeList = ['default', 'real2','powerBI' ,'real', 'macarons', 'helianthus', 'infographic', 'shine', 'dark', 'blue', 'green', 'red', 'gray', 'roma', 'macarons2', 'sakura'];
       themeList.map(function(elem, index) {
         str += '<option name="' + elem + '">' + elem + '</option>';
       });
       themeSelector.html(str);

       if (typeof Cookies.get('eCharts_theme') == 'undefined') {
         defaultTheme = 'real2';
         Cookies.set('eCharts_theme', 'real2');
       } else {
         defaultTheme = Cookies.get('eCharts_theme');
       }
       themeSelector.find('[name="' + defaultTheme + '"]').attr('selected', true);

       $('.bs-select').selectpicker({
         iconBase: 'fa',
         tickIcon: 'fa-check'
       });
       $('select.bs-select').hide();
       //$('div.bs-select').css({'margin-top':'-40px','margin-right':'20px'});
     }

     function blindChart() {
       /*if (typeof $('#eChart-main0').attr('_echarts_instance_') === 'undefined') {
         return false;
       }*/
       var j;
       var arrCharList = [],
         arrTemp = [];

       for (var i = 0; i < iChartNums; i++) {
         j = iChartNums - 1;
         arrCharList = [];
         if (typeof $('#eChart-main' + j).attr('_echarts_instance_') !== 'undefined') {
           for (var k = 0; k < iChartNums; k++) { //构造Chart列表
             if (k !== i) {
               arrCharList.push(myChart[k]);
             }
           }

           if (iChartNums > 1) {
             myChart[i].connect(arrCharList);
           }
         }
       }
     }

     function selectChange(value) {
       var theme = value;
       if (typeof Cookies !== "undefined") {
         Cookies.set('eCharts_theme', value);
       }
       myChart[0].showLoading();
       require(['theme/' + theme], function(tarTheme) {
         curTheme = tarTheme;
         setTimeout(refreshTheme(), 500);
       });
     }

     function refreshTheme() {
       for (i = 0; i < iChartNums; i++) {
         myChart[i].hideLoading();
         myChart[i].setTheme(curTheme);
       }
     }

     //初始化主题模块

     function initTheme() {
       var themeSelector = $(".actions select");
       if (themeSelector) {
         $(themeSelector).change(function() {
           selectChange($(this).val()); //更新图表主题
         });
       }
     }

     $(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
       var themeSelector;
       themeSelector = $(".actions select");
       require(['theme/' + themeSelector.val()], function(tarTheme) {
         curTheme = tarTheme;
         setTimeout(showChart(curTheme), 500);
       });
     });

     //接口预览
     $("#Preview a").on('click',
       function() {
         var strUrl = $('#Preview input').val();
         var themeSelector = $(".actions select");
         require(['theme/' + themeSelector.val()], function(tarTheme) {
           curTheme = tarTheme;
           setTimeout(showChart(curTheme, strUrl + '&chartType=line'), 500);
         });
       });

     return {
       init: function() {
         initThemeOption();
         launchChart();
         initTheme();
       }
     };

   }();

   jQuery(document).ready(function() {
     UIIdleTimeout.init();
     initDashboardDaterange('YYYYMMDD');
     initDom();
     mECharts.init();

     //初始化表格
     //$.fn.select2.defaults.set("theme", "bootstrap");

     if (App.getURLParameter('debug') == 1 || App.getURLParameter('tid') === null) {
       $('#Preview').show();
     } else {
       $('#Preview').hide();
     }
     hideSidebarTool();

   });
   jQuery(window).resize(function() {
     HeadFix();
   });