$("#HideTips").on('click', function() {
  $(this).parent().hide();
});

var loadPDF = getUrlParam('pdf');

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

  strLimit = strLimit.split('#')[0];

  var token = getUrlParam('token');
  if (token === null) {
    token = config.TOKEN;
  }
  //缓存5分钟
  var strUrl = getRootPath() + "/DataInterface/Api?Token=" + token + "&ID=" + id + "&M=3&tstart=" + date.start + "&tend=" + date.end + "&tstart2=" + date.start + "&tend2=" + date.end + "&tstart3=" + date.start + "&tend3=" + date.end + "&tstart4=" + date.start + "&tend4=" + date.end + strLimit + '&cache=' + config.cache; // + " & t = " + Math.random();
  if (location.hash.indexOf('cart') > -1) {
    var cart = location.hash.replace('#cart=', '');
    strUrl += "&cart=" + cart.toUpperCase() + "&cart2=" + cart.toUpperCase() + "&cart3=" + cart.toUpperCase();
  }

  var prod = getUrlParam('prod');
  if (prod !== null) {
    strUrl = strUrl.replace('&prod=' + prod, '');
    prod = GetSelect2Text('prod_ID');
    strUrl += "&prod=" + prod;
  }

  var multi = getUrlParam('multi');
  if (multi !== null) {
    var val = $('#multi input').val().trim().replace(/，/g, ',').toUpperCase();
    if (jsRight(val, 1) == ',') {
      val = val.substring(0, val.length - 1);
    }
    //用空格连接的情况
    if (val.indexOf(' ') != -1 && val.indexOf(',') == -1) {
      val = val.trim().split(' ').filter(function(item) {
        return item.length > 0
      })
      val = val.join(',');
    }

    //console.log(val.replace(/,/g, "','"));
    val = val.replace(/,/g, "','");
    strUrl += '&' + multi + '=' + val; // + '&' + multi + '2=' + val;
  }

  //console.log(strUrl);

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

      config.info.qualitytable = false;

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
  var oTable = [];
  //生成表格头

  // function CreateTableHead(Data) {
  //  var strHead = '<tr role="row">';
  //  var iWidth = 100 / Data.cols;
  //  var strThstart;
  //  for (var i = 0; i < Data.cols; i++) {
  //    if (i == 1) {
  //      strThstart = '<th data-column-index="' + i + '" class="sorting_asc" tabindex="0" aria-controls="sample" rowspan="1" colspan="1" aria-label="' + Data.header[i].title + ': 以降序排列此列" style="width: ' + iWidth + '%">';
  //    } else {
  //      strThstart = '<th data-column-index="' + i + '" class="sorting" tabindex="0" aria-controls="sample" rowspan="1" colspan="1" aria-label="' + Data.header[i].title + ': 以升序排列此列" style="width: ' + iWidth + '%">';
  //    }

  //    var strTR = strThstart + Data.header[i].title + '</th>';
  //    strHead += strTR;
  //  }
  //  strHead += '</tr>';
  //  return strHead;
  // }
  // //生成表格体

  // function CreateTableBody(Data) {
  //  var strRow = '<tr role="row" class="odd">';
  //  var strTR, i;
  //  for (i = 0; i < Data.cols; i++) {
  //    strTR = '<td></td>';
  //    strRow += strTR;
  //  }
  //  strRow += '</tr>';
  //  strRow += '<tr role="row" class="even">';
  //  for (i = 0; i < Data.cols; i++) {
  //    strTR = '<td></td>';
  //    strRow += strTR;
  //  }
  //  strRow += '</tr>';
  //  return strRow;
  // }
  var getLanguage = function() {
    return {
      "sProcessing": "处理中...",
      "sLengthMenu": "显示 _MENU_ 项结果",
      "sZeroRecords": "没有匹配结果",
      "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
      "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
      "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
      "sInfoPostFix": "",
      "sSearch": "搜索:",
      "sUrl": "",
      "sEmptyTable": "表中数据为空",
      "sLoadingRecords": "载入中...",
      "sInfoThousands": ",",
      "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页"
      },
      "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
      }
    };
  };

  var language = getLanguage();

  var idList = [];
  if (getUrlParam('tid') !== null) {
    idList = getUrlParam('tid').split(',');
  }

  function updateSelect2(oTable, tableID) {

    var api = oTable.api();
    var settings = oTable.fnSettings();

    var rowData = api.row(0).data();
    var apiID = idList[settings.sInstance.replace('DataTables_Table_', '')];
    var oSettings = $.parseJSON(localStorage.getItem('DataTables/qualitytable/' + apiID));

    api.columns().indexes().flatten().each(function(i) {
      var column = api.column(i);

      //数据不做校验,车号，轴号不做过滤
      var chkData = rowData[i].replace(/<.*?>/ig, "");
      if (!isNaN(chkData) || judgeSearchType(chkData) == config.search.CART || judgeSearchType(chkData) == config.search.REEL || isDateTime(chkData)) {
        return;
      }
      var strSelect = $(tableID).find('thead th[data-column-index="' + i + '"]').text();
      var select = $('<select class="select2"></select>')
        .appendTo($(column.footer()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column
            .search(val ? '^' + val.replace('\\', '') + '$' : '', true, false)
            .draw();
        });
      var str = '<option value="">所有' + strSelect + '</option>';
      column.data().unique().sort().each(function(d, j) {
        d = d.trim();
        if (d.length > 0) {
          str += '<option value="' + d + '">' + d + '</option>';
        }

      });

      select.append(str);

      var searchStr = oSettings.columns[oSettings.ColReorder[i]].search.search;
      if (searchStr.length) {
        searchStr = searchStr.substring(1, searchStr.length - 1).replace('\\', '');
        select.val(searchStr);
      }
    });

    initSelect2();
  }

  function initSettings(tableID, Data, bFixhead) {
    var initData;
    var date = getDateRange();
    var filename = Data.title + '(' + date.start + ' - ' + date.end + ')';
    if (location.hash.indexOf('cart') > -1) {
      filename = '';
    }
    initData = {
      //"bDestroy":true,
      "bRetrieve": true,
      "language": language,
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
        extend: 'csvHtml5',
        className: "btn green sbold btn-outline ",
        text: 'txt',
        fieldBoundary: '',
        escapeChar: '',
        extension: '.txt',
        header: Data.cols > 1,
        exportOptions: {
          columns: ':visible'
        },
        filename: filename,
        charset: 'ANSI'
      }, {
        extend: 'excelHtml5',
        className: "btn yellow sbold btn-outline ",
        exportOptions: {
          columns: ':visible'
        },
        filename: filename
      }, {
        extend: 'csvHtml5',
        className: "btn purple sbold btn-outline ",
        filedBoundary: ' ',
        escapeChar: ' ',
        exportOptions: {
          columns: ':visible'
        },
        filename: filename
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
          if ($(this).find('a').length == 0) {
            api.search(this.innerText.trim()).draw();
          }
        });
        $(tableID).parents('.portlet').find('.tools').append($(tableID).parents('.portlet').find('.tabletools-btn-group').clone(true));
        $(tableID).parents('.portlet').find('.tbTools').remove();

        updateSelect2(this, tableID);

        // api.on('order.dt search.dt', function() {
        //  api.column(0, {
        //    "search": 'applied',
        //    "order": 'applied'
        //  }).nodes().each(function(cell, i) {
        //    cell.innerHTML = i + 1;
        //  });
        //  console.log(api.column(2, {
        //    "search": 'applied',
        //    "order": 'applied'
        //  }).nodes());
        // }).draw();
      }
    };

    // if (Data.rows > 0) {
    //  var data = Data.data[0];
    //  var cartList = [];
    //  data.map(function(item, i) {
    //    if (judgeSearchType(item) == config.search.CART) {
    //      cartList.push(i);
    //    }
    //  });
    //  if (cartList.length) {
    //    initData.rowCallback = function(row, data, index) {
    //      cartList.map(function(i) {
    //        $(row).find('td:nth(' + i + ')').html('<a href="./search#' + data[i] + '" target="_blank" title="点击查看生产详情">' + data[i] + '</a>');
    //      });
    //    };
    //  }
    // }

    if (bFixhead) {
      initData.fixedHeader = {
        header: true,
        footer: true,
        headerOffset: Data.fixedHeaderOffset,
      };
    }

    //PDF处理
    //参数pdf 加入pdf查看，download:下载模式
    if (loadPDF) {

      var orient = getUrlParam('orient');

      var pdfSize = getUrlParam('pdfsize');

      if (orient === null || orient == 'v') {
        orient = 'portrit';
      } else if (orient == 'h') {
        orient = 'landscape';
      }

      pdfSize = (pdfSize === null) ? 'A4' : 'A3';

      var option = {
        extend: 'pdfHtml5',
        orientation: orient,
        pageSize: pdfSize, //LEGEAL
        message: '统计时间:' + date.start + ' ~ ' + date.end + '\n' + Data.source + ' - 成都印钞有限公司 技术质量部',
        title: Data.title,
        exportOptions: {
          columns: ':visible'
        },
        download: 'open',
        className: "btn dark sbold btn-outline",
        filename: Data.title + '(' + date.start + ' - ' + date.end + ')'
      };
      if (getUrlParam('download') !== null) {
        option.download = 'download';
      }
      initData.buttons.splice(4, 0, option);
    }

    return initData;
  }

  function getIDByTblID(tableID) {
    return tableID.split('eq(')[1].replace(')', '');
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
    var id = getIDByTblID(tableID);
    //初始化表格
    oTable[id] = table.dataTable(initData);
  }

  function clearTableData(table) {
    if (table.find('tbody').length > 0) {
      var oTable = table.dataTable();
      oTable.fnClearTable(oTable);
    }
  }

  function handleCartOrReelData(Data) {
    var data = Data.data[0];
    var cartList = [];
    var type = 0;

    var rules = {
      cart: /^[1-9]\d{3}[A-Za-z]\d{3}$/,
      reel: /^[1-9]\d{6}[A-Ca-c]$|^[1-9]\d{4}[A-Ca-c]$|^[1-9]\d{6}$/
    };

    data.map(function(item, i) {
      item = '' + item;
      if (rules.cart.test(item)) {
        type = 0;
        cartList.push(i);
      } else if (rules.reel.test(item)) {
        type = 1;
        cartList.push(i);
      }
    });

    if (cartList.length) {
      Data.data = Data.data.map(function(item) {
        cartList.map(function(i) {
          item[i] = getCartOrReelStr(item[i], type);
        });
        return item;
      });

    }
    return Data;
  }

  function renderDataTable(Data, tableID, bFixhead) {
    var table = $(tableID);
    //更新表格相关信息
    var filename = Data.title;
    if (location.hash.indexOf('cart') > -1) {
      var cart = location.hash.replace('#cart=', '').toUpperCase();
      filename = cart + ' ' + Data.title;
    }
    table.parents('.portlet').find('[name="TableTitle"]').text(filename);
    table.parents('.portlet').find('[name="datasource"]').text('(' + Data.source + ')');

    //$('.page-title [name="TableTitle"]').text(Data.title);
    //$('#today').text(Data.source);

    /*if (Data.cols < 2) {
      bsTips("请确保数据列在2列以上，当前为：" + Data.cols);
      return;
    }*/

    clearTableData(table);

    if (Data.rows > 0) {

      Data = handleCartOrReelData(Data);

      if (!table.find('tbody').length) {
        CreateTable(tableID, Data, bFixhead);
        return;
      }
    } else {
      bsTips("该时间范围内无质量数据，请重新选择查询时间!", 1);
      return;
    }

    var id = getIDByTblID(tableID);
    var oSettings = oTable[id].fnSettings();
    //刷新列，列顺序可能被拖动

    for (var i = 0; i < Data.rows; i++) {
      oTable[id].oApi._fnAddData(oSettings, Data.data[i]);
    }

    updateSelect2(oTable[id], tableID);

    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

    oTable[id].fnDraw();
  }

  /*
   *刷新数据，Array,Json两种方式，取决于表格初始化方式
   */

  function RefreshTable(tableID, strUrl, bFixhead) {
    if (typeof bFixhead == 'undefined') {
      bFixhead = true;
    }
    $.ajax({
        url: strUrl
      })
      .done(function(data) {
        data = handleAjaxData(data);
        renderDataTable(data, tableID, bFixhead);
        if (!config.info.qualitytable) {
          config.info.qualitytable = true;
          bsTips('数据加载完成', 1);
        }
      });
  }

  return {
    //main function to initiate the module
    init: function() {
      $(document).on("click", ".ranges li:not(:last),button.applyBtn", function() {
        InitTable(0);
      });

      $('#multi').on("click", "a", function() {
        InitTable(0);
      });

      initProd();
      //载入数据
      if (getUrlParam('tid') !== null) {
        InitTable(1);
      }

      //modern browsers
      $(window).bind('hashchange', function() {
        InitTable(1);
      });

      $("#Preview .btn").on('click', function() {
        RefreshTable('[name="sampleTable"]', $('#Preview input').val());
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
  hideSidebarTool();
  //修复顶部style="margin-top:-43px;"
  //系统主题设置
  //ReadSettings();

  if (location.hash.indexOf('cart') == true) {
    infoTips('请在上方搜索栏中输入车号以查询该车号相关数据');
  }

  //PDF载入特殊处理
  if (loadPDF !== null) {
    require.config({
      baseUrl: "assets/global/plugins/datatables/media/js/",
      paths: {
        "pdfmake": "pdfmake.min",
        "vfs_fonts": "vfs_fonts"
      }
    });
    require(["pdfmake", "vfs_fonts"], function() {
      dataTable.init();
    });
  } else {
    dataTable.init();
  }

  //初始化表格
  var clipboard = new ClipboardJS('#share button');

  if (App.getURLParameter('debug') == 1 || App.getURLParameter('tid') === null) {
    $('#Preview').show();
  } else {
    $('#Preview').hide();
  }

  //多字符字段
  if (App.getURLParameter('multi') !== null) {
    $('#multi').show();
  } else {
    $('#multi').hide();
  }

  //ChangeMainTheme(1);
});
jQuery(window).resize(function() {
  HeadFix();
});
