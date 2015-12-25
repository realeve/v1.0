//信息提示框
/**
 * [infoTips 弹出信息提示框]
 * @param  {[type]} strMes [信息内容]
 * @param  {[type]} Type   [信息框的类型]
 * @return {[type]}        [弹出提示信息]
 */

function infoTips(strMes, Type, iContainer) {
  if (typeof iContainer === 'undefined') {
    iContainer = "";
  }
  switch (Type) {
    case 3:
      App.alert({
        container: iContainer, // alerts parent container(by default placed after the page breadcrumbs)
        place: "append", // append or prepent in container 
        type: "warning", // alert's type
        message: strMes, // alert's message
        close: true, // make alert closable
        reset: false, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 5, // auto close after defined seconds
        icon: "check" // put icon before the message
      });
      break;
    case 2:
      App.alert({
        container: iContainer, // alerts parent container(by default placed after the page breadcrumbs)
        place: "append", // append or prepent in container 
        type: "info", // alert's type
        message: strMes, // alert's message
        close: true, // make alert closable
        reset: false, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 5, // auto close after defined seconds
        icon: "check" // put icon before the message
      });
      break;
    case 1:
      App.alert({
        container: iContainer, // alerts parent container(by default placed after the page breadcrumbs)
        place: "append", // append or prepent in container 
        type: "success", // alert's type
        message: strMes, // alert's message
        close: true, // make alert closable
        reset: false, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 5, // auto close after defined seconds
        icon: "check" // put icon before the message
      });
      break;
    default:
      App.alert({
        container: iContainer, // alerts parent container(by default placed after the page breadcrumbs)  #bootstrap_alerts_demo
        place: "append", // append or prepent in container 
        type: "danger", // alert's type
        message: strMes, // alert's message
        close: true, // make alert closable
        reset: false, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 0, // auto close after defined seconds
        icon: "warning" // put icon before the message
      });
      break;
  }
}

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
  var b = date.getMonth() + 1;
  var c = date.getDate();
  var d = date.getHours();
  var e = date.getMinutes();
  var f = date.getSeconds();
  var output;
  switch (type) {
    case 0:
      output = a + '年' + b + '月' + c + '日';
      break;
    case 1:
      output = a + '-' + b + '-' + c + '- ' + d + ':' + e + ':' + f;
      break;
    case 2:
      output = a + '年' + b + '月' + c + '日' + d + '时' + e + '分' + f + '秒';
      break;
    case 3:
      output = a + '-' + b + '-' + c + '- ' + d + ':' + e;
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
  }
  return output;
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
  var Data;
  if (Type) {
    $.ajax({
      type: 'GET',
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        var obj = jQuery.parseJSON(data);
        Data = obj;
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      async: false, //同步
      //async: true,
      url: strUrl,
      success: function(data, status) {
        var obj = jQuery.parseJSON(data);
        Data = obj;
      }
    });
  }
  return Data;
}

function GetSelectStr(Data) {
  var i, str = '<option value=""></option>';
  for (i = 0; i < Data.rows; i++) {
    str += '<option value="' + Data.data[i][0] + '">' + Data.data[i][1] + '</option>';
  }
  return str;
}

function InitSelect(sel_Name, Data) {
  $("select[name='" + sel_Name + "']").html(GetSelectStr(Data));
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

//设置Radio

function SetRadioChecked(Name, nID) {
  $("input[name='" + Name + "']:nth(" + nID + ")").attr('checked', 1);
}
//获取Radio值

function GetRadioChecked(Name) {
  var i = 0;
  for (i = 0; i < $("input[name='" + Name + "']").length; i++) {
    if ($("input[name='" + Name + "']:nth(" + i + ")").attr('checked') == "checked") {
      return i;
    }
  }
}

//初始化标题栏时间选择器
//YYYYMMDD,YYYY-MM-DD

function initDashboardDaterange(YearType) {
  if (!jQuery().daterangepicker) {
    return;
  }

  $('#dashboard-report-range').daterangepicker({
      opens: (App.isRTL() ? 'right' : 'left'),
      startDate: moment().subtract(2, 'days'),
      endDate: moment(),
      minDate: '01/01/2009',
      maxDate: '12/31/2050',
      //dateLimit: {days: 3650},
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: false,
      ranges: {
        '今天': [moment(), moment()],
        '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '过去一周': [moment().subtract(6, 'days'), moment()],
        '过去三天': [moment().subtract(2, 'days'), moment()],
        '过去30天': [moment().subtract(29, 'days'), moment()],
        '本月': [moment().startOf('month'), moment().endOf('month')],
        '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
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
  $('#dashboard-report-range span').html(moment().subtract(2, 'days').format(YearType) + ' ~ ' + moment().format(YearType));
  $('#dashboard-report-range').show();
}

function getUrlParam(name) {
  /*var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r !== null) return unescape(r[2]);
  return null; //返回参数值*/
  return App.getURLParameter(name);
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

function HeadFix() {
  if ($(document.body).outerWidth(true) > 480) {
    $(".page-sidebar-wrapper").css("margin-top", "-18px");
  } else {
    $(".page-sidebar-wrapper").css("margin-top", "0px");
  }
}

function initDom() {
  //sideBarHack();
  HeadFix();
  if ($("#today") !== 'undefined') {
    $("#today").text(today(0));
  }
}