var FormWizard = function() {

    var loadUserBasicInfo = function() {
        //SELECT a.FullName, b.DepartMentName, a.Phone, a.Email FROM dbo.tblUser AS a INNER JOIN dbo.tblDepartMent AS b ON b.DptID = a.DepartMent where username=? 
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=164&M=3&u=" + $('.username').text().trim();
        var Data = ReadData(str);
        var userInfo = Data.data[0];
        $('.profile-usertitle-name').text(userInfo[0]);
        $('.profile-usertitle-job').text(userInfo[2]);
    }();

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            var form = $('#submit_form');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);

            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    select_cat: {
                        required: true,
                        min: 0
                    },
                    select_name: {
                        required: true
                    },
                    addInfo: {
                        required: true
                    },
                    apiURL: {
                        required: true
                    },
                    tblID: {
                        required: true
                    }
                },
                errorPlacement: function(error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    bsTips('请检查输入数据的有效性');
                },

                highlight: function(element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function(element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function(label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid') // mark the current input as valid and display OK icon
                            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    }
                },

                submitHandler: function(form) {
                    bsTips('数据有效性校验通过');
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form_wizard_1')).text('第 ' + (index + 1) + ' 步，共 ' + total + ' 步');
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }
                switch (current) {
                    case 1:
                        $('#form_wizard_1').find('.button-previous').hide();
                        $('#form_wizard_1').find('.button-next').show();

                        $('.mt-step-col:nth(0)').removeClass('done').addClass('active');
                        $('.mt-step-col:nth(1)').removeClass('active').removeClass('done');

                        //返回至第1页时，第二页信息重置
                        if ($('#tab2 a.btn-circle:gt(0)').length > 0) {
                            $('.fa-minus').parent().parent().remove();
                        }
                        break;
                    case 2:
                        if ($('#tab2 a.btn-circle:gt(0)').length > 0) {
                            $('#form_wizard_1').find('.button-next').show();
                        } else {
                            $('#form_wizard_1').find('.button-next').hide();
                        }
                        $('.mt-step-col:nth(1)').addClass('active');
                        $('.mt-step-col').first().removeClass('active');
                        $('.mt-step-col').first().addClass('done');
                        $('#form_wizard_1').find('.button-submit').hide();
                        $('#form_wizard_1').find('.button-previous').show();
                        $('.mt-step-col:nth(2)').removeClass('active').removeClass('done');

                        //按返回时需要重置第3页信息
                        $("select[name='preview']").html($("select[name='select_name']").html());
                        $('div[name="addList"]').remove();
                        break;
                    case 3:
                        $('#form_wizard_1').find('.button-next').hide();
                        $('#form_wizard_1').find('.button-submit').show();
                        $('.mt-step-col:nth(1)').removeClass('active');
                        $('.mt-step-col:nth(1)').addClass('done');
                        $('.mt-step-col').last().addClass('active');

                        //列表编辑数据预览
                        var curVal = parseInt($("select[name='select_name'] option").last().val(), 10) + 1;
                        var len = $('#tab2 input[name="addInfo"]').length;
                        var text, j, strHTML = '',
                            strOption = '';
                        strHTML += '     <label class="control-label col-md-2 font-blue bold">序号</label>';
                        strHTML += '     <div class="col-md-2">';
                        strHTML += '         <p class="form-control-static font-blue bold">值</p>';
                        strHTML += '     </div>';
                        strHTML += '     <div class="col-md-2">';
                        strHTML += '         <p class="form-control-static font-blue bold">列表项</p>';
                        strHTML += '     </div>';
                        $('#tab3 .form-group').last().html(strHTML);
                        strHTML = '';
                        //下拉列表需要对URL处理
                        if ($("select[name='select_cat']").val() === '0') {

                            strHTML += '     <div class="col-md-3">';
                            strHTML += '         <p class="form-control-static font-blue bold">接口地址</p>';
                            strHTML += '     </div>';
                            strHTML += '     <div class="col-md-2">';
                            strHTML += '         <p class="form-control-static font-blue bold">表单ID</p>';
                            strHTML += '     </div>';
                            $('#tab3 .form-group').last().append(strHTML);
                            strHTML = '';
                        }

                        for (i = 0; i < len; i++) {
                            text = $('#tab2 input[name="addInfo"]:nth(' + i + ')').val();
                            val = i + curVal;
                            j = i + 1;
                            strHTML += '<div class="form-group" name="addList">';
                            strHTML += '    <label class="control-label col-md-2">' + j + '</label>';
                            strHTML += '           <div class="col-md-2">';
                            strHTML += '              <p class="form-control-static">' + val + '</p>';
                            strHTML += '           </div>';
                            strHTML += '           <div class="col-md-2">';
                            strHTML += '              <p class="form-control-static">' + text + '</p>';
                            strHTML += '            </div>';
                            if ($("select[name='select_cat']").val() === '0') {
                                url = $('#tab2 input[name="apiURL"]:nth(' + i + ')').val();
                                tblID = $('#tab2 input[name="tblID"]:nth(' + i + ')').val();
                                strHTML += '           <div class="col-md-3">';
                                strHTML += '              <p class="form-control-static">' + url + '</p>';
                                strHTML += '           </div>';
                                strHTML += '           <div class="col-md-2">';
                                strHTML += '              <p class="form-control-static">' + tblID + '</p>';
                                strHTML += '            </div>';
                            }

                            strHTML += '</div>';
                            strOption += '<option value="' + val + '">' + text + '</option>';
                        }
                        if (len) {
                            $("select[name='preview']").append(strOption);
                            $('#tab3').last().append(strHTML);
                        }
                        break;
                }
                App.scrollTo($('.page-title'));
            };

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function(tab, navigation, index, clickedIndex) {

                    success.hide();
                    error.hide();
                    if (form.valid() === false) {
                        return false;
                    }

                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function(tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() === false) {
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function(tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function(tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1 .button-submit').click(function() {
                //为兼容SQL2000此处不采用批量插入的方式，单条插入信息
                var strUrl = getRootPath() + "/DataInterface/insert";
                var obj, dataID, dataName, iData = {};
                var iLen = $('div[name="addList"]').length;
                if ($("select[name='select_cat']").val() === '0') {
                    dataID = 'Value';
                    dataName = 'Name';
                    iData.tbl = TBL.SELECT;
                } else {
                    obj = $('select[name="preview"]');
                    dataID = obj.data("ID");
                    dataName = obj.data("Name");
                    iData.tbl = $('select[name="select_cat"]').find("option:selected").data('tblID');
                }
                iData.utf2gbk = [dataName];
                var iFlag = 0;
                //循环取数据
                for (var i = 0; i < iLen; i++) {
                    obj = $('div[name="addList"]:nth(' + i + ')');
                    iData[dataID] = obj.find('p:nth(0)').text();
                    iData[dataName] = obj.find('p:nth(1)').text();
                    if ($("select[name='select_cat']").val() === '0') {
                        iData.apiURL = obj.find('p:nth(2)').text();
                        iData.tblID = obj.find('p:nth(3)').text();
                    }
                    //插入数据
                    $.post(strUrl, iData,
                        function(data, status) {
                            if (status == "success") {
                                var obj = $.parseJSON(data);
                                bsTips(obj.message, obj.type);

                            } else {
                                infoTips("保存设置失败，请稍后重试或联系管理员!", 0);
                                infoTips(JSON.stringify(data));
                            }
                        }
                    );
                }
                $('.button-previous').click();
                $('.button-previous').click();
                handleSelect2.init();

            }).hide();

        }

    };

}();

var handleSelect2 = function() {
    function initDOM() {
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=34&M=3";
        var Data = ReadData(str);
        InitSelect("select_cat", Data);
        var i = 1;
        Data.data.map(function(elem) {
            $("select[name='select_cat'] option:nth(" + i + ")").data('apiUrl', elem[2]);
            $("select[name='select_cat'] option:nth(" + i + ")").data('tblID', elem[3]);
            i++;
        });
    }

    $(document).on('change', 'select[name="select_cat"]', function() {
        if ($(this).val() < 0) {
            return;
        }
        var str = getRootPath(1) + "/" + $(this).find("option:selected").data('apiUrl');
        var tblID = getRootPath(1) + "/" + $(this).find("option:selected").data('tblID');
        var Data = ReadData(str);
        var selText = $(this).find("option:selected").text();
        InitSelect("select_name", Data);
        InitSelect("preview", Data);
        //记录列名
        if ($(this).val() > 0) {
            var obj = $('select[name="preview"]');
            obj.data("ID", Data.header[0].title);
            obj.data("Name", Data.header[1].title);
        }
        $("select[name='select_name']").data('tblID', tblID);
        $('span[name="selectName"]').text(selText);
        $('#tab3 p[data-display="select_cat"]').text(selText);
        $('a.button-next').click();
    });

    //添加
    $('#tab2 a.btn-circle:nth(0)').on('click', function() {
        $('#form_wizard_1').find('.button-next').show();
        var strHTML = '<div class="form-group">';
        strHTML += '    <label class="control-label col-md-3">待增加项';
        strHTML += '         <span class="required"> * </span>';
        strHTML += '     </label>';
        strHTML += '     <div class="col-md-2">';
        strHTML += '         <input type="text" class="form-control" name="addInfo"/>';
        strHTML += '         <span class="help-block"> 输入待增加项描述 </span>';
        strHTML += '     </div>';
        if ($("select[name='select_cat']").val() === '0') {
            strHTML += '     <div class="col-md-3">';
            strHTML += '         <input type="text" class="form-control" name="apiURL"/>';
            strHTML += '         <span class="help-block"> 输入接口地址 </span>';
            strHTML += '     </div>';
            strHTML += '     <div class="col-md-2">';
            strHTML += '         <input type="text" class="form-control" name="tblID"/>';
            strHTML += '         <span class="help-block"> 表单ID </span>';
            strHTML += '     </div>';
        }

        strHTML += '     <a href="javascript:;" class="btn btn-circle btn-icon-only red">';
        strHTML += '         <i class="fa fa-minus"></i>';
        strHTML += '     </a>';
        strHTML += ' </div>';
        $('#tab2').append(strHTML);
    });

    $(document).on('click', '#tab2 a.btn-circle:gt(0)', function() {
        $(this).parent().remove();
    });

    return {
        init: function() {
            initDOM();
        }
    };
}();


jQuery(document).ready(function() {
    initDom();
    UIIdleTimeout.init();
    FormWizard.init();
    //Profile.init();
    handleSelect2.init();
});

jQuery(window).resize(function() {
    HeadFix();
});