  //系统当前版本
  var curVersion = 1.25;
  moment.locale('zh-cn');
  /**
   * 表单名列表定义(select id,name from sysobjects where xtype = 'U')
   */
  //0-10 质量中心数据库
  var TBL = {
    "PHYSIC": 0, //'Paper_Para_PscData', //0 物理站
    "CHEM": 1, //'Paper_Para_ChemData', //1 化验站
    "SURFACE": 2, //'Paper_Para_SurfaceData', //2 物理外观指标
    "PPR_OPR": 3, //'Paper_Para_Operator', //3 操作员
    "PPR_PROD": 4, //'Paper_ProductData', //4 钞纸品种
    "PPR_MCH": 5, //'Paper_Machine_Info', //5 钞纸机台
    "PRT_PROD": 6, //'ProductData', //6 印钞品种
    "PRT_MCH": 7, //'MachineData', //7 印钞机台
    "PPR_VALIDATE": 8, //机检验证

    "USR": 20, //'tblUser', //20  用户信息
    "DPMT": 21, //'tblDepartMent', //21  用户所在部门/分组
    "WORK_LOG_PROC": 22, //'tblWorkProc', //22  工作日志_工序

    "WORK_LOG": 25, //'tblWorkLog_Record', //25  工作日志
    "WORK_LOG_STUS": 26, //'tblWorkProStatus', //26  工作日志_故障处理状态
    "WORK_ERR_LIST": 27, //'tblWorkErrDesc', //27  工作日志_故障类型
    "MICRO_BLOG": 28, //'tblMicroBlog_Record', //28  个人记事本
    "DB": 29, //'tblDataBaseInfo', //29  数据库列表
    "API": 30, //'tblDataInterface', //30  API列表
    "SELECT": 31, //'tblSettings_Select_List', //31  下拉框列表
    "WORK_LOG_OPR": 32, //'tblWorklog_Operator', //32  机检日志人员名单
    "SETTINGS_MENULIST": 33, //菜单列表
    "SETTINGS_MENUDETAIL": 34, //菜单详情
  }; //表单定义

  //信息提示框
  /**
   * [infoTips 弹出信息提示框]
   * @param  {[type]} strMes [信息内容]
   * @param  {[type]} Type   [信息框的类型]
   * @return {[type]}        [弹出提示信息]
   */
  window.console && window.console.info("喜欢看 质量控制中心 的代码，还是发现了什么bug？不如和我们一起为它添砖加瓦吧！\n电话:8275-6129；\n微信:宾不厌诈");

  function infoTips(strMes, Type, iContainer) {
    if (typeof iContainer === 'undefined') {
      iContainer = "";
    }
    if (typeof Type === 'undefined') {
      Type = 0;
    }
    infoType = ['danger', 'success', 'info', 'warning'];
    App.alert({
      container: iContainer, // alerts parent container(by default placed after the page breadcrumbs)
      place: "append", // append or prepent in container 
      type: infoType[Type], // alert's type
      message: strMes, // alert's message
      close: true, // make alert closable
      reset: false, // close all previouse alerts first
      focus: true, // auto scroll to the alert after shown
      closeInSeconds: Type ? 5 : 0, // auto close after defined seconds
      icon: "info-circle" // put icon before the message
    });
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function bsTips(strMes, Type) {
    if (typeof Type == 'undefined') {
      Type = 0;
    }
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-top-right",
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": Type ? "5000" : "0",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    infoType = ['error', 'success', 'info', 'warning'];
    toastr[infoType[Type]](strMes);
  }

  function PromotAlert(title, succes) {
    bootbox.prompt(title, function(result) {
      if (result !== null) {
        success();
      }
    });
  }
  //调用示例：var success = function(){alert($('input.bootbox-input').val())} ;PromotAlert('asdfasdf',success);

  //获取当前域名，t=0时返回顶级域名,t=1时返回当前

  function getRootPath(t) {
    //获取当前网址
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/ems
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    if (t === 0) {
      return (localhostPath + projectName);
    } else {
      return (localhostPath);
    }
  }

  function getRootUrl(str) {
    return window.document.location.href.substring(0, window.document.location.href.indexOf(str)) + str + '/';
  }

  function today(type) {
    /*var date = new Date();
    var a = date.getFullYear();
    var b = jsRight(('0' + (date.getMonth() + 1)), 2);
    var c = jsRight(('0' + date.getDate()), 2);
    var d = date.getHours();
    var e = date.getMinutes();
    var f = date.getSeconds();
    var output;
    switch (type) {
      case 0:
        output = a + '年' + b + '月' + c + '日';
        break;
      case 1:
        output = a + '-' + b + '-' + c + ' ' + d + ':' + e + ':' + f;
        break;
      case 2:
        output = a + '年' + b + '月' + c + '日' + d + '时' + e + '分' + f + '秒';
        break;
      case 3:
        output = a + '-' + b + '-' + c + ' ' + d + ':' + e;
        break;
      case 4:
        output = a + '年' + b + '月' + c + '日  ' + d + '时' + e + '分';
        break;
      case 5:
        output = b + '/' + c + '/' + a;
        break;
      case 6:
        output = a + '-' + b + '-' + c;
        break;
    }*/
    var output;
    switch (type) {
      case 0:
        output = moment().format('LL');
        break;
      case 1:
        output = moment().format('YYYY-MM-DD HH:MM:SS');
        break;
      case 2:
        output = moment().format('YYYY年MM月DD日 HH时MM分SS秒');
        break;
      case 3:
        output = moment().format('YYYY-MM-DD HH:MM');
        break;
      case 4:
        output = moment().format('LLL');
        break;
      case 5:
        output = moment().format('MM/DD/YYYY');
        break;
      case 6:
        output = moment().format('YYYY-MM-DD');
        break;
    }
    return output;
  }

  /**
   * [data2ThousandSeparator 数字转千分位]
   * @param  {[type]} num [待转数字]
   * @return {[type]}      [转换后数据]
   */
  function data2ThousandSeparator(num, isFloat) {
    isFloat = isFloat || 0;
    return (((isFloat) ? num.toFixed(2) : num) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }

  /*function fmoney(s, n)   
     { 
        n = n <= 20 ? n : 2;   
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
        var l = s.split(".")[0].split("").reverse(),   
        r = s.split(".")[1];   
        t = "";   
        for(i = 0; i < l.length; i ++ )   
        {   
           t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
        }  
        var re =  t.split("").reverse().join("");
        if(n){
         re = + "." + r; 
       }
        return re;   
     }   
     function rmoney(s)   
     {   
        return parseFloat(s.replace(/[^\d\.-]/g, ""));   
     }   
     function rdata(s)   
     {   
        return s.replace(',', '');   
     } */

  var dataConv = function() {
    return {
      currency: function(num) {
        num = num.toString().split("").reverse().join("");
        for (var t = "", i = 0; i < num.length; i++) {
          t += num[i] + ((i + 1) % 3 === 0 && (i + 1) != num.length ? "," : "");
        }
        return t.split("").reverse().join("");
      },
      data: function(num) {
        return parseInt(num.replace(',', ''), 10);
      }
    };
  };

  //将Json转换为表格控制所需的数据

  function Json2Array(strJson) {
    var iCol = 0;
    var iSingle = []; //new Array();
    for (var i = 0; i < strJson.rows; i++) {
      iCol = 0;
      iSingle[i] = []; //new Array();//定义多维数组    
      for (var key in strJson.data[i]) {
        iSingle[i][iCol] = strJson.data[i][key];
        iCol++;
      }
    }
    return iSingle;
  }

  //将Json转换为表格控制所需的表头

  function Json2Head(strJson) {
    var strHead = '',
      strRow;
    var strDataTitle = 'title';
    for (var key in strJson.data[0]) {
      strRow = '{"' + strDataTitle + '":"' + key + '"},';
      strHead += strRow;
    }
    strHead = '[' + strHead + ']';
    return $.parseJSON(strHead);
  }

  //读取指定URL的JSON数据

  function ReadData(strUrl, Type) {
    var Data = {};
    Type = (Type) ? 'GET' : 'POST';
    $.ajax({
      type: Type,
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        var obj = jQuery.parseJSON(data);
        Data = obj;
      },
      error: function(e) {
        console.log("read data error:<br>");
        console.log(e.responseText);
      }
    });
    return Data;
  }

  /**
   * [UpdateData 更新/删除指定URL的数据]
   * @param {[type]} strUrl [更新地址/删除地址]
   * @param {[type]} Data   [更新或删除的内容（要求where条件为ID）]
   * @param {[type]} Type   [1:GET/0:POST（默认）]
   */

  function UpdateData(strUrl, Data, Type) {
    Type = (Type) ? 'GET' : 'POST';
    $.ajax({
      type: Type,
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        var obj = $.parseJSON(data);
        infoTips(obj.message, obj.type);
      }
    });
  }

  function GetSelectStr(Data) {
    var i, str = '<option value="-1"></option>';
    for (i = 0; i < Data.rows; i++) {
      str += '<option value="' + Data.data[i][0] + '">' + Data.data[i][1] + '</option>';
    }
    return str;
  }

  function InitSelect(sel_Name, Data) {
    $("select[name='" + sel_Name + "']").html(GetSelectStr(Data));
  }

  function SetSelectVal(Name, val) {
    $("select[name='" + Name + "']").val(val);
  }
  //切换开关

  function SwitchSelect(Name, ID) {
    var v = 'input:radio[name=' + Name + ']:nth(' + ID + ')';
    return v;
  }
  //单选项个数

  function GetSwitchValue(Name, Num) {
    var v = $('input:radio[name=' + Name + ']:nth(' + 0 + ')').bootstrapSwitch('state');
    for (var i = 1; i <= Num && !v; i++) {
      v = $('input:radio[name=' + Name + ']:nth(' + i + ')').bootstrapSwitch('state');
    }
    return i;
  }

  //初始化标题栏时间选择器
  //YYYYMMDD,YYYY-MM-DD

  function initDashboardDaterange(YearType) {
    if (!jQuery().daterangepicker) {
      return;
    }
    var rangeArr = [
      [moment(), moment()],
      [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      [moment().subtract(2, 'days'), moment()],
      [moment().subtract(6, 'days'), moment()],
      [moment().subtract(29, 'days'), moment()],
      [moment().startOf('month'), moment().endOf('month')],
      [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      [moment().subtract(1, 'year').startOf('month'), moment().subtract(1, 'year').endOf('month')],
      [moment().startOf('quarters'), moment()],
      [moment().subtract(1, 'quarters').startOf('quarters'), moment().subtract(1, 'quarters').endOf('quarters')],
      [moment().quarter(1).startOf('quarters'), moment().quarter(2).endOf('quarters')],
      [moment().quarter(3).startOf('quarters'), moment().quarter(4).endOf('quarters')],
      [moment().quarter(1).startOf('quarters'), moment()]
    ];
    var rangeStr = ['今天', '昨天', '过去三天', '过去一周', '过去30天', '本月', '上月', '去年同期', '本季度', '上季度', '上半年', '下半年','今年'];
    var ranges = {};

    rangeStr.map(function(day, i) {
      ranges[day] = rangeArr[i];
    })

    var dateRange = function(mode) {
      return rangeArr[mode][0].format(YearType) + ' ~ ' + rangeArr[mode][1].format(YearType);
    }

    //默认选择最近一周
    var paramRange = getUrlParam('daterange');
    var defaultRange = (paramRange == null) ? 3 : Number.parseInt(paramRange);

    $('#dashboard-report-range').daterangepicker({
        opens: (App.isRTL() ? 'right' : 'left'),
        startDate: rangeArr[defaultRange][0],
        endDate: rangeArr[defaultRange][1],
        minDate: '01/01/2010',
        maxDate: '12/31/2099',
        dateLimit: {
          "months": 120
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: false,
        ranges: ranges,
        buttonClasses: ['btn btn-sm'],
        applyClass: ' green',
        cancelClass: ['btn btn-sm btn-danger'],
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
          applyLabel: '确定',
          cancelLabel: '取消',
          fromLabel: '从',
          toLabel: '到',
          customRangeLabel: '时间范围选择',
          daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          firstDay: 1
        }
      },
      function(start, end) {
        $('#dashboard-report-range span').html(start.format(YearType) + ' ~ ' + end.format(YearType));
      }
    );
    $('#dashboard-report-range span').html(dateRange(defaultRange));
    $('#dashboard-report-range').show();
  }

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = encodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    if (r !== null) return decodeURI(r[2]);
    return null; //返回参数值
    //return App.getURLParameter(name);
  }

  /**
   * [handleParam 处理图表及表格中的参数列表]
   * @param  {[type]} param        [参数项 OBJ]
   * @param  {[type]} i            [第I个值]
   * @param  {[type]} defaultValue [默认值]
   * @return {[type]}              [返回值]
   */

  function handleParam(param, i, defaultValue) {
    var t;
    if (param.length === 0) {
      t = defaultValue;
    } else if (param.length === 1) {
      t = param[0];
    } else {
      t = param[i];
    }
    return t;
  }

  /**
   * [xround 四舍五入]
   * @param  {[type]} x   [浮点数]
   * @param  {[type]} num [保留小数位]
   * @return {[type]}     [格式化后数据]
   */

  function xround(x, num) {
    x = parseFloat(x);
    return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
  }

  /**
   * [UTF2GBK UTF-8与GBK相互转换]
   * @param {[UTF8类型字符串]} str [GBK字符串]
   */

  function UTF2GBK(str) {
    return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
  }

  function GBK2UTF(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
  }
  /**
   * [jsLeft 字符串操作.left  right  right.delete]
   * @param  {[type]} sl    [原字符串]
   * @param  {[type]} leftn [长度]
   * @return {[type]}       [目标字符串]
   */

  function jsLeft(sl, leftn) {
    return sl.substring(0, leftn);
  }

  function jsRight(sr, rightn) {
    return sr.substring(sr.length - rightn, sr.length);
  }

  function jsOnRight(sr, rightn) {
    return sr.substring(0, sr.length - rightn);
  }
  /**
   * [getValidateRule 获取表单中所有文本输入框及选择框jQuery.Validate 校验字符串]
   * @param  {[type]} theForm [表单名]
   * @return {[type]}         [JSON格式校验字符串，remark备注信息为Fasle]
   */

  function getValidateRule(theForm) {
    var str = '',
      rule;
    $('form[name="' + theForm + '"] input[type="text"]').map(function(elem) {
      str += '"' + $(this).attr("name") + '":{"required":true,"number":true},';
    });
    $('form[name="' + theForm + '"] select').map(function(elem) {
      str += '"' + $(this).attr("name") + '":{"required":true},';
    });
    str = '{' + jsOnRight(str, 1) + '}';
    rule = $.parseJSON(str);
    rule.remark = {
      "require": false,
      "number": false
    };
    return rule;
  }

  /**
   * [getFormData 获取表单中所有文本输入框及选择框的值]
   * @param  {[type]} theForm [表单名]
   * @return {[type]}         [JSON格式校验字符串，remark备注信息为Fasle]
   */

  function getFormData(theForm) {
    var str = '';
    $('form[name="' + theForm + '"] input[type="text"]').map(function(elem) {
      str += '"' + $(this).attr("name") + '":"' + $(this).val() + '",';
    });
    $('form[name="' + theForm + '"] input[type="password"]').map(function(elem) {
      str += '"' + $(this).attr("name") + '":"' + $(this).val() + '",';
    });
    $('form[name="' + theForm + '"] select').map(function(elem) {
      str += '"' + $(this).attr("name") + '":"' + $(this).val() + '",';
    });
    str = '{' + jsOnRight(str, 1) + '}';
    var data = $.parseJSON(str);
    return data;
  }

  function sideBarHack() {
    //metronic 4.5 hack
    $('.page-sidebar-menu li:not(.heading)').addClass('nav-item');
    $('.page-sidebar-menu li.heading').addClass('nav-link nav-toggle');
    $('ul.page-sidebar-menu a').addClass('nav-link nav-toggle');
  }

  function RoundedTheme(iStyle) {
    components_ = iStyle ? 'components-rounded' : 'components';
    $('#style_components').attr("href", App.getGlobalCssPath() + components_ + ".css");
  }

  function HeadFix() {
    if ($(document.body).outerWidth(true) > 480) {
      $(".page-sidebar-wrapper").css("margin-top", "-18px");
    } else {
      $(".page-sidebar-wrapper").css("margin-top", "0px");
    }
  }

  /*$('body').on('click', '.nav-item', function() {
    $(this).parents('.page-sidebar').find('.active').removeClass('open').removeClass('active').removeClass('selected').find('span.selected').remove();
    $(this).addClass('open').addClass('active').addClass('selected');
    $(this).find('a.nav-toggle:nth(0)').prepend('<span class="selected"></span>');
  });*/

  /**
   * [handleCurSubMenu 处理侧边栏菜单的激活状态]
   * @return {[type]} [无返回值]
   */

  function handleCurSubMenu() {
    var url = window.location.href.split('/')[3].split('?')[0];
    var str;
    if (url == 'qualitytable' || url == 'qualitychart') {
      str = window.location.href.split('/')[3].split('&')[0];
    } else {
      var strTemp = window.location.href.split('?')[0].split('http://')[1].split(url)[1];
      str = url + ((typeof strTemp == 'undefined') ? '' : strTemp);
    }
    var obj = $('.page-sidebar [href*="' + str + '"]').parents('li');
    obj.addClass('open active selected').find('a.nav-toggle:nth(0)').prepend('<span class="selected"></span>');
    obj.find('.arrow').addClass('open');

    //文档标题及页面大标题更新
    var titleArr = obj.find('a.nav-toggle:nth(0)').text().trim();
    if (titleArr !== "") {
      titleArr = titleArr.split('   ');
      str = (titleArr.length > 2) ? titleArr[titleArr.length - 2] + ' - ' + titleArr[titleArr.length - 1] : titleArr[titleArr.length - 1];
      $('head title').text(str);
      $('.page-title [name="TableTitle"]').text(titleArr[titleArr.length - 1]);
    }
  }


  //系统新功能提示
  function appVersionTips() {
    var alertInfo = false;
    var localVersion = Number.parseFloat(localStorage.appVersion);
    if (typeof localStorage.appVersion == 'undefined') {
      localStorage.setItem("appVersion", curVersion);
      alertInfo = true;
      localVersion = 0;
    } else if (localVersion < curVersion) {
      alertInfo = true;
    }
    //获取程序版本信息
    if (alertInfo) {
      localStorage.setItem("appVersion", curVersion);
      var url = getRootPath(1) + "/assets/pages/controller/data/update_info.json";
      $.get(url, function(json) {
        json.appInfo.map(function(appInfo) {
          //比当前版本号更大
          var info = '更新说明';
          if (appInfo.version > localVersion) {
            info += "\n\n<hr><p>【版本号】: " + appInfo.version + "</p>\n<p>【更新日期】: " + appInfo.date + "</p>\n<p>【近期功能更新】：</p>\n" + appInfo.html;
            infoTips(info + "\n<hr><p>本信息下次不再提示！</p>");
          }
        });

      });
    }
  }


  function initDom() {
    //sideBarHack();
    HeadFix();
    if ($("#today") !== 'undefined') {
      $("#today").text(today(0));
    }
    loadMenuSettings();
    handleCurSubMenu();
    setLocationUrl();
    //程序版本升级提醒
    appVersionTips();
  }

  //载入用户头像（临时方案)
  var initAvatarImages = (function() {
    var avatarName = $('.username').data('avatar');
    var refreshUserHeadInfo = function(smallAvatarName) {
      if (typeof smallAvatarName == 'undefined') {
        smallAvatarName = avatarName;
      }
      var avatarUrl = getRootPath(1) + '/demo/avatar/' + smallAvatarName + '.jpg?' + Date.parse(new Date());
      //右上角图标
      $('.username').parent().find('img').attr('src', avatarUrl);
      //用户信息
      $('.profile-userpic img').attr('src', avatarUrl);
      if (typeof $('.username').data('avatar') != 'undefined') {
        localStorage.setItem('avatarUrl', avatarUrl);
      }

      if (typeof localStorage.avatarUrl != 'undefined') {
        //锁屏
        $('.lock-avatar-block img').attr('src', localStorage.avatarUrl);
      }
    };

    //var avatar = getRootPath(1) + '/demo/avatar/' + avatarName + '.jpg?' + Date.parse(new Date());
    refreshUserHeadInfo($('.username').data('set-avatar') == 1 ? avatarName : 'Avatar_none');

    /*$.ajax({
      url: avatar,
      success: function() {
        refreshUserHeadInfo();
      },
      error: function() {
        refreshUserHeadInfo("Avatar_none");
      }
    });*/
  })();

  function setLocationUrl() {
    lastUrl = (typeof localStorage.lastUrl == 'undefined') ? getRootPath(1) + '/welcome' : window.location.href;
    localStorage.setItem("lastUrl", lastUrl);
  }

  function hideSidebarTool() {
    $('.page-header .dropdown-quick-sidebar-toggler').hide();
  }

  function loadMenuSettings() {
    $('.page-sidebar-menu:eq(0)').html(GBK2UTF(localStorage.settings_default_menu));
  }

  /**
   * [CreateTableHead 创建表格头_要求]
   * @param {[type]} Data     [表格数据/数据接口定义]
   * @param {[type]} editMode [是否增加编辑/删除]
   */

  function CreateTableHead(Data, editMode) {
    var strRow = '',
      strTD = '',
      str = '';
    var i = 0;
    Data.header.map(function(elem) {
      if (i) {
        strTD += '<th>' + elem.title + '</th>';
      }
      i++;
    });
    if (editMode) {
      str = '<th>编辑 </th>';
      str += '<th>删除 </th>';
    }
    strRow += '<tr>' + strTD + str + '</tr>';
    return strRow;
  }

  //生成表格体 

  function CreateTableBody(Data, editMode) {
    var strRow = '',
      strTD = '',
      str = '';
    var ID, i;
    Data.data.map(function(elem) {
      i = 0;
      ID = elem[0];
      if (editMode) {
        str = '<td><a class="edit" href="javascript:;" data-sn="' + ID + '">编辑</a></td>';
        str += '<td><a class="delete" href="javascript:;" data-sn="' + ID + '">删除</a></td>';
      }
      strTD = '';
      elem.map(function(elem) {
        if (i) {
          strTD += '<td>' + elem + '</td>';
        }
        i++;
      });
      strRow += '<tr>' + strTD + str + '</tr>';
    });
    return strRow;
  }
  //iCheck控件初始化及设置值

  function iChechBoxInit() {
    var obj = $('.icheck');
    obj.iCheck({
      checkboxClass: 'icheckbox_square-green', //'icheckbox_square-red'
      radioClass: 'iradio_square-green',
      increaseArea: '10' // optional
    });
  }

  function SetiCheckChecked(Name, nID) {
    $(".icheck[name='" + Name + "']:nth(" + nID + ")").iCheck('toggle');
  }

  function GetiCheckChecked(Name) {
    for (var i = $(".icheck[name='" + Name + "']").length - 1; i >= 0; i--) {
      if ($(".icheck[name='" + Name + "']:nth(" + i + ")").prop("checked")) {
        return i;
      }
    }
    return -1;
  }

  function SetSingleiCheck(Name, status) {
    if (status) {
      $(".icheck[name='" + Name + "']").iCheck('check');
    } else {
      $(".icheck[name='" + Name + "']").iCheck('unCheck');
    }
  }
  //设置Radio

  function SetRadioChecked(Name, nID) {
    $("input[name='" + Name + "']:nth(" + nID + ")").attr('checked', 'true');
  }
  //获取Radio值

  function GetRadioChecked(Name) {
    return $("input[name='" + Name + "']:checked").val();
  }

  //select2 初始化

  function initSelect2() {
    $.fn.select2.defaults.set("theme", "bootstrap");
    $(".select2, .select2-multiple").select2({
      width: null
    });
  }

  function SetSelect2Val(Name, val) {
    $("select[name='" + Name + "']").select2('val', val);
  }

  function ResetSelect2(Name) {
    $("select[name='" + Name + "']").select2("val", "");
  }

  function GetSelect2Text(Name) {
    var arr = "";
    $("select[name='" + Name + "']").find('option:selected').each(function() {
      arr += "," + this.text;
    });
    return arr.substr(1);
  }

  //顶部搜索框
  var initSearchBox = function() {
    // handle search box expand/collapse        
    $('.page-header').on('click', '.search-form', function(e) {
      $(this).addClass("open");
      $(this).find('.form-control').focus();

      $('.page-header .search-form .form-control').on('blur', function(e) {
        $(this).closest('.search-form').removeClass("open");
        $(this).unbind("blur");
      });
    });
  };

  $('#QueryData').on('click', function() {
    $('body').toggleClass('page-quick-sidebar-open');
    App.scrollTop();
  });

  /**
   * [AutoRefresh 定时刷新]
   * @param {[type]} action [执行函数]
   * @param {[type]} time   [刷新时间]
   * 返回值： 返回刷新ID
   * 调用示例：function success(){console.log(123)} ; AutoRefresh(success,3000);
   */

  function AutoRefresh(action, time) {
    var rId = setInterval(function() {
      action();
    }, time);
    $('body').data('refershID', rId);
  }

  function StopRefresh() {
    if (typeof $('body').data('refreshID') !== 'undefined') {
      clearInterval($('body').data('refreshID'));
    }
  }

  /**
   * [getRandomData 生成Folt图表所用的随机数组]
   * @param  {[type]} totalPoints [数据个数]
   * @param  {[type]} min/max [数据范围]
   * @return {[type]}             [返回数组]
   */
  var randomData = function() {
    return {
      flot: function(totalPoints, min, max) {
        var data = [],
          res = [];
        //if (data.length > 0) data = data.slice(1);
        // do a random walk
        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : min;
          var y = prev + Math.random() * 10 - 5;
          data.push(y);
        }
        // zip the generated y values with the x values
        for (var i = 0; i < data.length; ++i) res.push([i, data[i]]);
        return res;
      }
    };
  }();

  /**
   * [表单内INPUT输入框，支持上下左右切换焦点]
   */
  $('form input[type="text"]').keydown(function(event) {
    var key = event.keyCode;
    var obj = $('form input[type="text"]:enabled');
    var nxtIdx;
    switch (key) {
      case 37: //左
      case 38: //上
      case 107: //小键盘加号键
        event.preventDefault();
        nxtIdx = obj.index(this) - 1;
        if (nxtIdx >= 0) {
          obj.eq(nxtIdx).focus();
        }
        break;
      case 39: //右
      case 40: //下
      case 13: //回车键
        event.preventDefault();
        nxtIdx = obj.index(this) + 1;
        obj.eq(nxtIdx).focus();
        break;
    }
  });

  /**
   * [getDateRange 获取选择日期范围]
   * @return {[type]} [description]
   */

  function getDateRange() {
    var dateRange = $("#dashboard-report-range span").html();
    var date = {
      "start": dateRange.split(' ~ ')[0],
      "end": dateRange.split(' ~ ')[1]
    };
    return date;
  }

  function arrayRemove(arr, dx) {
    if (isNaN(dx) || dx > arr.length) {
      return false;
    }
    for (var i = 0, n = 0; i < arr.length; i++) {
      if (arr[i] != arr[dx]) {
        arr[n++] = arr[i];
      }
    }
    arr.length -= 1;
  }

  var shareTableExample = function(html) {
    var filename = $.base64.encode(new Date().getTime());
    $('#share textarea').text(' ');
    var fixheader = getUrlParam('fixheader');
    $.ajax({
      url: getRootPath(0) + '/demo/tableShare.php',
      type: 'POST',
      async: false,
      data: {
        filename: filename + ".html",
        contents: html
      },
      success: function(data) {
        try {
          var obj = $.parseJSON(data);
          var url = getRootPath(0) + obj.url + ((fixheader == '0') ? '?fixheader=0' : '');
          $('#share textarea').text(url);
          $('#successShare').click();
        } catch (e) {
          console.log(e);
          infoTips(data);
          bsTips('报表分享失败，请稍后重试', 0);
        }
      },
      error: function(e) {
        console.log(e);
        bsTips('报表分享失败，请稍后重试', 0);
      }
    });

  }

  var namedColors = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    grey: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };