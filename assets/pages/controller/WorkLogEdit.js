var worklogEdit = function() {
  function initDOM() {
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

    //控件初始化
    iChechBoxInit();
    initChecked();

    //各控件设置初始值
    SetiCheckChecked('proc_id', $('div[name="proc_id"]').attr('data-proc'));
    //初始化Select2控件
    initSelect2();

    //初始化选择框数据
    resetSelectData();

    $("#today").text(today(0));
    initDashboardDaterange('YYYY-MM-DD');
    //ReadLogSettings();
    RoundedTheme(0);
    HeadFix();
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
  function resetSelectData(){
    var str,Data;
    switch($('div[name="proc_id"]').attr('data-proc')){
      case "0"://钞纸
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=24&M=3";
        break;
      default:
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=35&M=3";
        break;
    }
    Data = ReadData(str);
    InitSelect("prod_id", Data);

    switch($('div[name="proc_id"]').attr('data-proc')){
      case "0"://钞纸
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=23&M=3";
        break;
      default:
        str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=36&M=3&p="+$('div[name="proc_id"]').attr('data-proc');
        break;
    }
    Data = ReadData(str);
    InitSelect("machine_id", Data);

    str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=38&M=3&p="+GetiCheckChecked('proc_id');

    Data = ReadData(str);
    InitSelect("oper_name", Data);
  }


  //插入工作日志
  $("#SaveChanges").on('click',
    function() {
      //获取各控制值
      var strproc_id = GetSwitchValue('proc_id', 4); //$("input[name='proc_id'][checked]").val();
      var strWorkClass = GetSwitchValue('workClass', 3); //$("input[name='workClass'][checked]").val();
      var strMachineName = $("#MachineName").val();
      var strProductName = $("#ProductName").val();
      var strProStatus = $("#ProStatus").val();
      var strProTime = $("#ProTime").val();

      var strTransUserName = '';
      var strProUserName = '';
      var OperaterNames = ["无", "于潇", "丰锋", "彭鹏", "赵文倩", "蒲明玥", "舒粤", "马可", "胡新玥", "李超群", "徐闵", "李宾", "杨林", "金鑫", "包诚"];
      for (var i = iProUserName.length - 1; i >= 0; i--) {
        if (iProUserName[i]) {
          if (strProUserName !== '') strProUserName += ',';
          strProUserName += OperaterNames[i];
        }
      }
      for (i = iTransUserName.length - 1; i >= 0; i--) {
        if (iTransUserName[i]) {
          if (strTransUserName !== '') strTransUserName += ',';
          strTransUserName += OperaterNames[i];
        }
      }
      if (strProUserName === '') strProUserName = '无';
      if (strTransUserName === '') strTransUserName = '无';

      var strProInfo = $("#ProInfo").val();
      var strReportOutput = ($("#ReportOutput").bootstrapSwitch('state') === true) ? 1 : 0;
      var strRecordUserName = $("#RecordUserName").val();
      var strMainDesc = $("#MainDesc").val();
      var strSubDesc = $("#SubDesc").val();
      var strErrDescHTML = $("#ErrDesc").code();
      var strUrl = getRootUrl('worklog') + "AddLog";
      //var strUrl = "http://localhost/worklog/AddLog";
      //获取各控制值完毕
      //向服务器请求数据
      $.post(strUrl, {
          proc_id: strproc_id,
          WorkClass: strWorkClass,
          MachineName: strMachineName,
          ProductName: strProductName,
          ProStatus: strProStatus,
          ProTime: strProTime,
          ProUserName: strProUserName,
          TransUserName: strTransUserName,
          ProInfo: strProInfo,
          ReportOutput: strReportOutput,
          RecordUserName: strRecordUserName,
          RecordTime: strRecordTime,
          MainDesc: strMainDesc,
          SubDesc: strSubDesc,
          ErrDescHTML: strErrDescHTML
        },
        function(data, status) {
          var obj = jQuery.parseJSON(data);
          if (obj > 0) {

            infoTips("日志添加成功，请继续添加！</br>更新状态：" + status + "</br>所添加数据ID:" + data, 1);
          } else {
            infoTips("日志添加失败，请检查拼写或联系管理员!</br>错误信息：" + status + "</br>所添加数据:" + data, 0);
          }
        }
      );
    });
  //保存设置
  $("#SaveSettings").on('click',
    function() {
      //获取各控制值
      var ProcID = $("#ProcID").val(); //关注工序
      var NumsID = $("#LoadingNum").val(); //每次加载
      var Status = $("#ProStatus").val(); //处理状态
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

  function ReadLogSettings() {
    var strUrl = getRootUrl('worklog') + "ReadLogQuerySettings";
    $.ajax({
      type: 'POST',
      async: false,
      url: strUrl,
      success: function(data) {
        var strJSON = jQuery.parseJSON(data);
        var obj = strJSON.data[0];
        //设置控件初始值
        $("#ProcID").val(obj.ProcID); //关注工序
        $("#LoadingNum").val(obj.NumsID); //每次加载
        $("#ProStatus").val(obj.Status); //处理状态
        $("#RefreshTime").val(obj.RefreshTime); //轮询时间
        if (obj.AutoRefresh === 0) $("#AutoRefresh").bootstrapSwitch('toggleState'); //如果需要关
        $("#QueryData").click();
      }
    });
  }
  return {
    init: function() {
      initDOM();
      $('.icheck').on('ifChanged',function() {
        $('div[name="proc_id"]').attr('data-proc',GetiCheckChecked('proc_id'));
        resetSelectData();
      });
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