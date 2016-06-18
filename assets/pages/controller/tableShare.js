$(document).ready(function() {

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = encodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r !== null) return decodeURI(r[2]);
    return null; //返回参数值
  }

  $('div:first').css("padding", "0 15px");
  var fixheader = (getUrlParam('fixheader') == null);
  var option = {
    //"bDestroy":true,
    "bRetrieve": true,
    "language": {
      "url": "../../../assets/pages/controller/DataTableLanguage.min.json"
    },
    "lengthMenu": [
      [5, 10, 15, 20, 50, 100, -1],
      [5, 10, 15, 20, 50, 100, "所有"] // change per page values here
    ],
    // set the initial value
    "pageLength": 20,
    "dom": (fixheader == '1') ? "<'clear'>R<'row tbTools' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>" : "<'row tbTools' <'col-md-6 col-sm-12 pull-right'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
    // // horizobtal scrollable datatable
    buttons: [{
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
      }
    }, {
      extend: 'csvHtml5',
      className: "btn purple sbold btn-outline ",
      exportOptions: {
        columns: ':visible'
      }
    }, {
      extend: 'print',
      autoPrint: true,
      text: '打印',
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
    searchHighlight: true, //高亮
    colReorder: {
      realtime: true,
    },
    scroolY: '70v',
    scrollCollapse: true,
    "initComplete": function(settings) {
      var api = this.api();
      api.on("click", 'tbody td', function() {
        api.search(this.innerText.trim()).draw();
      });

      var rowData = api.row(0).data();
      var oSettings = $.parseJSON(localStorage.getItem('DataTables_' + settings.sInstance + '_' + location.pathname));

      api.columns().indexes().flatten().each(function(i) {
        var column = api.column(i);
        if (!isNaN(rowData[i])) {
          return;
        }
        //' + $('thead th:eq(' + i + ')').text() + '
        var select = $('<select class="select2"><option value="">所有' + $('thead th:eq(' + i + ')').text() + '</option></select>')
          .appendTo($(column.footer()).empty()) //.empty()
          .on('change', function() {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );
            column
              .search(val ? '^' + val + '$' : '', true, false)
              .draw();
          });

        column.data().unique().sort().each(function(d, j) {
          select.append('<option value="' + d + '">' + d + '</option>')
        });

        var searchStr = oSettings.columns[i].search.search;
        if (searchStr.length) {
          searchStr = searchStr.substring(1, searchStr.length - 1).replace('\\', '');
          select.val(searchStr);
        }
      });

      $.fn.select2.defaults.set("theme", "bootstrap");
      $(".select2, .select2-multiple").select2({
        width: null
      });
    }
  };
  if (fixheader == '1') {
    option.fixedHeader = {
      header: true,
      footer: true,
      headerOffset: 0,
    };
  }

  $('table').append('<tfoot>' + $('table thead').html() + '</tfoot>');
  $('table').DataTable(option);


});