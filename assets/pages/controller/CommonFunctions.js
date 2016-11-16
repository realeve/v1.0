  //系统当前版本
  const curVersion = 1.40;
  if (typeof moment != 'undefined') {
    moment.locale('zh-cn');
  }

  /**
   * 表单名列表定义(select id,name from sysobjects where xtype = 'U')
   */
  //0-10 质量中心数据库
  const TBL = {
    "PHYSIC": 0, //'Paper_Para_PscData', //0 物理站
    "CHEM": 1, //'Paper_Para_ChemData', //1 化验站
    "SURFACE": 2, //'Paper_Para_SurfaceData', //2 物理外观指标
    "PPR_OPR": 3, //'Paper_Para_Operator', //3 操作员
    "PPR_PROD": 4, //'Paper_ProductData', //4 钞纸品种
    "PPR_MCH": 5, //'Paper_Machine_Info', //5 钞纸机台
    "PRT_PROD": 6, //'ProductData', //6 印钞品种
    "PRT_MCH": 7, //'MachineData', //7 印钞机台
    "PPR_VALIDATE": 8, //机检验证
    "PRINT_FAKEPIECE": 9, //大张废录入
    "PPR_FALSEWASTE": 10, //损纸误废
    "PPR_BATCHWASTE": 11, //批量报废
    "PPR_PENALTY": 12, //完成车间质量考核
    "PPR_ABNORMAL": 13, //非常规指标
    "PRINT_ENDURANCE": 14, //印刷耐性指标
    "PRINT_MANUALFLUORANCE": 15, //人工大张抽检荧光

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

  //全局配置
  const config = {
    TOKEN: '79d84495ca776ccb523114a2120e273ca80b315b',
    search: {
      ERR: -1,
      CART: 0,
      REEL: 1,
      CODE: 2,
      GZ: 3,
      PAPERNO: 4,
      CODENO: 5
    },
    TPL: getRootPath(1) + '/assets/pages/controller/data/tpl/',
    SHOWDEBUGTIME: true,
    cache: 10, //数据缓存10分钟
    info: {
      select2: false,
      qualitytable: false
    }
  };

  //信息提示框
  /**
   * [infoTips 弹出信息提示框]
   * @param  {[type]} strMes [信息内容]
   * @param  {[type]} Type   [信息框的类型]
   * @return {[type]}        [弹出提示信息]
   */
  window.console && window.console.info("喜欢看 质量控制中心 的代码，还是发现了什么bug？不如和我们一起为它添砖加瓦吧！\n电话:8275-6129；\n微信:宾不厌诈");

  function addMask(message) {
    //var str = '<div class="cbp-popup-wrap cbp-popup-lightbox cbp-popup-singlePage cbp-popup-singlePage-open cbp-popup-ready cbp-popup-transitionend cbp-popup-singlePage-sticky" data-action style="display: block;">\
    //
    var str = '<div class="cbp-popup-wrap cbp-popup-lightbox cbp-popup-ready font-grey-steel" style="text-align:left;">\
        <div class="col-md-10">' +
      message + '</div>\
        <div class="cbp-popup-close"></div>\
      </div>';
    $('body').append(str);

    //,.cbp-popup-wrap
    $('.cbp-popup-close').on('click', function() {
      $('.cbp-popup-wrap').remove();
    });
  }

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
      "positionClass": "toast-bottom-right",
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
    var date = new Date();
    var a = date.getFullYear();
    var b = jsRight(('0' + (date.getMonth() + 1)), 2);
    var c = jsRight(('0' + date.getDate()), 2);
    var d = jsRight(('0' + date.getHours()), 2);
    var e = jsRight(('0' + date.getMinutes()), 2);
    var f = jsRight(('0' + date.getSeconds()), 2);
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
      case 7:
        output = a + '-' + b;
        break;
      case 8:
        output = a + b + c;
        break;
    }
    /*var output;
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
    }*/
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

  function handleAjaxData(data) {
    data = data.replace(/\r\n/g, '<br>').replace(/\t/g, ' ').replace(/  */g, ' ').replace(/<br><br>/g, '<br>').replace(/<br> <br>/g, '<br>').replace(/\\/g, '、');
    return jQuery.parseJSON(data);
  }

  //读取指定URL的JSON数据
  function ReadData(strUrl, Type) {
    var tid = strUrl.split('ID=')[1].split('&')[0];
    if (config.SHOWDEBUGTIME) {
      tid += ' 共耗时';
      console.time(tid);
    }
    var Data = {};
    Type = (Type) ? 'GET' : 'POST';
    $.ajax({
      type: Type,
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        //处理换行字符
        Data = handleAjaxData(data);
      },
      error: function(e) {
        console.log("read data error:<br>");
        console.log(e.responseText);
      }
    });
    if (config.SHOWDEBUGTIME) {
      console.timeEnd(tid);
    }
    return Data;
  }

  /**读取本地JSON**/

  function ReadJson(url) {
    var Data;
    $.get({
      url: url,
      async: false,
      success: function(json) {
        Data = json;
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
    if (!jQuery().daterangepicker || !$('#dashboard-report-range')) {
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
    var rangeStr = ['今天', '昨天', '过去三天', '过去一周', '过去30天', '本月', '上月', '去年同期', '本季度', '上季度', '上半年', '下半年', '今年'];
    var ranges = {};

    rangeStr.map(function(day, i) {
      ranges[day] = rangeArr[i];
    });

    var dateRange = function(mode) {
      return rangeArr[mode][0].format(YearType) + ' ~ ' + rangeArr[mode][1].format(YearType);
    };

    //默认选择最近一周
    var paramRange = getUrlParam('daterange');
    var defaultRange = (paramRange === null) ? 3 : Number.parseInt(paramRange);

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
      str += '"' + $(this).attr("name") + '":{"required":true,"min":0},';
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
    var file = iStyle ? 'components-rounded' : 'components';
    var obj = $('#style_components');
    //不一样时才加载
    // if (obj.attr('href').indexOf(file + '.') == -1) {
    //   obj.attr("href", App.getGlobalCssPath() + file + ".min.css");
    // }
    if (file == 'components' && typeof obj.attr('href') == 'undefined') {
      obj.attr("href", App.getGlobalCssPath() + file + ".min.css");
    }

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
    var hrefTag = window.location.href.split('/')[3];
    var url = hrefTag.split('?')[0];
    var str, obj;
    if (url == 'qualitytable' || url == 'qualitychart') {
      str = hrefTag.split('&')[0];
    } else {
      var strTemp = window.location.href.split('?')[0].split('http://')[1].split(url)[1];
      str = url + ((typeof strTemp == 'undefined') ? '' : strTemp);
    }

    obj = $('[href=' + '"/' + url + '"]').parents('li');
    if (window.location.href.split('/').length > 4 || url == 'qualitytable' || url == 'qualitychart') { //非一级标题
      obj = $('.page-sidebar [href*="' + str + '"]').parents('li');
    } else if (hrefTag == 'welcome' || hrefTag === '' || hrefTag == 'index.php') {
      obj = $('[href="/index.php"]').parents('li');
    }

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
      json = ReadJson(url);
      var html = '';
      json.appInfo.map(function(appInfo) {
        //比当前版本号更大
        var info = '';
        if (appInfo.version > localVersion) {
          info += '<div class="col-md-6 margin-top-10"><p>【版本号】: ' + appInfo.version + "</p><p>【更新日期】: " + appInfo.date + "</p><p>【近期功能更新】：</p>" + appInfo.html;
          //infoTips(info + "\n<hr><p>本信息下次不再提示！</p>");
          html += (info + "</div>");
        }
      });
      addMask(html);
    }
  }

  function extendValidateRule() {
    //验证是否为车号
    jQuery.validator.addMethod("isCartNumber", function(value, element) {
      var num = /^\[1-9]d{3}[A-Za-z]\d{3}$/;
      return this.optional(element) || (num.test(value));
    }, "请检查车号信息是否正确，第4位应为字母");

    //验证是否为轴号
    jQuery.validator.addMethod("isReelCode", function(value, element) {
      var num = /^[1-9]\d{6}[A-Ca-c]$/;
      return this.optional(element) || (num.test(value));
    }, "请检查轴号格式是否正确，最后一位应为幅(字母)");
  }

  function whiteBackground() {
    $('body').addClass('page-content-white').removeClass('page-container-bg-solid');
  }

  function toggleSidebar() {
    $('body').toggleClass('page-sidebar-closed');
    $('.page-sidebar-menu').toggleClass('page-sidebar-menu-closed');
  }

  function initDom(fixheader) {
    //sideBarHack();
    fixheader = (typeof fixheader == 'undefined') ? 1 : fixheader;
    if (fixheader) {
      HeadFix();
    }

    if ($("#today") !== 'undefined') {
      var strDate = today(0);
      if (getUrlParam('drill') !== null) {
        strDate += ' <span class="badge badge-info"> 数据钻取 </span>';
      }

      $("#today").html(strDate);
    }

    if (jQuery().datepicker && typeof $.fn.datepicker.dates != 'undefined') {
      $.fn.datepicker.dates.en = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        today: "今日",
        clear: "清除",
        //format: "yyyy年mm月dd日",
        format: "yyyy-mm-dd",
        titleFormat: "yyyy年mm月",
        weekStart: 1
      };

      $('.date-picker').datepicker({
        language: 'en'
      });
    }

    $('input').on('focus', function() {
      $(this).select();
    });

    loadMenuSettings();
    handleCurSubMenu();
    setLocationUrl();
    //程序版本升级提醒
    appVersionTips();

    initSearchBox();
  }

  //载入用户头像（临时方案)
  var initAvatarImages = (function() {

    function setAvatar(avatarUrl) {
      //右上角头像
      $('.username').parent().find('img').attr('src', avatarUrl);
      //用户信息
      $('.profile-userpic img').attr('src', avatarUrl);

      //锁屏
      $('.lock-avatar-block img').attr('src', avatarUrl);
    }

    var refreshUserHeadInfo = function() {
      var avatarUrl;
      var avatarName = $('.username').data('set-avatar') == 1 ? $('.username').data('avatar') : 'Avatar_none'

      if (typeof localStorage.avatarUrl != 'undefined') {
        avatarUrl = localStorage.avatarUrl;
      } else {
        //缓存头像
        // if (typeof smallAvatarName == 'undefined') {
        //   smallAvatarName = avatarName;
        // }
        avatarUrl = getRootPath(1) + '/demo/avatar/' + avatarName + '.jpg';
      }

      if (avatarUrl.indexOf('http://') != -1) {
        $.ajax({
            url: getRootPath(1) + '/datainterface/base64?src=' + avatarUrl,
          })
          .done(function(avatar) {
            setAvatar(avatar);
            localStorage.setItem('avatarUrl', avatar);
          });
      } else {
        setAvatar(avatarUrl);
      }
    }();

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


  function handleTable(url, obj) {
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = handleAjaxData(data);
        if (data.rows === 0) {
          obj.parent().hide();
          obj.html('');
          return;
        }
        obj.parent().show();

        var strHead = '<thead><tr>';
        data.header.map(function(item) {
          strHead += '<th>' + item.title + '</th>';
        });
        strHead += '</tr></thead><tobdy>';

        var strTr = '';
        data.data.map(function(row) {
          strTr = '<tr>';
          row.map(function(item) {
            strTr += '<td>' + item + '</td>';
          });
          strTr += '</tr>';
          strHead += strTr;
        });
        strHead += '</tobdy>';
        obj.html(strHead);
      });
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

  function iCheckBoxInit() {
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
    initPinYin();
    $.fn.select2.defaults.set("theme", "bootstrap");
    //中文简拼、中文全拼检索
    function matchStart(term, text) {
      if (typeof text.toPinYin !== 'undefined') {
        if (text.toPinYin().indexOf(term.toUpperCase()) >= 0) {
          return true;
        } else if (text.toPinYinFull().toUpperCase().indexOf(term.toUpperCase()) >= 0) {
          return true;
        }
      }
      return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
    }

    $.fn.select2.amd.require(['select2/compat/matcher'], function(oldMatcher) {
      $(".select2, .select2-multiple").select2({
        matcher: oldMatcher(matchStart),
        width: null,
      });
    });
    if (!config.info.select2) {
      config.info.select2 = true;
      infoTips('本页面下拉选择框支持中文拼音模糊过滤<br/><br/>例如在列表中有一项为 “测试数据” 的下拉项，点击下拉框后输入以下信息均可过滤出该条信息:<br/><br/>拼音首字母——cssj<br/>拼音全拼——ceshishuju<br/>部分中文——测试<br/>部分拼音——cs');
    }
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

  function judgeSearchType(str) {
    var rules = {
      cart: /^[1-9]\d{3}[A-Za-z]\d{3}$/,
      reel: /^[1-9]\d{6}[A-Ca-c]$|[1-9]\d{4}$|[1-9]\d{4}[A-Ca-c]$|[1-9]\d{6}$/,
      gz: /^[A-Za-z]{2}\d{4}$|[A-Za-z]\d[A-Za-z]\d{3}$|[A-Za-z]\d{2}[A-Za-z]\d{2}$/,
      code: /^[A-Za-z]{2}\d{8}$|[A-Za-z]\d[A-Za-z]\d{7}$|[A-Za-z]\d{2}[A-Za-z]\d{6}$/
    };

    if (rules.cart.test(str)) {
      return config.search.CART;
    } else if (rules.reel.test(str)) {
      return config.search.REEL;
    } else if (rules.code.test(str)) {
      return config.search.CODE;
    } else if (rules.gz.test(str)) {
      return config.search.GZ;
    } else {
      return config.search.ERR;
    }
  }

  //顶部搜索框
  var initSearchBox = function() {

    function queryData() {
      if ($('.search-form').hasClass('open')) {
        var str = $('[name=query]').val().toUpperCase();
        var type = judgeSearchType(str);
        var url;
        var curPage = window.location.pathname;

        switch (type) {
          case config.search.CART:
          case config.search.GZ:
          case config.search.CODE:
            url = getRootPath(1) + '/search/#' + str;
            break;
          case config.search.REEL:
            url = getRootPath(1) + '/search/paper#' + str;
            break;
          default:
            bsTips('暂时只支持车号/轴号/冠字号/轴号查询，请确认输入格式');
            break;
        }

        if (type > config.search.ERR) {
          if ((curPage.indexOf('/search') === 0 || curPage.indexOf('/search/paper') === 0) && curPage.indexOf('/search/feedback') !== 0) {
            location.hash = str;
            $('.search-form .submit').attr('href', '#' + str);
          } else {
            window.location.href = url;
            //$('.search-form .submit').attr('href', url);
          }
        }
      }
    }

    // handle search box expand/collapse
    $('.search-form .icon-magnifier').on('click', function() {
      queryData();
    });

    //回车
    $('.search-form').on('keydown', function(event) {
      if (event.keyCode === 13) {
        queryData();
      }
    });

  };



  //侧边栏查询数据
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
    var obj = $('input[type="text"]:not(.date-picker,[name="query"]):enabled');
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
  };

  function isUndefined(obj) {
    return obj === void 0;
  }


  var tpl = (function() {

    var renderObj = {};

    function getKey(tplUrl) {
      return tplUrl.split('.etpl')[0];
    }

    function getHTML(tplUrl, data) {
      var key = getKey(tplUrl);
      return renderObj[key](data);
    }

    /**
     * [renderDom eTpl 渲染HTML]
     * @param  {[type]} tplUrl [tpl路径]
     * @param  {[type]} data   [数据]
     * @param  {[type]} objDom [被渲染的Dom节点]
     * @return {[type]}        [description]
     */
    function renderDom(tplUrl, data, objDom) {

      var html = getHTML(tplUrl, data);
      objDom.html(html);

      //更新时间信息
      var obj = objDom.find("[name=isodate]");
      if (obj.length && typeof $.fn.prettyDate == 'function') {
        $("[name=isodate]").prettyDate({
          interval: 10000
        });
      }

      if (objDom.find('.scroller').length) {
        App.initSlimScroll('.scroller');
      }

    }

    //注册slice过滤器
    function filterExpend() {

      etpl.addFilter('slice', function(source, start, end) {
        return source.slice(start, end);
      });

      //多维数组引用
      etpl.addFilter('quote', function(source, data, idx) {
        return data[idx];
      });

    }
    var isInited = false;
    //初始化
    /**
     * [initRender 预编译模块]
     * @param  {[type]}   tplList  [模板列表]
     * @param  {Function} callback [回调]
     * @return {[type]}            [description]
     */
    function initRender(tplList, callback) {
      tplList.map(function(tplUrl, idx) {
        $.ajax({
            url: config.TPL + tplUrl,
          })
          .done(function(tpl) {
            //缓存 compile后的对象
            var key = getKey(tplUrl);
            renderObj[key] = etpl.compile(tpl);

            if (idx == tplList.length - 1) {
              isInited = true;
              if (typeof callback !== 'undefined') {
                callback();
              }
            }
          });
      });
    }

    function renderTable(objDom, url, option, callback) {

      $.ajax({
          url: url
        })
        .done(function(data) {
          data = handleAjaxData(data);

          if (data.rows === 0) {
            objDom.html('<h4> 未搜索到相关信息 </h4>');
            return;
          }

          if (typeof callback == 'function') {
            callback(data);
          }

          if (typeof option == 'undefined') {
            option = [{
              start: 1,
              end: data.cols,
              dom: objDom,
              title: data.title,
              showHead: false,
              direction: 'hor',
              repeat: {
                switch: false
              },
              class: ''
            }];
          }

          option.map(function(item) {
            var qua = {
              title: item.title,
              rows: data.rows,
              cols: data.cols,
              source: data.source,
              header: data.header.slice(item.start, item.end),
              noScroll: 1,
              class: (typeof item.class == 'undefined') ? '' : item.class,
              showHead: item.showHead,
              data: [] //纵向排列 data.data[0].slice(1, 15)
            };


            if (typeof item.repeat != 'undefined' && item.repeat.switch) {

              qua.header = data.header.slice(item.repeat.start, item.repeat.end).concat(qua.header);

              data.data.map(function(iData) {
                qua.data.push(iData.slice(item.repeat.start, item.repeat.end).concat(iData.slice(item.start, item.end)));
              });
            } else {
              data.data.map(function(iData) {
                qua.data.push(iData.slice(item.start, item.end));
              });
            }

            if (typeof item.dom == 'undefined') {
              item.dom = objDom;
            }

            tpl.render(item.direction == 'hor' ? 'simpleTable.etpl' : 'search/screenQuality.etpl', qua, item.dom);

          });

        })
        .fail(function() {
          console.log("read data error:<br>");
          console.log(e.responseText);
        });
    }

    return {
      init: function(tplList, callback) {
        filterExpend();
        initRender(tplList, callback);
      },
      isInited: function() {
        return isInited;
      },
      render: renderDom,
      getHTML: getHTML,
      renderTable: renderTable
    };

  })();



  function getWeekdayByDate(strDate) {
    var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myDate = new Date(Date.parse(strDate.replace(/-/g, "/")));
    return weekDay[myDate.getDay()];
  }


  function getSimpleEChart(obj, type) {
    type = type | 0;
    return {
      tooltip: {
        trigger: obj.type == 'bar' ? 'item' : 'axis',
        formatter: '{b}<br>{c}%'
      },
      color: ['#e12330'],
      xAxis: {
        type: 'category',
        boundaryGap: obj.type == 'bar',
        data: obj.xAxis,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        show: type
      },
      grid: {
        x: type ? 50 : 30,
        y: 10,
        x2: 10,
        y2: 20
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        min: 0,
        max: 100
      },
      series: [{
        type: obj.type,
        smooth: true,
        barMaxWidth: 25,
        data: obj.yAxis
      }]
    };
  }

  /* File Created: 六月 10, 2015 */
  /***************
  创造者：cst
  功能：js将汉字转拼音
  调用：chnToPy("汉字")
  ***************/
  function initPinYin() {
    var url = getRootPath(1) + "/assets/pages/controller/data/pinyin_list.min.json";
    $.ajax({
        url: url
      })
      .done(function(PinYin) {
        function chnToPy(l1, shortMode) {
          var l2 = l1.length;
          var I1 = "";
          var reg = new RegExp('[a-zA-Z0-9\- ]');
          for (var i = 0; i < l2; i++) {
            var val = l1.substr(i, 1);
            var name = arraySearch(val, PinYin, shortMode);
            if (reg.test(val)) {
              I1 += val;
            } else if (name !== false) {
              I1 += name;
            }

          }
          I1 = I1.replace(/ /g, '-');
          while (I1.indexOf('--') > 0) {
            I1 = I1.replace('--', '-');
          }
          return I1;
        }

        function arraySearch(l1, l2, shortMode) {
          for (var name in PinYin) {
            if (PinYin[name].indexOf(l1) != -1) {
              return ucfirst(name, shortMode);
            }
          }
          return false;
        }

        function ucfirst(l1, shortMode) {
          if (l1.length > 0) {
            var first = l1.substr(0, 1).toUpperCase();
            var spare = shortMode ? "" : l1.substr(1, l1.length);
            return first + spare;
          }
        }

        String.prototype.toPinYin = function() {
          return chnToPy(this, true);
        };
        String.prototype.toPinYinFull = function() {
          return chnToPy(this, false);
        };
      });
  }


  var RGB2Lab = function(RGB) {

    var gamma = function(x) {
      return x > 0.04045 ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92;
    };

    var B = gamma(RGB.b / 255);
    var G = gamma(RGB.g / 255);
    var R = gamma(RGB.r / 255);

    var X = 0.412453 * R + 0.357580 * G + 0.180423 * B;
    var Y = 0.212671 * R + 0.715160 * G + 0.072169 * B;
    var Z = 0.019334 * R + 0.119193 * G + 0.950227 * B;　　

    X /= 0.95047;　　
    // Y /= 1.0;　　
    Z /= 1.08883;

    var FX = X > 0.008856 ? Math.pow(X, 1 / 3) : (7.787 * X + (16 / 116));
    var FY = Y > 0.008856 ? Math.pow(Y, 1 / 3) : (7.787 * Y + (16 / 116));
    var FZ = Z > 0.008856 ? Math.pow(Z, 1 / 3) : (7.787 * Z + (16 / 116));

    var lab = {
      l: Y > 0.008856 ? (116.0 * FY - 16.0) : (903.3 * Y),
      a: 500 * (FX - FY),
      b: 200 * (FY - FZ)
    };
    return {
      l: parseInt(lab.l.toFixed(0), 10),
      a: parseInt(lab.a.toFixed(0), 10),
      b: parseInt(lab.b.toFixed(0), 10)
    };
  };

  var Lab2RGB = function(Lab) {
    var L = Lab.L,
      a = Lab.a,
      b = Lab.b;

    function getVar(x) {
      var X3 = Math.pow(x, 3);
      return X3 > 0.008856 ? X3 : (x - 16 / 116) / 7.787;
    }

    function getRGBVar(x) {
      x = (x > 0.0031308) ? 1.055 * (Math.pow(x, (1 / 2.4))) - 0.055 : x = 12.92 * x;
      return parseInt((x * 255).toFixed(0), 10);
    }

    //Lab2XYZ;
    var var_Y = (L + 16) / 116;
    var var_X = a / 500 + var_Y;
    var var_Z = var_Y - b / 200;

    var_X = getVar(var_X);
    var_Y = getVar(var_Y);
    var_Z = getVar(var_Z);

    var X = 95.047 * var_X; //ref_X =  95.047     Observer= 2°, Illuminant= D65
    //var Y = 100 * var_Y; //ref_Y = 100.000
    var Z = 108.883 * var_Z; //ref_Z = 108.883


    //XYZ2RGB
    var_X = X / 100; //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
    //var_Y = Y / 100; //Y from 0 to 100.000
    var_Z = Z / 100; //Z from 0 to 108.883

    var_R = var_X * 3.2406 - var_Y * 1.5372 - var_Z * 0.4986;
    var_G = -var_X * 0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
    var_B = var_X * 0.0557 - var_Y * 0.2040 + var_Z * 1.0570;

    return {
      r: getRGBVar(var_R),
      g: getRGBVar(var_G),
      b: getRGBVar(var_B)
    };
  };