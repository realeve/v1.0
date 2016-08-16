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
		//读取印钞品种信息
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=35&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("prod_ID", Data);

		//作废原因
		//SELECT id,fakedesc FROM FakePieceDesc
		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=245&M=3";
		Data = ReadData(str);
		InitSelect("ProcID", Data);

		$("input[name='rec_date']").val(today(6));
		$("input[name='remark']").val('无');

		initSelect2();
		$('.page-header .dropdown-quick-sidebar-toggler').hide();

		handleValidate();
	}

	var handleValidate = function() {

		$("input[name='cart_number']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});

		//扩充验证规则
		extendValidateRule();

		var vRules = getValidateRule('theForm');
		vRules.cart_number = {
			minlength: 8,
			maxlength: 8,
			isCartNumber: true,
			required: true
		};

		vRules.rec_date.number = false;

		vRules.FakePiece = {
			digits: true,
			required: false
		};
		vRules.HalfPiece = vRules.FakePiece;
		vRules.NoNum = vRules.FakePiece;


		$('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: true, // do not focus the last invalid input
			rules: vRules,
			messages: {
				cart_number: {
					required: "车号不能为空."
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

	$('input[name="cart_number"]').on('keyup', function() {
		var val = $(this).val();
		if (val.length >= 3) {
			//取第三位信息
			var curVal = val.substr(2, 1);
			SetSelect2Val('prod_ID', curVal);
		}
	});

	//JS端  UTF-8  需要做2GBK操作
	//SELECT  COLLATIONPROPERTY('Chinese_PRC_Stroke_CI_AI_KS_WS', 'CodePage')
	function getFormData() {
		var surData = {
			'tbl': TBL.PRINT_FAKEPIECE,
			'CartNumber': $("input[name='cart_number']").val(),
			'ProductType': GetSelect2Text('prod_ID'),
			'ProcID': $('select[name="ProcID"]').val(),
			'Date': $("input[name='rec_date']").val().replace(/-/g, ''),
			'Describe': $("input[name='remark']").val(),
			'utf2gbk': ['Describe']
		};
		//surData.remark = UTF2GBK(surData.remark);
		var keyList = [
			'FakePiece',
			'HalfPiece',
			'NoNum'
		];
		var checkStr = JSON.stringify(surData);
		checkStr = checkStr.replace('}', '');
		var curVal;
		$('.fakeNum input').map(function(elem) {
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
		SetSelect2Val('ProcID', -1); //工序
		$('.fakeNum input').val('0');
		$("[name='remark']").val('无');
		$("[name='cart_number']").focus();
	}

	$('[name="reset"]').on('click', function() {
		resetData();
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
		//大张废原始数据查询
		// SELECT  a.CartNumber,  a.ProductType,  a.Date,  a.FakePiece,  a.HalfPiece,  a.NoNum,  b.FakeDesc,  a.Describe  FROM  FakePieceData a INNER JOIN  FakePieceDesc b on a.ProcID = b.id  where date = ? order by a.id desc
		date = date.replace(/-/g, '');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=246&M=3&tstart=" + date;
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