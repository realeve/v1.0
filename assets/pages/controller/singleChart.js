define(function() {

	var myChart; //任意个数的图表
	var echarts, chartDataTool;
	var curTheme;
	var option;
	var objRequest;

	function launchChart(_Request, chartid) {
		objRequest = _Request;
		require.config({
			baseUrl: "../assets/global/plugins/",
			paths: {
				"theme": "echarts/theme",
				"echarts": "echarts/js/echarts.min",
				"chartDataTool": "echarts/js/extension/chartDataTool.min"
			}
		});

		require(["echarts", "chartDataTool"], function(ec, dt) {
			var defaultTheme;
			echarts = ec;
			chartDataTool = dt;
			if (typeof localStorage.eChartsTheme == 'undefined') {
				defaultTheme = 'ali_G2';
				localStorage.setItem("eChartsTheme", "ali_G2");
			} else {
				defaultTheme = localStorage.eChartsTheme;
			}

			require(["theme/" + defaultTheme], function(tarTheme) {
				curTheme = tarTheme;
				showChart(curTheme, chartid);
			});
		});
	}

	function showChart(curTheme, i) {
		if (!echarts) {
			return;
		}

		if (typeof curTheme.color != 'undefined') {
			objRequest.color = curTheme.color;
		}

		option = chartDataTool.getOption(objRequest, echarts);
		if (option !== false) {

			var title = option.title[0].text;

			delete option.title;
			delete option.dataZoom;
			option.grid.bottom = '3%';
			option.legend.y = 0;
			option.toolbox.top = 0;
			option.toolbox.left = 'right';
			myChart = echarts.init(document.getElementById("chart_" + i), curTheme);
			myChart.setOption(option);

			$('#chart_loading_' + i).addClass('display-none');
			$('#chart_content_' + i).removeClass('display-none');
			$('#chart_captain_' + i).text(title);
		}
	}

	jQuery(window).resize(function() {
		myChart.resize();
	});

	function handleDom(dom, i) {
		var str = '<div class="portlet light bordered">' +
			'<div class="portlet-title">' +
			'    <div class="caption">' +
			'        <i class="icon-bar-chart font-green hide"></i>' +
			'        <span class="caption-subject font-blue bold uppercase" id="chart_captain_' + i + '"> 数据图表 </span>' +
			'    </div>' +
			'</div>' +
			'<div class="portlet-body">' +
			'    <div id="chart_loading_' + i + '">' +
			'        <img src="../assets/global/img/loading.gif" alt="loading" />' +
			'    </div>' +
			'    <div id="chart_content_' + i + '">' +
			'        <div id="chart_' + i + '" class="chart" style="height:500px;"> </div>' +
			'    </div>' +
			'</div>' +
			'</div>';
		dom.append(str);
	}

	return {
		init: function(objRequest, dom) {
			var chartID = Math.random().toString().substr(3, 6);
			handleDom(dom, chartID);
			launchChart(objRequest, chartID);
		},
	};
});