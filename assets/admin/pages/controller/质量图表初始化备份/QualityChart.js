   $("#HideTips").click(
     function(){
        $(".note.note-success").addClass('hide');
    });
   function GetJsonUrl(){
      //获取各控制值
      var TimeRange = $("#dashboard-report-range span").html();
      var TimeStart = TimeRange.split(' ~ ')[0];
      var TimeEnd = TimeRange.split(' ~ ')[1]; 
      var strUrl = getRootPath() + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=17&M=3&tstart=" + TimeStart + "&t="+Math.random();
	  return strUrl;
   }

 function InitChart(){
    mECharts.init();
 }

$("#SaveSettings").click(
   function(){
     SaveSettings();
   });

 function SaveSettings(){
       //获取各控制值
      var RefreshTime = $("#RefreshTime").val();//轮询时间
      var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') == true)?1:0;
      var FixTblHead = ($("#FixTblHead").bootstrapSwitch('state') == true)?1:0;
      var FixTblCol = ($("#FixTblCol").bootstrapSwitch('state') == true)?1:0;
      var FootSearch = ($("#FootSearch").bootstrapSwitch('state') == true)?1:0;
      var InputToggle = ($("#InputToggle").bootstrapSwitch('state') == true)?1:0;
      var InputInner = ($("#InputInner").bootstrapSwitch('state') == true)?1:0;
      var strUrl = getRootUrl('QualityTable') + "/SaveSettings";
      //infoTips(RefreshTime +AutoRefresh,0); 
      //获取各控制值完毕
      //向服务器请求数据
      $.post(strUrl, 
       {
        RefreshTime : RefreshTime,
        AutoRefresh : AutoRefresh,
        FixTblHead : FixTblHead,
        FixTblCol : FixTblCol,
        FootSearch : FootSearch,
        InputToggle : InputToggle,
        InputInner : InputInner,
       },
       function(data,status){
            if (status == "success") {
                var obj = jQuery.parseJSON(data);
                infoTips(obj.message,1);
            }
            else
            {
                infoTips("保存设置失败，请稍后重试或联系管理员!",0);
            }
       }
    )
 }

 function ReadSettings(){
    var strUrl = getRootUrl('QualityTable') + "/ReadSettings";
    $.ajax({
      type: 'POST',
      async: false,//同步
      //async: true,
      url:strUrl, 
      success: function(data){
                var strJSON = jQuery.parseJSON(data);
                var obj = strJSON.data[0];
                //设置控件初始值
                $("#RefreshTime").val(obj.RefreshTime);//轮询时间
                if(obj.AutoRefresh == 0) $("#AutoRefresh").bootstrapSwitch('toggleState');//如果需要关 
                if(obj.FixTblHead == 0) $("#FixTblHead").bootstrapSwitch('toggleState');//如果需要关   
                if(obj.FixTblCol == 0) $("#FixTblCol").bootstrapSwitch('toggleState');//如果需要关 
                if(obj.FootSearch == 0) $("#FootSearch").bootstrapSwitch('toggleState');//如果需要关  
        }
      });
 }

//配置图表库
var mECharts = function () {
	var echarts;
	var myChart = new Array();//任意个数的图表
	var curTheme; 
	var iChart;
				iChart=5;
  require.config({
    paths:{ 
      echarts: 'assets/global/plugins/echarts/js',
      theme:'assets/global/plugins/echarts/theme'
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
        function (ec) {
            echarts = ec;    
            require(['theme/real2'], function(tarTheme){
                curTheme = tarTheme;
                showChart(curTheme);
				initTheme();
        })            
      }
    );
  }
  function GetChartData(){
	var Data;
	Data = ReadData(strUrl);
  }
  function initDom(){
	var domParent = $('.portlet-body.form');
	for(i = 0;i<iChart;i++){
		var html ='<div id="eChart-main'+ i +'" optionKey="Line" class="eCharts-main margin-top-10"></div>';
		domParent.append(html);
	}
	var dom = $('.eCharts-main');
	var width = domParent.width();
	dom.css('width',width);
	dom.css('height',width/((dom.length==1)?2:3));
  }
  function showChart(curTheme) {
    if (!echarts) {return;}//如果未加载则去掉
	initDom();
	var chartID;
    for(i = 0;i<iChart;i++){
		chartID = "eChart-main"+i;
		myChart[i] = echarts.init(document.getElementById(chartID), curTheme); 
		myChart[i].setOption(optionMap['line']);
	}
  }
  
  var optionMap = {
	 line : {		
		title : {
                text: '核查好品率随时间变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },		
        legend: {
            data:['胶印好品率','胶印产量','凹印好品率','凹印产量'],
			x:'center',
			y:60,
			itemGap:20,
			selected:{
				'胶印产量':false,
				'凹印产量':false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'领用时间',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:85,
				max:89,
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},				
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
		        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.89,87.44,87.26,87.33,86.56,86.84,86.66,86.22,87.1,87.07,86.98,86.94,86.79,86.47,86.67,87.51,87.35,87.32,87.36,87.14,87.7,87.56,86.67,87.01,87.48,87.1,87.34,86.59,88.35,86.83,86.37],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'胶印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle: {
					normal: {
						areaStyle: {type: 'default'},
						}
				},
                data:[3757,1512,775,1366,926,1243,1208,456,1002,1046,1519,924,716,523,408,1426,2925,1956,1014,424,459,1646,1671,996,1081,1042,882,755,309,125,13],
            },
            {
                name:'凹印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
               // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[87.05,87.22,87.75,87.89,87.49,87.31,87.31,86.85,87.26,87.12,87.45,87.1,87.19,86.67,86.94,87.11,87.32,87.83,87.42,86.85,87.04,87.76,87.6,87.1,87.22,87.3,87.78,87.46,87.59,87.01,84.9],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'凹印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,				
				yAxisIndex: 1,
                  itemStyle: {
					normal: {
						areaStyle: {type: 'default'},
						}
				},
                data:[5575,1115,811,2106,1155,1897,1723,1190,1082,1134,1599,1605,987,844,716,1243,2851,2175,1662,759,634,1383,1928,1431,1264,1223,1221,1030,630,344,64],
            }
        ]
    },
}
  
  function initThemeOption(){
    var themeSelector = $(".bs-select") ;
      themeSelector.html(
      '<option name="default">default</option>'
      + '<option name="real2" selected="true" >real2</option>'
      + '<option name="real">real</option>'
      + '<option name="macarons">macarons</option>'
      + '<option name="helianthus">helianthus</option>'
      + '<option name="infographic">infographic</option>'
      + '<option name="shine">shine</option>'
      + '<option name="dark">dark</option>'
      + '<option name="blue">blue</option>'
      + '<option name="green">green</option>'
      + '<option name="red">red</option>'
      + '<option name="gray">gray</option>' 
      + '<option name="roma">roma</option>'
      + '<option name="macarons2">macarons2</option>'
      + '<option name="sakura">sakura</option>'
      );    
   }
   function blindChart(){
		/*
		if ($('#eChart-main2')) {
			if (myChart2 && myChart2.dispose) {
				myChart2.getDom().className = 'eCharts-main';
				myChart2.dispose();
				myChart2 = null;
			}
		}
		if ($('#eChart-main3')) {
			if (myChart3 && myChart3.dispose) {
				myChart3.getDom().className = 'eCharts-main';
				myChart3.dispose();
				myChart3 = null;
			}
		};*/
		var Len = $('.eCharts-main').length;
		if(Len == 3){
			myChart[0].connect([myChart[1], myChart[2]]);
			myChart[1].connect([myChart[0], myChart[2]]);
			myChart[2].connect([myChart[0], myChart[1]])
		}else if(Len == 2){
			myChart[0].connect([myChart[1]]);
		}
   }
    function initTheme()//初始化主题模块
	{
		var themeSelector;
		themeSelector = $(".bs-select") ;
		if (themeSelector)
		{	
			$(themeSelector).on('change', function(){
				selectChange($(this).val());//更新图表主题
			});
			
			function selectChange(value){
				var theme = value;
				myChart[0].showLoading();
			require(['theme/' + theme], function(tarTheme){
					curTheme = tarTheme;
					setTimeout(refreshTheme(), 500);
				})
			}
			
			function refreshTheme(){
				for(i=0;i<iChart;i++){
					myChart[i].hideLoading();
					myChart[i].setTheme(curTheme);
				}
			}
		} 
		blindChart();
	}
    
	 $("button.applyBtn").live("click",function(){
		 InitChart(); 	
	 });
	
  return{
    init: function () {
      initThemeOption();
      launchChart();

    }   
  };

}();