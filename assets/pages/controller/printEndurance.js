	//vuex全局状态
	var store;

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

		function loadHisData() {

			var date = store.state.basic.rec_date.replace(/-/g, '');

			//耐性指标原始数据
			//SELECT a.冠字, a.品种, a.检测日期, a.备注, a.耐干皱折正, a.耐干皱折背, a.耐干皱折OVMI, a.耐机洗正, a.耐机洗背 FROM dbo.view_print_endurance AS a where a.检测日期 BETWEEN ? and ? order by 记录时间 desc
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

		function getSelectInfo() {
			//读取印钞品种信息
			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=35&M=3&t=1&cache=14400";

			$.ajax({
					url: str
				})
				.done(function(data) {
					var Data = handleAjaxData(data);
					Data.data.forEach(function(item) {
						store.state.prodList.push({
							value: item[0],
							name: item[1]
						});
					});

					initSelect2();

					//绑定选择事件
					$('.select2').on('select2:select', function() {
						handleParamsByProdid($(this).val());
					});

				});
		}

		//切换不同的输入框
		function handleParamsByProdid(id) {
			//数据绑定
			store.state.basic.prod_id = id;

			store.state.params.forEach(function(item, i) {
				store.state.params[i].data = '0';
			});

			switch (id) {
				case '2':
					store.state.params[1].show = false;
					store.state.params[2].show = false;
					store.state.params[4].show = false;
					break;
				case '3':
				case '4':
				case '6':
				case '7':
					store.state.params[1].show = true;
					store.state.params[2].show = false;
					store.state.params[4].show = true;
					break;
				case '8':
					store.state.params[1].show = true;
					store.state.params[2].show = true;
					store.state.params[4].show = true;
					break;
			}
		}


		function initVue() {
			store = new Vuex.Store({
				state: {
					params: [{
						name: '耐干皱折(正面)',
						data: '0',
						key: 'anti_CreaseF',
						show: true
					}, {
						name: '耐干皱折(反面)',
						data: '0',
						key: 'anti_CreaseB',
						show: true
					}, {
						name: '耐干皱折(OVMI)',
						data: '0',
						key: 'anti_CreaseOVMI',
						show: true
					}, {
						name: '机洗(正)',
						data: '0',
						key: 'washF',
						show: true
					}, {
						name: '机洗(背)',
						data: '0',
						key: 'washB',
						show: true
					}],
					basic: {
						remark: '无',
						prod_id: '0',
						rec_date: today(6),
						gznumber: ''
					},
					prodList: [{
						value: 0,
						name: ''
					}],
					tbl: {
						rows: 0
					}
				},
				mutations: {
					submit: function() {
						var $state = store.state;
						var data = {};
						for (var key in $state.basic) {
							data[key] = $state.basic[key];
						}
						$state.params.forEach(function(item) {
							data[item.key] = item.data;
						});
						insertData(data);
					},
					reset: function() {
						var self = store.state.params;
						self.forEach(function(item, i) {
							self[i].data = '0';
						});
					},
					loadHisData: function() {
						loadHisData();
					}
				}
			});

			var basic = new Vue({
				el: '#basic',
				store: true,
				computed: {
					basic: function() {
						return store.state.basic;
					},
					prodList: function() {
						return store.state.prodList;
					}
				},
				mounted: function() {
					getSelectInfo();
				}
			});

			var report = new Vue({
				el: '#report',
				store: true,
				data: {
					portletName: '耐性检测结果'
				},
				computed: {
					params: function() {
						return store.state.params;
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
					//数据有效性校验初始化
					handleValidate();
				}
			});

			var table = new Vue({
				el: '#sheet',
				store: true,
				computed: {
					tbl: function() {
						return store.state.tbl;
					}
				}
			});
		}

		var handleValidate = function() {
			jQuery.validator.addMethod("gznumber", function(value, element) {
				var num = /^[A-Za-z]{2}$|^[A-Za-z]\*[A-Za-z]$|^[A-Za-z]\*\*[A-Za-z]$/;
				return this.optional(element) || (num.test(value));
			}, "请检查冠字信息是否正确");

			$("#gznumber").maxlength({
				limitReachedClass: "label label-danger",
				threshold: 4
			});

			var vRules = {
				gznumber: {
					gznumber: true,
					required: true
				},
				anti_CreaseF: {
					number: true
				},
				anti_CreaseB: {
					number: true
				},
				anti_CreaseOVMI: {
					number: true
				},
				washF: {
					number: true
				},
				washB: {
					number: true
				}
			};

			$('form[name=theForm]').validate({
				errorElement: 'span', //default input error message container
				errorClass: 'help-block', // default input error message class
				focusInvalid: true, // do not focus the last invalid input
				rules: vRules,
				messages: {
					gznumber: {
						required: "冠字信息不能为空."
					}
				},
				highlight: function(element) { // hightlight error inputs
					$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
				},
				success: function(label) {
					label.closest('.form-group').removeClass('has-error');
					label.remove();
				}
			});
		};

		function insertData(data) {

			var strUrl = getRootPath() + "/DataInterface/insert";

			data.tbl = TBL.PRINT_ENDURANCE;
			data.utf2gbk = ['remark'];
			data.rec_time = today(1);

			var options = {
				url: strUrl,
				type: 'post',
				resetForm: true,
				data: data,
				success: function(data) {
					var obj = $.parseJSON(data);
					bsTips(obj.message, obj.type);

					store.commit('reset');

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
				handleDatePickers();

				$('.page-header .dropdown-quick-sidebar-toggler').hide();

				initVue();
			}
		};
	}();

	jQuery(document).ready(function() {
		FakePiece.init();
		initDom();
	});
	jQuery(window).resize(function() {
		HeadFix();
	});