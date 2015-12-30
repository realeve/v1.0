var PaperParam = function() {
	var handleDatePickers = function() {
		if (jQuery().datepicker) {
			$('.date-picker').datepicker({
				rtl: App.isRTL(),
				orientation: "left",
				autoclose: true,
				format:'yyyy-mm-dd'
			});
		}
	};

	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=24&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("Prod_id", Data);

		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=23&M=3&t=1";
		Data = ReadData(str);
		InitSelect("machine_id", Data);

		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=25&M=3&t=1";
		Data = ReadData(str);
		InitSelect("oper_id", Data);
		$("input[name='rec_date']").val(today(6));
		$("input[name='Reel_Code']").maxlength({
			limitReachedClass: "label label-danger",
			threshold: 3
		});
	}

	function initChecked() {
		var iHours = new Date().getHours();
		if (iHours >= 0 && iHours < 8) { //夜班
			SetRadioChecked('class_id', 2);
		} else if (iHours >= 8 && iHours < 16) { //白班
			SetRadioChecked('class_id', 0);
		} else { //中班
			SetRadioChecked('class_id', 1);
		}
	}

	function vialidate() {
		if ($('select[name="oper_id"]').val() === '' || $('select[name="prod_ID"]').val() === '' || $('select[name="machine_ID"]').val() === '') {
			$('.portlet.light').hide();
			return 1;
		}
		$('.portlet.light').show();
		return 0;
	}

	$('select[name="oper_id"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
	});

	$('select[name="machine_id"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
		initChecked();
	});

	$('select[name="Prod_id"]').change(function() {
		if (vialidate()) {
			$('.grey-cascade').html('');
			return;
		}
		refreshData();
	});

	$('input[name="Reel_Code"]').on('change',  function(event) {
		loadHisData();
	});

	function loadHisData(){
		var Reel_Code = $('input[name="Reel_Code"]').val();
		var strUrl = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=33&M=2&r=" + Reel_Code;
		var Data = ReadData(strUrl);
		//bsTips(JSON.stringify(Data));
		Data.header.map(function(elem) {
			var keys = elem.title;
			//$('form input.form-control[name="'+ keys +'"], form select.form-control[name="'+ keys +'"]').val(Data.data[0][keys]);
			$('form .form-control[name="'+ keys +'"]').val(Data.data[0][keys]);
		});
		SetRadioChecked('class_id', Data.data[0]['class_id']);
		$('.portlet button[type="submit"]').attr('data-sn',Data.data[0]['ID']);
		$('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('提交','更新'));
		//移动浮动效果
		$('.portlet.light div').removeClass('form-md-floating-label');
		$('.portlet.light').show();
		refreshData();
		//更新评价总分
		$('.amounts h4').html("<strong>评价总分:</strong> "+Data.data[0]['score']);

		//日常指标禁止修改
		$('.normalPara input').attr('disabled','true');
		$('.normalParaEdit').show();
	}

	$('#checkbox2').on('click',function(){
		if($(this).val()==1){
			$(this).val(0);
			$('.normalPara input').attr('disabled','true');
		}else{//允许
			$(this).val(1);
			$('.normalPara input').removeAttr('disabled');
		}
	});

	function refreshData() {
		var startMonth = $("input[name='rec_date']").val();
		startMonth = startMonth.substr(0, 4) + startMonth.substr(5, 2);
		var prod = $('select[name="Prod_id"]').val();
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=27&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataPsc = ReadData(str);
		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=28&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataSur = ReadData(str);
		$('.grey-cascade').html('物理指标得分：' + xround(DataPsc.data[0][0], 2) + '，外观指标得分：' + xround(DataSur.data[0][0], 2));
	}

	var stdScore = {};

	/**
	 * [calcScore 计算物理指标得分]
	 * @return {[type]} [返回总分]
	 */
	function calcScore() {
		var url = getRootPath(1) + "/assets/pages/controller/data/paper_physic.json";
		var curVal,subScore = 100;
		$.get(url,function(json){
			stdScore = json;
		});
		/*for(var key in stdScore){
			curVal = $('input[name="'+ key +'"]').val();

			if( curVal<data[key].min || curVal>data[key].max){
				subScore -= data[key].score;
			}
		}
		$('.amounts h4').html("<strong>评价总分:</strong> "+subScore);*/
	}

	$('.portlet.light input').on('change',function(){
		var curScore = parseFloat($('.amounts h4').text().replace('评价总分:',''),10);
		var iKey = $(this).attr('name');
		var curVal = $(this).val();
		if(typeof stdScore[iKey] !== 'undefined'){
			if( curVal<stdScore[iKey].min || curVal>stdScore[iKey].max){
				curScore -= stdScore[iKey].score;
			}
		}
		$('.amounts h4').html("<strong>评价总分:</strong> "+curScore);
	});

	var handleValidate = function() {
		var vRules = getValidateRule('theForm');
		vRules.Reel_Code = {
			minlength: 4,
			maxlength: 6,
			number: false,
			required: true
		};
		vRules.rec_date.number = false;

		//非一类指标（不必须输入）
		vRules.water_imbibition = {
			required: false
		};
		vRules.PH_val = {
			required: false
		};
		vRules.sur_Strength = {
			required: false
		};
		vRules.sur_oil_imbibition = {
			required: false
		};

		$('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: true, // do not focus the last invalid input
			rules: vRules,
			messages: {
				Reel_Code: {
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
			}
		});

		function insertData() {
			//var strUrl = getRootUrl('PaperPara') + 'insert';
			var strUrl = getRootPath()+"/DataInterface/insert";
			var iData = getFormData('theForm');
			iData.tbl = 0;
			iData.class_id = GetRadioChecked('class_id');
			iData.score = $('.amounts h4').text().replace('评价总分:','');
			iData.utf2gbk = ['remark'];
			iData.record_Time = today(1);
			$.post(strUrl, iData,
				function(data, status) {
					if (status == "success") {
						var obj = $.parseJSON(data);
						infoTips(obj.message, obj.type);
						$('button[type="reset"]').click();
						$('.portlet.light').hide();

					} else {
						infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
						infoTips(JSON.stringify(data));
					}
				}
			);
		}

		function updateData() {
			var strUrl = getRootPath()+"/DataInterface/update";
			var iData = getFormData('theForm');
			iData.tbl = 0;
			iData.class_id = GetRadioChecked('class_id');
			iData.score = $('.amounts h4').text().replace('评价总分:','');
			iData.utf2gbk = ['remark'];
			iData.record_Time = today(1);
			iData.id = $('.portlet button[type="submit"]').attr('data-sn');
			$.post(strUrl, iData,
				function(data, status) {
					if (status == "success") {
						var obj = $.parseJSON(data);
						infoTips(obj.message, obj.type);
						$('button[type="reset"]').click();
						$('.portlet.light').hide();
						//状态还原
						$('.normalPara input').removeAttr('disabled');
						$('.portlet.light div').addClass('form-md-floating-label');
						$('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新','提交'));
					} else {
						infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
						infoTips(JSON.stringify(data));
					}
				}
			);
		}

		$('button[type="submit"]').on('click', function() {
			if ($('form[name=theForm]').validate().form()) {
				if($('.portlet button[type="submit"]').text().trim()=='提交'){
					insertData();
				}else{
					updateData();
				}
			} else {
				infoTips('请确保所有必要信息均正确输入');
			}
		});

		$('button[type="reset"]').on('click', function() {
			$('.portlet.light').hide();
			$('.amounts h4').html("<strong>评价总分:</strong> "+100);
		});
	};

	return {
		init: function() {
			$('.portlet.light').hide();
			$('.normalParaEdit').hide();
			handleDatePickers();
			initDOM();
			initChecked();
			handleValidate();
			calcScore();
		}
	};

}();

jQuery(document).ready(function() {
	initDom();
	PaperParam.init();
});
jQuery(window).resize(function() {
	HeadFix();
});