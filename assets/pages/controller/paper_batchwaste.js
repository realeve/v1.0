var FakePiece = function() {
	var handleDatePickers = function() {
		if (jQuery().datepicker) {
			$('.date-picker').datepicker({
				rtl: App.isRTL(),
				orientation: "left",
				autoclose: true,
				format: 'yyyy-mm-dd'
			});
		}
	};

	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("prod_id", Data);

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=0";
		Data = ReadData(str);
		InitSelect("machine_id", Data);

		$("input[name='rec_date']").val(today(6));
		$("input[name='remark']").val('无');

		initSelect2();
		$('.page-header .dropdown-quick-sidebar-toggler').hide();

		handleValidate();
	}

	var handleValidate = function() {

		$("input[name='reel_code']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});

		//扩充验证规则
		extendValidateRule();

		var vRules = getValidateRule('theForm');
		vRules.reel_code = {
			minlength: 8,
			maxlength: 8,
			isReelCode: true,
			required: true
		};

		vRules.rec_date.number = false;

		vRules.fake_num = {
			number: true,
			required: true,
			min: 0.01
		};
		vRules.fake_reason = {
			required: true
		};

		$('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: true, // do not focus the last invalid input
			rules: vRules,
			messages: {
				reel_code: {
					required: "轴号不能为空."
				}
			},
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

	$('input[name="reel_code"]').on('keyup', function() {
		var val = $(this).val();
		if (val.length >= 2) {
			//取第三位信息
			var prodID = val.substr(1, 1);
			var machineID = val.substr(2, 1);
			SetSelect2Val('prod_id', prodID);
			SetSelect2Val('machine_id', machineID);
		}
	});

	function resetData() {
		SetSelect2Val('prod_id', -1);
		SetSelect2Val('machine_id', -1);
		$('[name="reel_code"]').val('');

		$('.detail input').val('');
		$("[name='remark']").val('无');
		$("[name='reel_code']").focus();
	}

	$('[name="reset"]').on('click', function() {
		resetData();
	});

	function insertData() {
		var strUrl = getRootPath() + "/DataInterface/insert";
		var data = getFormData('theForm');

		data.utf2gbk = ['remark', 'fake_reason'];
		data.tbl = TBL.PPR_BATCHWASTE;

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
		$.ajax(options);
		return false;
	}

	/**
	 * [loadHisData 载入历史数据]
	 * @return {[type]}        [无返回值]
	 */
	function loadHisData() {
		var objTbody = $('[name="fakeList"] tbody');
		var date = $("input[name='rec_date']").val();
		//载入历史数据
		//钞纸批量报废报表
		//SELECT a.reel_code AS 轴号, convert(varchar,a.rec_date,112) AS 录入日期, b.Machine_Name AS 机台, c.ProductName AS 品种, a.fake_reason AS 报废原因, a.fake_num AS 报废数量, a.remark AS 备注 FROM dbo.Paper_Batch_Waste AS a INNER JOIN Paper_Machine_Info b ON a.machine_id = b.Machine_ID INNER JOIN Paper_ProductData c ON a.prod_id = c.ProductID where convert(varchar,a.rec_date,112) BETWEEN ? AND ? ORDER BY a.ID

		date = date.replace(/-/g, '');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=192&M=3&tstart=" + date + "&tend=" + date;
		var Data = ReadData(str);
		if (Data.rows === 0) {
			objTbody.html('<tr><td class="text-center" colspan=' + (Data.cols + 1) + '>指定时间内无数据</td></tr>');
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

jQuery(document).ready(function() {
	initDom();
	FakePiece.init();
});
jQuery(window).resize(function() {
	HeadFix();
});