function WorkLogInit() {
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
  iChechBoxInit();
}

//插入工作日志
$("#SaveChanges").on('click',
  function() {
    //获取各控制值
    var strWorkProc = GetSwitchValue('workProc', 4); //$("input[name='workProc'][checked]").val();
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
    var strRecordTime = $("#RecordTime").val();
    var strMainDesc = $("#MainDesc").val();
    var strSubDesc = $("#SubDesc").val();
    var strErrDescHTML = $("#ErrDesc").code();
    var strUrl = getRootUrl('worklog') + "AddLog";
    //var strUrl = "http://localhost/worklog/AddLog";
    //获取各控制值完毕
    //向服务器请求数据
    $.post(strUrl, {
        WorkProc: strWorkProc,
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

$('#dashboard-report-range').on('apply.daterangepicker', function() {
  QueryWorkLogData(1);
});

$("#QueryData").on('click',
  function() {
    QueryWorkLogData(1);
  }
);

//查询工作日志

function QueryWorkLogData(bClearData) {
  //获取各控制值
  var ProcID = $("#ProcID").val();
  var NumsID = $("#LoadingNum").val();
  var Status = $("#ProStatus").val();
  var KeyWord = $("#KeyWord").val();

  var CurID = bClearData ? 0 : $("#LogID").val(); //是否要清除数据
  var TimeRange = $("#dashboard-report-range span").html();
  var TimeStart = TimeRange.split(' ~ ')[0];
  var TimeEnd = TimeRange.split(' ~ ')[1];
  var Nums;
  var strUrl = getRootUrl('worklog') + "QueryLogInfo";
  switch (NumsID) {
    case '1':
      Nums = 20;
      break;
    case '2':
      Nums = 30;
      break;
    case '3':
      Nums = 40;
      break;
    case '4':
      Nums = 50;
      break;
  }

  $.post(strUrl, {
      ProcID: ProcID,
      Nums: Nums,
      Status: Status,
      KeyWord: KeyWord,
      CurID: CurID,
      TimeStart: TimeStart,
      TimeEnd: TimeEnd
    },
    function(data, status) {
      var obj = jQuery.parseJSON(data);
      if (obj.rows > 0) {
        if (bClearData) {
          $(".timeline").html("");
        }
        //var TimeHead = "<div class=\"timeline-item\"><div class=\"timeline-badge\"><div class=\"timeline-icon\"><i class=\"icon-emoticon-smile font-green-haze\"></i></div></div><div class=\"timeline-body\"><div class=\"timeline-body-arrow\"></div><div class=\"timeline-body-head\"><div class=\"timeline-body-head-caption\"><a href=\"#\" class=\"timeline-body-title font-blue-madison\">";
        var TimeHead = "<div class=\"timeline-item\"><div class=\"timeline-badge\"><div class=\"timeline-badge\"><img class=\"timeline-badge-userpic\" src=\"http://localhost/assets/admin/pages/media/users/realeve.jpg\"></div></div><div class=\"timeline-body\"><div class=\"timeline-body-arrow\"></div><div class=\"timeline-body-head\"><div class=\"timeline-body-head-caption\"><a href=\"#\" class=\"timeline-body-title font-blue-madison\">";
        var TimeTitle = "</a><span class=\"timeline-body-time font-grey-cascade\">发表于";
        var TimeEnd = "</span></div></div></div>";

        for (var i = obj.rows - 1; i >= 0; i--) {
          var TimeButton = "</small></span></div><div class=\"timeline-body-head-actions\"><div class=\"btn-group\"><button class=\"btn btn-circle green-haze btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\">操作 <i class=\"fa fa-angle-down\"></i></button><ul class=\"dropdown-menu pull-right\" role=\"menu\"><li><a href=\"http://localhost/worklog/editlog?ID=" + obj.data[i].ID + "\" id=\"UpdateLog" + i + "\" ><i class=\"icon-pencil\"></i>&nbsp;&nbsp;编辑 </a></li>";
          TimeButton += "<li><a href=\"http://localhost/worklog/Dellog?ID=" + obj.data[i].ID + "\" id=\"DelLog" + i + "\" data-toggle=\"confirmation\" data-singleton=\"true\" data-popout=\"true\" data-placement=\"left\" data-title=\"确定删除该条日志?\" data-btn-ok-label=\"是\" data-btn-ok-icon=\"icon-trash\" data-btn-ok-class=\"btn-success\" data-btn-cancel-label=\"取消\" data-btn-cancel-icon=\"icon-close\" data-btn-cancel-class=\"btn-danger\"><i class=\"icon-trash\"></i>&nbsp;&nbsp;删除 </a></li>";
          TimeButton += "<li><a href=\"http://localhost/worklog/Marklog?ID=" + obj.data[i].ID + "\" id=\"MarkLog\"><i class=\"icon-star\"></i>&nbsp;&nbsp;收藏 </a></li><li class=\"divider\"></li>";
          TimeButton += "<li><a href=\"http://localhost/worklog/Completelog?ID=" + obj.data[i].ID + "\" id=\"CompleteLog" + i + "\"  data-toggle=\"confirmation\" data-singleton=\"true\" data-popout=\"true\" data-placement=\"left\" data-title=\"确定标记为已完成?\" data-btn-ok-label=\"是\" data-btn-ok-icon=\"icon-check\" data-btn-ok-class=\"btn-success\" data-btn-cancel-label=\"取消\" data-btn-cancel-icon=\"icon-close\"><i class=\"icon-check\"></i>&nbsp;&nbsp;标记为已完成 </a></li>";
          TimeButton += "</ul></div></div></div><div class=\"timeline-body-content\"><span class=\"font-grey-cascade\">";

          var TimeContent = ReadLog(obj.data[i].ID);

          $(".timeline:first").prepend(TimeHead + obj.data[i].RecordUserName + TimeTitle + obj.data[i].RecordTime + TimeButton + TimeContent + TimeEnd);

        }
        $("#LogID").val(obj.data[0].ID);
      } else {
        infoTips("该搜索条件范围内无日志，请重新设置!</br>错误信息：" + status + "</br>返回值:" + data, 1);
      }
    }
  );
}

//AJAX返回值

function ReadLog(ID) {
  var strUrl = getRootUrl('worklog') + "ReadLog";
  var Log = "该条记录未填写任何日志";
  $.ajax({
    type: 'POST',
    async: false,
    url: strUrl,
    data: {
      ID: ID
    },
    success: function(data) {
      Log = data;
    }
  });
  return Log;
}

//保存设置
//查询工作日志
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


$('#DelLog1').on('confirmed.bs.confirmation', function() {
  infoTips("删除成功", 1);
});

$('#CompleteLog1').on('confirmed.bs.confirmation', function() {
  infoTips("该条日志已标记为已完成", 1);
});

$("#Preview").on('click', function() {

  //infoTips( GetSwitchValue('workProc',4) +"</br>" + GetSwitchValue('workClass',3),0);
  //infoTips($("#ReportOutput").bootstrapSwitch('state'),1);
  /*   bootbox.dialog({
                    message: "I am a custom dialog",
                    title: "Custom title",
                    buttons: {
                      success: {
                        label: "Success!",
                        className: "green",
                        callback: function() {
                          alert("great success");
                        }
                      },
                      danger: {
                        label: "Danger!",
                        className: "red",
                        callback: function() {
                          alert("uh oh, look out!");
                        }
                      },
                      main: {
                        label: "Click ME!",
                        className: "blue",
                         callback: function() {
                          alert("endit!");
                        }
                      }
                    }
                });*/


});

//记录选择状态
var iProUserName = new Array(); //全局变量记录用户名
var iTransUserName = new Array(); //全局变量记录移交人员名单 
for (var i = 14 - 1; i >= 0; i--) {
  iProUserName[i] = 0;
  iTransUserName[i] = 0;
}

jQuery(document).ready(function() {
  UIIdleTimeout.init();
  WorkLogInit(); //初始化表单
  //属性设置
  var GroupID = 1; //机检组
  //工序
  SetiCheckChecked('workProc', GroupID);
  //班次
  var curDate = new Date();
  var curHour = curDate.getHours();
  var curClass = (curHour >= 16) ? 1 : 0; //下午4点之后自动转中班
  $(SwitchSelect('workClass', curClass)).bootstrapSwitch('toggleState');

  $("#today").text(today(4));
  HeadFix();
  initDashboardDaterange('YYYY-MM-DD');
  //ReadLogSettings();
  //读取默认设置
  //ChangeMainTheme(1);
  RoundedTheme(0);
});
jQuery(window).resize(function() {
  HeadFix();
});
//插入工作日志