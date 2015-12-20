//插入工作日志
$("#PostMicriBlog").on('click',
  function() {
    //获取各控制值
    var strBlogHTML = $("#BlogContent").val();
    if (strBlogHTML.length <= 140 && strBlogHTML.length) {
      var strUrl = getRootUrl('MicroBlog') + "AddLog";
      //var strUrl = "http://localhost/AddLog";
      //获取各控制值完毕
      //向服务器请求数据
      $.ajax({
        type: 'POST',
        async: false,
        url: strUrl,
        data: {
          BlogHTML: strBlogHTML
        },
        success: function(data) {
          $("#QueryData").click();
          $("#BlogContent").val('');
          $('#WordNum').html('还可以输入140字');
        }
      });
    }

  });

$("#BlogContent").bind('input propertychange', function() {
  var len = 140 - $('#BlogContent').val().length;
  if (len >= 0) {
    $('#WordNum').html('还可以输入' + len + '字');
  } else {
    $('#WordNum').html('已超出' + -len + '字');
  }

});

$('#dashboard-report-range').on('apply.daterangepicker', function() {
  QueryMicroblog(1);
});

//查询工作日志
$("#QueryData").on('click',
  function() {
    QueryMicroblog(1);
  });

function QueryMicroblog(ReadTime) {
  //获取各控制值
  var NumsID = $("#LoadingNum").val();
  var CurID = $("#LogID").val();
  var TimeRange = $("#dashboard-report-range span").html();
  var TimeStart = TimeRange.split(' ~ ')[0];
  var TimeEnd = TimeRange.split(' ~ ')[1];
  if (!ReadTime){
    TimeStart = '2015-01-01';
  }
  //http://localhost/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=15&M=3&tstart=20150331&tend=20150521&u=libin
  var Nums;
  var strUrl = getRootUrl('MicroBlog') + "QueryLogInfo";
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
  //infoTips(Nums +"</br>"+TimeStart+"</br>"+TimeEnd,0);
  //获取各控制值完毕
  //向服务器请求数据
  $.post(strUrl, {
      Nums: Nums,
      CurID: CurID,
      TimeStart: TimeStart,
      TimeEnd: TimeEnd
    },
    function(data, status) {
      var obj = jQuery.parseJSON(data);
      if (obj.rows > 0) {
        //infoTips(data,0);
        obj = jQuery.parseJSON(data);
        //var TimeHead = "<div class=\"timeline-item\"><div class=\"timeline-badge\"><div class=\"timeline-icon\"><i class=\"icon-emoticon-smile font-green-haze\"></i></div></div><div class=\"timeline-body\"><div class=\"timeline-body-arrow\"></div><div class=\"timeline-body-head\"><div class=\"timeline-body-head-caption\"><a href=\"#\" class=\"timeline-body-title font-blue-madison\">";
        var TimeHead = "<div class=\"timeline-item\"><div class=\"timeline-badge\"><div class=\"timeline-badge\"><img class=\"timeline-badge-userpic\" src=\"http://localhost/assets/admin/pages/media/users/realeve.jpg\"></div></div><div class=\"timeline-body\"><div class=\"timeline-body-arrow\"></div><div class=\"timeline-body-head\"><div class=\"timeline-body-head-caption\"><a href=\"#\" class=\"timeline-body-title font-blue-madison\">";
        var TimeTitle = "</a><span class=\"timeline-body-time font-grey-cascade\">发表于";
        var TimeEnd = "</span></div></div></div>";

        for (var i = obj.rows - 1; i >= 0; i--) {
          var TimeButton = "</small></span></div><div class=\"timeline-body-head-actions\"><div class=\"btn-group\"><button class=\"btn btn-circle green-haze btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\">操作 <i class=\"fa fa-angle-down\"></i></button><ul class=\"dropdown-menu pull-right\" role=\"menu\"><li><a href=\"http://localhost/comment?ID=" + obj.data[i].ID + "\" id=\"UpdateLog" + i + "\" ><i class=\"icon-pencil\"></i>&nbsp;&nbsp;评论 </a></li>";
          TimeButton += "<li><a href=\"http://localhost/Del?ID=" + obj.data[i].ID + "\" id=\"Del" + i + "\" data-toggle=\"confirmation\" data-singleton=\"true\" data-popout=\"true\" data-placement=\"left\" data-title=\"确定删除该条日志?\" data-btn-ok-label=\"是\" data-btn-ok-icon=\"icon-trash\" data-btn-ok-class=\"btn-success\" data-btn-cancel-label=\"取消\" data-btn-cancel-icon=\"icon-close\" data-btn-cancel-class=\"btn-danger\"><i class=\"icon-trash\"></i>&nbsp;&nbsp;删除 </a></li>";
          TimeButton += "<li><a href=\"http://localhost/Marky?ID=" + obj.data[i].ID + "\" id=\"Mark\"><i class=\"icon-star\"></i>&nbsp;&nbsp;收藏 </a></li>";
          TimeButton += "</ul></div></div></div><div class=\"timeline-body-content\"><span class=\"font-grey-cascade\">";
          var TimeContent = ReadLog(obj.data[i].ID);
          $(".timeline:first").prepend(TimeHead + obj.data[i].UserName + TimeTitle + obj.data[i].RecordTime + TimeButton + TimeContent + TimeEnd);
        }
        $("#LogID").val(obj.data[0].ID);

        //infoTips(obj,0);
      } else {
        infoTips("该时间范围内无日志，请重新设置!</br>错误信息：" + status + "</br>返回值:" + data, 0);
      }
    }
  );
}

//保存设置
//查询工作日志
$("#SaveSettings").on('click',
  function() {
    //获取各控制值
    var NumsID = $("#LoadingNum").val(); //每次加载
    var RefreshTime = $("#RefreshTime").val(); //轮询时间
    var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') === true) ? 1 : 0;
    var strUrl = getRootUrl('MicroBlog') + "SaveLogQuerySettings";
    //infoTips(NumsID + RefreshTime +AutoRefresh,0); 
    //获取各控制值完毕
    //向服务器请求数据
    $.post(strUrl, {
        NumsID: NumsID,
        RefreshTime: RefreshTime,
        AutoRefresh: AutoRefresh
      },
      function(data, status) {
        var obj = jQuery.parseJSON(data);
        if (obj.rows > 0) {
          infoTips(obj.message, 1);
        } else {
          infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
        }
      }
    );
  });

//AJAX返回值

function ReadLog(ID) {
  var strUrl = getRootUrl('MicroBlog') + "ReadLog";
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

function ReadLogSettings() {
  var strUrl = getRootUrl('MicroBlog') + "ReadLogQuerySettings";
  console.log(strUrl);
  $.ajax({
    type: 'POST',
    async: false,
    url: strUrl,
    success: function(data) {
      var strJSON = jQuery.parseJSON(data);
      var obj = strJSON.data[0];
      //设置控件初始值
      $("#LoadingNum").val(obj.NumsID); //每次加载
      $("#RefreshTime").val(obj.RefreshTime); //轮询时间
      if (obj.AutoRefresh === 0) $("#AutoRefresh").bootstrapSwitch('toggleState'); //如果需要关 
      //infoTips(obj.NumsID+obj.RefreshTime+obj.AutoRefresh,0); 
      QueryMicroblog(0); //首次加载任何日志           
    }
  });
}
//切换开关

function SwitchSelect(Name, ID) {
  var v = 'input:radio[name=' + Name + ']:nth(' + ID + ')';
  return v;
}

function GetSwitchValue(Name, Num) {
  var v = $('input:radio[name=' + Name + ']:nth(' + 0 + ')').bootstrapSwitch('state');
  for (var i = 1; i <= Num && !v; i++) {
    v = $('input:radio[name=' + Name + ']:nth(' + i + ')').bootstrapSwitch('state');
  }
  return i;
}

function PromotAlert(str) {
  bootbox.prompt(str, function(result) {
    if (result === null) {
      alert("Prompt dismissed");
    } else {
      alert("Hi <b>" + result + "</b>");
    }
  });
}