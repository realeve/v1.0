var PaperParam = function() {

    var abnormalText, deScoreText;

    var isSmallReel;

    var handleDatePickers = function() {
        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                orientation: "left",
                autoclose: true,
                format: 'yyyy-mm-dd'
            });
        }
    };

    function focusInput() {
        $('form input[type="text"]').eq(0).focus();
    }

    function getSelectInfo() {
        var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=24&M=3&t=1&cache=14400";

        $.ajax({
                url: str
            })
            .done(function(data) {
                var Data = handleAjaxData(data);
                InitSelect("Prod_id", Data);
            });

        str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=23&M=3&t=0&cache=14400";

        $.ajax({
                url: str
            })
            .done(function(data) {
                var Data = handleAjaxData(data);
                InitSelect("machine_id", Data);
            });

        //非常规指标人员信息，Proc_id=4
        str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=25&M=3&t=1&cache=14400";

        $.ajax({
                url: str
            })
            .done(function(Data) {
                Data = handleAjaxData(Data);
                InitSelect("oper_id", Data);
            });

        initSelect2();
    }

    function initDOM() {
        getSelectInfo();
        $("input[name='rec_date']").val(today(6));
        $("input[name='Reel_Code']").maxlength({
            limitReachedClass: "label label-danger",
            threshold: 3
        });

        $('.page-header .dropdown-quick-sidebar-toggler').hide();
        isSmallReel = getUrlParam('sreel');
        isSmallReel = isSmallReel == null ? 0 : isSmallReel;
        focusInput();
        abnormalText = "";
        deScoreText = "";
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

    function vialidate() {
        if ($('select[name="oper_id"]').val() === '' || $('select[name="prod_ID"]').val() === '' || $('select[name="machine_ID"]').val() === '') {
            $('.portlet.light').hide();
            return 1;
        }
        $('.portlet.light').show();
        return 0;
    }

    $('select[name="oper_id"]').change(function() {
        if (!vialidate()) {
            refreshData();
        }
    });

    $('select[name="machine_id"]').change(function() {
        if (!vialidate()) {
            refreshData();
        }
        initChecked();
    });

    function handleStandardText(json, prod) {
        var standard = json[prod];
        Object.keys(standard).map(function(key) {
            console.log(key)
            var item = standard[key];
            var text = typeof item.max === 'undefined' ? '≥' + item.min : (typeof item.min === 'undefined' ? '≤' + item.max : item.min + ' — ' + item.max);
            $('input[name="' + key + '"]').parent().find('span').text(text);
        })
    }

    $('select[name="Prod_id"]').change(function() {
        //提示信息更改
        var url = getRootPath(1) + "/assets/pages/controller/data/paper_physic.json";
        var prodName = GetSelect2Text('Prod_id');
        if (prodName === '103-G-7T') {
            $.get(url, function(json) {
                handleStandardText(json, 'normal');
                handleStandardText(json, '9607T')
            });

            // $('input[name="water_imbibition"]').parent().find('span').text('20~40 g/m^2');
            // $('input[name="basis_weight"]').parent().find('span').text('95±3%');
            // $('input[name="thickness"]').parent().find('span').text('107-118');
            // $('input[name="whiteness"]').parent().find('span').text('80-84');
            // $('input[name="crumpled_porosity_front"]').parent().find('span').text('<=150');
            // $('input[name="crumpled_porosity_back"]').parent().find('span').text('<=150');

            //揉后透气度
            $('[name*="crumpled_porosity"]').attr('disabled', false).parents('.form-group').show();
            //TZ1-2
            $('[name="fibre_tz12"]').attr('disabled', false).parents('.form-group').show();
            //干耐揉
            $('[name="anti_crumpled_dry"]').attr('disabled', false).parents('.form-group').show();
        } else if (prodName === '103-G-6T') {
            $.get(url, function(json) {
                handleStandardText(json, 'normal');
                handleStandardText(json, '9606T')
            });

            // $('input[name="basis_weight"]').parent().find('span').text('94±2');
            // $('input[name="thickness"]').parent().find('span').text('107-116');
            // $('input[name="whiteness"]').parent().find('span').text('80-84');
            // //揉后透气度
            // $('input[name="crumpled_porosity_front"]').parent().find('span').text('<=150');
            // $('input[name="crumpled_porosity_back"]').parent().find('span').text('<=150');

            $('[name*="crumpled_porosity"]').attr('disabled', false).parents('.form-group').show();
            //TZ1-2
            $('[name="fibre_tz12"]').attr('disabled', false).parents('.form-group').show();
            //干耐揉
            $('[name="anti_crumpled_dry"]').attr('disabled', false).parents('.form-group').show();
        } else {
            $('input[name="water_imbibition"]').parent().find('span').text('40~70 g/m^2');
            $('input[name="basis_weight"]').parent().find('span').text('90±3%');
            $('input[name="thickness"]').parent().find('span').text('102-113');
            $('input[name="whiteness"]').parent().find('span').text('80-84');
            $('input[name="crumpled_porosity_front"]').parent().find('span').text('');
            $('input[name="crumpled_porosity_front"]').parent().find('span').text('');
            //揉后透气度
            $('[name*="crumpled_porosity"]').attr('disabled', true).val(0).parents('.form-group').hide();
            $('[name="fibre_tz12"]').attr('disabled', true).val(0).parents('.form-group').hide();
            if (GetSelect2Text('Prod_id') === '103-G-2A') {
                //干耐揉-安全线
                $('[name="anti_crumpled_dry"]').attr('disabled', true).val(0).parents('.form-group').hide();
            } else {
                $('[name="anti_crumpled_dry"]').attr('disabled', false).parents('.form-group').show();
            }
        }

        if (vialidate()) {
            $('.grey-cascade').html('');
            return;
        }
        refreshData();
    });

    $('input[name="Reel_Code"]').on('blur', function(event) {
        if ($(this).val().length > 1 && $('select[name="Prod_id"]').val() !== '-1') {
            if (loadHisData()) {
                $('.portlet button[type="submit"]').text('更新');
                $('.amounts h4').html("<strong>评价总分:</strong> " + calcScore());
            }
        } else if ($('.portlet button[type="submit"]').text().trim() == '更新') {
            //将上次载入的轴号记录
            if ($(this).data('reelcode') != $(this).val()) {
                $('.portlet button[type="submit"]').text('提交');
            }
        }
    });

    function loadHisData() {
        var Reel_Code = $('select[name="Prod_id"]').val() + $('input[name="Reel_Code"]').val();
        var strUrl = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=33&M=0&r=" + Reel_Code;
        var Data = ReadData(strUrl);
        //bsTips(JSON.stringify(Data));
        if (Data.rows == "0") {
            return 0;
        }
        //将上次载入的轴号记录
        $('input[name="Reel_Code"]').data('reelcode', Reel_Code);
        Data.header.map(function(elem) {
            var keys = elem.title;
            //$('form input.form-control[name="'+ keys +'"], form select.form-control[name="'+ keys +'"]').val(Data.data[0][keys]);
            $('form .form-control[name="' + keys + '"]').val(Data.data[0][keys]);
        });
        SetSelect2Val('oper_id', Data.data[0]['oper_id']);
        SetSelect2Val('Prod_id', Data.data[0]['Prod_id']);
        SetSelect2Val('machine_id', Data.data[0]['machine_id']);

        SetiCheckChecked('class_id', Data.data[0]['class_id']);
        $('.portlet button[type="submit"]').data('sn', Data.data[0]['ID']);
        $('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('提交', '更新'));
        //移动浮动效果
        $('.portlet.light').show();
        refreshData();
        //更新评价总分
        $('.amounts h4').html("<strong>评价总分:</strong> " + Data.data[0]['score']);

        //日常指标禁止修改
        $('#checkbox2').iCheck('uncheck');
        $('.normalPara input').attr('disabled', 'true');
        $('.normalParaEdit').show();
        return 1;
    }

    function refreshData() {
        var startMonth = $("input[name='rec_date']").val();
        startMonth = startMonth.substr(0, 4) + startMonth.substr(5, 2);
        var prod = $('select[name="Prod_id"]').val();
        var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=27&M=3&tmonth=" + startMonth + "&prod=" + prod;
        var DataPsc = ReadData(str);
        str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=28&M=3&tmonth=" + startMonth + "&prod=" + prod;
        var DataSur = ReadData(str);
        $('.grey-cascade').html('物理指标：' + xround(DataPsc.data[0][0], 2) + '，外观指标：' + xround(DataSur.data[0][0], 2) + '，总分：' + xround(parseFloat(DataPsc.data[0][0]) + parseFloat(DataSur.data[0][0]) - 100, 2));
    }

    function dataRangeValidate(iKey, curVal, bShow) {
        if (typeof bShow === 'undefined') {
            bShow = true;
        }
        var scoreSheet, isNormal = 1,
            prodName = GetSelect2Text('Prod_id'); //判断产品是否合格
        if (prodName === '103-G-7T') {
            scoreSheet = stdScore['9607T'];
        } else if (prodName === '103-G-2A') {
            scoreSheet = stdScore['9602A'];
        } else if (prodName === '103-G-6T') {
            scoreSheet = stdScore['9606T'];
        } else {
            scoreSheet = stdScore['normal'];
        }
        if (typeof scoreSheet[iKey] !== 'undefined') {
            var text = $('.validateData input[name=' + iKey + ']:enabled').parents('.form-group').find('label').text();
            if (curVal < scoreSheet[iKey].w_min || curVal > scoreSheet[iKey].w_max) {
                isNormal = 0; //产品不合格
                if (bShow) {
                    //弹出错误提示
                    bsTips('【' + text + '】的值' + curVal + '不在指定范围内,产品判定为不合格，请仔细确认检查', 0);
                    if (abnormalText.indexOf(text) == -1) {
                        abnormalText += text + '、';
                    }
                }
            } else {
                abnormalText = abnormalText.replace(text + '、', '');
            }
        }
        return isNormal;
    }

    var stdScore = {};
    /**
     * [getStdScore 计算物理指标得分]
     * @return {[type]} [返回总分]
     */

    function getStdScore() {
        var url = getRootPath(1) + "/assets/pages/controller/data/paper_physic.json";
        $.get(url, function(json) {
            stdScore = json;
        });
    }

    function calcScore(isUpdate) {
        var curScore = 100;
        var iKey, curVal;
        var scoreSheet, updateFlag = 1;
        if (typeof isUpdate == 'undefined') {
            isUpdate = 0;
        }
        var prodName = GetSelect2Text('Prod_id'); //判断产品是否合格
        if (prodName === '103-G-7T') {
            scoreSheet = stdScore['9607T'];
        } else if (prodName === '103-G-2A') {
            scoreSheet = stdScore['9602A'];
        } else if (prodName === '103-G-6T') {
            scoreSheet = stdScore['9606T'];
        } else {
            scoreSheet = stdScore['normal'];
        }

        if (isUpdate && $('.validateData input[name="water_imbibition"]').val() == 0) {
            updateFlag = 0;
        }
        deScoreText = "";
        $('.validateData input[type="text"]:enabled').each(function(index, el) {
            iKey = $(this).attr('name');
            curVal = $(this).val();
            if (typeof scoreSheet[iKey] !== 'undefined' && curVal !== '') {
                if (curVal < scoreSheet[iKey].min || curVal > scoreSheet[iKey].max) {
                    //为更新模式且未输入非常规指标时
                    var text = $('.validateData input[name=' + iKey + ']:enabled').parents('.form-group').find('label').text();
                    if (iKey == 'water_imbibition' || iKey == 'sur_Strength' || iKey == 'sur_oil_imbibition' || iKey == 'PH_val') {
                        if (updateFlag) {
                            curScore -= scoreSheet[iKey].score;
                            deScoreText += text + "、";
                        }
                    } else {
                        curScore -= scoreSheet[iKey].score;
                        deScoreText += text + "、";
                    }
                }
            }
        });
        return curScore;
    }

    $('.validateData input[type="text"]:enabled').on('change', function() {
        var curScore = calcScore();
        var iKey = $(this).attr('name');
        var curVal = $(this).val();
        dataRangeValidate(iKey, curVal, true);
        $('.amounts h4').html("<strong>评价总分:</strong> " + curScore);
    });

    $('.validateData input[type="text"]:enabled').on('keyup', function() {
        var curScore = calcScore();
        $('.amounts h4').html("<strong>评价总分:</strong> " + curScore);
    });

    $('input[name="Reel_Code"]').on('keyup', function() {
        var obj = $(this);
        //取右边一位信息
        var curVal = jsRight(obj.val(), 1);
        if (obj.val().length == 2) {
            if (curVal == 7) {
                curVal = 8;
            }
            SetSelect2Val('Prod_id', curVal);
        } else if (obj.val().length == 3) {
            SetSelect2Val('machine_id', curVal);
        }
    });

    function validateBeforeSubmit() {
        var iKey, curVal, isNormal = 1;
        var scoreSheet = (GetSelect2Text('Prod_id') === '103-G-7T') ? stdScore['9607T'] : ((GetSelect2Text('Prod_id') === '103-G-2A') ? stdScore['9602A'] : stdScore['normal']);
        $('.normalPara input[type="text"]:enabled').each(function(index, el) {
            iKey = $(this).attr('name');
            curVal = $(this).val().trim();
            if (curVal != '' && "0" == dataRangeValidate(iKey, curVal, true)) {
                isNormal = 0;
            }
        });
        return isNormal;
    }


    var handleValidate = function() {
        var vRules = getValidateRule('theForm');
        vRules.Reel_Code = {
            minlength: 6,
            maxlength: 8,
            number: false,
            required: true
        };
        vRules.rec_date.number = false;

        if (isSmallReel) {
            for (var key in vRules) {
                vRules[key].required = false;
            }

            var list = ['temperature', 'Reel_Code', 'humidity', 'oper_id', 'machine_id', 'Prod_id'];
            list.forEach(function(item) {
                vRules[item].required = true;
            });
            console.log(vRules);
        }

        $('form[name=theForm]').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            rules: vRules,
            messages: {
                Reel_Code: {
                    required: "轴号不能为空."
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
            //var strUrl = getRootUrl('PaperPara') + 'insert';
            var strUrl = getRootPath() + "/DataInterface/insert";
            var iData = getFormData('theForm');
            var curScore = calcScore();
            $('.amounts h4').html("<strong>评价总分:</strong> " + curScore);
            iData.tbl = TBL.PHYSIC;
            iData.class_id = GetRadioChecked('class_id');
            iData.score = curScore; //$('.amounts h4').text().replace('评价总分:', '');
            iData.utf2gbk = ['remark'];
            iData.record_Time = today(1);
            iData.class_id = GetiCheckChecked('class_id');
            iData.isNormal = validateBeforeSubmit();
            iData.sreel = isSmallReel;
            //不合格时
            if (!iData.isNormal) {
                iData.remark = "不合格项:" + jsOnRight(abnormalText, 1);
                if (iData.score < 100) {
                    iData.remark += "    扣分项:" + jsOnRight(deScoreText, 1);
                }
            } else if (iData.score < 100) {
                iData.remark = "扣分项:" + jsOnRight(deScoreText, 1);
            }
            $.ajax({
                url: strUrl,
                type: 'POST',
                data: iData,
                success: function(data) {
                    var obj = $.parseJSON(data);
                    bsTips(obj.message, obj.type);
                    resetInputBox();
                    $('.portlet.light').hide();
                },
                error: function(data) {
                    infoTips("保存数据失败，请稍后重试或联系管理员!", 0);
                    infoTips(JSON.stringify(data));
                }
            });

        }

        function updateData() {
            var strUrl = getRootPath() + "/DataInterface/update";
            var iData = getFormData('theForm');
            iData.tbl = TBL.PHYSIC;
            iData.class_id = GetRadioChecked('class_id');
            iData.score = calcScore(0);
            iData.utf2gbk = ['remark'];
            iData.record_Time = today(1);
            iData.class_id = GetiCheckChecked('class_id');
            iData.id = $('.portlet button[type="submit"]').data('sn');
            iData.isNormal = validateBeforeSubmit();
            //不合格时
            if (!iData.isNormal) {
                iData.remark = "不合格项:" + jsOnRight(abnormalText, 1);
                if (iData.score < 100) {
                    iData.remark += "    扣分项:" + jsOnRight(deScoreText, 1);
                }
            } else if (iData.score < 100) {
                iData.remark = "扣分项:" + jsOnRight(deScoreText, 1);
            }
            bsTips((iData.isNormal == 1) ? '合格' : '不合格', (iData.isNormal == 1) ? 1 : 0);

            $.ajax({
                url: strUrl,
                type: 'POST',
                data: iData,
                success: function(data) {
                    var obj = $.parseJSON(data);
                    infoTips(obj.message, obj.type);
                    resetInputBox();
                    $('.portlet.light').hide();
                    //状态还原
                    $('.normalPara input').removeAttr('disabled');
                    $('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新', '提交'));
                },
                error: function(data) {
                    infoTips("更新数据失败，请稍后重试或联系管理员!", 0);
                    infoTips(JSON.stringify(data));
                }
            });

            //状态还原
            $('.normalPara input').removeAttr('disabled');
            $('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新', '提交'));
        }

        $('button[type="submit"]').on('click', function() {
            if ($('form[name=theForm]').validate().form()) {
                if ($('.portlet button[type="submit"]').text().trim() == '提交') {
                    insertData();
                } else {
                    updateData();
                }
            } else {
                infoTips('请确保所有必要信息均正确输入');
            }
        });

        $('a[name="reset"]').on('click', function() {
            resetInputBox();
        });

        function resetInputBox() {
            initChecked();
            $('form input[type="text"]').val('');
            $('.amounts h4').html("<strong>评价总分:</strong> " + 100);
            $('.portlet button[type="submit"]').html($('.portlet button[type="submit"]').html().replace('更新', '提交'));
            $('#checkbox2').iCheck('check');
            $('#checkbox').iCheck('uncheck');
            $('.normalPara input').removeAttr('disabled');
            SetSelect2Val('oper_id', -1);
            SetSelect2Val('Prod_id', -1);
            SetSelect2Val('machine_id', -1);
            $('.portlet.light').hide();
            $("input[name='rec_date']").val(today(6));
            focusInput();
            abnormalText = "";
            deScoreText = "";
        }

        $('#checkbox2').on('ifChecked', function() {
            var iStat = ($(this).prop("checked")) ? 1 : 0;
            if (!iStat) {
                $('.normalPara input').attr('disabled', 'true');
            } else { //允许
                $('.normalPara input').removeAttr('disabled');
            }
        });

    };

    return {
        init: function() {
            $('.portlet.light').hide();
            $('.normalParaEdit').hide();
            handleDatePickers();
            initDOM();
            initChecked();
            handleValidate();
            getStdScore();
        }
    };

}();

jQuery(document).ready(function() {
    initDom();
    iCheckBoxInit();
    $('#checkbox2').iCheck('check');
    PaperParam.init();
});
jQuery(window).resize(function() {
    HeadFix();
});


// 6T 未使用指标
// "tensile_strength_wet": {
//     "min": 25,
//     "max": 45,
//     "score": 0.75,
//     "w_min": 25,
//     "w_max": 45
// },
// "fold_val_avg": {
//     "min": 2200,
//     "score": 1,
//     "w_min": 2000
// },
// "smoothness_avg": {
//     "min": 10,
//     "score": 0.75,
//     "w_min": 10
// },
// "water_imbibition": {
//     "min": 40,
//     "max": 70,
//     "score": 0.5,
//     "w_min": 40,
//     "w_max": 70
// },
// "PH_val": {
//     "min": 7,
//     "max": 8.5,
//     "score": 0.5,
//     "w_min": 7,
//     "w_max": 8.5
// },
// "sur_Strength": {
//     "min": 2.5,
//     "score": 2,
//     "w_min": 2.5
// },
// "sur_oil_imbibition": {
//     "min": 40,
//     "max": 50,
//     "score": 0.75,
//     "w_min": 40,
//     "w_max": 50
// }