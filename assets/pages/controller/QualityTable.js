$("#HideTips").on('click', function() {
	$(this).parent().hide();
});

function GetJsonUrl(id) {
	//获取各控制值
	var date = getDateRange();
	var str = window.location.href.split('?')[1].split('&');
	var strLimit = "";
	str.map(function(index, elem) {
		if (jsLeft(index, 4) !== "tid=") {
			strLimit += '&' + index;
		}
	});
	var token = getUrlParam('token');
	if (token == null) {
		token = config.TOKEN;
	}
	var strUrl = getRootPath() + "/DataInterface/Api?Token=" + token + "&ID=" + id + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&tstart3=" + date.start + "&tend3=" + date.end + "&tstart4=" + date.start + "&tend4=" + date.end + strLimit + "&t=" + Math.random();
	return strUrl;
}

var dataTable = function() {
	/**
	 * [InitTable 表格初始化]
	 * @param {[整型]} initDiv [是否需要初始化Table所在DIV]
	 */

	function InitTable(initDiv) {
		var url;
		//debug参数为1 或者未设置tid参数时
		if (App.getURLParameter('debug') == 1 || App.getURLParameter('tid') === null) {
			$('#Preview').show();
			url = $('#Preview input').val();
			RefreshTable('[name="sampleTable"]', url);
		} else {
			//ID列表，以逗号分开
			var objList = {
				"id": getUrlParam('tid').split(','),
				"fixheader": (getUrlParam('fixheader') === null) ? ['1'] : getUrlParam('fixheader').split(',')
			};
			var len = objList.id.length;
			var i;
			if (len > 1 && initDiv) {
				var obj = $('[name="sampleTable"]').parents('.portlet:nth(0)');
				for (i = 0; i < len - 1; i++) {
					obj.parent().append(obj.clone());
				}
			}

			for (i = 0; i < len; i++) {
				objRequest = {
					"url": GetJsonUrl(objList.id[i]),
					"fixheader": (handleParam(objList.fixheader, i, "1") == "1") ? true : false
				};
				if (objRequest.fixheader == '0') {
					$('[name="sampleTable"]:eq(' + i + ')').removeClass('table-header-fixed').addClass('dt-responsive');
				}

				RefreshTable('[name="sampleTable"]:eq(' + i + ')', objRequest.url, objRequest.fixheader);
			}
		}
	}
	var oTable;
	//生成表格头

	function CreateTableHead(Data) {
		var strHead = '<tr role="row">';
		var iWidth = 100 / Data.cols;
		var strThstart;
		for (var i = 0; i < Data.cols; i++) {
			if (i == 1) {
				strThstart = '<th data-column-index="' + i + '" class="sorting_asc" tabindex="0" aria-controls="sample" rowspan="1" colspan="1" aria-label="' + Data.header[i].title + ': 以降序排列此列" style="width: ' + iWidth + '%">';
			} else {
				strThstart = '<th data-column-index="' + i + '" class="sorting" tabindex="0" aria-controls="sample" rowspan="1" colspan="1" aria-label="' + Data.header[i].title + ': 以升序排列此列" style="width: ' + iWidth + '%">';
			}

			var strTR = strThstart + Data.header[i].title + '</th>';
			strHead += strTR;
		}
		strHead += '</tr>';
		return strHead;
	}
	//生成表格体

	function CreateTableBody(Data) {
		var strRow = '<tr role="row" class="odd">';
		var strTR, i;
		for (i = 0; i < Data.cols; i++) {
			strTR = '<td></td>';
			strRow += strTR;
		}
		strRow += '</tr>';
		strRow += '<tr role="row" class="even">';
		for (i = 0; i < Data.cols; i++) {
			strTR = '<td></td>';
			strRow += strTR;
		}
		strRow += '</tr>';
		return strRow;
	}

	function initSettings(tableID, Data, bFixhead) {
		var initData;
		var date = getDateRange();
		/*var idxColumn = [{
			title: '序号'
		}];
		var convData = [];
		Data.data.map(function(data) {
			convData.push([''].concat(data));
		});*/
		var idList = getUrlParam('tid').split(',');

		initData = {
			//"bDestroy":true,
			"bRetrieve": true,
			"language": {
				"url": getRootPath() + "/assets/pages/controller/DataTableLanguage.min.json"
			},
			/*"order": [
				[1, 'asc']
			],*/
			"lengthMenu": [
				[5, 10, 15, 20, 50, 100, -1],
				[5, 10, 15, 20, 50, 100, "所有"] // change per page values here
			],
			// set the initial value
			"pageLength": 15,
			"dom": (bFixhead) ? "<'row tbTools' <'col-md-6 col-sm-12 pull-right'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>" : "<'clear'>R<'row tbTools' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
			//"dom": "<'row tbTools' <'col-md-6 col-sm-12 pull-right'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // datatable layout without  horizobtal scroll
			//dom: "flBrtip",
			buttons: [{
				extend: 'share',
				autoPrint: false,
				text: '分享',
				message: '统计时间:' + date.start + '~' + date.end + '<br>' + Data.source + '<br>©成都印钞有限公司 技术质量部',
				title: Data.title,
				exportOptions: {
					columns: ':visible'
				},
				className: "btn blue sbold btn-outline"
			}, {
				extend: 'copyHtml5',
				exportOptions: {
					columns: ':visible'
				},
				text: '复制',
				className: "btn red sbold btn-outline"
			}, {
				extend: 'excelHtml5',
				className: "btn yellow sbold btn-outline ",
				exportOptions: {
					columns: ':visible'
				},
				filename: Data.title + '(' + date.start + ' - ' + date.end + ')'
			}, {
				extend: 'csvHtml5',
				className: "btn purple sbold btn-outline ",
				exportOptions: {
					columns: ':visible'
				},
				filename: Data.title + '(' + date.start + ' - ' + date.end + ')'
			}, {
				extend: 'pdfHtml5',
				orientation: Data.cols > 10 ? 'landscape' : 'portrit',
				pageSize: Data.cols > 10 ? 'A3' : 'A4', //LEGEAL
				message: '统计时间:' + date.start + ' ~ ' + date.end + '\n' + Data.source + '\n©成都印钞有限公司 技术质量部',
				download: 'download',
				title: Data.title,
				exportOptions: {
					columns: ':visible'
				},
				className: "btn dark sbold btn-outline",
				filename: Data.title + '(' + date.start + ' - ' + date.end + ')'
					//Token:'成都印钞有限公司 技术质量部',
					/* customize: function ( doc ) {
						doc.content.unshift( {
							text: ' ©成都印钞有限公司 技术质量部',
							style: {
								alignment: 'left',
								fontSize: 10
							},
							//margin: [ 0, 0, 0, 12 ]
						} );
					}*/
			}, {
				extend: 'print',
				autoPrint: true,
				text: '打印',
				message: '统计时间:' + date.start + '~' + date.end + '<br>' + Data.source + '<br>©成都印钞有限公司 技术质量部',
				title: Data.title,
				exportOptions: {
					columns: ':visible'
				},
				className: "btn grey-mint sbold btn-outline"
			}, {
				extend: 'colvis',
				text: '隐藏数据列<i class="fa fa-angle-down"></i>',
				className: "btn green-haze sbold btn-outline",
				//className: 'btn-fit-height green-haze dropdown-toggle'
			}],
			"bDeferRender": true,
			"bProcessing": true,
			"bStateSave": true,
			"bserverSide": false,
			"bInfo": true,
			"bAutoWidth": true,
			"bSortClasses": false,
			//任意字段
			"bScrollInfinite": true,
			"aoColumns": Data.header, //idxColumn.concat(Data.header),
			"data": Data.data, //convData,
			/*"columnDefs": [{
				"searchable": false,
				"orderable": false,
				"targets": 0
			}],*/
			searchHighlight: true, //高亮
			colReorder: {
				realtime: true,
			},
			/*fixedHeader: {
				header: true,
				footer: true,
				headerOffset: Data.fixedHeaderOffset,
			},*/
			scroolY: '70v',
			scrollCollapse: true,
			iStateDuration: 60 * 60 * 24 * 7, //状态默认保存一周
			"fnStateSaveCallback": function(settings, data) {
				var apiID = idList[settings.sInstance.replace('DataTables_Table_', '')];
				try {
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
						'DataTables' + location.pathname + '/' + apiID,
						JSON.stringify(data)
					);
				} catch (e) {}
			},
			"fnStateLoadCallback": function(settings) {
				var apiID = idList[settings.sInstance.replace('DataTables_Table_', '')];
				try {
					return JSON.parse(
						(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
							'DataTables' + location.pathname + '/' + apiID
						)
					);
				} catch (e) {}
			},
			"initComplete": function(settings) {
				var api = this.api();
				api.on("click", 'tbody td', function() {
					api.search(this.innerText.trim()).draw();
				});
				$(tableID).parents('.portlet').find('.tools').append($(tableID).parents('.portlet').find('.tabletools-btn-group').clone(true));
				$(tableID).parents('.portlet').find('.tbTools').remove();

				/*api.on('order.dt search.dt', function() {
					api.column(0, {
						"search": 'applied',
						"order": 'applied'
					}).nodes().each(function(cell, i) {
						cell.innerHTML = i + 1;
					});
					console.log(api.column(2, {
						"search": 'applied',
						"order": 'applied'
					}).nodes());
				}).draw();*/

				var rowData = api.row(0).data();
				var apiID = idList[settings.sInstance.replace('DataTables_Table_', '')];
				var oSettings = $.parseJSON(localStorage.getItem('DataTables/qualitytable/' + apiID));

				api.columns().indexes().flatten().each(function(i) {
					var column = api.column(i);
					if (!isNaN(rowData[i])) {
						return;
					}
					var strSelect = $(tableID).find('thead th[data-column-index="' + i + '"]').text();
					var select = $('<select class="select2"><option value="">所有' + strSelect + '</option></select>')
						.appendTo($(column.footer()).empty())
						.on('change', function() {
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
							column
								.search(val ? '^' + val.replace('\\', '') + '$' : '', true, false)
								.draw();
						});

					column.data().unique().sort().each(function(d, j) {
						select.append('<option value="' + d + '">' + d + '</option>')
					});

					var searchStr = oSettings.columns[oSettings.ColReorder[i]].search.search;
					if (searchStr.length) {
						searchStr = searchStr.substring(1, searchStr.length - 1).replace('\\', '');
						select.val(searchStr);
					}
				});

				initSelect2();
				//bsTips(JSON.stringify(Data), 2);
				bsTips('数据加载完成', 2);
			}
		};
		if (bFixhead) {
			initData.fixedHeader = {
				header: true,
				footer: true,
				headerOffset: Data.fixedHeaderOffset,
			};
		}

		return initData;
	}

	/*
	DataType:Array/Json.
	其中Json直接将URL传入值即可，但Model中查询代码不能为中文,视图中需要定义表头
*/

	function CreateTable(tableID, Data, bFixhead) {
		var table = $(tableID);
		var fixedHeaderOffset = 0;
		if (App.getViewPort().width < App.getResponsiveBreakpoint('md')) {
			if ($('.page-header').hasClass('page-header-fixed-mobile')) {
				fixedHeaderOffset = $('.page-header').outerHeight(true);
			}
		} else if ($('.page-header').hasClass('navbar-fixed-top')) {
			fixedHeaderOffset = $('.page-header').outerHeight(true);
		}
		Data.fixedHeaderOffset = fixedHeaderOffset;
		var initData = initSettings(tableID, Data, bFixhead);

		var strFoot = '';
		Data.header.map(function(footTD) {
			strFoot += '<td>' /*+ footTD.title*/ + '</td>';
		});
		table.find('tfoot tr').html(strFoot);

		//初始化表格
		oTable = table.dataTable(initData);
	}

	/*
	 *刷新数据，Array,Json两种方式，取决于表格初始化方式
	 */

	function RefreshTable(tableID, strUrl, bFixhead) {
		var table = $(tableID);
		if (typeof bFixhead == 'undefined') {
			bFixhead = true;
		}
		//重新读取数据
		Data = ReadData(strUrl, 1);
		//更新表格相关信息
		table.parents('.portlet').find('[name="TableTitle"]').text(Data.title);
		table.parents('.portlet').find('[name="datasource"]').text('(' + Data.source + ')');

		//$('.page-title [name="TableTitle"]').text(Data.title);
		//$('#today').text(Data.source);

		if (Data.cols < 2) {
			bsTips("请确保数据列在2列以上，当前为：" + Data.cols);
			return;
		}
		if (Data.rows > 0) {
			if (!table.find('tbody').length) {
				CreateTable(tableID, Data, bFixhead);
				return;
			}
		} else {
			bsTips("该时间范围内无质量数据，请重新选择查询时间!", 1);
			return;
		}
		oTable = table.dataTable();
		oTable.fnClearTable(this);
		var oSettings = oTable.fnSettings();
		//刷新列，列顺序可能被拖动
		for (var i = 0; i < Data.rows; i++) {
			oTable.oApi._fnAddData(oSettings, Data.data[i]);
		}
		oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

		oTable.fnDraw();
		//bsTips(JSON.stringify(Data), 2);
	}

	return {
		//main function to initiate the module
		init: function() {
			$(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
				InitTable(0);
			});

			//载入数据
			if (getUrlParam('tid') !== null) {
				InitTable(1);
			}

			$("#Preview .btn").on('click', function() {
				RefreshTable('[name="sampleTable"]', $('#Preview input').val());
			});
		}

	};
}();
//记录选择状态
jQuery(document).ready(function() {
	RoundedTheme(0);
	UIIdleTimeout.init();
	initDashboardDaterange('YYYYMMDD');
	initDom();
	hideSidebarTool();
	//修复顶部style="margin-top:-43px;"
	//系统主题设置
	//ReadSettings();
	dataTable.init();
	//初始化表格
	var clipboard = new Clipboard('#share button');
	if (App.getURLParameter('debug') == 1 || App.getURLParameter('tid') === null) {
		$('#Preview').show();
	} else {
		$('#Preview').hide();
	}

	//ChangeMainTheme(1);
});
jQuery(window).resize(function() {
	HeadFix();
});