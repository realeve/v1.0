     $("#HideTips").on('click',
       function() {
         $(".mt-element-ribbon").addClass('hide');
       });

      //获取url的JSON值

     function GetJsonUrl(iID) {
       var date = getDateRange();
       var strUrl = getRootPath() + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=" + iID + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&t=" + Math.random();
       return strUrl;
     }
      //配置图表库
     var mECharts = function() {
       var myChart = []; //任意个数的图表
       var echarts, chartDataTool;
       var iChartNums = (getUrlParam('tid') === null) ? 0 : getUrlParam('tid').split(',').length;
       var curTheme;

       function launchChart() {
         require.config({
           baseUrl: "assets/global/plugins/echarts/",
           paths: {
             "theme": "theme",
             "echarts": "js/echarts.min",
             "chartDataTool": "js/extension/chartDataTool.min"
           }
         });

         require(["echarts", "chartDataTool"], function(ec, dt) {
           var defaultTheme;
           echarts = ec;
           chartDataTool = dt;
           /*if (typeof Cookies.get('eCharts_theme') == 'undefined') {
             defaultTheme = 'real2';
             Cookies.set('eCharts_theme', 'real2');
           } else {
             defaultTheme = Cookies.get('eCharts_theme');
           }*/

           if (typeof localStorage.eChartsTheme == 'undefined') {
             defaultTheme = 'real2';
             localStorage.setItem("eChartsTheme", "real2");
           } else {
             defaultTheme = localStorage.eChartsTheme;
           }

           require(["theme/" + defaultTheme], function(tarTheme) {
             curTheme = tarTheme;
             initEchartDom();
             showChart(curTheme);
           });
         });
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
         dom.css('height', width / ((dom.length === 1) ? 2 : 2.5));
       }

       function showChart(curTheme, url) {

         if (!iChartNums) {
           return;
         }

         if (!echarts) {
           return;
         } //如果未加载则去掉
         var i, option;
         var objRequest = {};
         var objList = {
           "id": getUrlParam('tid').split(','),
           "type": (getUrlParam('type') === null) ? ['line'] : getUrlParam('type').split(','),
           "smooth": (getUrlParam('smooth') === null) ? ['1'] : getUrlParam('smooth').split(','),
           "markLine": (getUrlParam('markline') === null) ? ['0'] : getUrlParam('markline').split(','),
           "markPoint": (getUrlParam('markpoint') === null) ? ['0'] : getUrlParam('markpoint').split(','),
           "barMaxWidth": (getUrlParam('barwidth') === null) ? ['0'] : getUrlParam('barwidth').split(','),
           "splitArea": (getUrlParam('splitarea') === null) ? ['0'] : getUrlParam('splitarea').split(','),
           "dataZoom": (getUrlParam('zoom') === null) ? ['0'] : getUrlParam('zoom').split(','),
           //箱线图上下边缘重置为最大值最小值
           "minMax": (getUrlParam('minmax') === null) ? ['0'] : getUrlParam('minmax').split(','),
           "lineAreaStyle": (getUrlParam('linearea') === null) ? ['0'] : getUrlParam('linearea').split(','),
           "reverse": (getUrlParam('reverse') === null) ? ['0'] : getUrlParam('reverse').split(','),
           "circle": (getUrlParam('circle') === null) ? ['0'] : getUrlParam('circle').split(','),
           "roseType": (getUrlParam('rose') === null) ? ['0'] : getUrlParam('rose').split(','),
           "dimension": (getUrlParam('dimension') === null) ? ['0'] : getUrlParam('dimension').split(','),
           "squareRatio":(getUrlParam('squareratio') === null) ? ['0.618'] : getUrlParam('squareratio').split(',')
         };
         for (i = 0; i < iChartNums; i++) {
           objRequest = {
             "url": GetJsonUrl(objList.id[i]),
             "type": handleParam(objList.type, i, "line"),
             "smooth": (handleParam(objList.smooth, i, '1') === '1') ? true : false,
             "blind": (getUrlParam('blind') === "0" || getUrlParam('blind') === null) ? false : true,
             "toolbox": /*(objRequest.blind && i) ? false : */ true,
             "markLine": (handleParam(objList.markLine, i, '0') === '1') ? true : false,
             "markPoint": (handleParam(objList.markPoint, i, '0') === '1') ? true : false,
             "barMaxWidth": (handleParam(objList.barMaxWidth, i, '0') === '1') ? true : false,
             "splitArea": (handleParam(objList.splitArea, i, '0') === '1') ? true : false,
             "dataZoom": handleParam(objList.dataZoom, i, '0'),
             "minMax": (handleParam(objList.minMax, i, '0') === '1') ? true : false,
             "lineAreaStyle": (handleParam(objList.lineAreaStyle, i, '0') === '1') ? true : false,
             "reverse": (handleParam(objList.reverse, i, '0') === '1') ? true : false,
             "circle": (handleParam(objList.circle, i, '1') === '1') ? true : false,
             "roseType": handleParam(objList.roseType, i, '0'),
             "dimension": Number.parseInt(handleParam(objList.dimension, i, '1'), 10) - 1,
             "squareRatio": Number.parseFloat(handleParam(objList.squareRatio, i, '1.618'))
           };
           //console.log(objRequest);

           //数据处理
           if (typeof curTheme.valueAxis !== 'undefined') {
             curTheme.valueAxis.splitArea.show = (objRequest.splitArea[i]) ? true : false;
           } else {
             curTheme.color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
           }
           //必须传颜色表，旭日图等自定义颜色的图表中需要使用
           objRequest.color = curTheme.color;

           option = chartDataTool.getOption(objRequest);
           console.log("option = " + JSON.stringify(option));
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

       function initThemeOption() {
         if ($('.actions select opotion').length) {
           return false;
         }
         var themeSelector = $(".actions select");
         var defaultTheme, str = "";
         var themeList = ['default', 'real2', 'real', 'powerBI', 'macarons', 'helianthus', 'infographic', 'shine', 'dark', 'blue', 'green', 'red', 'gray', 'roma', 'macarons2', 'sakura'];
         themeList.map(function(elem, index) {
           str += '<option name="' + elem + '">' + elem + '</option>';
         });
         themeSelector.html(str);

         if (typeof localStorage.eChartsTheme == 'undefined') {
           defaultTheme = 'real2';
           localStorage.setItem("eChartsTheme", "real2");
         } else {
           defaultTheme = localStorage.eChartsTheme;
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
         var arrCharList = [];
         for (var i = 0; i < iChartNums; i++) {
           //myChart[i].group = "group1";
           arrCharList.push(myChart[i]);
         }
         echarts.connect(arrCharList);
         //echarts.connect(myChart[0].group);
         //console.log(arrCharList);
       }

       function selectChange(value) {
         //var theme = value;
         localStorage.setItem("eChartsTheme", value);
         bsTips("主题更换成功，请刷新页面查看", 1);

         //if (typeof Cookies !== "undefined") {
         //  Cookies.set('eCharts_theme', value);
         //}

         //EC3不再支持实时更换THEME
         /*myChart[0].showLoading();
         require(['theme/' + theme], function(tarTheme) {
           curTheme = tarTheme;
           setTimeout(refreshTheme(), 500);
         });*/
       }
       /*
       function refreshTheme() {
         for (i = 0; i < iChartNums; i++) {
           myChart[i].hideLoading();

           //console.log(myChart[i].getDataURL());
           //console.log(myChart[i].getConnectedDataURL());
           //console.log(myChart[i].getTheme());  
           myChart[i].setOption(curTheme);
         }
       }*/

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
         },
         resize: function() {
           var domParent = $('.portlet-body.form');
           var dom = $('.eCharts-main');
           var width = domParent.width();
           dom.css('width', width).css('height', width / ((dom.length === 1) ? 2 : 2.5));

           for (i = 0; i < iChartNums; i++) {
             myChart[i].resize();
           }
         }
       };

     }();

     jQuery(document).ready(function() {
       //UIIdleTimeout.init();
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
       mECharts.resize();
     });