   $("#HideTips").on('click',function() {
     $(".note.note-success").hide();
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
         if (obj.AutoRefresh === 0) $("#AutoRefresh").bootstrapSwitch('toggleState');
         if (obj.FixTblHead === 0) $("#FixTblHead").bootstrapSwitch('toggleState');
         if (obj.FixTblCol === 0) $("#FixTblCol").bootstrapSwitch('toggleState');
         if (obj.FootSearch === 0) $("#FootSearch").bootstrapSwitch('toggleState');
         if (obj.InputToggle === 0) $("#InputToggle").bootstrapSwitch('toggleState');
         if (obj.InputInner === 0) $("#InputInner").bootstrapSwitch('toggleState');
       }
     });
   }

   var dataTable = function() {
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
       for (i = 0; i < Data.cols; i++) {
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
         "aoColumns": Data.header,
         "data": Data.data,
         //任意字段
         "bScrollInfinite": true,
         //"borderMulti": true,
         searchHighlight: true, //高亮
         colReorder: {
           realtime: true,
         },
         //scrollY:        '70vh',
         scroolY: '70v',
         scrollCollapse: true,
         "initComplete": function() {
           var api = this.api();
           api.$('td').on('click',function() {
             api.search(this.innerText).draw();
           });
           $('.tools').append($('.tabletools-btn-group').clone(true));
           $('.tbTools').remove();
           infoTips(JSON.stringify(Data), 2);

           //添加 footer search
           /*var footerHTML = '<tfoot class="hidden-sm hidden-xs"><tr>';
				for (var i = 0; i < Data.cols; i++) {
                    footerHTML +='<th>'+Data.header[i].title+'</th>'};
				$('TABLE').append(footerHTML + '</tr></tfoot>');
				
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
       //initData.aoColumns = Data.header;
       //initData.data = Data.data;
       return initData;
     }
     /*
		DataType:Array/Json.
		其中Json直接将URL传入值即可，但Model中查询代码不能为中文,视图中需要定义表头
	*/

     function CreateTable(tableID, Data) {
       var table = $(tableID);
       var initData = initSettings(Data);
       console.log(initData);
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


    //初始化列状态
   /*
  function initColStat(tableID,Data){
    var iColInput = $(tableID+'_column_toggler');
    var strInput = '';
    for(var i=0;i<Data.cols;i++)
    {
        strInput += '<li><a href="javascript:;"><input type="checkbox" checked class="icheck" data-column="'+ i +'">'+ Data.header[i].title +'</a></li>' ;
    }
    iColInput.html(strInput);
    
    //iCheck样式初始化    
   var iColToggler = $(tableID+'_column_toggler input');
   iColToggler.iCheck({
      checkboxClass: 'iradio_square-green',//'icheckbox_square-red'
      radioClass: 'iradio_square-green',
      increaseArea: '10' // optional
    }); 
    $(tableID+'_column_container').removeClass('hide');
    $(tableID + "_column_toggler a").click(
        function(){
          var iCol = parseInt($(this).find("input").attr("data-column"));
          if(iCol)
          {
            iColToggler.eq(iCol).iCheck('toggle');//.click();
          }
      }
    );
  }*/


   var FormEditable = function() {

     $.mockjaxSettings.responseTime = 100;

     var initAjaxMock = function() {
       //ajax mocks

       $.mockjax({
         url: '/post'
       });

       $.mockjax({
         url: '/DBGroups',
         response: function(settings) {
           this.responseText = [{
             value: 0,
             text: '质量综合管理系统'
           }, {
             value: 1,
             text: '小张核查'
           }, {
             value: 2,
             text: '码后核查'
           }, {
             value: 3,
             text: '机台作业'
           }, {
             value: 4,
             text: '库管系统'
           }];
         }
       });
     };

     var initEditables = function() {

       var InputToggle = ($("#InputToggle").bootstrapSwitch('state') === true) ? 1 : 0;
       var InputInner = ($("#InputInner").bootstrapSwitch('state') === true) ? 1 : 0;

       //set editable mode based on URL parameter
       if (InputInner) {
         $.fn.editable.defaults.mode = 'inline';
       }

       //global settings 
       $.fn.editable.defaults.inputclass = 'form-control';
       $.fn.editable.defaults.url = '/post';

       //editables element samples 
       $('#ApiName').editable({
         validate: function(value) {
           if ($.trim(value) === '') return '该字段不能为空';
         },
         url: '/post',
         type: 'text',
         pk: 1,
         name: 'ApiName',
         title: '请输入接口名称'
       });

       $('#Author').editable({
         validate: function(value) {
           if ($.trim(value) === '') return '该字段不能为空';
         }
       });

       $('#DataBaseID').editable({
         //prepend: "not selected",
         name: 'DBID',
         inputclass: 'form-control',
         source: [{
           value: 0,
           text: '质量综合管理系统'
         }, {
           value: 1,
           text: '小张核查'
         }, {
           value: 2,
           text: '码后核查'
         }, {
           value: 3,
           text: '机台作业'
         }, {
           value: 4,
           text: '库管系统'
         }, {
           value: 5,
           text: '质量控制中心'
         }]
       });

       /*$('#DataBaseID').editable({
            showbuttons: false
        });*/

       $('#CreateDate').editable({
         format: 'yyyy-mm-dd hh:ii',
         viewformat: 'yyyy-mm-dd hh:ii',
         datetimepicker: {
           rtl: Metronic.isRTL(),
           todayBtn: 'linked',
           weekStart: 1
         }
       });


       $('#SQL').editable({
         name: 'strSQL',
         showbuttons: 'bottom',
         rows: 8,
         inputclass: "form-control",
         tpl: '<textarea style="min-width:430px;"></textarea>',
         validate: function(value) {
           if ($.trim(value) === '') return '该字段不能为空';
         },
         /*display: function(value) {
                //render response into element
                $(this).html('<pre>' + value + '</pre>');
            }*/

       });
       $('#params').editable({
         inputclass: 'form-control input-medium',
         select2: {
           tags: ['tstart', 'tend', 'tstart2', 'tend2', 'tstart3', 'tend3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'],
           tokenSeparators: [",", " "]
         },
         validate: function(value) {
           if ($.trim(value) === '') return '该字段不能为空，无参数时可设置任意字段';
         },
         success: function(response, value) {
           var strUrl = $('#url').text();
           if ($.trim(value) !== '') {
             var i = 0,
               strTemp = '';
             for (; i < value.length; i++) {
               var j = i + 1;
               strTemp += "&" + value[i] + "=参数" + j;
             }
             strUrl += strTemp;
             $("#PreviewUrl").val($.trim(strUrl));
             return value;
           } else {
             $("#PreviewUrl").val($.trim(strUrl));
           }
         }
       });

       $('#note').editable({
         showbuttons: (Metronic.isRTL() ? 'left' : 'right'),
         name: 'ApiDesc'
       });

       $('#pencil').on('click',function(e) {
         e.stopPropagation();
         e.preventDefault();
         $('#note').editable('toggle');
       });

       $('#url').editable({
         name: 'URL',
         disabled: true,
       });

       $('#ApiID').editable({
         disabled: true,
       });
     };

     return {
       //main function to initiate the module
       init: function() {

         // inii ajax simulation
         initAjaxMock();

         // init editable elements
         initEditables();

         // init editable toggler
         $('#edit').on('click',function() {
           $('#user .editable').editable('toggleDisabled');
           $('#url').editable('disable');
           $('#ApiID').editable('disable');
         });
         // init 
         $('#InputInner').on('switchChange.bootstrapSwitch', function(e) {
           SaveSettings();
           window.location.reload();
         });
         // handle editable elements on hidden event fired
         $('#user .editable').on('hidden', function(e, reason) {
           if (reason === 'save' || reason === 'nochange') {
             var $next = $(this).closest('tr').next().find('.editable');
             if (InputToggle) {
               setTimeout(function() {
                 $next.editable('show');
               }, 300);
             } else {
               $next.focus();
             }
           }
         });

         $("#SaveAPI").on('click',function() {
           var strUrl = getRootUrl('DataInterface') + "SaveAPI";
           var APIData = $('#user .editable').editable('getValue');
           if (APIData.ApiName === '' || APIData.SQL === '' || APIData.params === '') {
             infoTips("接口名、查询语句以及接口参数不允许为空,请检查后重新提交", 1);
             return;
           }
           $.post(strUrl, APIData,
             function(data) {
               var obj = jQuery.parseJSON(data);
               infoTips(obj.message, 1);
               if (obj.status) {
                 //添加成功后重置
                 $('#Reset').click();
                 $('#ApiID').editable('setValue', obj.NewID); //ID自增
                 var strOld = '&ID=' + APIData.ApiID;
                 var strTemp = parseInt(APIData.ApiID, 10) + 1;
                 var strNew = '&ID=' + strTemp;
                 var strNewUrl = APIData.URL.replace(strOld, strNew);
                 $('#url').editable('setValue', strNewUrl); //ID自增
                 $('#DemoUrl').text(strNewUrl);
                 $('#DemoUrl').attr('href', strNewUrl);
               }
             }
           );
         });

         $('#Reset').on('click',function() {
           $('#ApiName').editable('setValue', null) //clear values
           .editable('option', 'pk', null) //clear pk
           .removeClass('editable-unsaved'); //remove bold css     

           $('#DataBaseID').editable('setValue', null) //clear values
           .editable('option', 'pk', null) //clear pk
           .removeClass('editable-unsaved'); //remove bold css    

           $('#SQL').editable('setValue', null) //clear values
           .editable('option', 'pk', null) //clear pk
           .removeClass('editable-unsaved'); //remove bold css    
           var strNote = '[功能说明]' + '<p style="text-indent:2em;">本接口主要用于 <i>XX</i> 信息的查询.</p>' + '[主要参数]';
           strNote += '<ul><li>TimeStart:开始时间；</li><li> TimeEnd:开始时间；</li><li> Cols:1/0,默认为空，设为1时返回查询语句的列用于表格初始化等操作；</li></ul>';
           $('#note').editable('setValue', strNote) //clear values
           .editable('option', 'pk', null) //clear pk
           .removeClass('editable-unsaved'); //remove bold css    
         });
       }

     };

   }();