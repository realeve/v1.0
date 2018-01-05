// localstorage的key键前缀
var MAIN_KEY = "paper_cutRecord";

var cutWaste = (function() {
  var gb = {
    initLoad: true,
    updateMode: 0
  };

  function focusInput() {
    $('form input[type="text"]')
      .eq(0)
      .focus();
  }

  // id:486
  // SELECT a.reel_code,CONVERT (VARCHAR, rec_time, 120) AS rec_time,a.reel_weight,a.waste_num,a.suspect_num,a.ream_package,a.ream_check,a.ream_69,a.ream_49,a.ream_reel_head_tail,a.class_name,a.class_time,a.operator_guide_edge,a.operator_quality_check,a.operator_paper_container,a.operator_paper_check,a.operator_counter,a.operator_package,a.operator_captain,a.remark FROM paper_cutwaste a WHERE a.machine_id =? AND DATEDIFF(DAY, [rec_time], getdate()) <= 1
  // param:mid
  function loadHisData() {
    var objTbody = $('[name="reelList"] tbody');
    var machine_id = $('select[name="machine_id"]').val();
    if (machine_id == null || machine_id == "" || machine_id == -1) {
      bsTips("请选择机台信息");
      return;
    }
    var str =
      getRootPath(1) +
      "/DataInterface/Api?Token=" +
      config.TOKEN +
      "&ID=486&M=3&mid=" +
      machine_id;
    $.ajax({
      url: str
    }).done(function(Data) {
      Data = handleAjaxData(Data);
      var reelCounts = Data.rows;
      if (reelCounts == 0) {
        bsTips("当天无相关数据");
        return;
      }

      function getTDStr(data, i) {
        var str = "<tr>" + " <td>" + i + "</td>";
        data.map(function(td) {
          str += "  <td>" + td + "</td>";
        });
        str += "</tr>";
        return str;
      }
      var tBody = "";
      Data.data.map(function(data, i) {
        tBody += getTDStr(data, i + 1);
      });
      objTbody.html(tBody);
    });
  }

  function getSelectInfo() {
    var str =
      getRootPath(1) +
      "/DataInterface/Api?Token=" +
      config.TOKEN +
      "&ID=24&M=3&t=1&cache=14400";

    $.ajax({
      url: str
    }).done(function(data) {
      var Data = handleAjaxData(data);
      InitSelect("prod_id", Data);
    });

    //select machine_id,machine_name from paper_machine_info where Proc_ID=1
    str =
      getRootPath(1) +
      "/DataInterface/Api?Token=" +
      config.TOKEN +
      "&ID=23&M=3&t=1&cache=14400";

    $.ajax({
      url: str
    }).done(function(data) {
      var Data = handleAjaxData(data);
      InitSelect("machine_id", Data);
    });

    initSelect2();

    // 载入历史设置
    var machine_id = localStorage.getItem(MAIN_KEY + "cut_machine_id");
    if (machine_id == null) {
      return;
    }
    setTimeout(function() {
      SetSelect2Val("machine_id", machine_id);
      loadHisData();
    }, 1000);
  }

  function initDOM() {
    getSelectInfo();

    $("input[name='reel_code']").maxlength({
      limitReachedClass: "label label-danger",
      threshold: 3
    });
    $(".page-header .dropdown-quick-sidebar-toggler").hide();

    focusInput();
  }

  function getReelData() {
    var reel_code = $('input[name="reel_code"]').val();
    /**
     *  SELECT a.id,a.reel_code, a.prod_id, a.oper_id, a.machine_id, CONVERT(VARCHAR(10),a.rec_date,120) as rec_date, a.validate_num, a.number_right, a.package_weight, a.serious_fake, a.normal_fake_h, a.normal_fake_m, a.normal_fake_l, a.reel_end, a.suspect_paper, a.well_paper, a.other, a.rec_time, a.passed, a.cut_weight  FROM dbo.Paper_Validate AS a  WHERE cast(prod_id as varchar)+ reel_code=?
     *  param: r
     */
    var strUrl =
      getRootPath(1) +
      "/DataInterface/Api?Token=" +
      config.TOKEN +
      "&ID=487&M=0&r=" +
      reel_code;
    var Data = ReadData(strUrl);
    if (Data.rows == 0) {
      return 0;
    }

    //将上次载入的轴号记录
    $('input[name="reel_code"]').data("reelcode", reel_code);
    Data.header.map(function(elem) {
      var keys = elem.title;
      $('form .form-control[name="' + keys + '"]').val(Data.data[0][keys]);
    });

    SetSelect2Val("prod_id", Data.data[0].prod_id);
    SetSelect2Val("machine_id", Data.data[0].machine_id);

    $('.portlet [type="submit"]')
      .data("sn", Data.data[0].id)
      .html('更新  <i class="icon-cloud-upload"></i>');

    gb.updateMode = 1;

    bsTips("历史数据载入成功", 1);
    return 1;
  }

  $('input[name="reel_code"]').on("blur", function(event) {
    if ($(this).val().length > 1) {
      if (getReelData()) {
        $('.portlet [type="submit"]').html(
          '更新  <i class="icon-cloud-upload"></i>'
        );
      }
    } else if (gb.updateMode == 1) {
      if ($(this).data("reelcode") != $(this).val()) {
        $('.portlet [type="submit"]').html(
          '提交  <i class="icon-cloud-upload"></i>'
        );
      }
    }
  });

  $('input[name="reel_code"]').on("keyup", function() {
    var obj = $(this);
    //取右边一位信息
    var curVal = jsRight(obj.val(), 1);
    if (obj.val().length == 2) {
      if (curVal == 7) {
        curVal = 8;
      }
      SetSelect2Val("prod_id", curVal);
    }
    updateClassTime();
  });

  $(".err-reason").on("keyup", function() {
    $(".err-reason")
      .closest(".form-group")
      .removeClass("has-error");
  });

  function updateClassTime() {
    var classTime = Math.floor(new Date().getHours() / 8);
    var classList = [ "夜班","白班", "中班"];
    $('[name="class_time"]').val(classList[classTime]);

    var machineName = GetSelect2Text("machine_id");
    if (machineName == "帕萨班") {
      $('[name="ream_69"]').val(0);
      $('[name="ream_49"]').val(0);
    }
  }

  var handleValidate = (function() {
    var vRules = {
      reel_code: {
        minlength: 6,
        maxlength: 14,
        number: false,
        required: true
      },
      prod_id: {
        required: true
      },
      waste_num: {
        required: true
      }
    };

    $("form[name=theForm]").validate({
      errorElement: "span", //default input error message container
      errorClass: "help-block", // default input error message class
      focusInvalid: true, // do not focus the last invalid input
      rules: vRules,
      messages: {
        reel_code: {
          required: "轴号不能为空."
        },
        waste_num: {
          required: "切纸机废纸仓总数不能为空."
        },
        reel_weight: {
          required: "纸轴抄重不能为空."
        }
      },
      highlight: function(element) {
        // hightlight error inputs
        $(element)
          .closest(".form-group")
          .addClass("has-error"); // set error class to the control group
      },
      success: function(label) {
        label.closest(".form-group").removeClass("has-error");
        label.remove();
      },
      submitHandler: function(form) {
        //form.submit(); // form validation success, call ajax form submit
      }
    });

    function getData() {
      var iData = getFormData("theForm");
      iData.remark = $('[name="remark"]').val();
      iData.class_time = $('[name="class_time"]').val();
      iData.tblname = "paper_cutwaste";
      iData.rec_time = today(1);
      iData.tbl = 1;
      iData.utf2gbk = [
        "class_name",
        "class_time",
        "operator_captain",
        "operator_counter",
        "operator_guide_edge",
        "operator_package",
        "operator_paper_check",
        "operator_paper_container",
        "operator_quality_check",
        "remark"
      ];
      return iData;
    }

    function insertData() {
      var strUrl = getRootPath() + "/DataInterface/insert";

      $.ajax({
        url: strUrl,
        type: "GET",
        data: getData(),
        success: function(data) {
          var obj = $.parseJSON(data);
          bsTips(obj.message, obj.type);
          resetInputBox();
          loadHisData();
        },
        error: function(data) {
          bsTips("数据添加失败，请稍后重试或联系管理员!", 0);
          infoTips(JSON.stringify(data));
        }
      });
    }

    function updateData() {
      var strUrl = getRootPath() + "/DataInterface/update";
      var iData = getData();
      iData.id = $('.portlet [type="submit"]').data("sn");
      $.ajax({
        url: strUrl,
        type: "GET",
        data: iData,
        success: function(data) {
          var obj = $.parseJSON(data);
          bsTips(obj.message, obj.type);
          resetInputBox();
          loadHisData();
        },
        error: function(data) {
          bsTips("数据更新失败，请稍后重试或联系管理员!", 0);
          infoTips(data);
        }
      });

      //更新数据后，状态置为插入数据
      gb.updateMode = 0;
      $('.portlet [type="submit"]').html(
        '提交  <i class="icon-cloud-upload"></i>'
      );
    }

    $('[type="submit"]').on("click", function() {
      if (
        $("form[name=theForm]")
        .validate()
        .form()
      ) {
        if (gb.updateMode === 0) {
          insertData();
        } else {
          updateData();
        }
      } else {
        bsTips("请确保所有必要信息均正确输入");
      }
    });

    $('a[name="reset"]').on("click", function() {
      resetInputBox();
    });

    function resetInputBox() {
      $('.validateData input[type="text"]').val("");
      $('input[name="reel_code"]').val("");
      focusInput();

      $(".number").val("");
      $('[name="remark"]').val("");
    }
  })();

  $('[name="loadHisData"]').on("click", function() {
    getReelData();
  });

  $('select[name="machine_id"]').on("change", function() {
    var machine_id = $('select[name="machine_id"]').val();
    localStorage.setItem(MAIN_KEY + "cut_machine_id", machine_id);
    var machineName = GetSelect2Text("machine_id");
    if (machineName == "帕萨班") {
      $('[name="ream_69"]').val(0);
      $('[name="ream_49"]').val(0);
    }
  });

  return {
    init: function() {
      initDOM();
      updateClassTime();
    }
  };
})();

var Operators = (function() {
  var operatorList = [];
  var className = $('[name="class_name"]').val();
  var getKey = function() {
    className = $('[name="class_name"]').val();
    if (className.length == 0) {
      return false;
    }
    return MAIN_KEY + "_people_class_" + className;
  };

  var getClassKey = function() {
    return MAIN_KEY + "_class_name";
  };

  var loadOperators = function() {
    var key = getKey();
    if (!key) {
      return;
    }

    var classKey = getClassKey();

    // saveClassName
    window.localStorage.setItem(classKey, className);

    var localOperatorSettings = window.localStorage.getItem(key);

    // 没有数据时，用户自行输入信息
    if (localOperatorSettings == null) {
      infoTips(
        "当前班组 " +
        className +
        " 未输入过人员信息，请手动输入所有数据，下次系统将自动载入。",
        1
      );
      return;
    }

    operatorList = JSON.parse(localOperatorSettings);
    setDefaultOperator();
  };

  var setDefaultOperator = function() {
    operatorList.forEach(function(item) {
      $("[name=" + item.name + "]").val(item.value);
    });
  };

  var operatorSettings = [{
    name: "operator_guide_edge",
    title: "导边"
  }, {
    name: "operator_quality_check",
    title: "质检"
  }, {
    name: "operator_paper_container",
    title: "纸斗"
  }, {
    name: "operator_paper_check",
    title: "查纸"
  }, {
    name: "operator_counter",
    title: "数数"
  }, {
    name: "operator_package",
    title: "封包"
  }, {
    name: "operator_captain",
    title: "机长"
  }];

  function saveUserInfo() {
    var key = getKey();
    if (!key) {
      return;
    }
    var users = operatorSettings.map(function(item) {
      return {
        name: item.name,
        value: $("[name=" + item.name + "]").val()
      };
    });
    window.localStorage.setItem(key, JSON.stringify(users));
  }

  function initOperatorDom() {
    // 载入默认班组信息
    var classKey = getClassKey();
    var localClassName = window.localStorage.getItem(classKey);
    if (localClassName != null) {
      $('[name="class_name"]').val(localClassName);
    }

    var dom = $('[name="operatorInfo"]');
    var html = operatorSettings
      .map(function(item) {
        return '<div class="col-md-12 form-group">\
        <label class="control-label col-md-3">' + item.title + '</label>\
        <div class="col-md-9">\
        <input type="text" placeholder="点击输入' + item.title + '信息" class="form-control" name="' + item.name + '">\
        </div>\
      </div>';
      })
      .join("");
    console.log(html)
    dom.append(
      html
    );
    setDefaultOperator();
    $("input").on("focus", function() {
      $(this).select();
    });
  }

  function initEvent() {
    $('[name="class_name"]').on("change", function() {
      className = $(this).val();
      loadOperators();
    });

    $('[name="saveUsers"]').on("click", function() {
      saveUserInfo();
    });
  }

  return {
    init: function() {
      initEvent();
      initOperatorDom();
      loadOperators();
    }
  };
})();

jQuery(document).ready(function() {
  initDom();
  // iCheckBoxInit();
  cutWaste.init();
  Operators.init();
});
jQuery(window).resize(function() {
  HeadFix();
});
