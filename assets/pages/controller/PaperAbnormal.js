var PaperParamAbnormal = function() {

	var iUpdate = 0;
	var reelID;
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

	function getSelectInfo() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("prod_id", Data);
			});

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=0&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("machine_id", Data);
			});

		//非常规指标人员信息，Proc_id=4
		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=25&M=3&t=4&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("oper_id", Data);
			});

		initSelect2();
	}

	function initDOM() {

		getSelectInfo();

		$("input[name='rec_date']").val(today(6));

		$("input[name='reel_code']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});

		$('.page-header .dropdown-quick-sidebar-toggler').hide();

		$('[name="director_name"]').val('无');

		focusInput();
	}

	$('input[name="reel_code"]').on('keyup', function() {
		var val = $(this).val();
		if (val.length > 1) {
			var prodId = val.substr(1, 1);
			if (prodId == 7) {
				prodId = 8;
			}
			SetSelect2Val('prod_id', prodId);
			var machineId = val.substr(2, 1);
			SetSelect2Val('machine_id', machineId);
		}
		if (val.length == 8) {
			loadHisData();
		}
	});

	function loadHisData() {
		var reelcode = $('[name="reel_code"]').val();
		//r
		//SELECT a.reel_code, a.prod_id, a.machine_id, convert(varchar(10),a.rec_date,120) as rec_date, a.temperature, a.oper_id, a.humidity, a.director_name, a.remark, a.sur_oil_imbibition_f, a.sur_oil_imbibition_b, a.water_imbibition_f, a.water_imbibition_b, a.sur_Strength_h_f, a.sur_Strength_h_b, a.oil_perme_f, a.oil_perme_f_lv, a.oil_perme_b, a.oil_perme_b_lv, a.score, a.rec_time, a.ID FROM dbo.Paper_Para_Abnormal AS a where reel_code = ?
		var strUrl = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=302&M=0&r=" + reelcode;
		var Data = ReadData(strUrl);

		if (Data.rows == "0") {
			return 0;
		}

		//将上次载入的轴号记录
		$('input[name="reelcode"]').data('reelcode', reelcode);
		Data.header.map(function(elem) {
			var keys = elem.title;
			$('form .form-control[name="' + keys + '"]').val(Data.data[0][keys]);
		});

		reelID = Data.data[0].ID;

		SetSelect2Val('oper_id', Data.data[0].oper_id);

		$('[type="submit"]').html('更新 <i class="icon-cloud-upload"></i>');
		iUpdate = 1;
	}

	function calcScore(data) {

		//得分规则
		var scoreOrder = {
			sur_oil_imbibition_f: {
				max: 50,
				min: 40,
				score: 0.5
			},
			sur_oil_imbibition_b: {
				max: 50,
				min: 40,
				score: 0.5
			},
			water_imbibition_f: {
				max: 70,
				min: 40,
				score: 0.375
			},
			water_imbibition_b: {
				max: 70,
				min: 40,
				score: 0.375
			},
			sur_Strength_h_f: {
				min: 2.5,
				score: 1
			},
			sur_Strength_h_b: {
				min: 2.5,
				score: 1
			}
		};

		data.score = 100;

		for (var key in scoreOrder) {

			if (data[key] == 0 || data[key] == '') {
				continue;
			}

			var min = scoreOrder[key].min;
			if (data[key] < min) {
				data.score -= scoreOrder[key].score;
				continue;
			} else if (typeof scoreOrder[key].max != 'undefined' && data[key] > scoreOrder[key].max) {
				data.score -= scoreOrder[key].score;
			}
		}

		$('[name="score"]').val(data.score);

		return data;
	}



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
			}
		});

		$('button[type="submit"]').on('click', function() {
			insertData(iUpdate);
			if (iUpdate) {
				$('[type="submit"]').html('提交 <i class="icon-cloud-upload"></i>');
			}
		});

		$('.detail input').on('keyup', function(event) {
			var iData = getFormData('theForm');
			calcScore(iData);
		});

		function insertData(iUpdate) {
			//var strUrl = getRootUrl('PaperPara') + 'insert';
			var strUrl = getRootPath() + "/DataInterface/insert";
			var iData = getFormData('theForm');

			if (iUpdate) {
				iData.id = reelID;
				strUrl = getRootPath() + "/DataInterface/update";
			}

			iData.reel_code = iData.reel_code.toUpperCase();

			iData = calcScore(iData);

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
// a.sur_Strength_h_f AS [表面强度-横-正],
// a.sur_Strength_h_b AS [表面强度-横-反],
// a.oil_perme_f AS [油渗性正],
// a.oil_perme_f_lv AS [油渗性正-等级],
// a.oil_perme_b AS [油渗性反],
// a.oil_perme_b_lv AS [油渗性反-等级]
// a.score AS [得分],
// a.rec_time AS [录入时间]

// FROM
// Paper_Para_Abnormal AS a INNER JOIN Paper_ProductData b on a.prod_id = b.ProductID INNER JOIN Paper_Machine_Info c on a.machine_id = c.Machine_ID