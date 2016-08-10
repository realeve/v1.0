var FakePiece = function() {

	var handleDatePickers = function() {
		if (jQuery().datepicker) {
			$('.date-picker-month').datepicker({
				rtl: App.isRTL(),
				orientation: "left",
				autoclose: true,
				format: 'yyyy-mm',
				minViewMode: 1,
				maxViewMode: 3
			});
		}
	};

	function initDOM() {

		$("input[name='rec_date']").val(today(7));
		$("input[name='remark']").val('无');

		$('.page-header .dropdown-quick-sidebar-toggler').hide();
		handleValidate();
	}

	var handleValidate = function() {

		var vRules = getValidateRule('theForm');

		vRules.rec_date.number = false;

		vRules.checkNum = {
			digits: true,
			required: true,
			min: 1
		};
		vRules.wasteNum = {
			digits: true,
			required: true,
			min: 0
		};

		$('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: true, // do not focus the last invalid input
			rules: vRules,
			highlight: function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
			},
			success: function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler: function(form) {
				//form.submit(); // form validation success, call ajax form submit
				insertData();
			}
		});
	};

	//JS端  UTF-8  需要做2GBK操作
	//SELECT  COLLATIONPROPERTY('Chinese_PRC_Stroke_CI_AI_KS_WS', 'CodePage')
	function getFormData() {
		var surData = {
			'tbl': TBL.PPR_FALSEWASTE,
			'month': $("input[name='rec_date']").val().replace(/-/g, ''),
			'Describe': $("input[name='remark']").val(),
			'utf2gbk': ['Describe']
		};
		//surData.remark = UTF2GBK(surData.remark);
		var keyList = [
			'checkNum',
			'wasteNum',
			'wasteRatio'
		];
		var checkStr = JSON.stringify(surData);
		checkStr = checkStr.replace('}', '');
		var curVal;
		$('.formData input').map(function(elem) {
			curVal = $(this).val();
			if (curVal === '') {
				curVal = 0;
			}
			checkStr = checkStr + ',"' + keyList[elem] + '":' + curVal;
		});
		checkStr += '}';
		return $.parseJSON(checkStr);
	}

	function resetData() {
		$('.formData input').val('0');
		$("[name='remark']").val('无');
	}

	$('[name="reset"]').on('click', function() {
		resetData();
	});

	$('[name="checkNum"],[name="wasteNum"]').on('keyup', function() {
		var checkNum = $('[name="checkNum"]').val();
		var wasteNum = $('[name="wasteNum"]').val();
		var wasteRatio;
		if (wasteNum && checkNum > 0) {
			wasteRatio = wasteNum * 100 / checkNum;
			wasteRatio = wasteRatio.toFixed(3);
			$('[name="wasteRatio"]').val(wasteRatio);
		}
	});

	function insertData() {
		var strUrl = getRootPath() + "/DataInterface/insert";
		var options = {
			url: strUrl,
			type: 'post',
			resetForm: true,
			data: getFormData(),
			success: function(data) {
				var obj = $.parseJSON(data);
				bsTips(obj.message, obj.type);
				//重置数据
				resetData();
				loadHisData();
			},
			error: function(data) {
				infoTips(JSON.stringify(data));
			}
		};

		var data = options.data;
		if (data.checkNum >= data.wasteNum) {
			$.ajax(options);
		} else {
			bsTips('数据无效，误废张数大于抽检张数，请检查后重新输入！');
			$('[name="checkNum"]').focus();
		}
	}

	/**
	 * [loadHisData 载入历史数据]
	 * @return {[type]}        [无返回值]
	 */
	function loadHisData() {
		var objTbody = $('[name="hisData"] tbody');
		var month = $("input[name='rec_date']").val();
		//载入历史数据
		//损纸误废报表
		//SELECT month as 月份,	a.checkNum as 抽检张数,	a.wasteNum as 误废张数,	a.wasteRatio as 误废率,a.[Describe] as 备注 FROM	Paper_False_Waste AS a WHERE month/100=? order by 1

		month = jsLeft(month, 4);
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=191&M=3&tstart=" + month;
		var Data = ReadData(str);
		if (Data.rows === "0") {
			return;
		}

		function getTDStr(data, i) {
			var str = '<tr>' +
				'	<td>' + i + '</td>';
			data.map(function(td) {
				str += '	<td>' + td + '</td>';
			});
			str += '</tr>';
			return str;
		}
		var tBody = '';
		Data.data.map(function(data, i) {
			tBody += getTDStr(data, i + 1);
		});

		objTbody.html(tBody);
	}

	return {
		init: function() {
			handleDatePickers();
			initDOM();
			loadHisData();
		}
	};
}();


//配置图表库
var mECharts = function() {
	var myChart = []; //任意个数的图表
	var echarts, chartDataTool;
	var curTheme;
	var option = [];
	var i = 0;

	function launchChart() {
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
				showChart(curTheme);
			});
		});
	}

	function getstr() {
		//损纸误废率图表
		//SELECT month as 月份,a.wasteRatio as 误废率 FROM	Paper_False_Waste AS a WHERE month/100=2016 order by 1
		var month = $("input[name='rec_date']").val();
		month = jsLeft(month, 4);
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=193&M=3&tstart=" + month;
		return str;
	}

	function showChart(curTheme) {
		if (!echarts) {
			return;
		}

		i = 0;
		var objRequest = {
			url: getstr(),
			type: 'line'
		};
		if (typeof curTheme.color != 'undefined') {
			objRequest.color = curTheme.color;
		}

		option[i] = chartDataTool.getOption(objRequest, echarts);
		if (option[i] !== false) {
			delete option[i].title;
			//delete option[i].toolbox;
			delete option[i].dataZoom;
			option[i].grid.bottom = '3%';
			option[i].legend.y = 0;
			delete option[i].xAxis[0].name;
			option[i].toolbox.top = 0;
			option[i].toolbox.left = 'right';
		}

		if (option[i] !== false) {
			myChart[i] = echarts.init(document.getElementById("chart_" + i), curTheme);
			myChart[i].setOption(option[i]);
			$('#chart_loading_' + i).addClass('display-none');
			$('#chart_content_' + i).removeClass('display-none');
		}
	}
	return {
		resize: function() {
			myChart[0].resize();
		},
		init: function() {
			launchChart();
		},
	};
}();


jQuery(document).ready(function() {
	initDom();
	FakePiece.init();
	mECharts.init();
});
jQuery(window).resize(function() {
	HeadFix();
	mECharts.resize();
});