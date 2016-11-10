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
		/**
		 * [loadHisData 载入历史数据]
		 * @return {[type]}        [无返回值]
		 */
		function loadHisData() {

			function getTDStr(data, i) {
				var str = '<tr>' +
					'	<td>' + i + '</td>';
				data.map(function(td) {
					str += '	<td>' + td + '</td>';
				});
				str += '</tr>';
				return str;
			}

			var objTbody = $('[name="fakeList"] tbody');
			var date = $("input[name='rec_date']").val();
			//载入历史数据
			//大张废原始数据查询
			// SELECT  a.CartNumber,  a.ProductType,  a.Date,  a.FakePiece,  a.HalfPiece,  a.NoNum,  b.FakeDesc,  a.Describe  FROM  FakePieceData a INNER JOIN  FakePieceDesc b on a.ProcID = b.id  where date = ? order by a.id desc
			date = date.replace(/-/g, '');
			var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=246&M=3&tstart=" + date;
			$.ajax({
					url: str,
				})
				.done(function(Data) {
					Data = handleAjaxData(Data);
					if (Data.rows === 0) {
						objTbody.html('<tr><td class="text-center" colspan=' + (Data.cols + 1) + '>指定时间内无数据</td></tr>');
						return;
					}
					var tBody = '';
					Data.data.map(function(data, i) {
						tBody += getTDStr(data, i + 1);
					});

					objTbody.html(tBody);
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
					store.state.params[2].show = true;
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
						show: false
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
					}]
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
						console.log(data);
					},
					reset: function() {
						var self = store.state.params;
						self.forEach(function(item, i) {
							self[i].data = '0';
						});
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
					}
				},
				mounted: function() {
					//数据有效性校验初始化
					handleValidate();
				}
			});
		}

		function initDOM() {

			$('.page-header .dropdown-quick-sidebar-toggler').hide();

			initVue();
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

		return {
			init: function() {
				handleDatePickers();
				initDOM();
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