var cutWaste = function() {
  var gb = {
    initLoad: true,
    updateMode: 0
  };

  function focusInput() {
    $('form input[type="text"]').eq(0).focus();
  }

  function loadHisData() {
    var objTbody = $('[name="reelList"] tbody');
    var machine_id = $('select[name="machine_id"]').val();
    if (machine_id == null || machine_id == '' || machine_id == -1) {
      bsTips('请选择机台信息');
      return;
    }
    var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=486&M=3&mid=" + machine_id;
    $.ajax({
        url: str
      })
      .done(function(Data) {
        Data = handleAjaxData(Data);
        var reelCounts = Data.rows;
        if (reelCounts == 0) {
          bsTips('当天无相关数据');
          return;
        }

        function getTDStr(data, i) {
          var str = '<tr>' +
            ' <td>' + i + '</td>';
          data.map(function(td) {
            str += '  <td>' + td + '</td>';
          });
          str += '</tr>';
          return str;
        }
        var tBody = '';
        Data.data.map(function(data, i) {
          tBody += getTDStr(data, i + 1);
        });
        objTbody.html(tBody);
      });
  }

  function getSelectInfo() {
    var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1&cache=14400";

    $.ajax({
        url: str
      })
      .done(function(data) {
        var Data = handleAjaxData(data);
        InitSelect("prod_id", Data);
      });

    //select machine_id,machine_name from paper_machine_info where Proc_ID=1
    str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=1&cache=14400";

    $.ajax({
        url: str
      })
      .done(function(data) {
        var Data = handleAjaxData(data);
        InitSelect("machine_id", Data);
      });

    initSelect2();

    // 载入历史设置
    var machine_id = localStorage.getItem('cut_machine_id');
    if (machine_id == null) {
      return;
    }
    setTimeout(function() {
      SetSelect2Val('machine_id', machine_id);
      loadHisData();
    }, 1000);
  }

  function initDOM() {
    getSelectInfo();

    $("input[name='reel_code']").maxlength({
      limitReachedClass: "label label-danger",
      threshold: 3
    });
    $('.page-header .dropdown-quick-sidebar-toggler').hide();

    focusInput();
  }

  function getReelData() {
    var reel_code = $('input[name="reel_code"]').val();
    /**
     *  SELECT a.id,a.reel_code, a.prod_id, a.oper_id, a.machine_id, CONVERT(VARCHAR(10),a.rec_date,120) as rec_date, a.validate_num, a.number_right, a.package_weight, a.serious_fake, a.normal_fake_h, a.normal_fake_m, a.normal_fake_l, a.reel_end, a.suspect_paper, a.well_paper, a.other, a.rec_time, a.passed, a.cut_weight  FROM dbo.Paper_Validate AS a  WHERE cast(prod_id as varchar)+ reel_code=?
     *  param: r
     */
    var strUrl = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=487&M=0&r=" + reel_code;
    var Data = ReadData(strUrl);
    if (Data.rows == 0) {
      return 0;
    }

    //将上次载入的轴号记录
    $('input[name="reel_code"]').data('reelcode', reel_code);
    Data.header.map(function(elem) {
      var keys = elem.title;
      $('form .form-control[name="' + keys + '"]').val(Data.data[0][keys]);
    });

    SetSelect2Val('prod_id', Data.data[0].prod_id);
    SetSelect2Val('machine_id', Data.data[0].machine_id);


    $('.portlet [type="submit"]').data('sn', Data.data[0].id).html('更新  <i class="icon-cloud-upload"></i>');

    gb.updateMode = 1;

    bsTips("历史数据载入成功", 1);
    return 1;
  }

  $('input[name="reel_code"]').on('blur', function(event) {
    if ($(this).val().length > 1) {
      if (getReelData()) {
        $('.portlet [type="submit"]').html('更新  <i class="icon-cloud-upload"></i>');
      }
    } else if (gb.updateMode == 1) {
      if ($(this).data('reelcode') != $(this).val()) {
        $('.portlet [type="submit"]').html('提交  <i class="icon-cloud-upload"></i>');
      }
    }
  });

  $('input[name="reel_code"]').on('keyup', function() {
    var obj = $(this);
    //取右边一位信息
    var curVal = jsRight(obj.val(), 1);
    if (obj.val().length == 2) {
      if (curVal == 7) {
        curVal = 8;
      }
      SetSelect2Val('prod_id', curVal);
    }

  });

  $('.err-reason').on('keyup', function() {
    $('.err-reason').closest('.form-group').removeClass('has-error');
  });

  var handleValidate = function() {
    var vRules = {
      reel_code: {
        minlength: 6,
        maxlength: 8,
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

    $('form[name=theForm]').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: true, // do not focus the last invalid input
      rules: vRules,
      messages: {
        reel_code: {
          required: "轴号不能为空."
        },
        waste_num: {
          required: "切纸机废纸仓总数不能为空."
        },
        before_cut: {
          required: "切前损不能为空."
        }
      },
      highlight: function(element) { // hightlight error inputs
        $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
      },
      success: function(label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },
      submitHandler: function(form) {
        //form.submit(); // form validation success, call ajax form submit
      }
    });

    function insertData() {

      var strUrl = getRootPath() + "/DataInterface/insert";
      var iData = getFormData('theForm');

      iData.tblname = 'paper_cutwaste';
      iData.rec_time = today(1);
      iData.tbl = 1;
      $.ajax({
        url: strUrl,
        type: 'GET',
        data: iData,
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
      var iData = getFormData('theForm');

      iData.tblname = 'paper_cutwaste';
      iData.rec_time = today(1);
      iData.tbl = 1;

      iData.id = $('.portlet [type="submit"]').data('sn');
      $.ajax({
        url: strUrl,
        type: 'GET',
        data: iData,
        success: function(data) {
          var obj = $.parseJSON(data);
          bsTips(obj.message, obj.type);
          resetInputBox();

        },
        error: function(data) {
          bsTips("数据更新失败，请稍后重试或联系管理员!", 0);
          infoTips(data);
        }
      });

      //更新数据后，状态置为插入数据
      gb.updateMode = 0;
      $('.portlet [type="submit"]').html('提交  <i class="icon-cloud-upload"></i>');
    }

    $('[type="submit"]').on('click', function() {
      if ($('form[name=theForm]').validate().form()) {
        if (gb.updateMode === 0) {
          insertData();
        } else {
          updateData();
        }
      } else {
        bsTips('请确保所有必要信息均正确输入');
      }
    });

    $('a[name="reset"]').on('click', function() {
      resetInputBox();
    });

    function resetInputBox() {
      $('.validateData input[type="text"]').val('');
      $('input[name="reel_code"]').val('');
      focusInput();

      $('input[name="waste_num"]').val('');
      $('input[name="before_cut"]').val('');
    }
  }();

  $('[name="loadHisData"]').on('click', function() {
    getReelData();
  });

  $('select[name="machine_id"]').on('change', function() {
    var machine_id = $('select[name="machine_id"]').val();
    localStorage.setItem('cut_machine_id', machine_id);
  })

  return {
    init: function() {
      initDOM();
    }
  };

}();

jQuery(document).ready(function() {
  initDom();
  // iCheckBoxInit();
  cutWaste.init();
});
jQuery(window).resize(function() {
  HeadFix();
});
