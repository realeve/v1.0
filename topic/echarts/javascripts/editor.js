function initEditor() {
	gb.editor = ace.edit("code-panel"), gb.editor.getSession().setMode("ace/mode/javascript"), gb.editor.setOptions({
		enableBasicAutocompletion: !0,
		enableSnippets: !0,
		enableLiveAutocompletion: !0
	})
}

function initEcharts() {
	//mod by libin 20160315 增加DARK即为引用主题
	//先引用JQUERY则可用$选择器选择DOM
	gb.chart = echarts.init($("#chart-panel")[0]/*,'dark'*/), gb.editor.setValue("var option = {\n    \n};\n"), gb.editor.selection.setSelectionRange({
		start: {
			row: 1,
			column: 4
		},
		end: {
			row: 1,
			column: 4
		}
	})
}

function initControl() {
	$("#theme-dropdown").on("click", "li a", function() {
		setThemeButton($(this).text())
	}), $("#echarts-version-dropdown").on("click", "li a", function() {
		setEchartsVersionButton($(this).text())
	})
}

function setThemeButton(e) {
	$("#theme-btn").html("ECharts-" + e + ' <span class="caret"></span>'), $("#theme-btn").val(e), disposeAndRun()
}

function setEchartsVersionButton(e) {
	$("#echarts-version-btn").html("ECharts-" + e + ' <span class="caret"></span>'), $("#echarts-version-btn").val(e), updateEchartsVersion()
}

function initEventHandler() {
	gb.editor.on("change", function() {
		runDebounce()
	}), $("#h-handler").mousedown(function() {
		gb.handler.isDown = !0
	}), $(window).mousemove(function(e) {
		if (gb.handler.isDown) {
			var t = e.clientX / window.innerWidth;
			setSplitPosition(t)
		}
	}).mouseup(function() {
		gb.handler.isDown = !1
	}), $(window).resize(function() {
		gb.chart.resize(), checkEditorIfToShow()
	})
}

function setSplitPosition(e) {
	e = Math.min(.9, Math.max(.1, e));
	var t = 100 * e;
	$("#code-container").css("width", t + "%"), $(".right-container").css("width", 100 - t + "%").css("left", t + "%"), $("#h-handler").css("left", t + "%"), gb.chart && gb.chart.resize()
}

function checkEditorIfToShow() {
	window.innerWidth < 768 ? (void 0 === gb.editorIsShown || gb.editorIsShown === !0) && ($("#code-container").hide(), $("#h-handler").hide(), $(".right-container").css("width", "100%").css("left", "0%"), gb.editorIsShown = !1) : (void 0 === gb.editorIsShown || gb.editorIsShown === !1) && ($("#code-container").show(), $("#h-handler").show(), setSplitPosition(.4), gb.editorIsShown = !0)
}

function disposeAndRun() {
	gb.chart && gb.chart.dispose();
	$("#theme-btn").val() || "default";
	gb.chart = echarts.init($("#chart-panel")[0]/*,'dark'*/), run(!0)
}

function updateEchartsVersion() {
	var version = $("#echarts-version-btn").val();
	if (!echarts || version !== echarts.version || gb.echartsSource[version]) try {
		eval(gb.echartsSource[version]), disposeAndRun()
	} catch (e) {
		log("加载 ECharts 版本失败！", "error")
	}
}

function loadEchartsOfAllVersions() {
	for (var e = ["2.2.7", "3.0.0"], t = 0, n = e.length; n > t; ++t)! function(t) {
		$.get("./vendors/echarts/echarts-all-" + e[t] + ".js", function(n) {
			gb.echartsSource[e[t]] = n
		}, "text").fail(function() {
			console.error("加载 ECharts " + e[t] + " 版本失败！")
		})
	}(t)
}

function save() {
	return IS_STATIC ? void console.warn("静态版无法使用该功能！") : void $.get("http://" + window.location.host + "/chart/add", {
		code: gb.editor.getValue(),
		echarts_version: $("#echarts-version-btn").val(),
		theme: $("#theme-btn").val()
	}, function(e) {
		window.location = "http://" + window.location.host + "/" + e.cid
	}).fail(function(e) {
		log("无法保存到服务器，已在本地缓存，请尝试刷新页面", "error"), console.error(e)
	})
}

function fork() {
	if (IS_STATIC) return void console.warn("静态版无法使用该功能！");
	var e = getCid(),
		t = getVersion();
	$.get("http://" + window.location.host + "/chart/fork", {
		code: gb.editor.getValue(),
		echarts_version: $("#echarts-version-btn").val(),
		parent_version: t,
		root_id: e,
		theme: $("#theme-btn").val()
	}, function(t) {
		window.location = "http://" + window.location.host + "/" + e + "/" + t.version
	}).fail(function(e) {
		log("无法保存到服务器，已在本地缓存，请尝试刷新页面", "error"), console.error(e)
	})
}

function localSave() {
	var e = gb.editor.getValue();
	if (window.localStorage && e !== gb.loadedCode) try {
		window.localStorage.setItem("code", e), $("#reset-btn").css("display", "inline-block")
	} catch (t) {
		console.error(t), log("缓存到本地失败，刷新页面后图表将不被保存，请及时保存")
	}
}

function localLoad() {
	try {
		var e = window.localStorage.getItem("code");
		e && (gb.editor.setValue(e), log("读取本地缓存成功"))
	} catch (t) {
		console.error(t)
	}
}

function localReset() {
	gb.loadedCode && (gb.editor.setValue(gb.loadedCode), localSave(), $("#reset-btn").hide(), run())
}

function hasEditorError() {
	for (var e = gb.editor.getSession().getAnnotations(), t = 0, n = e.length; n > t; ++t)
		if ("error" === e[t].type) return !0;
	return !1
}

function load() {
	configs.c = window.location.href.split('#')[1];
	if (IS_STATIC) return void(configs.c && $.ajax("./data/" + configs.c + ".js", {
		dataType: "text",
		success: function(e) {
			gb.loadedCode = e, gb.editor.setValue(e)
		}
	}).fail(function() {
		log("加载图表失败！", "error")
	}));
	var e = (window.location.href.split("/"), getCid()),
		t = getVersion();
	"new" !== e ? $.get("http://" + window.location.host + "/chart/find/" + e, {
		version: t
	}, function(e) {
		gb.loadedCode = e.code, gb.editor.setValue(e.code), e.theme && setThemeButton(e.theme), setEchartsVersionButton(e.echartsVersion), run(), $("#fork-btn").css("display", "inline-block");
		var t = e.creater || "匿名用户",
			n = formatTime(new Date(e.createTime));
		log(t + "于" + n + "创建了该图表")
	}).fail(function(e) {
		console.error(e), window.location.pathname = "new"
	}) : (log("欢迎使用 ECharts Playground！"), window.localStorage ? (localLoad(), run()) : log("浏览器不支持本地缓存，请及时保存图表！", "warn"))
}

function log(e, t) {
	var n = formatTime(new Date);
	"warn" !== t && "error" !== t && (t = "info"), $("#code-info").html('<span class="code-info-time">' + n + '</span><span class="code-info-type-' + t + '">' + e + "</span>")
}

function formatTime(e) {
	for (var t = [e.getHours(), e.getMinutes(), e.getSeconds()], n = "", o = 0, i = t.length; i > o; ++o) n += (t[o] < 10 ? "0" : "") + t[o], i - 1 > o && (n += ":");
	return n
}

function getVersion() {
	var e = window.location.href.split("/");
	return 4 === e.length ? 1 : parseInt(e[e.length - 1], 10) || 1
}

function getCid() {
	return window.location.href.split("/")[3]
}

function downloadExample() {
	var e = '<!DOCTYPE html>\n<html style="height: 100%">\n   <head>\n       <meta charset="utf-8">\n   </head>\n   <body style="height: 100%; margin: 0">\n       <div id="container" style="height: 100%"></div>\n       <script type="text/javascript" src="'+ window.location.href.split('editor.html')[0] +'vendors/echarts/echarts.js"></script>\n       <script type="text/javascript">\nvar dom = document.getElementById("container");\nvar myChart = echarts.init(dom);\nvar app = {};\noption = null;\n' + gb.editor.getValue() + ';\nif (option && typeof option === "object") {\n    var startTime = +new Date();\n    myChart.setOption(option, true);\n    var endTime = +new Date();\n    var updateTime = endTime - startTime;\n    console.log("Time used:", updateTime);\n}\n       </script>\n   </body>\n</html>',
		t = new Blob([e], {
			type: "text/html;charset=UTF-8",
			encoding: "UTF-8"
		}),
		n = document.createElement("a");
	n.href = URL.createObjectURL(t), n.download = configs.c + ".html", n.click()
}
var IS_STATIC = !0,
	configs = {};
ace.require("ace/ext/language_tools"), _.each((location.search || "").substr(1).split("&"), function(e) {
	var t = e.split("=");
	configs[t[0]] = t[1]
});
var gb = {
	handler: {
		isDown: !1
	},
	lastTyping: 0,
	editor: null,
	chart: null,
	loadedCode: null,
	echartsSource: {},
	lastOption: null,
	updateTime: 0,
	debounceTime: 500
};
$(document).ready(function() {
	initEditor(), checkEditorIfToShow(), initEcharts(), initControl(), initEventHandler(), load()
});
var appEnv = {}, run = function(ignoreOptionNotChange) {
		if (hasEditorError()) return void log("编辑器内容有误！", "error");
		localSave(), clearTimeout(appEnv.timeTicket), clearInterval(appEnv.timeTicket);
		try {
			var myChart = gb.chart,
				app = appEnv;
			if (option = null, eval(gb.editor.getValue()), option && "object" == typeof option && (!_.isEqual(option, gb.lastOption) || ignoreOptionNotChange)) {
				gb.lastOption = option;
				var startTime = +new Date;
				gb.chart.setOption(option, !0);
				var endTime = +new Date;
				gb.updateTime = endTime - startTime;
				for (var debounceTime = 500, debounceTimeQuantities = [500, 2e3, 5e3, 1e4], i = debounceTimeQuantities.length - 1; i >= 0; i--) {
					var quantity = debounceTimeQuantities[i],
						preferredDebounceTime = debounceTimeQuantities[i + 1] || 1e6;
					if (gb.updateTime > quantity && gb.debounceTime !== preferredDebounceTime) {
						gb.debounceTime = preferredDebounceTime, runDebounce = _.debounce(run, preferredDebounceTime, {
							trailing: !0
						});
						break
					}
				}
				log("图表已生成, " + gb.updateTime + "ms")
			}
		} catch (e) {
			log("编辑器内容有误！", "error"), console.error(e)
		}
	}, runDebounce = _.debounce(run, gb.debounceTime, {
		trailing: !0
	});