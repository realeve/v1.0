     $("#HideTips").on('click',
       function() {
         $(".mt-element-ribbon").addClass('hide');
       });

     //获取url的JSON值

     function GetJsonUrl(iID, objRequest, index) {
       var date = getDateRange();
       var token = getUrlParam('token');
       if (token === null) {
         token = '79d84495ca776ccb523114a2120e273ca80b315b';
       }
       var strUrl = getRootPath() + "/DataInterface/Api?Token=" + token + "&ID=" + iID + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&t=" + Math.random();
       var paramList = location.href.split('&');

       for (var i = 1; i < paramList.length; i++) {
         var key = paramList[i].split('=')[0];
         var val = paramList[i].split('=')[1];
         if (!isObjRequestParam(key)) {
           if (val.indexOf(',') == '-1') {
             strUrl += '&' + paramList[i];
           } else {
             strUrl += '&' + key + '=' + val.split(',')[index];
           }
         }
       }

       function isObjRequestParam(elem) {
         var flag = false;
         $.each(objRequest, function(key, val) {
           if (key == elem) {
             flag = true;
           }
         });
         return flag;
       }

       return strUrl;
     }

     var isInited = [];

     //配置图表库
     var mECharts = function() {
       var myChart = []; //任意个数的图表
       var echarts, chartDataTool, Clipboard;
       var iChartNums = (getUrlParam('tid') === null) ? 0 : getUrlParam('tid').split(',').length;
       var curTheme;
       var drillComponents = {
         obj: [],
         curLevel: [],
         nameLength: [],
         id: [],
         maxDrillLevel: [],
         chartType: []
           //param: []
       };
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
             defaultTheme = 'ali_G2';
             localStorage.setItem("eChartsTheme", "ali_G2");
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
           var html = '<div class="portlet light bordered" data-chartid = "' + i + '">' +
             '  <div class="portlet-title">' +
             '    <div class="page-bar hidden">' +
             '      <ul class="page-breadcrumb" name="drillName">' +
             '        <li><i class="icon-home"></i> <a href="javascript:;" data-level="1"></a><i class="fa fa-circle"></i></li>' +
             '      </ul>' +
             '    </div>' +
             '    <button class="btn blue btn-circle" name="downloadExample" data-clipboard-action="copy" data-clipboard-target="#share textarea" data-chartid="' + i + '"><i class="glyphicon glyphicon-download-alt"></i> 下载图表</button>' +
             '    <a class="btn red btn-circle" name="shareExample" data-chartid="' + i + '"><i class="fa fa-share-alt"></i> 分享 </a>' +
             '    <div class="actions">' +
             '      <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#"></a>' +
             '    </div>' +
             '  </div>' +
             '  <div class="portlet-body form">' +
             '    <div id="eChart-main' + i + '" optionkey="Line" class="eCharts-main margin-top-5">' +
             '    </div>' +
             '  </div>' +
             '</div>';
           domParent.append(html);
         }

         updateTableUrl();

         //$('.portlet').first().find('.actions a').prepend('<select class="bs-select form-control" data-style="blue" data-width="125px"></select>');
         /*var dom = $('.eCharts-main');
         var width = domParent.width();
         var height = width / 1.3;
         dom.css('height', height.toFixed(0));*/
       }

       function updateTableUrl() {
         var date = getDateRange();
         //var url = getRootPath(0) + '/QualityTable?tid=' + getUrlParam("tid") + (getUrlParam('daterange') == 'null' ? ("&tstart=" + date.start + "&tend=" + date.end) : ('&daterange=' + getUrlParam('daterange')));
         var url = getRootPath(0) + '/QualityTable?tid=' + getUrlParam("tid") + "&tstart=" + date.start + "&tend=" + date.end;
         $('[name="showTable"]').attr({
           href: url
         });
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
           "blind": (getUrlParam('blind') === null) ? ['0'] : getUrlParam('blind').split(','),
           "markLine": (getUrlParam('markline') === null) ? ['0'] : getUrlParam('markline').split(','),
           "markLineValue": (getUrlParam('marklinevalue') === null) ? ['0'] : getUrlParam('marklinevalue').split(','),
           "markArea": (getUrlParam('markarea') === null) ? ['0'] : getUrlParam('markarea').split(','),
           "markAreaValue": (getUrlParam('markareavalue') === null) ? ['0'] : getUrlParam('markareavalue').split(','),
           "markPoint": (getUrlParam('markpoint') === null) ? ['0'] : getUrlParam('markpoint').split(','),
           "barMaxWidth": (getUrlParam('barwidth') === null) ? ['100'] : getUrlParam('barwidth').split(','),
           "splitArea": (getUrlParam('splitarea') === null) ? ['0'] : getUrlParam('splitarea').split(','),
           "dataZoom": (getUrlParam('zoom') === null) ? ['0'] : getUrlParam('zoom').split(','),
           //箱线图上下边缘重置为最大值最小值
           "minMax": (getUrlParam('minmax') === null) ? ['0'] : getUrlParam('minmax').split(','),
           "lineAreaStyle": (getUrlParam('linearea') === null) ? ['0'] : getUrlParam('linearea').split(','),
           "lineShadow": (getUrlParam('lineshadow') === null) ? ['0'] : getUrlParam('lineshadow').split(','),
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
           "max": (getUrlParam('max') === null) ? ['undefined'] : getUrlParam('max').split(','),
           "min": (getUrlParam('min') === null) ? ['undefined'] : getUrlParam('min').split(','),
           "symbolSize": (getUrlParam('symbolsize') === null) ? ['12'] : getUrlParam('symbolsize').split(','),
           "opacity": (getUrlParam('opacity') === null) ? ['0'] : getUrlParam('opacity').split(','),
           "leafDepth": (getUrlParam('leafdepth') === null) ? ['0'] : getUrlParam('leafdepth').split(','),
           "step": (getUrlParam('step') === null) ? ['0'] : getUrlParam('step').split(','),
           "singleAxis": (getUrlParam('singleaxis') === null) ? ['time'] : getUrlParam('singleaxis').split(','),
           "background": (getUrlParam('background') === null) ? ['default'] : getUrlParam('background').split(','),
           //数据下钻
           "drillID": (getUrlParam('drill') === null) ? ['none'] : getUrlParam('drill').split(','),
           //最后一层数据类型：轴号或车号
           "drillType": (getUrlParam('drilltype') === null) ? ['none'] : getUrlParam('drilltype').split(','),
           //下钻图表类型
           "drillChart": (getUrlParam('drillchart') === null) ? ['none'] : getUrlParam('drillchart').split(','),
           //"drillParam": (getUrlParam('drillparam') === null) ? ['legend;axis'] : getUrlParam('drillparam').split(',')
         };
         for (i = 0; i < iChartNums; i++) {
           objRequest = {
             //"url": GetJsonUrl(objList.id[i]),
             "type": handleParam(objList.type, i, "line"),
             "smooth": (handleParam(objList.smooth, i, '1') === '1') ? true : false,
             "blind": (getUrlParam('blind') === "0" || getUrlParam('blind') === null) ? false : true,
             "toolbox": /*(objRequest.blind && i) ? false : */ true,
             "markLine": handleParam(objList.markLine, i, "average"),
             "markLineValue": handleParam(objList.markLineValue, i, "0"),
             "markArea": handleParam(objList.markArea, i, ""),
             "markAreaValue": handleParam(objList.markAreaValue, i, "0"),
             "markPoint": (handleParam(objList.markPoint, i, '0') === '1') ? true : false,
             "barMaxWidth": handleParam(objList.barMaxWidth, i, 100),
             "splitArea": (handleParam(objList.splitArea, i, '0') === '1') ? true : false,
             "dataZoom": handleParam(objList.dataZoom, i, '0'),
             "minMax": (handleParam(objList.minMax, i, '0') === '1') ? true : false,
             "lineAreaStyle": (handleParam(objList.lineAreaStyle, i, '0') === '1') ? true : false,
             "lineShadow": (handleParam(objList.lineShadow, i, '1') === '1') ? true : false,
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
             "symbolSize": handleParam(objList.symbolSize, i, "12"),
             "opacity": handleParam(objList.opacity, i, 0.4),
             "leafDepth": handleParam(objList.leafDepth, i, 0),
             "step": handleParam(objList.step, i, 0),
             "singleAxis": handleParam(objList.singleAxis, i, "time"),
             "background": handleParam(objList.background, i, "default"),
             "drillID": handleParam(objList.drillID, i, "none"),
             "drillType": handleParam(objList.drillType, i, "none"),
             "drillChart": handleParam(objList.drillChart, i, "none"),
             //"drillParam": handleParam(objList.drillParam, i, "legend;axis")
           };

           objRequest.url = GetJsonUrl(objList.id[i], objRequest, i);

           //数据处理
           if (typeof curTheme.valueAxis !== 'undefined') {
             curTheme.valueAxis.splitArea.show = (objRequest.splitArea[i]) ? true : false;
           } else {
             curTheme.color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
           }
           //必须传颜色表，旭日图等自定义颜色的图表中需要使用
           objRequest.color = curTheme.color;

           //存储多级charts的参数

           option[i] = [];
           option[i][0] = chartDataTool.getOption(objRequest, echarts);

           //console.log("option = " + JSON.stringify(option[i]));
           if (option[i][0] !== false) {
             myChart[i] = echarts.init(document.getElementById("eChart-main" + i), curTheme);
             myChart[i].setOption(option[i][0]);

             if (objRequest.drillID != 'none') {
               $('.eCharts-main').parents('.portlet').find('.page-bar').removeClass('hidden');
               //默认以LEGEND和AXIS同时作为参数搜索
               drillComponents.id[i] = objRequest.drillID.split(';');
               drillComponents.maxDrillLevel[i] = drillComponents.id[i].length;
               //drillComponents.param[i] = objRequest.drillParam;

               //数据下钻：添加点击事件
               drillComponents.obj[i] = $('[name="drillName"]:nth(' + i + ')');

               if (isInited[i]) {
                 drillComponents.obj[i].html('<li>' + drillComponents.obj[i].find('li').html() + '</li>');
               } else {
                 isInited[i] = true;
               }

               drillComponents.curLevel[i] = 1;
               drillComponents.nameLength[i] = 0;
               myChart[i].chartID = i;

               //示例URL：SELECT a.[品种], a.[生产日期], round(avg(a.[好品率]),2) as 平均好品率 FROM dbo.view_print_hecha AS a where left(a.生产日期,6) = 201605 group by a.[品种], a.[生产日期] order by 1,2

               //第二级：SELECT a.车号, a.[好品率] FROM dbo.view_print_hecha AS a where a.生产日期 = ? and a.品种= ?

               myChart[i].on('click', function(params) {

                 var curChartID = $(this)[0].chartID;
                 //console.table(drillComponents);
                 if (drillComponents.curLevel[curChartID] > drillComponents.maxDrillLevel[curChartID]) {
                   //infoTips('系列名：' + params.seriesName + '\n数据名:' + params.name);
                   switch (objRequest.drillType) {
                     case 'cart':
                       infoTips('查询车号:' + params.name);
                       break;
                     case 'paper':
                       infoTips('查询轴号:' + params.name);
                       break;
                   }
                   return;
                 }
                 //清除数据
                 myChart[curChartID].clear();

                 var urlParam = {
                   legend: params.seriesName,
                   axis: params.name
                 };

                 //处理请求参数
                 objRequest.url = GetJsonUrl(drillComponents.id[curChartID][drillComponents.curLevel[curChartID] - 1], objRequest, curChartID);
                 objRequest.url += '&axis=' + urlParam.axis + "&legend=" + urlParam.legend;

                 if (objRequest.drillChart != 'none') {
                   drillComponents.chartType[curChartID] = objRequest.drillChart.split(';');
                   if (drillComponents.chartType[curChartID].length < drillComponents.curLevel[curChartID]) {
                     objRequest.type = drillComponents.chartType[curChartID][0];
                   } else {
                     objRequest.type = drillComponents.chartType[curChartID][drillComponents.curLevel[curChartID] - 1];
                   }
                 }

                 option[curChartID][drillComponents.curLevel[curChartID]] = chartDataTool.getOption(objRequest, echarts);
                 myChart[curChartID].setOption(option[curChartID][drillComponents.curLevel[curChartID]]);

                 //console.log(option);
                 //是否需要增加层级显示
                 if (drillComponents.nameLength[curChartID] < drillComponents.curLevel[curChartID]) {
                   drillComponents.nameLength[curChartID]++;
                   drillComponents.obj[curChartID].append('<li><a href="javascript:;" data-level="' + (drillComponents.curLevel[curChartID] + 1) + '">' + params.name + '</a><i class="fa fa-circle"></i></li>');
                 } else {
                   drillComponents.obj[curChartID].find('a:nth(' + drillComponents.curLevel[curChartID] + ')').text(params.name);
                 }
                 //数据下钻层级
                 drillComponents.curLevel[curChartID]++;
                 //drillComponents.obj[curChartID].find('a:nth('+ (drillComponents.curLevel[curChartID]-1) +')').data('option','test');
               });

               $('[name="drillName"]').on('click', 'a', function() {
                 var level = $(this).data('level');
                 var chartID = $(this).parents('.portlet').data('chartid');
                 myChart[chartID].clear();

                 drillComponents.curLevel[chartID] = level;
                 myChart[chartID].setOption(option[chartID][level - 1]);

               });

               drillComponents.obj[i].find('a').first().text(option[i][0].title[0].text);

             }

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
         var themeList = ['default', 'ali_G2', 'ali_G2_2', 'real', 'real2', 'real3', 'powerBI', 'darkColor', 'whiteDark', 'magzin', 'magzin2', 'colorful', 'helianthus', 'blue', 'green', 'red', 'gray'];
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
         myChart[0].showLoading();
         /*require(['theme/' + theme], function(tarTheme) {
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
         updateTableUrl();
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
         var curLevel = (drillComponents.id.length === 0) ? 0 : drillComponents.curLevel[id] - 1;
         var html = '<!DOCTYPE html>\n<html style="height: 100%">\n   <head>\n       <meta charset="utf-8">\n   </head>\n   <body style="height: 100%; margin: 0">\n       <div id="container" style="height: 100%"></div>\n       <script type="text/javascript" src="' + getRootPath(1) + '/assets/global/plugins/echarts/js/echarts.min.js"></script>\n       <script type="text/javascript">\nvar dom = document.getElementById("container");\nvar theme = ' + JSON.stringify(curTheme) + ';\nvar myChart = echarts.init(dom,theme);\nvar app = {};\noption = null;\noption = ' + JSON.stringify(option[id][curLevel]).replace(/null/g, NaN) + '\nif (option && typeof option === "object") {\n    var startTime = +new Date();\n    myChart.setOption(option,true);\n    var endTime = +new Date();\n    var updateTime = endTime - startTime;\n    console.log("Time used:", updateTime);\n}\nwindow.onresize = function(){myChart.resize();};       </script>\n   </body>\n</html>',
           file = new Blob([html], {
             type: "text/html;charset=UTF-8",
             encoding: "UTF-8"
           }),
           n = document.createElement("a");
         n.href = URL.createObjectURL(file), n.download = option[id][curLevel].title[0].text + ".html", n.click();
       }

       function shareExample(id) {
         var curLevel = (drillComponents.id.length === 0) ? 0 : drillComponents.curLevel[id] - 1;
         console.log(option[id][curLevel]);
         var html = '<!DOCTYPE html>\n<html style="height: 100%">\n   <head>\n       <meta charset="utf-8">\n   </head>\n   <body style="height: 100%; margin: 0">\n       <div id="container" style="height: 100%"></div>\n       <script type="text/javascript" src="' + getRootPath(1) + '/assets/global/plugins/echarts/js/echarts.min.js"></script>\n       <script type="text/javascript">\nvar dom = document.getElementById("container");\nvar theme = ' + JSON.stringify(curTheme) + ';\nvar myChart = echarts.init(dom,theme);\nvar app = {};\noption = null;\noption = ' + JSON.stringify(option[id][curLevel]).replace(/null/g, NaN) + '\nif (option && typeof option === "object") {\n    var startTime = +new Date();\n    myChart.setOption(option,true);\n    var endTime = +new Date();\n    var updateTime = endTime - startTime;\n    console.log("Time used:", updateTime);\n}\nwindow.onresize = function(){myChart.resize();};       </script>\n   </body>\n</html>';
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