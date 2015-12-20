
// for echarts online home page
var echarts;
var myChart;
var myChart2;
var myChart3;
var dom;
var optionKey;

//保证只加载一次，标志位
var bLaunched = false;
function launchChart() {
    if (bLaunched) {
        return;
    }
    // 按需加载
    bLaunched = true;
    require(
        [	
        	'echarts/jQuery',
            'echarts',
			'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/scatter',
            'echarts/chart/k',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/force',
            'echarts/chart/chord',
            'echarts/chart/gauge',
            'echarts/chart/funnel',
            'echarts/chart/eventRiver',
            'echarts/chart/venn',
            'echarts/chart/treemap',
            'echarts/chart/map',
			'echarts/chart/tree',
            'echarts/chart/wordCloud'
        ],
        function (ec) {
            echarts = ec;    
			require(['assets/theme/real'], function(tarTheme){
					var curTheme = tarTheme;
					//getCurParams();
					showChart(curTheme);
				})
			//console.log(curTheme);
            //getCurParams();
            
        }
    );
}

function initTheme()//初始化主题模块
{
	var themeSelector;
    themeSelector = JQuery(".bs-select") ;
	if (themeSelector)
	{	
		$(themeSelector).on('change', function(){
			var val = $(this).val();
			selectChange(val);//更新图表主题
		});
		
		function selectChange(value){
			var theme = value;
			myChart.showLoading();
			$(themeSelector).val(theme);
		require(['assets/theme/' + theme], function(tarTheme){
				curTheme = tarTheme;
				setTimeout(refreshTheme, 500);
			})
		}
		
		function refreshTheme(){
			myChart.hideLoading();
			myChart.setTheme(curTheme);
			if (optionKey == 'multiCharts') {
               myChart2.setTheme(curTheme);
			   myChart3.setTheme(curTheme);
            };
		}
	}	
}
function getCurParams(){    
    
        dom = curEvent.currentSlide.childNodes[len];		
        if (dom.className == 'main'){
            optionKey = dom.getAttribute('optionKey');

	    //多图联动
	    if (optionKey == 'multiCharts') {
                if (myChart2 && myChart2.dispose) {
                    myChart2.getDom().className = 'main';
                    myChart2.dispose();
                    myChart2 = null;
                }
                if (myChart3 && myChart3.dispose) {
                    myChart3.getDom().className = 'main';
                    myChart3.dispose();
                    myChart3 = null;
                }
            };
	    //多图联动
			//initTheme();
            return;
        }
    
    optionKey = false;
}


function showChart(curTheme) {
	if (!echarts) {return;}//如果未加载则去掉
	myChart = echarts.init(document.getElementById('eChart-main'), curTheme);	
	myChart.setOption({
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['蒸发量','降水量']
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				type : 'category',
				data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			}
		],
		yAxis : [
			{
				type : 'value',
				splitArea : {show : true}
			}
		],
		series : [
			{
				name:'蒸发量',
				type:'bar',
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:'降水量',
				type:'bar',
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}
		]
	});

    /*if (optionKey) {
		initTheme();
        myChart = echarts.init(dom, curTheme);	
        var option;
		if (optionKey == 'multiCharts') 
		{
			option = multiOptionMap[optionKey];
		}
		else
		{
			option = optionMap[optionKey];
		}
		
        dom.className = 'main noLoading';
		myChart.setOption(option);
		//动态加载
		if (functionMap[optionKey]) {
            functionMap[optionKey]();
        }
    }*/
}

require.config({
	paths:{ 
		echarts: 'assets/global/plugins/echarts/js'
	}
});

launchChart();
