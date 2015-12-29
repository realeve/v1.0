   $("#HideTips").on('click',
     function() {
       $(".note.note-success").addClass('hide');
     });

   $("#SaveSettings").on('click',
     function() {
       SaveSettings();
     });

   function SaveSettings() {
     //获取各控制值
     var RefreshTime = $("#RefreshTime").val(); //轮询时间
     var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') === true) ? 1 : 0;
     var FixTblHead = ($("#FixTblHead").bootstrapSwitch('state') === true) ? 1 : 0;
     var FixTblCol = ($("#FixTblCol").bootstrapSwitch('state') === true) ? 1 : 0;
     var FootSearch = ($("#FootSearch").bootstrapSwitch('state') === true) ? 1 : 0;
     var InputToggle = ($("#InputToggle").bootstrapSwitch('state') === true) ? 1 : 0;
     var InputInner = ($("#InputInner").bootstrapSwitch('state') === true) ? 1 : 0;
     var strUrl = getRootUrl('QualityTable') + "/SaveSettings";
     //infoTips(RefreshTime +AutoRefresh,0); 
     //获取各控制值完毕
     //向服务器请求数据
     $.post(strUrl, {
         RefreshTime: RefreshTime,
         AutoRefresh: AutoRefresh,
         FixTblHead: FixTblHead,
         FixTblCol: FixTblCol,
         FootSearch: FootSearch,
         InputToggle: InputToggle,
         InputInner: InputInner,
       },
       function(data, status) {
         if (status == "success") {
           var obj = jQuery.parseJSON(data);
           infoTips(obj.message, 1);
         } else {
           infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
         }
       }
     );
   }

   function ReadSettings() {
     var strUrl = getRootUrl('QualityTable') + "/ReadSettings";
     $.ajax({
       type: 'POST',
       async: false, //同步
       //async: true,
       url: strUrl,
       success: function(data) {
         var strJSON = jQuery.parseJSON(data);
         var obj = strJSON.data[0];
         //设置控件初始值
         $("#RefreshTime").val(obj.RefreshTime); //轮询时间
         if (obj.AutoRefresh === 0) $("#AutoRefresh").bootstrapSwitch('toggleState'); //如果需要关 
         if (obj.FixTblHead === 0) $("#FixTblHead").bootstrapSwitch('toggleState'); //如果需要关   
         if (obj.FixTblCol === 0) $("#FixTblCol").bootstrapSwitch('toggleState'); //如果需要关 
         if (obj.FootSearch === 0) $("#FootSearch").bootstrapSwitch('toggleState'); //如果需要关  
       }
     });
   }

   function GetJsonUrl(iID) {
     //获取各控制值
     var TimeRange = $("#dashboard-report-range span").html();
     var TimeStart = TimeRange.split(' ~ ')[0];
     var TimeEnd = TimeRange.split(' ~ ')[1];
     var strUrl = getRootPath() + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&chartType=bar&ID=" + iID + "&M=3&tstart=" + TimeStart + "&tend=" + TimeEnd + "&t=" + Math.random();
     return strUrl;
   }

    //数组去重

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
    //获取URL参数

   function GetRequestParam(url) {
     var theRequest = {}; //new Object();
     if (url.indexOf("?") != -1) {
       var str = url.substr(1);
       strs = str.split("&");
       for (var i = 0; i < strs.length; i++) {
         theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
       }
     }
     return theRequest;
   }

   /**
    * [GetChartData 格式化图表用数据(曲线图，柱形图)]
    * @param {[strUrl]} strUrl [数据接口地址.数据要求:3列 legend/X轴/主轴，2列：X轴/Y轴,1列：Y轴]
    */

   function GetChartData(strUrl) {
     var Data, arrTem;
     var iTemp, i, j;
     var NewData = []; //new Array();
     var Request = GetRequestParam(strUrl);
     var chType = Request["chartType"];
     Data = ReadData(strUrl);
     NewData['title'] = Data.title;
     NewData['subTitle'] = Data.source;
     NewData['rows'] = Data.rows;
     infoTips(JSON.stringify(Data), 2);
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
         arrTemp.sort();
         NewData['legend'] = UniqueData(arrTemp);
         arrTemp = []; //new Array();
         for (i = 0; i < Data.rows; i++) {
           arrTemp[i] = Data.data[i][1];
         }
         NewData['xAxis'] = UniqueData(arrTemp);
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
           NewData['series'][i] = {};
           NewData['series'][i].name = NewData.legend[i];
           NewData['series'][i].type = chType;
           NewData['series'][i].smooth = false;
           NewData['series'][i].barMaxWidth = 100;
           NewData['series'][i].data = NewData.yAxis[NewData.legend[i]];
           NewData['series'][i].markPoint = MPtStyle;
           NewData['series'][i].markLine = MLnStyle;
           NewData['series'][i].itemStyle = dataStyle_iT;
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
         NewData['series'][0] = {};
         NewData['series'][0].name = NewData['yAxisTitle'];
         NewData['series'][0].type = chType;
         NewData['series'][0].smooth = false;
         NewData['series'][0].barMaxWidth = 100;
         NewData['series'][0].data = NewData.yAxis;
         NewData['series'][0].markPoint = MPtStyle;
         NewData['series'][0].markLine = MLnStyle;
         NewData['series'][0].itemStyle = dataStyle_iT;
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
         NewData['series'][0] = {};
         NewData['series'][0].name = NewData['yAxisTitle'];
         NewData['series'][0].type = chType;
         NewData['series'][0].smooth = false;
         NewData['series'][0].barMaxWidth = 100;
         NewData['series'][0].data = NewData.yAxis;
         NewData['series'][0].markPoint = MPtStyle;
         NewData['series'][0].markLine = MLnStyle;
         NewData['series'][0].itemStyle = dataStyle_iT;
       }
     }
     return NewData;
   }

    //配置图表库
   var mECharts = function() {
     var echarts;
     var myChart = []; //new Array(); //任意个数的图表
     var curTheme;
     var iChart;
     iChart = 1;
     require.config({
       paths: {
         echarts: 'assets/global/plugins/echarts/js',
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
           require(['theme/real2'], function(tarTheme) {
             curTheme = tarTheme;
             initDom();
             showChart(curTheme);
           });
         }
       );
     }

     function initDom() {
       var domParent = $('.portlet-body.form');
       for (i = 0; i < iChart; i++) {
         var html = '<div id="eChart-main' + i + '" optionKey="Line" class="eCharts-main margin-top-10"></div>';
         domParent.append(html);
       }
       var dom = $('.eCharts-main');
       var width = domParent.width();
       dom.css('width', width);
       dom.css('height', width / ((dom.length == 1) ? 2 : 3));
     }

     function showChart(curTheme, str) {
       if (!echarts) {
         return;
       } //如果未加载则去掉
       var i, option;
       for (i = 0; i < iChart; i++) {
         chartID = "eChart-main" + i;
         if (typeof str === 'undefined') {
           str = GetJsonUrl(i + 17);
         }
         option = getOption(str);
         if (option !== false) {
           myChart[i] = echarts.init(document.getElementById("eChart-main" + i), curTheme);
           myChart[i].setOption(option);
         } else {
           infoTips('第' + (i + 1) + '张图表无数据，请重新选择查询时间', 2);
         }
       }
       blindChart();
     }

     function getOption(str) {
       var Data = GetChartData(str);
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
           show: true,
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
       themeSelector.html(
         '<option name="default">default</option>' + '<option name="real2" selected="true" >real2</option>' + '<option name="real">real</option>' + '<option name="macarons">macarons</option>' + '<option name="helianthus">helianthus</option>' + '<option name="infographic">infographic</option>' + '<option name="shine">shine</option>' + '<option name="dark">dark</option>' + '<option name="blue">blue</option>' + '<option name="green">green</option>' + '<option name="red">red</option>' + '<option name="gray">gray</option>' + '<option name="roma">roma</option>' + '<option name="macarons2">macarons2</option>' + '<option name="sakura">sakura</option>'
       );

        $('.bs-select').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });
        $('select.bs-select').hide()
        //$('div.bs-select').css({'margin-top':'-40px','margin-right':'20px'});
     }

     function blindChart() {
       if (typeof $('#eChart-main0').attr('_echarts_instance_') === 'undefined') {
         return false;
       }
       if (iChart == 3 && typeof $('#eChart-main2').attr('_echarts_instance_') !== 'undefined') {
         myChart[0].connect([myChart[1], myChart[2]]);
         myChart[1].connect([myChart[0], myChart[2]]);
         myChart[2].connect([myChart[0], myChart[1]]);
       } else if (iChart == 2 && typeof $('#eChart-main1').attr('_echarts_instance_') !== 'undefined') {
         myChart[0].connect([myChart[1]]);
       }
     }

     function selectChange(value) {
       var theme = value;
       myChart[0].showLoading();
       require(['theme/' + theme], function(tarTheme) {
         curTheme = tarTheme;
         setTimeout(refreshTheme(), 500);
       });
     }

     function refreshTheme() {
       for (i = 0; i < iChart; i++) {
         myChart[i].hideLoading();
         myChart[i].setTheme(curTheme);
       }
     }

     function initTheme() //初始化主题模块
     {
       var themeSelector = $(".actions select");
       if (themeSelector) {
         $(themeSelector).change(function() {
           selectChange($(this).val()); //更新图表主题
         });
       }
     }

     $(document).on("click",".ranges li:not(:last),button.applyBtn", function() {
       var themeSelector;
       themeSelector = $(".actions select");
       require(['theme/' + themeSelector.val()], function(tarTheme) {
         curTheme = tarTheme;
         setTimeout(showChart(curTheme), 500);
       });
     });

     //接口预览
     $("#Preview").on('click',
       function() {
         var strUrl = $('#PreviewUrl').val();
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
     //修复顶部style="margin-top:-43px;"
     //系统主题设置

     ReadSettings();
     mECharts.init();
     //初始化表格
     $.fn.select2.defaults.set("theme", "bootstrap");
     //ChangeMainTheme(1);
     //RoundedTheme(0);

   });
   jQuery(window).resize(function() {
     HeadFix();
   });