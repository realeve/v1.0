! function() {
	function enableMask() {
		$toggleBtn.html("开启交互"), $(document.body).append($mask), maskEnabled = !0
	}

	function disableMask() {
		$toggleBtn.html("关闭交互"), $mask.remove(), maskEnabled = !1
	}
	var configs = {};
	_.each((location.search || "").substr(1).split("&"), function(n) {
		var t = n.split("=");
		configs[t[0]] = t[1]
	});
	var myChart, app = {}, name, run = function(code) {
			myChart && myChart.dispose(), myChart = echarts.init(document.getElementById("view-chart")), eval(code), "object" == typeof option && myChart.setOption(option, !0)
		};
	if (configs.edit) {
		var $editButton = $('<a class="btn btn-default btn-sm">编辑示例</a>').click(function() {
			window.open("./editor.html?c=" + configs.c)
		});
		$("#view-main .control-panel").append($editButton)
	}
	if (configs.reset) {
		var $resetButton = $('<a class="btn btn-default btn-sm">重置</a>').click(function() {
			run()
		});
		$("#view-main .control-panel").append($resetButton)
	}
	if (configs.mask) {
		var maskEnabled = !0,
			$toggleBtn = $('<a id="view-toggle-interable" class="btn btn-default btn-sm">开启交互</a>'),
			$mask = $('<div id="view-mask"></div>');
		$("#view-main .control-panel").append($toggleBtn), $toggleBtn.click(function() {
			maskEnabled ? disableMask() : enableMask()
		}), enableMask()
	}
	configs.c && $.ajax("./data/" + configs.c + ".js", {
		dataType: "text",
		success: function(n) {
			run(n)
		}
	}).fail(function() {}), $(window).resize(function() {
		myChart && myChart.resize()
	})
}();