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

	function loadUserList(userType) {
		//完成车间考核记录人员名单
		//select rec_id,name from Paper_Penalty_Operator where Proc_ID = ? and bhide <> 1 order by Name
		//参数 t
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=251&M=3&t=" + userType;
		$.ajax({
				url: str
			})
			.done(function(Data) {
				Data = handleAjaxData(Data);
				InitSelect("oper_id", Data);
				setTimeout(function() {
					SetSelect2Val('oper_id', -1);
				}, 0);
			});
	}

	var userType; //用户类型

	function initDOM() {
		$("input[name='rec_date']").val(today(6));
		$("input[name='remark']").val('无');
		$("input[name='more']").val('0');
		$("input[name='less']").val('0');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1";
		$.ajax({
				url: str
			})
			.done(function(Data) {
				Data = handleAjaxData(Data);
				InitSelect("prod_id", Data);
				initSelect2();
			});

		$('.page-header .dropdown-quick-sidebar-toggler').hide();

		iCheckBoxInit();

		//默认为临时工
		SetiCheckChecked('user_type', 1);

		handleValidate();

		//载入临时工人员名单
		loadUserList(2);

		$('[name="user_type"]').on('ifChecked', function() {
			userType = GetiCheckChecked('user_type') + 1;
			loadUserList(userType);
			//正式工
			if (userType === 1) {
				$('[name="large_fake_money"]').parent().find('.help-block').text('( 考核标准:100元/张 )');
				$('[name="mid_fake_money"]').parent().find('.help-block').text('( 考核标准:10元/张 )');

				$('[name="large_fake_money"]').val(100 * $('[name="large_fake"]').val());
				$('[name="mid_fake_money"]').val(10 * $('[name="mid_fake"]').val());

			} else {
				$('[name="large_fake_money"]').parent().find('.help-block').text('( 考核标准:50元/张 )');
				$('[name="mid_fake_money"]').parent().find('.help-block').text('( 考核标准:5元/张 )');

				$('[name="large_fake_money"]').val(50 * $('[name="large_fake"]').val());
				$('[name="mid_fake_money"]').val(5 * $('[name="mid_fake"]').val());
			}
		});

	}

	var handleValidate = function() {

		$("input[name='reel_code']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});

		//扩充验证规则
		extendValidateRule();

		var vRules = getValidateRule('theForm');

		vRules.rec_date.number = false;

		vRules.serious_fake = {
			digits: true,
			required: false,
			min: 0
		};

		vRules.large_fake = vRules.serious_fake;

		vRules.more = {
			required: false,
			number: true
		};

		vRules.less = {
			required: false,
			number: true
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

	$('[name="serious_fake"]').on('keyup', function() {
		userType = GetiCheckChecked('user_type') + 1;
		$('[name="serious_fake_money"]').val(500 * $(this).val());
	});

	$('[name="large_fake"]').on('keyup', function() {
		userType = GetiCheckChecked('user_type') + 1;
		var singleNum = (userType == 1) ? 100 : 50;
		$('[name="large_fake_money"]').val(singleNum * $(this).val());
	});

	$('[name="mid_fake"]').on('keyup', function() {
		userType = GetiCheckChecked('user_type') + 1;
		var singleNum = (userType == 1) ? 10 : 5;
		$('[name="mid_fake_money"]').val(singleNum * $(this).val());
	});

	function resetData() {
		$('.detail input').val('');
		$("[name='remark']").val('无');
		$("[name='more']").val('0');
		$("[name='less']").val('0');
		SetSelect2Val('oper_id', -1);
	}

	$('[name="reset"]').on('click', function() {
		resetData();
	});

	function insertData() {
		var strUrl = getRootPath() + "/DataInterface/insert";
		var data = getFormData('theForm');

		data.utf2gbk = ['remark'];
		data.tbl = TBL.PPR_PENALTY;

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
		//完成车间质量考核报表
		//SELECT b.Name as 人员, convert(varchar,a.rec_date,112) as 考核日期, a.serious_fake as 严重废, a.large_fake as 一般废, a.serious_fake_money+a.large_fake_money as 考核金额, a.more as 用户反馈, a.less as 车间考核, a.remark as 备注 FROM Paper_Penalty AS a INNER JOIN Paper_Penalty_Operator b on a.oper_id = b.rec_ID where convert(varchar(6),a.rec_date,112) = LEFT(?,6) order by 1,a.ID

		date = date.replace(/-/g, '');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=252&M=3&tstart=" + date;
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

	function getstr() {
		//月度质量考核图
		//SELECT b.Name as 人员, sum(a.serious_fake_money+a.large_fake_money) as 考核金额 FROM Paper_Penalty AS a INNER JOIN Paper_Penalty_Operator b on a.oper_id = b.rec_ID where convert(varchar(6),a.rec_date,112) = LEFT(?,6) group by b.Name order by 2 desc
		var date = $("input[name='rec_date']").val();
		date = date.replace(/-/g, '');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=253&M=3&tstart=" + date;
		return str;
	}

	function initChart() {
		var objRequest = {
			url: getstr(),
			type: 'bar',
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
			loadHisData();
			initChart();
		}
	};

}();


jQuery(document).ready(function() {
	initDom();
	FakePiece.init();
});
jQuery(window).resize(function() {
	HeadFix();
	//mECharts.resize();
});