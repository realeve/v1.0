var PaperParam = function() {
	var handleDatePickers = function() {
		if (jQuery().datepicker) {
			$('.date-picker').datepicker({
				rtl: App.isRTL(),
				orientation: "left",
				autoclose: true
			});
		}
	};

	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=23&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("machine_ID", Data);

		//1-物理站 2-化验站 3-外观指标
		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=25&M=3&t=2";
		Data = ReadData(str);
		InitSelect("oper_ID", Data);
		$("input[name='rec_date']").val(today(5));
		$("input[name='remark']").val('无');
		$("input[name='rec_date']").val(today(5));

		//浆池号
		var pulpCode = ReadData(getRootPath(1)+"/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=30&M=3");
		$('input[name="pulp_code"]').val(pulpCode.data[0]);
	}

	function initChecked() {
		var iHours = new Date().getHours();
		if (iHours >= 0 && iHours < 8) { //夜班
			SetRadioChecked('class_ID', 2);
		} else if (iHours >= 8 && iHours < 16) { //白班
			SetRadioChecked('class_ID', 0);
		} else { //中班
			SetRadioChecked('class_ID', 1);
		}
	}

	function vialidate() {
		if ($('select[name="oper_ID"]').val() === '' || $('select[name="machine_ID"]').val() === '') {
			$('.portlet.light').hide();
			return 1;
		}
		$('.portlet.light').show();
		return 0;
	}

	$('select[name="oper_ID"]').change(function() {
		vialidate();
	});

	$('select[name="machine_ID"]').change(function() {
		vialidate();
	});

	function setRecordNum() {
		var startDate = $("input[name='rec_date']").val();
		startDate = startDate.substr(6, 4) + startDate.substr(0, 2) + startDate.substr(3, 2);
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=26&M=3&tstart=" + startDate + "&tend=" + startDate;
		var Data = ReadData(str);
		$('.grey-cascade').html('当天已录入数据：' + Data.data[0][0] + '条');
	}

	function loadPulpInfo(){
		//http://localhost/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=32&M=3&p=3
	}

	return {
		init: function() {
			$('.portlet.light').hide();
			handleDatePickers();
			initDOM();
			initChecked();
			setRecordNum();
			$('form[name=theForm]').submit(function() {
				//var strUrl = getRootUrl('PaperPara') + 'insert';
				var strUrl = getRootPath()+"/DataInterface/insert";
				var options = {
					url: strUrl,
					type: 'post',
					resetForm: true,
					data: {
						'tbl': '1',
						'class_ID': GetRadioChecked('class_ID'),
						'utf2gbk' : ['remark'],
						'record_Time' : today(1)
					},
					success: function(data) {
						var obj = $.parseJSON(data);
						infoTips(obj.message, obj.type);
						//重置数据
						$('button[type="reset"]').click();
						$('.portlet.light').hide();
						$('.grey-cascade').text('当天已录入数据：' + (parseInt($('.grey-cascade').text().replace('当天已录入数据：', '').replace('条', ''), 10) + 1) + '条');
						//浆池号
						var pulpCode = ReadData(getRootPath(1)+"/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=30&M=3");
						$('input[name="pulp_code"]').val(pulpCode.data[0]);
					},
					error: function(data) {
						infoTips(JSON.stringify(data));
					}
				};
				$(this).ajaxSubmit(options);
				return false;
			});
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