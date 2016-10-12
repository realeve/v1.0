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

		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1";
		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("prod_id", Data);
			});


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
		var data = getFormData('theForm');

		data.tbl = TBL.PPR_FALSEWASTE;
		data.month = $("input[name='rec_date']").val().replace(/-/g, '');
		data.utf2gbk = ['remark'];
		data.rec_date = today(6);

		var options = {
			url: strUrl,
			type: 'post',
			resetForm: true,
			data: data,
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

		if (Number.parseInt(data.checkNum) >= Number.parseInt(data.wasteNum)) {
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
		//SELECT month as 月份,	a.checkNum as 抽检张数,	a.wasteNum as 误废张数,	a.wasteRatio as 误废率,a.[remark] as 备注 FROM	Paper_False_Waste AS a WHERE month/100=? order by 1

		function getTDStr(data, i) {
			var str = '<tr>' +
				'	<td>' + i + '</td>';
			data.map(function(td) {
				str += '	<td>' + td + '</td>';
			});
			str += '</tr>';
			return str;
		}

		month = jsLeft(month, 4);
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=247&M=3&tstart=" + month;
		$.ajax({
				url: str
			})
			.done(function(Data) {
				Data = handleAjaxData(Data);
				if (Data.rows === 0) {
					objTbody.html('<tr><td class="text-center" colspan=' + (Data.cols + 1) + '>指定时间内无数据</td></tr>');
					return;
				}

				var tBody = '';
				Data.data.map(function(data, i) {
					tBody += getTDStr(data, i + 1);
				});

				objTbody.html(tBody);
			});

	}


	function getstr() {
		//损纸误废率图表
		//SELECT month as 月份,a.wasteRatio as 误废率 FROM	Paper_False_Waste AS a WHERE month/100=2016 order by 1
		var month = $("input[name='rec_date']").val();
		month = jsLeft(month, 4);
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=249&M=3&tstart=" + month;
		return str;
	}

	function initChart() {
		var objRequest = {
			url: getstr(),
			type: 'line',
			background: 'img'
		};
		var charts = require(["../assets/pages/controller/singleChart.min"], function(charts) {
			charts.init(objRequest, $('[name="singleChart"]'));
		});
	}

	return {
		init: function() {
			handleDatePickers();
			initDOM();
			initChart();
			loadHisData();
		}
	};
}();

jQuery(document).ready(function() {
	initDom();
	FakePiece.init();
});
jQuery(window).resize(function() {
	HeadFix();
});