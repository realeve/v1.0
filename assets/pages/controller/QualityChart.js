     $("#HideTips").on('click',
       function() {
         $(".mt-element-ribbon").addClass('hide');
       });

     //获取url的JSON值

     function GetJsonUrl(iID) {
       var date = getDateRange();
       var token = getUrlParam('token');
       if (token == null) {
         token = '79d84495ca776ccb523114a2120e273ca80b315b';
       }
       var strUrl = getRootPath() + "/DataInterface/Api?Token=" + token + "&ID=" + iID + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&t=" + Math.random();
       return strUrl;
     }
     //配置图表库
     var mECharts = function() {
       var myChart = []; //任意个数的图表
       var echarts, chartDataTool, Clipboard;
       var iChartNums = (getUrlParam('tid') === null) ? 0 : getUrlParam('tid').split(',').length;
       var curTheme;
       var option = [];

       function launchChart() {
         require.config({
           baseUrl: "assets/global/plugins/",
           paths: {
             "theme": "echarts/theme",
             "echarts": "echarts/js/echarts.min",
             "chartDataTool": "echarts/js/extension/chartDataTool.min",
             "Clipboard": "clipboard/clipboard.min"
           }
         });

         require(["echarts", "chartDataTool", "Clipboard"], function(ec, dt, cp) {
           var defaultTheme;
           echarts = ec;
           chartDataTool = dt;
           Clipboard = cp;
           /*if (typeof Cookies.get('eCharts_theme') == 'undefined') {
             defaultTheme = 'real2';
             Cookies.set('eCharts_theme', 'real2');
           } else {
             defaultTheme = Cookies.get('eCharts_theme');
           }*/

           if (typeof localStorage.eChartsTheme == 'undefined') {
             defaultTheme = 'real';
             localStorage.setItem("eChartsTheme", "real");
           } else {
             defaultTheme = localStorage.eChartsTheme;
           }

           var handleClipboard = (function() {
             var clipboard = new Clipboard('#share button');
             /*clipboard.on('success', function(e) {
               console.log(e);
             });

             clipboard.on('error', function(e) {
               console.log(e);
             });*/
           })();

           require(["theme/" + defaultTheme], function(tarTheme) {
             curTheme = tarTheme;
             initEchartDom();
             initChartRatio();
             showChart(curTheme);
           });
         });
       }

       /* function initEchartDom() {
          var domParent = $('.portlet-body.form');
          for (i = 0; i < iChartNums; i++) {
            var html = '<div id="eChart-main' + i + '" optionKey="Line" class="eCharts-main margin-top-5"></div>';
            domParent.append(html);
          }
          var dom = $('.eCharts-main');
          var width = domParent.width();
          var height = width / ((dom.length === 1) ? 1.3 : 1.5);
          dom.css('width', width);
          dom.css('height', height);
        }*/

       function initEchartDom() {
         var domParent = $('.page-content');
         for (i = 1; i < iChartNums; i++) {
           var html = '<div class="portlet light bordered">\n  <div class="portlet-title">\n    <button class="btn blue btn-circle" name="downloadExample" data-clipboard-action="copy" data-clipboard-target="#share textarea"  data-chartid="' + i + '"><i class="glyphicon glyphicon-download-alt"> </i> 下载图表</button>\n  <a class="btn red btn-circle" name="shareExample" data-chartid="' + i + '"><i class="fa fa-share-alt"> </i> 分享 </a>';
           html += '\n   <div class="actions">          \n              <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#">\n              </a>\n            </div>\n          </div>\n          <div class="portlet-body form">';
           html += '\n      <div id="eChart-main' + i + '" optionKey="Line" class="eCharts-main margin-top-5"></div>';
           html += '\n          </div>\n        </div>';
           domParent.append(html);
         }

         $('[name="showTable"]').attr({
           href: getRootPath(0) + '/QualityTable?tid=' + getUrlParam("tid")
         });
         //$('.portlet').first().find('.actions a').prepend('<select class="bs-select form-control" data-style="blue" data-width="125px"></select>');
         /*var dom = $('.eCharts-main');
         var width = domParent.width();
         var height = width / 1.3;
         dom.css('height', height.toFixed(0));*/
       }

       function showChart(curTheme, url) {

         if (!iChartNums) {
           return;
         }

         if (!echarts) {
           return;
         } //如果未加载则去掉
         var i;
         var objRequest = {};
         var objList = {
           "id": getUrlParam('tid').split(','),
           "type": (getUrlParam('type') === null) ? ['line'] : getUrlParam('type').split(','),
           "smooth": (getUrlParam('smooth') === null) ? ['1'] : getUrlParam('smooth').split(','),
           "markLine": (getUrlParam('markline') === null) ? ['0'] : getUrlParam('markline').split(','),
           "markLineValue": (getUrlParam('marklinevalue') === null) ? ['0'] : getUrlParam('marklinevalue').split(','),
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
           "squareRatio": (getUrlParam('squareratio') === null) ? ['1.618'] : getUrlParam('squareratio').split(','),
           "shape": (getUrlParam('shape') === null) ? ['polygon'] : getUrlParam('shape').split(','),
           "scatterSize": (getUrlParam('scattersize') === null) ? ['20'] : getUrlParam('scattersize').split(','),
           "force": (getUrlParam('force') === null) ? ['1'] : getUrlParam('force').split(','),
           "banknoteColor": (getUrlParam('banknoteColor') === null) ? ['1'] : getUrlParam('banknoteColor').split(','),
           "stack": (getUrlParam('stack') === null) ? ['0'] : getUrlParam('stack').split(','),
           "max": (getUrlParam('max') === null) ? ['0'] : getUrlParam('max').split(','),
           "min": (getUrlParam('min') === null) ? ['0'] : getUrlParam('min').split(','),
           "symbolSize": (getUrlParam('symbolsize') === null) ? ['10'] : getUrlParam('symbolsize').split(','),
           "opacity": (getUrlParam('opacity') === null) ? ['0'] : getUrlParam('opacity').split(',')
         };
         for (i = 0; i < iChartNums; i++) {
           objRequest = {
             "url": GetJsonUrl(objList.id[i]),
             "type": handleParam(objList.type, i, "line"),
             "smooth": (handleParam(objList.smooth, i, '1') === '1') ? true : false,
             "blind": (getUrlParam('blind') === "0" || getUrlParam('blind') === null) ? false : true,
             "toolbox": /*(objRequest.blind && i) ? false : */ true,
             "markLine": handleParam(objList.markLine, i, "average"),
             "markLineValue": handleParam(objList.markLineValue, i, "0"),
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
             "squareRatio": Number.parseFloat(handleParam(objList.squareRatio, i, '1.618')),
             "shape": handleParam(objList.shape, i, "polygon"),
             "scatterSize": Number.parseFloat(handleParam(objList.scatterSize, i, '20')),
             "force": handleParam(objList.force, i, "1"),
             "banknoteColor": handleParam(objList.banknoteColor, i, "1"),
             "stack": (handleParam(objList.stack, i, '0') === '1') ? true : false,
             "max": handleParam(objList.max, i, "1"),
             "min": handleParam(objList.min, i, "1"),
             "symbolSize": handleParam(objList.symbolSize, i, "10"),
             "opacity": handleParam(objList.opacity, i, 0.4)
           };
           //console.log(objRequest);
           //桑基图高度增加一倍
           /*if (objRequest.type == 'sankey') {
             var dom = $("#eChart-main" + i);
             var width = $('.portlet-body.form').width();
             var height = width / 1.5;
             dom.css('height', height);
           }*/

           //数据处理
           if (typeof curTheme.valueAxis !== 'undefined') {
             curTheme.valueAxis.splitArea.show = (objRequest.splitArea[i]) ? true : false;
           } else {
             curTheme.color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
           }
           //必须传颜色表，旭日图等自定义颜色的图表中需要使用
           objRequest.color = curTheme.color;

           option[i] = chartDataTool.getOption(objRequest);
           //console.log("option = " + JSON.stringify(option[i]));

           if (option[i] !== false) {
             myChart[i] = echarts.init(document.getElementById("eChart-main" + i), curTheme);
             myChart[i].setOption(option[i]);

             //$('[name="chartTitle"]:nth('+ i +')').text(option.title[0].text);
             //$('[name="chartSource"]:nth('+ i +')').text(option.title[0].subtext);

           } else {
             bsTips('第' + (i + 1) + '张图表无数据，请重新选择查询时间', 2);
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
         var themeList = ['default', 'real', 'real2', 'real3', 'powerBI', 'darkColor', 'whiteDark', 'magzin', 'magzin2', 'colorful', 'macarons', 'helianthus', 'infographic', 'shine', 'dark', 'blue', 'green', 'red', 'gray', 'roma', 'macarons2', 'sakura'];
         themeList.map(function(elem, index) {
           str += '<option value="' + elem + '">' + elem + '</option>';
         });
         themeSelector.html(str);

         if (typeof localStorage.eChartsTheme == 'undefined') {
           defaultTheme = 'real2';
           localStorage.setItem("eChartsTheme", "real2");
         } else {
           defaultTheme = localStorage.eChartsTheme;
         }

         $('.bs-select[name="ratio"]').find('option').data('icon', 'fa fa-desktop');
         $('.bs-select').selectpicker({
           iconBase: 'fa',
           tickIcon: 'fa-check',
         });
         themeSelector.selectpicker('val', defaultTheme);

         //$('.bs-select[name="theme"]').hide();
         //$('div.bs-select').css({'margin-top':'-40px','margin-right':'20px'});
       }

       var initChartRatio = function() {

         var ratioSelector = $('.bs-select[name="ratio"]');
         ratioSelector.find('option').data('icon', 'fa fa-down');
         //loadDefaultValue
         if (typeof localStorage.chartRatio == 'undefined') {
           chartRatio = 1.5;
           localStorage.setItem("chartRatio", chartRatio);
         } else {
           chartRatio = localStorage.chartRatio;
           ratioSelector.selectpicker('val', chartRatio);
           changeChartRatio(chartRatio);
         }

         //changeEvent
         if (ratioSelector) {
           $(ratioSelector).change(function() {
             changeChartRatio($(this).val()); //更新图表主题
             for (i = 0; i < iChartNums; i++) {
               myChart[i].resize();
             }
           });
         }

       };

       //更改图表长宽比
       function changeChartRatio(val) {
         if (typeof val == 'undefined') {
           val = $('.bs-select[name="ratio"]').val();
         }
         //保存默认值
         localStorage.setItem("chartRatio", val);
         var domParent = $('.portlet-body.form');
         var dom = $('.eCharts-main');
         var width = domParent.width();
         var height = width / val;
         dom.css('height', height.toFixed(0)); //css('width', width)
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
         localStorage.setItem("eChartsTheme", value);
         require(['theme/' + value], function(tarTheme) {
           curTheme = tarTheme;
           showChart(curTheme);
         });

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

       function downloadExample(id) {
         var html = '<!DOCTYPE html>\n<html style="height: 100%">\n   <head>\n       <meta charset="utf-8">\n   </head>\n   <body style="height: 100%; margin: 0" onresize = "resize()">\n       <div id="container" style="height: 100%"></div>\n       <script type="text/javascript" src="' + getRootPath(1) + '/assets/global/plugins/echarts/js/echarts.min.js"></script>\n       <script type="text/javascript">\nvar dom = document.getElementById("container");\nvar theme = ' + JSON.stringify(curTheme) + ';\nvar myChart = echarts.init(dom,theme);\nvar app = {};\noption = null;\noption = ' + JSON.stringify(option[id]).replace(/null/g, NaN) + '\nif (option && typeof option === "object") {\n    var startTime = +new Date();\n    myChart.setOption(option,true);\n    var endTime = +new Date();\n    var updateTime = endTime - startTime;\n    console.log("Time used:", updateTime);\n}\nfunction resize(){\n    myChart.resize();\n}       </script>\n   </body>\n</html>',
           file = new Blob([html], {
             type: "text/html;charset=UTF-8",
             encoding: "UTF-8"
           }),
           n = document.createElement("a");
         n.href = URL.createObjectURL(file), n.download = option[id].title[0].text + ".html", n.click();
       }

       function shareExample(id) {
         var html = '<!DOCTYPE html>\n<html style="height: 100%">\n   <head>\n       <meta charset="utf-8">\n   </head>\n   <body style="height: 100%; margin: 0" onresize = "resize()">\n       <div id="container" style="height: 100%"></div>\n       <script type="text/javascript" src="' + getRootPath(1) + '/assets/global/plugins/echarts/js/echarts.min.js"></script>\n       <script type="text/javascript">\nvar dom = document.getElementById("container");\nvar theme = ' + JSON.stringify(curTheme) + ';\nvar myChart = echarts.init(dom,theme);\nvar app = {};\noption = null;\noption = ' + JSON.stringify(option[id]).replace(/null/g, NaN) + '\nif (option && typeof option === "object") {\n    var startTime = +new Date();\n    myChart.setOption(option,true);\n    var endTime = +new Date();\n    var updateTime = endTime - startTime;\n    console.log("Time used:", updateTime);\n}\nfunction resize(){\n    myChart.resize();\n}       </script>\n   </body>\n</html>';
         var filename = $.base64.encode(new Date().getTime());
         $('#share textarea').text(' ');
         $.ajax({
           url: getRootPath(0) + '/demo/chartShare.php',
           type: 'POST',
           async: false,
           data: {
             filename: filename + ".html",
             contents: html
           },
           success: function(data) {
             try {
               var obj = $.parseJSON(data);
               var url = getRootPath(0) + obj.url;
               $('#share textarea').text(url);
               $('#successShare').click();
               /*setTimeout(function() {
                 $('#share textarea').select();
               }, 600);*/
             } catch (e) {
               console.log(e);
               infoTips(data);
               bsTips('图表分享失败，请稍后重试', 0);
             }
           },
           error: function(e) {
             console.log(e);
             bsTips('图表分享失败，请稍后重试', 0);
           }
         });

       }

       $('.page-content').on('click', '[name="shareExample"]', function() {
         shareExample($(this).data('chartid'));
       });

       $('.page-content').on('click', '[name="downloadExample"]', function() {
         downloadExample($(this).data('chartid'));
       });

       return {
         init: function() {
           initThemeOption();
           launchChart();
           initTheme();
         },
         resize: function() {
           /* var domParent = $('.portlet-body.form');
            var dom = $('.eCharts-main');
            var width = domParent.width();
            var height = width / 1.3;
            dom.css('width', width).css('height', height.toFixed(0));*/
           changeChartRatio();
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