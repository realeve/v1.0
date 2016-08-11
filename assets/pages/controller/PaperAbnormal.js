var PaperParamAbnormal = function() {

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

	function focusInput() {
		$('form input[type="text"]').eq(0).focus();
	}

	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("prod_id", Data);

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=0";
		Data = ReadData(str);
		InitSelect("machine_id", Data);

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=25&M=3&t=1";
		Data = ReadData(str);
		InitSelect("oper_id", Data);

		$("input[name='rec_date']").val(today(6));

		$("input[name='reel_code']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});

		initSelect2();

		$('.page-header .dropdown-quick-sidebar-toggler').hide();

		$('[name="director_name"]').val('无');

		focusInput();
	}

	$('input[name="reel_code"]').on('keyup', function() {
		var val = $(this).val();
		if (val.length > 1) {
			var prodId = val.substr(1, 1);
			SetSelect2Val('prod_id', prodId);
			var machineId = val.substr(2, 1);
			SetSelect2Val('machine_id', machineId);
		}
	});

	var handleValidate = function() {

		function validateRule(theForm) {
			var str = '',
				rule;
			$('form[name="' + theForm + '"] input[type="text"]').map(function(elem) {
				str += '"' + $(this).attr("name") + '":{"number":true},';
			});
			$('form[name="' + theForm + '"] select').map(function(elem) {
				str += '"' + $(this).attr("name") + '":{"min":0},';
			});
			str = '{' + jsOnRight(str, 1) + '}';
			rule = $.parseJSON(str);
			rule.remark = {
				"require": false,
				"number": false
			};
			return rule;
		}

		//扩充验证规则
		extendValidateRule();

		var vRules = validateRule('theForm');
		vRules.reel_code = {
			minlength: 8,
			maxlength: 8,
			isReelCode: true,
			required: true
		};
		vRules.oper_id = {
			required: true,
			min: 0
		};
		vRules.rec_date = {
			number: false
		};
		vRules.director_name = {
			number: false
		};

		$('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: true, // do not focus the last invalid input
			rules: vRules,
			messages: {
				reel_code: {
					required: "轴号不能为空."
				},
				oper_id: {
					min: '操作人员信息不能为空'
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

		function insertData() {
			//var strUrl = getRootUrl('PaperPara') + 'insert';
			var strUrl = getRootPath() + "/DataInterface/insert";
			var iData = getFormData('theForm');

			iData.tbl = TBL.PPR_ABNORMAL;

			iData.utf2gbk = ['remark', 'director_name'];
			iData.rec_time = today(1);

			$.ajax({
				url: strUrl,
				type: 'POST',
				data: iData,
				success: function(data) {
					var obj = $.parseJSON(data);
					bsTips(obj.message, obj.type);
					resetInputBox();
				},
				error: function(data) {
					infoTips("保存数据失败，请稍后重试或联系管理员!", 0);
					infoTips(JSON.stringify(data));
				}
			});

		}

		$('a[name="reset"]').on('click', function() {
			resetInputBox();
		});

		function resetInputBox() {

			$('form input[type="text"]').val('');

			SetSelect2Val('oper_id', -1);
			SetSelect2Val('prod_id', -1);
			SetSelect2Val('machine_id', -1);
			$('.detail input').val('0');
			$("input[name='rec_date']").val(today(6));

			$('[name="remark"]').val('无');
			$('[name="director_name"]').val('无');
			focusInput();
		}
	};

	return {
		init: function() {
			handleDatePickers();
			initDOM();
			handleValidate();
		}
	};

}();

jQuery(document).ready(function() {
	initDom();
	PaperParamAbnormal.init();
});
jQuery(window).resize(function() {
	HeadFix();
});
//vier_paper_para_abnormal
// SELECT
// a.reel_code AS [轴号],
// b.ProductName AS [品种],
// c.Machine_Name AS [机台],
// convert(varchar,a.rec_date,112) AS [日期],
// a.oper_id AS [检验员],
// a.temperature AS [室内温度],
// a.humidity AS [相对湿度],
// a.director_name AS [主管],
// a.remark AS [备注],
// a.sur_oil_imbibition_f AS [表面吸油性正],
// a.sur_oil_imbibition_b AS [表面吸油性反],
// a.water_imbibition_f AS [吸水性正],
// a.water_imbibition_b AS [吸水性反],
// a.sur_Strength_v_f AS [表面强度-纵-正],
// a.sur_Strength_v_b AS [表面强度-纵-反],
// a.sur_Strength_h_f AS [表面强度-横-正],
// a.sur_Strength_h_b AS [表面强度-横-反],
// a.oil_perme_f AS [油渗性正],
// a.oil_perme_f_lv AS [油渗性正-等级],
// a.oil_perme_b AS [油渗性反],
// a.oil_perme_b_lv AS [油渗性反-等级],
// a.roughness_v_f AS [粗糙度-纵-正],
// a.roughness_v_b AS [粗糙度-纵-反],
// a.roughness_h_f AS [粗糙度-横-正],
// a.roughness_h_b AS [粗糙度-横-反],
// a.perme_v_f AS [渗透性-纵-正],
// a.perme_v_b AS [渗透性-纵-反],
// a.perme_h_f AS [渗透性-横-正],
// a.perme_h_b AS [渗透性-横-反],
// a.burst_f AS [耐破度正],
// a.burst_b AS [耐破度反],
// a.evennessIdx_f AS [匀度指数正],
// a.evennessIdx_b AS [匀度指数反],
// a.pps_f AS [PPS正],
// a.pps_b AS [PPS反],
// a.score AS [得分],
// a.rec_time AS [录入时间]

// FROM
// Paper_Para_Abnormal AS a INNER JOIN Paper_ProductData b on a.prod_id = b.ProductID INNER JOIN Paper_Machine_Info c on a.machine_id = c.Machine_ID