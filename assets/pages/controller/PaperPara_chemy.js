var PaperParam = function() {
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

	function getSelectInfo() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=1&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("machine_ID", Data);
			});

		//非常规指标人员信息，Proc_id=4
		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=25&M=3&t=3&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("oper_ID", Data);
			});

		str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=30&M=3&cache=14400";

		$.ajax({
				url: str
			})
			.done(function(data) {
				var Data = handleAjaxData(data);
				InitSelect("pulp_code", Data);
			});

		initSelect2();
	}

	function initDOM() {
		getSelectInfo();
		$("input[name='rec_date']").val(today(6));
		$('.page-header .dropdown-quick-sidebar-toggler').hide();
	}

	function initChecked() {
		var iHours = new Date().getHours();
		if (iHours >= 0 && iHours < 8) { //夜班
			SetiCheckChecked('class_id', 2);
		} else if (iHours >= 8 && iHours < 16) { //白班
			SetiCheckChecked('class_id', 0);
		} else { //中班
			SetiCheckChecked('class_id', 1);
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
		startDate = startDate.replace(/-/g, '');
		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=26&M=3&tstart=" + startDate + "&tend=" + startDate;
		$.ajax({
				url: str
			})
			.done(function(Data) {
				Data = handleAjaxData(Data);
				$('.page-toolbar button').html('当天已录入数据：' + Data.rows + '条');
				$('.page-toolbar ul').html('');
				for (var i = 0; i < Data.rows; i++) {
					$('.page-toolbar ul').append('<li><a href="' + getRootPath(1) + '/PaperPara/chemy#p=' + Data.data[i][1] + '">' + Data.data[i][1] + '</a></li>');
					if (i && i % 3 === 0) {
						$('.page-toolbar ul').append('<li class="divider"></li>');
					}
				}
			});

	}

	function loadHisData(pulpID) {
		if (typeof pulpID === "undefined") {
			var r = window.location.hash.substr(1).match(RegExp("(^|&)p=([^&]*)(&|$)"));
			if (r !== null) {
				pulpID = unescape(r[2]);
			} else {
				return;
			}
		}
		$('input[name="pulp_code"]').val(pulpID);
		var strUrl = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=32&M=0&p=" + pulpID;
		var Data = ReadData(strUrl);
		Data.header.map(function(elem) {
			var keys = elem.title;
			$('form .form-control[name="' + keys + '"]').val(Data.data[0][keys]);
		});
		SetSelect2Val('oper_ID', Data.data[0]['oper_ID']);
		SetSelect2Val('machine_ID', Data.data[0]['machine_ID']);
		SetiCheckChecked('class_id', Data.data[0]['class_id']);
		$('.portlet button[type="submit"]').data('sn', Data.data[0]['ID']);
		$('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('提交', '更新'));
		//移动浮动效果
		$('.portlet.light').show();
	}

	return {
		init: function() {
			$('.portlet.light').hide();
			handleDatePickers();
			initDOM();
			iCheckBoxInit();
			initChecked();
			setRecordNum();
			$('button[type="reset"]').on('click', function() {
				SetSelect2Val('oper_ID', -1);
				SetSelect2Val('machine_ID', -1);
				$('.portlet.light').hide();
				initChecked();
				$('.amounts h4').html("<strong>评价总分:</strong> " + 100);
				$('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新', '提交'));
			});
			$('form[name=theForm]').submit(function() {
				//更新数据
				var strUrl, options;
				if ($('.portlet button[type="submit"]').text().trim() !== '提交') {
					strUrl = getRootPath() + "/DataInterface/update";
					options = {
						url: strUrl,
						type: 'post',
						resetForm: true,
						data: {
							'tbl': TBL.CHEM,
							'class_id': GetiCheckChecked('class_id'),
							'utf2gbk': ['remark'],
							'id': $('.portlet button[type="submit"]').data('sn'),
							'record_Time': today(1)
						},
						success: function(data) {
							var obj = $.parseJSON(data);
							infoTips(obj.message, obj.type);
							//重置数据
							$('button[type="reset"]').click();
							$('.portlet.light').hide();
							//浆池号
							var pulpCode = ReadData(getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=30&M=3");
							$('input[name="pulp_code"]').val(pulpCode.data[0]);
							$('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新', '提交'));
						},
						error: function(data) {
							infoTips(JSON.stringify(data));
						}
					};
				} else { //插入数据
					strUrl = getRootPath() + "/DataInterface/insert";
					options = {
						url: strUrl,
						type: 'post',
						resetForm: true,
						data: {
							'tbl': TBL.CHEM,
							'class_id': GetiCheckChecked('class_id'),
							'utf2gbk': ['remark'],
							'record_Time': today(1),
							'pulp_code': $('input[name="pulp_code"]').val()
						},
						success: function(data) {
							var obj = $.parseJSON(data);
							infoTips(obj.message, obj.type);
							//重置数据
							$('button[type="reset"]').click();
							$('.portlet.light').hide();
							$('.page-toolbar button').text('当天已录入数据：' + (parseInt($('.page-toolbar button').text().replace('当天已录入数据：', '').replace('条', ''), 10) + 1) + '条');
							//浆池号
							var pulpCode = ReadData(getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=30&M=3");
							$('input[name="pulp_code"]').val(pulpCode.data[0]);
							$("input[name='rec_date']").val(today(6));
							setRecordNum();
							//浆池号
							var pulpCode = ReadData(getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=30&M=3");
							$('input[name="pulp_code"]').val(pulpCode.data[0]);
						},
						error: function(data) {
							infoTips(JSON.stringify(data));
						}
					};
				}
				$(this).ajaxSubmit(options);
				return false;
			});
			$(document).on('click', '.page-toolbar a', function() {
				var pulp_code = $(this).attr('href').split('#p=')[1];
				loadHisData(pulp_code);
				//bsTips(pulp_code);
			});
			loadHisData();
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