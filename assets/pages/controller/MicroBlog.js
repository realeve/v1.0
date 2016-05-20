var MicroBlog = function() {
  //读取设置
  var avatarUrl = getUserAvatar();

  function ReadLogSettings() {
    var strUrl = getRootUrl('MicroBlog') + "ReadSettings";
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
      }
    });
  }
  //保存设置
  $("#SaveSettings").on('click',
    function() {
      //获取各控制值
      var NumsID = $("#LoadingNum").val(); //每次加载
      var RefreshTime = $("#RefreshTime").val(); //轮询时间
      var AutoRefresh = ($("#AutoRefresh").bootstrapSwitch('state') === true) ? 1 : 0;
      var strUrl = getRootUrl('MicroBlog') + "SaveSettings";
      $.post(strUrl, {
          NumsID: NumsID,
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

  //处理用户图片
  function getUserAvatar() {
    var avatarName = ($('.username').data('set-avatar') == '1') ? $('.username').data('avatar') : 'Avatar_none';
    return getRootPath(1) + '/demo/avatar/' + avatarName + '.jpg';
  }

  //插入工作日志
  $("#PostMicriBlog").on('click', function() {
    //获取各控制值
    var strBlogHTML = $("#BlogContent").val();
    if (strBlogHTML.length <= 140 && strBlogHTML.length) {
      var strUrl = getRootPath() + "/DataInterface/insert";
      var iData = {
        "tbl": TBL.MICRO_BLOG,
        "RecordTime": today(1),
        'BlogHTML': UTF2GBK(strBlogHTML),
        "utf2gbk": ['BlogHTML', 'UserName'],
        'UserName': UTF2GBK($("#PostMicriBlog").data('username')),
        'HideBlog': 0, //默认每条记录均显示
      };
      $.ajax({
        type: 'POST',
        async: false,
        url: strUrl,
        data: iData,
        success: function(data) {
          var obj = $.parseJSON(data);
          $("#BlogContent").val('');
          $('#WordNum').html('还可以输入140字');
          $('#PostMicriBlog').data('sn', obj.id);
          //追加信息
          var TimeHead = '<div class="timeline-item"><div class="timeline-badge">';
          TimeHead += '<div class="timeline-badge"><img class="timeline-badge-userpic" src="' + avatarUrl + '"></div></div>';
          TimeHead += '<div class="timeline-body"><div class="timeline-body-arrow"></div><div class="timeline-body-head"><div class="timeline-body-head-caption"><a href="#" class="timeline-body-title font-blue-madison">';
          var TimeTitle = '</a><span class="timeline-body-time font-grey-cascade">发表于';
          var TimeEnd = '</h4></span></div></div></div>';

          var TimeButton = '</small></span></div><div class="timeline-body-head-actions">';
          TimeButton += '<a data-sn=' + obj.id + ' class="btn btn-circle red btn-outline btn-block del" data-toggle="confirmation" data-singleton="true" data-popout="true" data-placement="left" data-title="确定删除该条日志?" data-btn-ok-label="是" data-btn-ok-icon="icon-trash" data-btn-ok-class="btn-success" data-btn-cancel-label="取消" data-btn-cancel-icon="icon-close" data-btn-cancel-class="btn-danger"><i class="icon-trash"></i>&nbsp;&nbsp;删除 </a>';
          TimeButton += '</div></div><div class="timeline-body-content"><span class="font-grey-mint"><h4>';

          $(".timeline:first").prepend(TimeHead + GBK2UTF(iData.UserName) + TimeTitle + iData.RecordTime + TimeButton + GBK2UTF(iData.BlogHTML) + TimeEnd);
          $('.del').first().confirmation();
        },
        error: (function(data) {
          infoTips('插入数据失败，错误信息:\n' + data);
        })
      });
    } else {
      bsTips('请确认输入字符数在0到140字之间');
    }
  });

  $("#BlogContent").bind('input propertychange', function() {
    var len = 140 - $('#BlogContent').val().length;
    if (len >= 0) {
      $('#WordNum').html('还可以输入' + len + '字');
    } else {
      $('#WordNum').html('已超出<span class="font-red-mint bold">' + -len + '</span>字');
    }
  });

  function QueryMicroBlog(keyWord) {
    if (typeof keyWord == "undefined") {
      keyWord = $("#KeyWord").val();
    }
    var iNums = [10, 20, 30, 40, 50];
    var date = getDateRange();
    var iData = {
      Nums: iNums[$("#LoadingNum").val()],
      TimeStart: date.start,
      TimeEnd: date.end,
      KeyWord: UTF2GBK(keyWord),
      CurID: (KeyWord !== "") ? 0 : parseInt($('#PostMicriBlog').data('sn'), 10),
      UserName: UTF2GBK($("#PostMicriBlog").data('username'))
    };
    if (0 === iData.CurID) {
      $('.timeline').html('');
    }
    var strUrl = getRootPath() + "/MicroBlog/ReadMicroBlog";
    var rows = 0;
    $.ajax({
      type: 'POST',
      async: false,
      url: strUrl,
      data: iData,
      success: function(data) {
        var obj = jQuery.parseJSON(data);
        if (obj.rows > 0) {
          //obj = jQuery.parseJSON(data);
          var TimeHead = '<div class="timeline-item"><div class="timeline-badge">';
          TimeHead +='<div class="timeline-badge"><img class="timeline-badge-userpic" src="' + avatarUrl + '"></div></div>';
          TimeHead +='<div class="timeline-body"><div class="timeline-body-arrow"></div><div class="timeline-body-head"><div class="timeline-body-head-caption"><a href="#" class="timeline-body-title font-blue-madison">';
          var TimeTitle = '</a><span class="timeline-body-time font-grey-cascade">发表于';
          var TimeEnd = '</h4></span></div></div></div>';
          var strContent, TimeButton;
          for (var i = obj.rows - 1; i >= 0; i--) {
            TimeButton = '</small></span></div><div class="timeline-body-head-actions">';
            TimeButton +='<a data-sn=' + obj.data[i].ID + ' class="btn btn-circle red btn-outline btn-block del" data-toggle="confirmation" data-singleton="true" data-popout="true" data-placement="left" data-title="确定删除该条日志?" data-btn-ok-label="是" data-btn-ok-icon="icon-trash" data-btn-ok-class="btn-success" data-btn-cancel-label="取消" data-btn-cancel-icon="icon-close" data-btn-cancel-class="btn-danger"><i class="icon-trash"></i>&nbsp;&nbsp;删除 </a>';

            TimeButton +='</div></div><div class="timeline-body-content"><span class="font-grey-mint"><h4>';
            strContent = GBK2UTF(obj.data[i].BlogHTML);
            if (iData.KeyWord !== '') {
              strContent = strContent.replace(new RegExp(iData.KeyWord, 'g'), '<span class="caption-subject bold font-yellow-casablanca" style="font-size: 16px; line-height: 18px;">' + GBK2UTF(iData.KeyWord) + '</span>');
            }
            $(".timeline:first").prepend(TimeHead + GBK2UTF(obj.data[i].UserName) + TimeTitle + obj.data[i].RecordTime + TimeButton + strContent + TimeEnd);
            $('.del').first().confirmation();
          }
          $('#PostMicriBlog').data('sn', (KeyWord !== "") ? 0 : obj.data[0].ID);
          rows = obj.rows;
          //bsTips('数据查询完成',1);
        } else {
          infoTips("该时间范围内无日志，请重新设置!", 0);
        }
      },
      error: (function(data) {
        infoTips('读取日志出现错误，信息:\n' + JSON.stringify(data));
      })
    });

    return rows;
  }

  var handleSearchBox = function() {
    // handle hor menu search form on enter press
    $('.page-header').on('keypress', '.search-form .form-control', function(e) {
      if (e.which == 13) {
        $(this).closest('.search-form').removeClass("open");
        $('#PostMicriBlog').data('sn', 0);
        var rows = QueryMicroBlog($(this).val());
        if (rows) {
          bsTips('查询到' + rows + '条记录', 1);
        }
        $(this).val("");
      }
    });

    // handle header search button click
    $('.page-header').on('mousedown', '.search-form.open .submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).closest('.search-form').removeClass("open"); //.submit();
      $('#PostMicriBlog').data('sn', 0);
      var rows = QueryMicroBlog($('.search-form .form-control').val());
      if (rows) {
        bsTips('查询到' + rows + '条记录', 1);
      }
      $('.search-form .form-control').val("");
    });
  }();


  return {
    init: function() {
      ReadLogSettings();
      QueryMicroBlog();
      //查询
      $("#QueryData").on('click', function() {
        QueryMicroBlog();
      });

      //查询
      $('#dashboard-report-range').on('apply.daterangepicker', function() {
        $('#PostMicriBlog').data('sn', 0);
        QueryMicroBlog();
      });

      //删除
      $('body').on('confirmed.bs.confirmation', '.del', function() {
        var strUrl = getRootPath() + "/DataInterface/update";
        var obj = $(this);
        var iData = {
          "tbl": TBL.MICRO_BLOG,
          "id": obj.data('sn'),
          "HideBlog": 1
        };
        $.post(strUrl, iData, function(data, status) {
          if (status == "success") {
            obj.parents('.timeline-item').remove();
            bsTips('工作笔记删除成功', 2);
          } else {
            bsTips("工作笔记失败，请稍后重试或联系管理员!", 0);
            infoTips(JSON.stringify(data));
          }
        });
      });

      $('body').on('canceled.bs.confirmation', 'a.del', function() {
        $('div.popover').parent().find('a.del').click();
      });
    }
  };
}();
jQuery(document).ready(function() {
  UIIdleTimeout.init();
  initDashboardDaterange('YYYY-MM-DD');
  initDom();
  MicroBlog.init(); //初始化表单
});
jQuery(window).resize(function() {
  HeadFix();
});