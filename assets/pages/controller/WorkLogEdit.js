var worklogEdit = function() {
  function initDOM() {
    //控件初始化
    iChechBoxInit();
    initSelect2();

    $('#ErrDesc').summernote({
      height: 300, // set editor height
      minHeight: null, // set minimum height of editor
      maxHeight: null, // set maximum height of editor
      focus: true, // set focus to editable area after initializing summernote
    });

    $(".form_advance_datetime").datetimepicker({
      isRTL: App.isRTL(),
      format: "yyyy-mm-dd hh:ii",
      autoclose: true,
      todayBtn: true,
      startDate: "2015-01-01 00:00",
      pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
      minuteStep: 10,
      language: 'zh-CN'
    });
    initChecked();
    //ReadLogSettings();
    RoundedTheme(0);
    HeadFix();
    //各控件设置初始值
    $("#today").text(today(0));
    SetiCheckChecked('proc_id', $('div[name="proc_id"]').attr('data-proc'));
    SetSingleiCheck('bReport', true);
    //初始化选择框数据
    resetSelectData();
    resetErrDescSelectData();
    initDashboardDaterange('YYYY-MM-DD');
  }

  //载入历史信息时，接口信息的模式为2.用Data.data[0].keys取得对应的值

  function loadHisData(id) {
    var strUrl = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=42&M=2&id=" + id;
    var Data = ReadData(strUrl);

    //基础数据
    SetiCheckChecked('proc_id', Data.data[0].proc_id);
    SetiCheckChecked('class_id', Data.data[0].class_id);
    $('input[name="rec_user_name"]').val(Data.data[0].rec_user_name);
    SetSingleiCheck('bReport', Data.data[0].bReport);
    SetSelect2Val('prod_id', Data.data[0].prod_id);
    SetSelect2Val('machine_id', Data.data[0].machine_id);

    //机检日志详细数据
    SetSelect2Val('proStatus_id', Data.data[0].proStatus_id);
    $('input[name="process_time"]').val(Data.data[0].process_time);
    $('input[name="prod_info"]').val(Data.data[0].prod_info);
    var oper_name = [];
    Data.data[0].oper_name.split(',').map(function(elem) {
      oper_name.push($("select[name='oper_name']").find('option:contains(' + elem + ')').val());
    });
    $("select[name='oper_name']").select2('val', oper_name);

    SetSelect2Val('main_err', Data.data[0].main_err);
    SetSelect2Val('sub_err', Data.data[0].sub_err);
    var usrName = $('input[name="rec_user_name"]').attr('data-user');
    $('#ErrDesc').code(GBK2UTF(Data.data[0].ErrDesc) + '<p><div class="note note-info"><h4 class="block">'+ usrName +'&nbsp;补充于<small>'+ today(3) +'&nbsp;:</small></h4><p><span style="font-size: 14px; line-height: 20px;">&nbsp;</span></p></div></p>');

    $('#Save').attr('data-sn', Data.data[0]['id']);
    $('#Save').html($('#Save').html().replace('提交', '更新'));
  }

  function initChecked() {
    var iHours = new Date().getHours();
    if (iHours >= 0 && iHours < 8) { //夜班
      SetiCheckChecked('class_id', 2);
    } else if (iHours >= 8 && iHours < 16) { //白班
      SetiCheckChecked('class_id', 0);
    } else { //中班
      SetiCheckChecked('class_id', 1);
    }
  }

  //重置产品列表、设备列表

  function resetSelectData() {
    var str, str2, Data;
    var type = GetiCheckChecked('proc_id');
    switch (type) {
      case "0": //钞纸
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=24&M=3";
        str2 = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=23&M=3";
        break;
      default:
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=35&M=3";
        str2 = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=36&M=3&p=" + type;
        break;
    }

    Data = ReadData(str);
    InitSelect("prod_id", Data);

    Data = ReadData(str2);
    InitSelect("machine_id", Data);

    str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=38&M=3&p=" + type;
    Data = ReadData(str);
    InitSelect("oper_name", Data);
  }

  //重置错误描述下拉选择框

  function resetErrDescSelectData() {
    var str, Data;
    str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=39&M=3";
    Data = ReadData(str);
    InitSelect("main_err", Data);
  }
  $('select[name="main_err"]').on('change', function() {
    str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=40&M=3&p=" + $(this).val();
    Data = ReadData(str);
    InitSelect("sub_err", Data);
  });

  //插入工作日志
  $("#Save").on('click', function() {
    var iData = {
      "tbl": 25,
      "rec_time": today(1),
      "utf2gbk": ['oper_name', 'rec_user_name'], //, 'ErrDesc'
      "oper_name": GetSelect2Text('oper_name'),
      "proc_id": GetiCheckChecked('proc_id'),
      "class_id": GetiCheckChecked('class_id'),
      "rec_user_name": $('input[name="rec_user_name"]').val().trim(),
      "bReport": !GetiCheckChecked('bReport') ? 1 : 0,
      "prod_id": $('select[name="prod_id"]').val(),
      "machine_id": $('select[name="machine_id"]').val(),
      "proStatus_id": $('select[name="proStatus_id"]').val(),
      "process_time": $('input[name="process_time"]').val(),
      "prod_info": $('input[name="prod_info"]').val(),
      "main_err": $('select[name="main_err"]').val(),
      "sub_err": $('select[name="sub_err"]').val(),
      "ErrDesc": UTF2GBK($('#ErrDesc').code())
    };

    var strUrl = getRootPath() + "/DataInterface/insert";
    //更新数据
    if((typeof $('#Save').attr('data-sn'))!=='undefined'){
      strUrl = getRootPath() + "/DataInterface/update";
      iData.id = $('#Save').attr('data-sn');
    }
    //获取各控制值完毕
    //向服务器请求数据
    $.post(strUrl, iData, function(data, textStatus) {
      if (textStatus == "success") {
        var obj = $.parseJSON(data);
        infoTips(obj.message, obj.type);
        $('#Reset').click();

        if((typeof $('#Save').attr('data-sn'))!=='undefined'){
          $('#Save').removeAttr('data-sn');
          $('#Save').html($('#Save').html().replace('更新', '提交'));
        }
      }else{
        infoTips("日志添加失败，请稍后重试或联系管理员!", 0);
        infoTips(JSON.stringify(data));
      }
    });/*
    $.post({
      url: strUrl,
      data: iData,
      async: false,
      success: function(data) {
        var obj = $.parseJSON(data);
        infoTips(obj.message, obj.type);
        $('#Reset').click();
      },
      error: function(data) {
        infoTips("日志添加失败，请稍后重试或联系管理员!", 0);
        infoTips(JSON.stringify(data));
      }
    });*/
  });

  //重置数据
  $(document).on('click', '#Reset', function() {
    ResetSelect2('prod_id');
    ResetSelect2('machine_id');
    ResetSelect2('proStatus_id');
    ResetSelect2('oper_name');
    SetSelect2Val('main_err', -1);
    ResetSelect2('sub_err');
    $('#ErrDesc').code("");
    $('input[name="prod_info"]').val("");
    $('input[name="process_time"]').val("");
  });

  //保存设置
  $("#SaveSettings").on('click',
    function() {
      //获取各控制值
      var ProcID = $("#ProcID").val(); //关注工序
      var NumsID = $("#LoadingNum").val(); //每次加载
      var Status = $("#proStatus_id").val(); //处理状态
      var RefreshTime = $("#RefreshTime").val(); //轮询时间
      var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') === true) ? 1 : 0;
      var strUrl = getRootUrl('worklog') + "SaveLogQuerySettings";
      // infoTips(ProcID +"</br>"+NumsID +"</br>"+Status +"</br>"+RefreshTime+"</br>"+AutoRefresh,0);
      //获取各控制值完毕
      //向服务器请求数据
      $.post(strUrl, {
          ProcID: ProcID,
          NumsID: NumsID,
          Status: Status,
          RefreshTime: RefreshTime,
          AutoRefresh: AutoRefresh
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
    });

  return {
    init: function() {
      initDOM();
      $('input[name="proc_id"]').on('ifChecked', function() {
        $('div[name="proc_id"]').attr('data-proc', GetiCheckChecked('proc_id'));
        resetSelectData();
      });

      if (getUrlParam('ID')) {
        loadHisData(getUrlParam('ID'));
      }
    }
  };

}();


jQuery(document).ready(function() {
  UIIdleTimeout.init();
  worklogEdit.init();
});
jQuery(window).resize(function() {
  HeadFix();
});
//插入工作日志