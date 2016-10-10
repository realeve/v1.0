// var anonymous = (function() {
// 	$('body').addClass('page-full-width');
// 	$('body .page-logo').width(100);
// 	$('body .sidebar-toggler').hide();
// })();

var ec = [];
var search = function() {

	//全局车号信息
	var reelNo;
	//page-full-width;
	function queryData(updateHisInfo) {
		//匹配查询类型
		var queryType = judgeSearchType(reelNo);
		switch (queryType) {
			case config.search.CART:
			case config.search.GZ:
			case config.search.CODE:
				window.location.href = '/search/#' + reelNo;
				break;
			case config.search.REEL:
				getReelInfo();
				break;
			default:
				infoTips('请输入正确的轴号信息');
				break;
		}
	}

	var handleImgVerifyInfo = function(reelNo) {

		var objDom = $('[name="imgVerifyInfo"]');
		tpl.renderTable(objDom, 292, reelNo);
	};

	//机检信息
	var getInspecInfo = function() {
		//295
		//SELECT a.[轴号], convert(varchar,a.[开始时间],120) 开始时间, convert(varchar,a.[结束时间],120) 结束时间, a.[产品名称], a.[机台], a.[机型], a.[班组], a.[纸张总数], a.[好纸总数], a.[好品率], a.[一般废张数], a.[严重废张数], a.[错误纸张总数], a.[落仓反馈总数] FROM dbo.view_paper_quality AS a where 轴号 =? order by 2
		//reel

		var objDom = $('#inspect');
		var id = 295;
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&reel=" + reelNo + encodeURI('%') + '&cache=' + config.cache;
		tpl.renderTable(objDom, url, [{
			start: 0,
			end: 14,
			direction: 'hor'
		}]);
	};

	function setStandColor(data) {
		var pscInfo = data.data[0];
		var color = {
			L: parseFloat(pscInfo[37]),
			a: parseFloat(pscInfo[38]),
			b: parseFloat(pscInfo[39])
		};

		var rgb = Lab2RGB(color);

		function componentToHex(c) {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		var hex = rgbToHex(rgb.r, rgb.g, rgb.b);

		$('#lab').css('background', hex);
		$('#labinfo p').text(color.L.toFixed(0) + ' / ' + color.a.toFixed(0) + ' / ' + color.b.toFixed(0));
		$('#labinfo h3').text('纸张色彩样');
		//$('#labinfo p').text('rgb(' + rgb.r + "," + rgb.g + ',' + rgb.b + ')');
	}

	//物理站
	var getPscStationInfo = function() {
		//296
		//物理站信息
		//SELECT top 1 a.[轴号], a.[机台], a.[检测日期], a.[得分], a.[合格], a.[备注], a.[检测人员], a.[品种], a.[班次], a.[温度], a.[湿度], a.[定量], a.[厚度], a.[横幅厚度差], a.[拉力纵], a.[拉力横], a.[拉力湿], a.[平均裂断长], a.[湿强度], a.[平均耐折度], a.[白度], a.[不透明度], a.[水分], a.[水分差], a.[尘埃个数], a.[平均平滑度], a.[湿变形纵], a.[湿变形横], a.[挺度纵], a.[挺度横], a.[纵向撕裂度], a.[透气度], a.[揉后透气度正], a.[揉后透气度反], a.[干耐揉], a.TZ12, a.TZ2, a.L, a.a, a.b FROM dbo.view_paper_psc AS a where 轴号 <= ? ORDER BY 轴号 desc


		var objDom = $('#psc');
		var id = 296;
		//此处轴号需要去掉字母
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&reel=" + reelNo.replace(/[A-Z]/g, '') + encodeURI('%') + '&cache=' + config.cache;
		tpl.renderTable(objDom, url, [{
			dom: $('#psc1'),
			start: 0,
			end: 10,
			title: '综述',
			showHead: true,
			direction: 'ver'
		}, {
			dom: $('#psc2'),
			start: 11,
			end: 20,
			title: '指标详情',
			showHead: true,
			direction: 'ver'
		}, {
			dom: $('#psc3'),
			start: 21,
			end: 30,
			title: '指标详情',
			showHead: true,
			direction: 'ver'
		}, {
			dom: $('#psc4'),
			start: 31,
			end: 40,
			title: '指标详情',
			showHead: true,
			direction: 'ver'
		}], setStandColor);

	};

	//非常规指标
	var getAbnormalPscInfo = function() {

	};

	//外观指标
	var getSurfaceInfo = function() {

		var objDom = $('#surface');
		var id = 297;
		//物理外观指标
		//reel
		//SELECT top 1 a.[轴号], a.[品种], a.[得分], a.[记录人], a.[记录日期], a.[纸张匀度], a.[纸面整洁度], a.[水印位置偏差], a.[白水印位置偏差], a.[尺寸], a.[方正度], a.[水印], a.[白水印], a.[水印清晰度], a.[白水印清晰度], a.[水印一致性], a.[白水印一致性], a.[白水印偏斜], a.[开窗尺寸偏差], a.[安全线露线], a.[细线], a.[残缺], a.[防伪层脱落], a.[全埋线拉伸], a.[开窗线位置], a.[小开版式], a.[纸张完好度], a.[其它] FROM dbo.view_paper_surface AS a where 轴号 <= ? order by 轴号 desc
		//此处轴号需要去掉字母
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&reel=" + reelNo.replace(/[A-Z]/g, '') + encodeURI('%') + '&cache=' + config.cache;
		var title = '<span>外观指标</span><small class="help">打勾为扣分项</small>';
		tpl.renderTable(objDom, url, [{
			dom: $('#surface1'),
			start: 0,
			end: 14,
			title: title,
			showHead: true,
			direction: 'ver'
		}, {
			dom: $('#surface2'),
			start: 15,
			end: 28,
			title: title,
			showHead: true,
			direction: 'ver'
		}]);
	};

	var getValidateInfo = function() {
		//人工校验信息
		//298
		//reel
		//SELECT a.[轴号], a.[机台], a.[品种], a.[记录人], a.[记录日期], a.[封包重量], a.[裁切重量], a.[严重废], a.[大错], a.[中错], a.[小错], a.[轴头轴尾], a.[怀疑纸], a.[全好品], a.[其它], a.[是否放行] FROM dbo.view_paper_validate AS a where a.轴号 like ?
		var objDom = $('#validate');
		var id = 298;
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&reel=" + reelNo.replace(/[A-Z]/g, '') + encodeURI('%') + '&cache=' + config.cache;
		tpl.renderTable(objDom, url, [{
			start: 0,
			end: 16,
			direction: 'hor'
		}]);

	};

	// var getAssayInfo = function() {

	// };

	var getBatchWasteInfo = function() {
		//批量报废信息
		//299
		//reel,prod
		//SELECT top 1 a.reel_code AS [轴号], c.ProductName AS [品种], b.Machine_Name AS [机台], a.fake_reason AS [报废原因], a.fake_num AS [报废令数], a.remark AS [备注], convert(varchar(10),a.rec_date,120) AS [记录日期] FROM [dbo].[Paper_Batch_Waste] a INNER JOIN Paper_Machine_Info b on a.machine_id=b.Machine_ID inner JOIN Paper_ProductData c on a.prod_id = c.ProductID where reel_code <=? and a.prod_id = ? ORDER BY reel_code desc
		var objDom = $('#batchWaste');
		var id = 299;
		var prod = reelNo.substring(2, 1);
		var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&reel=" + reelNo.replace(/[A-Z]/g, '') + '&prod=' + prod + '&cache=' + config.cache;
		tpl.renderTable(objDom, url, [{
			start: 0,
			end: 16,
			direction: 'hor'
		}]);
	};

	//质量信息
	var getReelInfo = function() {

		//机检信息
		getInspecInfo();

		//物理站
		getPscStationInfo();

		//非常规指标
		//getAbnormalPscInfo();

		//外观指标
		getSurfaceInfo();

		//人工校验信息
		getValidateInfo();

		//化验站
		//getAssayInfo();

		//批量报废
		getBatchWasteInfo();
	};


	$('.theme-colors > li', '.theme-panel').click(function() {
		queryString.prod = $(this).find('span').last().text();
		$('ul > li', '.theme-panel').removeClass("active");
		$(this).addClass("active");
	});

	$('input[name="reelNo"]').on('keydown', function(event) {
		if (event.keyCode === 13) {
			reelNo = $(this).val();
			location.hash = reelNo;
			$(this).val('');
		}
	});

	//modern browsers
	$(window).bind('hashchange', function() {
		reelNo = window.location.hash.replace('#', '');
		queryData();
	});

	return {
		//main function to initiate the module
		init: function() {
			//$(".page-sidebar-wrapper").css("margin-top", "0px");
			hideSidebarTool();

			var tplList = [
				'simpleTable.etpl',
				'search/screenQuality.etpl'
			];

			tpl.init(tplList, function() {
				reelNo = window.location.hash.replace('#', '');
				if (reelNo !== '') {
					queryData();
				}
			});
		}
	};
}();

//记录选择状态
jQuery(document).ready(function() {
	//RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	search.init();
	bsTips('点击本页面工序名称将自动折叠面板');
});

jQuery(window).resize(function() {
	//ec[0].resize();
});