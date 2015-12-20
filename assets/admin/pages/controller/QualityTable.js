$("#HideTips").on('click',
	function() {
		$(".note.note-success").addClass('hide');
	});
$("#SaveSettings").on('click',
	function() {
		SaveSettings();
	});

function SaveSettings() {
	//获取各控制值
	var RefreshTime = $("#RefreshTime").val(); //轮询时间
	var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') === true) ? 1 : 0;
	var FixTblHead = ($("#FixTblHead").bootstrapSwitch('state') === true) ? 1 : 0;
	var FixTblCol = ($("#FixTblCol").bootstrapSwitch('state') === true) ? 1 : 0;
	var FootSearch = ($("#FootSearch").bootstrapSwitch('state') === true) ? 1 : 0;
	var InputToggle = ($("#InputToggle").bootstrapSwitch('state') === true) ? 1 : 0;
	var InputInner = ($("#InputInner").bootstrapSwitch('state') === true) ? 1 : 0;
	var strUrl = getRootUrl('QualityTable') + "/SaveSettings";
	//infoTips(RefreshTime +AutoRefresh,0); 
	//获取各控制值完毕
	//向服务器请求数据
	$.post(strUrl, {
			RefreshTime: RefreshTime,
			AutoRefresh: AutoRefresh,
			FixTblHead: FixTblHead,
			FixTblCol: FixTblCol,
			FootSearch: FootSearch,
			InputToggle: InputToggle,
			InputInner: InputInner,
		},
		function(data, status) {
			if (status == "success") {
				var obj = jQuery.parseJSON(data);
				infoTips(obj.message, 1);
			} else {
				infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
			}
		}
	);
}

function ReadSettings() {
	var strUrl = getRootUrl('QualityTable') + "/ReadSettings";
	$.ajax({
		type: 'POST',
		async: false, //同步
		//async: true,
		url: strUrl,
		success: function(data) {
			var strJSON = jQuery.parseJSON(data);
			var obj = strJSON.data[0];
			//设置控件初始值
			$("#RefreshTime").val(obj.RefreshTime); //轮询时间
			if (obj.AutoRefresh === 0) $("#AutoRefresh").bootstrapSwitch('toggleState'); //如果需要关 
			if (obj.FixTblHead === 0) $("#FixTblHead").bootstrapSwitch('toggleState'); //如果需要关   
			if (obj.FixTblCol === 0) $("#FixTblCol").bootstrapSwitch('toggleState'); //如果需要关 
			if (obj.FootSearch === 0) $("#FootSearch").bootstrapSwitch('toggleState'); //如果需要关  
		}
	});
}

function GetJsonUrl() {
	//获取各控制值
	var TimeRange = $("#dashboard-report-range span").html();
	var TimeStart = TimeRange.split(' ~ ')[0];
	var TimeEnd = TimeRange.split(' ~ ')[1];
	var strUrl = getRootPath() + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=16&M=3&tstart=" + TimeStart + "&tend=" + TimeEnd + "&tstart2=" + TimeStart + "&tend2=" + TimeEnd + "&t=" + Math.random();
	return strUrl;
}



var dataTable = function() {
	function InitTable() {
		RefreshTable('#sample', GetJsonUrl());
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
		var strTR;
		for (var i = 0; i < Data.cols; i++) {
			strTR = '<td></td>';
			strRow += strTR;
		}
		strRow += '</tr>';
		strRow += '<tr role="row" class="even">';
		for (var i = 0; i < Data.cols; i++) {
			strTR = '<td></td>';
			strRow += strTR;
		}
		strRow += '</tr>';
		return strRow;
	}

	function initSettings(Data) {
		var initData;
		initData = {
			//"bDestroy":true,
			"bRetrieve": true,
			"language": {
				"url": getRootPath() + "/assets/admin/pages/controller/DataTableLanguage.json"
			},
			"order": [
				[1, 'asc']
			],
			"lengthMenu": [
				[5, 10, 15, 20, 50, 100, -1],
				[5, 10, 15, 20, 50, 100, "All"] // change per page values here
			],
			// set the initial value
			"pageLength": 15,
			//"dom": "<'clear'>R<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
			"dom": "<'row tbTools' <'col-md-6 col-sm-12 pull-right'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // datatable layout without  horizobtal scroll
			//dom: "flBrtip",
			buttons: [{
				extend: 'copyHtml5',
				exportOptions: {
					columns: ':visible'
				},
				text: '复制',
			}, {
				extend: 'excelHtml5',
				exportOptions: {
					columns: ':visible'
				}
			}, {
				extend: 'csvHtml5',
				exportOptions: {
					columns: ':visible'
				}
			}, {
				extend: 'pdfHtml5',
				orientation: Data.cols > 10 ? 'landscape' : 'portrit',
				pageSize: Data.cols > 10 ? 'A3' : 'A4', //LEGEAL
				message: Data.source + '\n©成都印钞有限公司 技术质量部',
				//download: 'open',
				title: Data.title,
				exportOptions: {
					columns: ':visible'
				}
				//Author:'成都印钞有限公司 技术质量部',
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
				autoPrint: false,
				text: '打印',
				message: Data.source + '<br>©成都印钞有限公司 技术质量部',
				title: Data.title,
				exportOptions: {
					columns: ':visible'
				}
			}, {
				extend: 'colvis',
				text: '隐藏数据列<i class="fa fa-angle-down"></i>',
				className: 'btn-fit-height green-haze dropdown-toggle'
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
			"aoColumns": Data.header,
			"data": Data.data,
			searchHighlight: true, //高亮
			colReorder: {
				realtime: true,
			},
			//scrollY:        '70vh',
			scroolY: '70v',
			scrollCollapse: true,
			"initComplete": function() {
				var api = this.api();
				api.$('td').click( function () {
					api.search( this.innerText ).draw();
				} );         

				//添加 footer search
				/* var footerHTML = '<tfoot class="hidden-sm hidden-xs"><tr>';
        for (var i = 0; i < Data.cols; i++) {
          footerHTML +='<th>'+Data.header[i].title+'</th>'};
        $('TABLE').append(footerHTML + '</tr></tfoot>');*/
				$('.tools').append($('.tabletools-btn-group').clone(true));
				$('.tbTools').remove();
				infoTips(JSON.stringify(Data), 2);
				/*
        api.columns().eq( 0 ).each( function ( colIdx ) {
            $( 'input', api.column( colIdx ).footer() ).on( 'keyup change', function () {
                api
                    .column( colIdx )
                    .search( this.value )
                    .draw();
            } );
        } );

        api.columns().indexes().flatten().each( function ( i ) {
           if (i == 1 || i == 3 ) 
           {
              var column = api.column( i );
              var select = $('<select class="form-control input-inline input-sm input-small"><option value=""></option></select>')
                  .appendTo( $(column.footer()).empty() )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );
                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );
              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' )
              } );
            };              
        } ); */
			}
		};
		return initData;
	}

	/*
	DataType:Array/Json.
	其中Json直接将URL传入值即可，但Model中查询代码不能为中文,视图中需要定义表头
*/

	function CreateTable(tableID, Data) {
		var table = $(tableID);
		var initData = initSettings(Data);
		//初始化表格
		oTable = table.dataTable(initData);
	}

	/*
	 *刷新数据，Array,Json两种方式，取决于表格初始化方式
	 */

	function RefreshTable(tableID, strUrl) {
		var table = $(tableID);
		//重新读取数据
		Data = ReadData(strUrl);
		//更新表格相关信息
		$('#TableTitle').text(Data.title);
		$('#datasource').text('(' + Data.source + ')');
		if (Data.cols < 2) {
			infoTips("请确保数据列在2列以上，当前为：" + Data.cols);
			return;
		}
		if (Data.rows > 0) {
			if (!$('#sample tbody').length) {
				CreateTable(tableID, Data);
				return;
			}
		} else {
			infoTips("该时间范围内无质量数据，请重新选择查询时间!", 1);
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
		infoTips(JSON.stringify(Data), 2);
	}

	return {
		//main function to initiate the module
		init: function() {
			$("button.applyBtn").live("click", function() {
				InitTable();
			});
			$("#Preview").on('click',
				function() {
					var strUrl = $('#PreviewUrl').val();
					//重新读取数据
					//Data = ReadData(strUrl);
					RefreshTable('#sample', strUrl);
				});
		}

	};
}();