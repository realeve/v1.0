 /*jshint multistr: true */
 //vuex全局状态
 var store;

 var manualFluorance = function() {

 	var handleDatePickers = function() {

 		$.fn.datepicker.dates["zh-CN"] = {
 			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
 			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
 			daysMin: ["日", "一", "二", "三", "四", "五", "六"],
 			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
 			monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
 			today: "今日",
 			clear: "清除",
 			format: "yyyy年mm月dd日",
 			titleFormat: "yyyy年mm月",
 			weekStart: 1
 		};

 		if (jQuery().datepicker) {

 			$('.date-picker').datepicker({
 				rtl: App.isRTL(),
 				orientation: "left",
 				autoclose: true,
 				format: 'yyyy-mm-dd',
 				language: 'zh-CN'
 			}).on('changeDate', function(ev) {
 				store.state.basic.rec_date.data = ev.date.toLocaleString().replace(/\/|年|月/g, '-').replace(/日/g, '').split(' ')[0];
 			});
 		}
 	};

 	function getSelectInfo() {
 		//读取印钞品种信息
 		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=35&M=3&t=1&cache=14400";

 		$.ajax({
 				url: str
 			})
 			.done(function(data) {
 				var Data = handleAjaxData(data);
 				Data.data.forEach(function(item) {
 					store.state.operatorList.push({
 						value: item[0],
 						name: item[1]
 					});
 				});

 				initSelect2();

 				//绑定选择事件
 				$('.select2').on('select2:select', function() {
 					store.state.user_id = $(this).val();
 				});

 			});
 	}

 	function loadHisData() {

 		var date = store.state.basic.rec_date.data.replace(/-/g, '');

		// 	SELECT DISTINCT
		// 	a.cartnumber,
		// 	CONVERT (VARCHAR, rec_date, 112) 记录日期,
		// 	a.gznumber,
		// 	a.monitor,
		// 	a.captain,
		// 	a.print_date
		// FROM
		// 	dbo.Print_ManualFluorance AS a
		// where CONVERT (VARCHAR(6), rec_date, 112) = CONVERT (VARCHAR(6), GETDATE(), 112)

 		date = date.replace(/-/g, '');
 		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=328&M=3&tstart=" + date + '&tend=' + date;
 		$.ajax({
 				url: str,
 			})
 			.done(function(Data) {
 				var data = handleAjaxData(Data);
 				store.state.tbl = data;
 			});
 	}

 	function loadCartInfo() {

 		var cart = store.state.basic.cartnumber.data.toUpperCase();
 		//载入车号信息
 		//SELECT 车号 "CartNumber",冠号 "CarNumber",字号 "GzNumber",工序 "ProcName",机长 "CaptainName",班组 "TeamName",班长 "MonitorName",to_char(开始时间,'YYYY-MM-DD hh:mm:ss') "StartDate" FROM CDYC_USER.VIEW_CARTFINDER a WHERE a.车号 = ? and a.工序='印码'
 		var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=328&M=0&cart=" + cart + "&cache=" + config.cache;
 		$.ajax({
 				url: str,
 			})
 			.done(function(Data) {

 				var data = handleAjaxData(Data);

 				if (data.rows == 0) {
 					bsTips('读取车号信息失败，请按F5刷新页面重试');
 					return;
 				}

 				var prodData = data.data[0];

 				store.state.basic.gznumber.data = prodData.CarNumber.trim() + prodData.GzNumber.trim();
 				store.state.basic.monitor.data = prodData.MonitorName;
 				store.state.basic.captain.data = prodData.CaptainName;
 				store.state.basic.print_date.data = prodData.StartDate;

 			}).error(function(e) {
 				infoTips('读取车号信息失败，请按F5刷新页面重试');
 				console.log(e);
 			});
 	}

 	function initVue() {

 		var myInput = {
 			template: '#my-input-template',
 			props: ['param', 'name']
 		};

 		var myTable = {
 			template: '#my-table-template',
 			props: ['tbl']
 		};

 		var codeNumList = ['332 | 333 | 665 | 666 | 999 | 000', '111 | 112 | 444 | 445 | 777 | 778'];

 		store = new Vuex.Store({
 			state: {
 				params: [{
 					name: '千位',
 					data: '0',
 					key: 'kilo',
 					type: 'number',
 					max: 9,
 					min: 0
 				}, {
 					name: '小号',
 					data: codeNumList[0],
 					key: 'codenum',
 					disabled: true
 				}, {
 					name: '质量情况正常',
 					data: '是',
 					key: 'desc'
 				}, {
 					name: '质量问题开位',
 					data: '无',
 					key: 'formatpos'
 				}, {
 					name: '质量问题类型',
 					data: '无',
 					key: 'type'
 				}, {
 					name: '备注',
 					data: '无',
 					key: 'remark'
 				}],
 				basic: {
 					cartnumber: {
 						name: '车号',
 						data: '',
 						hasError: false,
 						errinfo: '',
 						maxlength: 8
 					},
 					rec_date: {
 						name: '人工检测时间',
 						data: today(6),
 						class: "date-picker"
 					},
 					gznumber: {
 						name: '大万号',
 						data: '',
 						disabled: true
 					},
 					monitor: {
 						name: '班组',
 						data: '',
 						disabled: true
 					},
 					captain: {
 						name: '机长',
 						data: '',
 						disabled: true
 					},
 					print_date: {
 						name: '印码时间',
 						data: '',
 						class: "date-picker",
 						disabled: true
 					}
 				},
 				'user_id': '',
 				tbl: {
 					rows: 0
 				},
 				operatorList: [{
 					value: 0,
 					name: ''
 				}]
 			},
 			mutations: {
 				submit: function() {
 					if (handleValidate()) {
 						return;
 					}
 					var $state = store.state;
 					var data = {};
 					for (var key in $state.basic) {
 						data[key] = $state.basic[key].data;
 					}
 					$state.params.forEach(function(item) {
 						data[item.key] = item.data;
 					});
 					if (store.state.params[0].data < 9) {
 						store.state.params[0].data++;
 					} else {
 						store.state.params[0].data = 0;
 						store.state.basic.cartnumber.data = '';
 						store.commit('reset');
 					}
 					data.user_id = store.state.user_id;
 					data.cartnumber = data.cartnumber.toUpperCase();

 					insertData(data);
 					return;

 				},
 				reset: function() {
 					for (var key in store.state.basic) {
 						if (key != 'rec_date') {
 							store.state.basic[key].data = '';
 						}
 					}
 				},
 				loadHisData: function() {
 					loadHisData();
 				}
 			}
 		});

 		var basic = new Vue({
 			el: '#basic',
 			store: true,
 			components: {
 				'my-input': myInput
 			},
 			computed: {
 				basic: function() {
 					return store.state.basic;
 				},
 				cartnumber: function() {
 					return store.state.basic.cartnumber.data;
 				}
 			},
 			watch: {
 				cartnumber: function() {
 					if (handleValidate()) {
 						return;
 					}
 					loadCartInfo();
 				}
 			}
 		});

 		var report = new Vue({
 			el: '#report',
 			store: true,
 			data: {
 				portletName: '质量抽检情况'
 			},
 			components: {
 				'my-input': myInput
 			},
 			computed: {
 				params: function() {
 					return store.state.params;
 				},
 				kilo: function() {
 					return store.state.params[0].data;
 				},
 				operatorList: function() {
 					return store.state.operatorList;
 				}

 			},
 			watch: {
 				kilo: function(val) {
 					store.state.params[1].data = codeNumList[val % 2];
 				}
 			},
 			methods: {
 				submit: function() {
 					store.commit('submit');
 				},
 				reset: function() {
 					store.commit('reset');
 				},
 				loadHisData: function() {
 					store.commit('loadHisData');
 				}
 			},
 			mounted: function() {
 				getSelectInfo();
 			}
 		});

 		var table = new Vue({
 			el: '#sheet',
 			store: true,
 			components: {
 				'my-table': myTable
 			},
 			computed: {
 				tbl: function() {
 					return store.state.tbl;
 				}
 			}
 		});
 	}

 	var handleValidate = function() {
 		var cartnumber = store.state.basic.cartnumber;
 		if (cartnumber.data.length === 0) {
 			store.state.basic.cartnumber.hasError = true;
 			store.state.basic.cartnumber.errinfo = '车号为必填项';
 		} else if (judgeSearchType(cartnumber.data) != config.search.CART) {
 			store.state.basic.cartnumber.hasError = true;
 			store.state.basic.cartnumber.errinfo = '请输入正确的车号信息';
 		} else {
 			store.state.basic.cartnumber.hasError = false;
 			store.state.basic.cartnumber.errinfo = '';
 		}
 		return store.state.basic.cartnumber.hasError;
 	};

 	function insertData(data) {

 		var strUrl = getRootPath() + "/DataInterface/insert";

 		data.tbl = TBL.PRINT_MANUALFLUORANCE;

 		data.utf2gbk = ['remark', 'monitor', 'captain', 'desc', 'formatpos', 'type'];
 		data.rec_time = today(1);

 		var options = {
 			url: strUrl,
 			type: 'post',
 			resetForm: true,
 			data: data,
 			success: function(data) {
 				var obj = $.parseJSON(data);
 				bsTips(obj.message, obj.type);
 				loadHisData();
 			},
 			error: function(data) {
 				infoTips(JSON.stringify(data));
 			}
 		};

 		$.ajax(options);

 		return false;
 	}

 	return {
 		init: function() {
 			$('.page-header .dropdown-quick-sidebar-toggler').hide();
 			initVue();
 			handleDatePickers();
 		}
 	};
 }();

 jQuery(document).ready(function() {
 	manualFluorance.init();
 	initDom();
 });
 jQuery(window).resize(function() {
 	HeadFix();
 });