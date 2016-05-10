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


	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=24&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("prod_ID", Data);

		//1-物理站 2-化验站 3-外观指标
		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=25&M=3&t=2";
		Data = ReadData(str);
		InitSelect("oper_ID", Data);
		$("input[name='rec_date']").val(today(6));
		$("input[name='remark']").val('无');
		initSelect2();
		$('.page-header .dropdown-quick-sidebar-toggler').hide();
	}

	function vialidate() {
		if ($("input[name='Reel_Code']").val().length < 6 || $('select[name="oper_ID"]').val() == -1 || $('select[name="prod_ID"]').val() == -1) {
			//$('.portlet.light').hide();
			return true;
		}
		//$('.portlet.light').show();
		return false;
	}

	function refreshData() {
		//02A，隐藏部分选项
		var hideID = [3, 6, 7, 9, 10, 13, 14, 15, 16, 17];
		var hide07TID = [19, 20, 21];
		var prodType = $('select[name="prod_ID"]').find("option:selected").text();
		if (prodType === '103-G-7T') {
			hide07TID.map(function(val) {
				$('.normalPara input:nth(' + val + ')').parents('.form-group').show();
			});
			//help-block提示信息
			$('.normalPara input:nth(15)').parent().find('.help-block').text('安全线：开窗线≥3.6mm，全埋线≥1.3mm ');
			$('.normalPara input:nth(17)').parent().find('.help-block').text('≤3mm ');
		} else {
			$('.normalPara input:nth(15)').parent().find('.help-block').text('不得低于：宽线≥1.7mm，窄线≥1.2mm ');
			$('.normalPara input:nth(17)').parent().find('.help-block').text('≤2mm ');

			hide07TID.map(function(val) {
				$('.normalPara input:nth(' + val + ')').parents('.form-group').hide();
			});
			if (prodType === '103-G-2A') {
				hideID.map(function(val) {
					$('.normalPara input:nth(' + val + ')').parents('.form-group').hide();
				});
			} else {
				hideID.map(function(val) {
					$('.normalPara input:nth(' + val + ')').parents('.form-group').show();
				});
			}
		}
		$("input[name='remark']").val('无');
		$("input[name='rec_date']").val(today(6));
		//刷新右上角数据
		setRecordNum();
	}

	$('select[name="oper_ID"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
	});

	$('input[name="Reel_Code"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
	});

	$('input[name="Reel_Code"]').on('keyup', function() {
		var obj = $(this);
		//取右边一位信息
		var curVal = jsRight(obj.val(), 1);
		if (obj.val().length == 2) {
			SetSelect2Val('prod_ID', curVal);
		}
	});

	$('select[name="prod_ID"]').change(function() {
		if (vialidate()) {
			$('input[name="chk_ID"]').val('');
			$('.grey-cascade').html('');
			return;
		}
		refreshData();
	});

	function setRecordNum() {
		var startMonth = $("input[name='rec_date']").val();
		startMonth = startMonth.substr(0, 4) + startMonth.substr(5, 2);
		var prod = $('select[name="prod_ID"]').val();
		var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=27&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataPsc = ReadData(str);
		str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=28&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataSur = ReadData(str);
		$('.grey-cascade').html('物理指标得分：' + xround(DataPsc.data[0][0], 2) + '，外观指标得分：' + xround(DataSur.data[0][0], 2));
		var curScore = parseInt(DataSur.data[0][0], 10) + parseInt(DataPsc.data[0][0], 10) - 100;
		//刷新序号
		$('input[name="chk_ID"]').val(parseInt(DataSur.data[0][1], 10) + 1);
		//刷新得分
		$('.list-unstyled.amounts li:nth(0)').html('<h4><strong>当前得分:</strong> 100</h4>');
		$('.list-unstyled.amounts li:nth(1)').html('<strong>物理指标:</strong> ' + xround(DataPsc.data[0][0], 2));
		$('.list-unstyled.amounts li:nth(2)').html('<strong>外观指标:</strong> ' + xround(DataSur.data[0][0], 2));
		$('.list-unstyled.amounts li:nth(3)').html('<h4 class="font-grey-mint"><strong>当月总分:</strong> ' + xround(curScore, 2) + '</h4>');
	}

	//JS端  UTF-8  需要做2GBK操作
	//SELECT  COLLATIONPROPERTY('Chinese_PRC_Stroke_CI_AI_KS_WS', 'CodePage')

	function getFormData() {
		var surData = {
			'tbl': TBL.SURFACE,
			'score': parseFloat($('.list-unstyled.amounts li:nth(0)').text().replace('当前得分:', '')),
			'chk_ID': $('input[name="chk_ID"]').val(),
			'reel_code': $("input[name='Reel_Code']").val(),
			'prod_ID': $('select[name="prod_ID"]').val(),
			'oper_ID': $('select[name="oper_ID"]').val(),
			'rec_date': $("input[name='rec_date']").val(),
			'remark': $("input[name='remark']").val(),
			'utf2gbk': ['remark'],
			'record_Time': today(1)
		};
		//surData.remark = UTF2GBK(surData.remark);
		var keyList = [
			'size',
			'founder_degree',
			'watermark',
			'white_watermark',
			'watermark_size',
			'white_watermark_size',
			'watermark_clarity',
			'white_watermark_clarity',
			'watermark_consistency',
			'white_watermark_consistency',
			'white_watermark_tile',
			'paper_evenness',
			'cleanliness',
			'open_window',
			'line_bare',
			'line_thick',
			'line_break',
			'anti_fake',
			'thick_line_stretch',
			'wide_line_pos',
			'k_format',
			'commence',
			'other'
		];
		var checkStr = JSON.stringify(surData);
		checkStr = checkStr.replace('}', '');
		var curVal;
		$('.normalPara input').map(function(elem) {
			curVal = $(this).val();
			if (curVal === '') {
				curVal = 0;
			}
			checkStr = checkStr + ',"' + keyList[elem] + '":' + curVal;
		});
		checkStr += '}';
		return $.parseJSON(checkStr);
	}

	$('button[type="reset"]').on('click', function() {
		$('.normalPara input').val('');
		//SetSelect2Val('oper_ID',-1);
		//SetSelect2Val('prod_ID',-1);
		//$('.portlet.light').hide();
		$("input[name='remark']").val('无');
		setRecordNum();
		$("input[name='rec_date']").val(today(6));
	});

	function insertData() {
		//var strUrl = getRootUrl('PaperPara') + 'insert';
		var strUrl = getRootPath() + "/DataInterface/insert";
		var options = {
			url: strUrl,
			type: 'post',
			resetForm: true,
			data: getFormData(),
			success: function(data) {
				var obj = $.parseJSON(data);
				infoTips(obj.message, obj.type);
				//重置数据
				$('button[type="reset"]').click();
			},
			error: function(data) {
				infoTips(JSON.stringify(data));
			}
		};
		$(this).ajaxSubmit(options);
		return false;
	}
	return {
		init: function() {
			//$('.portlet.light').hide();
			handleDatePickers();
			initDOM();
			iChechBoxInit();
			setRecordNum();
			$('.modal-footer .green').on('click', function() {
				insertData();
			});

			$('a[name="submit"]').on('click', function() {
				var score = parseFloat($('.list-unstyled.amounts li:nth(3)').text().replace('当月总分:', ''));
				if (score >= 95) {
					insertData();
				} else {
					bsTips('当月评价总分将低于95分，请检查后重试');
				}
			});

			$('.normalPara input').on('change', function() {
				var surScore = parseFloat($('.list-unstyled.amounts li:nth(2)').text().replace('外观指标:', ''));
				var pscScore = parseFloat($('.list-unstyled.amounts li:nth(1)').text().replace('物理指标:', ''));
				var curScore = 100,
					totalScore, id;
				var prodType = $('select[name="prod_ID"]').find("option:selected").text();
				//分数表
				var detailScore = (prodType === '103-G-7T') ? [0.5, 0.5, 3, 3, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.5, 0.5, 0.5, 0.5, 3, 3, 1, 3, 2, 2, 0.5, 0.75] : [0.5, 0.5, 3, 3, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.5, 0.5, 0.5, 0.5, 3, 3, 0.5, 0, 0, 0, 1, 1];
				//分数动态更新
				$('.normalPara input').map(function(index, elem) {
					id = parseInt($(this).attr('name').replace('checkbox', ''), 10) - 1;
					curScore -= $(this).val() * detailScore[id];
				});

				//获取当月数据条数
				var num = $('input[name="chk_ID"]').val() - 1;
				if (num === 0) {
					surScore = curScore;
				} else {
					var HisSurScore = surScore * num;
					surScore = (curScore + HisSurScore) / (num + 1);
				}
				totalScore = pscScore + surScore - 100;
				$('.list-unstyled.amounts li:nth(2)').html('<strong>外观指标:</strong> ' + xround(surScore, 2));
				$('.list-unstyled.amounts li:nth(0) h4').html('<strong>当前得分:</strong> ' + xround(curScore, 2));
				$('.list-unstyled.amounts li:nth(3)').html('<h4 class="font-green"><strong>当月总分:</strong> ' + xround(totalScore, 2) + '</h4>');
				if (totalScore < 95) {
					$('a[name="submit"]').attr('href', '#info');
				} else {
					$('a[name="submit"]').attr('href', '');
				}
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